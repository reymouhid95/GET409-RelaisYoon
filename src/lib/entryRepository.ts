import type { Entry } from "../types";

/** Subset of the Web Storage API — injectable so tests never need a browser. */
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface EntryRepository {
  load(): Entry[];
  save(entries: Entry[]): void;
}

const STORAGE_KEY = "promptlens.entries.v1";

function isEntry(value: unknown): value is Entry {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.id === "string" &&
    typeof record.production === "string" &&
    typeof record.presetId === "string" &&
    typeof record.createdAt === "number"
  );
}

/**
 * Phase 1 storage: localStorage behind a small interface so Firestore can
 * replace it in Phase 3 without touching the components.
 */
export class LocalStorageEntryRepository implements EntryRepository {
  private readonly storage: StorageLike;

  constructor(storage: StorageLike) {
    this.storage = storage;
  }

  load(): Entry[] {
    try {
      const raw = this.storage.getItem(STORAGE_KEY);
      if (raw === null) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(isEntry);
    } catch {
      return [];
    }
  }

  save(entries: Entry[]): void {
    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // Quota or private mode: the app keeps working in memory.
    }
  }
}

export function createDefaultRepository(): EntryRepository {
  if (typeof window === "undefined") {
    throw new Error("No browser storage available");
  }
  return new LocalStorageEntryRepository(window.localStorage);
}

export function createEntry(production: string, presetId: string): Entry {
  return {
    id: crypto.randomUUID(),
    production,
    presetId,
    createdAt: Date.now(),
  };
}
