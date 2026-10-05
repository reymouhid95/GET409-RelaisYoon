import type { Entry, EntrySource, ShotDescription } from "../types";

/** Subset of the Web Storage API — injectable so tests never need a browser. */
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/**
 * Async on purpose: the localStorage and Firestore implementations share one
 * interface, so components never care where entries are stored (Phase 3).
 */
export interface EntryRepository {
  load(): Promise<Entry[]>;
  save(entries: Entry[]): Promise<void>;
}

const STORAGE_KEY = "promptlens.entries.v1";

const SOURCES: readonly EntrySource[] = ["preset", "text", "image"];

type PersistedEntry = Omit<Entry, "source"> & { source?: EntrySource };

function isPersistedEntry(value: unknown): value is PersistedEntry {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.id === "string" &&
    typeof record.production === "string" &&
    typeof record.createdAt === "number" &&
    (record.presetId === undefined || typeof record.presetId === "string") &&
    (record.description === undefined ||
      (typeof record.description === "object" && record.description !== null)) &&
    (record.source === undefined ||
      (typeof record.source === "string" && SOURCES.includes(record.source as EntrySource)))
  );
}

/** Legacy phase-1 entries have no source; they were all created from presets. */
function normalize(entry: PersistedEntry): Entry {
  const source: EntrySource = entry.source ?? (entry.presetId ? "preset" : "text");
  return { ...entry, source };
}

/** Validate one stored document (Firestore or JSON) at the API boundary. */
export function parseStoredEntry(value: unknown): Entry | null {
  return isPersistedEntry(value) ? normalize(value) : null;
}

export class LocalStorageEntryRepository implements EntryRepository {
  private readonly storage: StorageLike;

  constructor(storage: StorageLike) {
    this.storage = storage;
  }

  async load(): Promise<Entry[]> {
    try {
      const raw = this.storage.getItem(STORAGE_KEY);
      if (raw === null) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map(parseStoredEntry)
        .filter((entry): entry is Entry => entry !== null);
    } catch {
      return [];
    }
  }

  async save(entries: Entry[]): Promise<void> {
    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // Quota or private mode: the app keeps working in memory.
    }
  }
}

export function createLocalRepository(): EntryRepository {
  if (typeof window === "undefined") {
    throw new Error("No browser storage available");
  }
  return new LocalStorageEntryRepository(window.localStorage);
}

export function createEntry(production: string, presetId: string): Entry {
  return {
    id: crypto.randomUUID(),
    production,
    createdAt: Date.now(),
    source: "preset",
    presetId,
  };
}

export function createAiEntry(
  production: string,
  source: "text" | "image",
  description: ShotDescription,
): Entry {
  return {
    id: crypto.randomUUID(),
    production,
    createdAt: Date.now(),
    source,
    description,
  };
}
