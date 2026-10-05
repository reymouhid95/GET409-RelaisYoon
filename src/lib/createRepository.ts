import { createLocalRepository, type EntryRepository } from "./entryRepository";
import { FirestoreEntryRepository } from "./firestoreEntryRepository";
import { db } from "./firebase";

/** Dev emulator endpoint (same host/port as connectFirestoreEmulator). */
const EMULATOR_URL = "http://127.0.0.1:8080/";

/**
 * In dev the Firestore SDK can resolve `getDocs` with an empty list while the
 * emulator is down instead of throwing, so the emulator port itself is the
 * reliable probe: any response (even opaque, no-cors) means "reachable", and
 * a rejected fetch means the connection was refused.
 */
async function assertEmulatorReachable(): Promise<void> {
  if (!import.meta.env.DEV) return;
  await fetch(EMULATOR_URL, { mode: "no-cors" });
}

/**
 * Pick the workspace repository at startup:
 * 1. Probe Firestore (the dev emulator in dev, real backend otherwise).
 * 2. One-shot migration: if Firestore is empty but localStorage has entries,
 *    copy them across (phase 1/2 data survives the move).
 * 3. If Firestore is unreachable, fall back to localStorage; the next app
 *    load probes again, so the app switches back automatically.
 */
export async function createWorkspaceRepository(): Promise<EntryRepository> {
  const local = createLocalRepository();
  try {
    await assertEmulatorReachable();
    const remote = new FirestoreEntryRepository(db);
    const remoteEntries = await remote.load();
    if (remoteEntries.length === 0) {
      const localEntries = await local.load();
      if (localEntries.length > 0) {
        await remote.save(localEntries);
        console.info(
          `PromptLens: migrated ${localEntries.length} local entr(ies) to Firestore.`,
        );
      }
    }
    return remote;
  } catch (error) {
    console.warn("PromptLens: Firestore unreachable, falling back to localStorage.", error);
    return local;
  }
}
