import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  writeBatch,
  type Firestore,
} from "firebase/firestore";
import { parseStoredEntry, type EntryRepository } from "./entryRepository";
import type { Entry } from "../types";

/** Firestore batches cap at 500 operations; stay safely below it. */
const BATCH_LIMIT = 400;

/**
 * Per-user subtree (audit M-4): every read/write goes through
 * `users/{uid}/entries` so security rules can isolate owners by uid.
 */
export class FirestoreEntryRepository implements EntryRepository {
  private readonly db: Firestore;
  private readonly uid: string;

  constructor(db: Firestore, uid: string) {
    this.db = db;
    this.uid = uid;
  }

  private entriesCollection() {
    return collection(this.db, "users", this.uid, "entries");
  }

  async load(): Promise<Entry[]> {
    const snapshot = await getDocs(
      query(this.entriesCollection(), orderBy("createdAt", "desc")),
    );
    const entries: Entry[] = [];
    for (const document of snapshot.docs) {
      const entry = parseStoredEntry(document.data());
      if (entry) entries.push(entry);
    }
    return entries;
  }

  async save(entries: Entry[]): Promise<void> {
    const snapshot = await getDocs(this.entriesCollection());
    const wanted = new Set(entries.map((entry) => entry.id));
    const deletions = snapshot.docs.filter((document) => !wanted.has(document.id));

    if (deletions.length > 0) {
      for (let start = 0; start < deletions.length; start += BATCH_LIMIT) {
        const batch = writeBatch(this.db);
        for (const document of deletions.slice(start, start + BATCH_LIMIT)) {
          batch.delete(document.ref);
        }
        await batch.commit();
      }
    }

    for (let start = 0; start < entries.length; start += BATCH_LIMIT) {
      const batch = writeBatch(this.db);
      for (const entry of entries.slice(start, start + BATCH_LIMIT)) {
        batch.set(
          doc(this.db, "users", this.uid, "entries", entry.id),
          entry,
        );
      }
      await batch.commit();
    }
  }
}
