import { collection, getDocs } from "firebase/firestore";
import { ensureAnonymousAuth } from "./auth";
import {
  createLocalRepository,
  parseStoredEntry,
  type EntryRepository,
} from "./entryRepository";
import { FirestoreEntryRepository } from "./firestoreEntryRepository";
import { db } from "./firebase";
import type { Entry } from "../types";

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

/** Legacy root collection (pre M-4); stays deny-all in production rules. */
async function loadLegacyFirestoreEntries(): Promise<Entry[]> {
  const snapshot = await getDocs(collection(db, "entries"));
  return snapshot.docs
    .map((document) => parseStoredEntry(document.data()))
    .filter((entry): entry is Entry => entry !== null);
}

/**
 * Pick the workspace repository at startup:
 * 1. Sign in anonymously (uid gates the `users/{uid}/entries` subtree).
 * 2. Probe Firestore (the dev emulator in dev, real backend otherwise).
 * 3. One-shot migration: if the per-user subtree is empty, copy from the
 *    legacy root collection, else from localStorage (phase 1/2 data survives).
 * 4. If Firestore or Auth is unreachable, fall back to localStorage; the next
 *    app load probes again, so the app switches back automatically.
 */
export async function createWorkspaceRepository(): Promise<EntryRepository> {
  const local = createLocalRepository();
  try {
    const uid = await ensureAnonymousAuth();
    await assertEmulatorReachable();
    const remote = new FirestoreEntryRepository(db, uid);
    const remoteEntries = await remote.load();
    if (remoteEntries.length === 0) {
      const legacy = await loadLegacyFirestoreEntries();
      const candidates = legacy.length > 0 ? legacy : await local.load();
      if (candidates.length > 0) {
        await remote.save(candidates);
        console.info(
          `PromptLens: migrated ${candidates.length} entr(ies) to users/${uid}/entries.`,
        );
      }
    }
    return remote;
  } catch (error) {
    console.warn("PromptLens: Firestore unreachable, falling back to localStorage.", error);
    return local;
  }
}
