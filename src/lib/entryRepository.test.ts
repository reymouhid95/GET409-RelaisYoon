import { describe, expect, it } from "vitest";
import {
  LocalStorageEntryRepository,
  createEntry,
  type StorageLike,
} from "./entryRepository";

class MemoryStorage implements StorageLike {
  private readonly map = new Map<string, string>();

  getItem(key: string): string | null {
    return this.map.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.map.set(key, value);
  }
}

const KEY = "promptlens.entries.v1";

describe("LocalStorageEntryRepository", () => {
  it("returns an empty list on a fresh storage", () => {
    const repo = new LocalStorageEntryRepository(new MemoryStorage());
    expect(repo.load()).toEqual([]);
  });

  it("round-trips entries through save/load", () => {
    const storage = new MemoryStorage();
    const repo = new LocalStorageEntryRepository(storage);
    const entry = createEntry("Court métrage", "gros-plan-visage");
    repo.save([entry]);
    expect(repo.load()).toEqual([entry]);
  });

  it("returns an empty list when the stored value is corrupt", () => {
    const storage = new MemoryStorage();
    storage.setItem(KEY, "{not json");
    expect(new LocalStorageEntryRepository(storage).load()).toEqual([]);
  });

  it("drops entries that do not match the Entry shape", () => {
    const storage = new MemoryStorage();
    storage.setItem(KEY, JSON.stringify([42, { id: "x" }, createEntry("P", "plan-large")]));
    const loaded = new LocalStorageEntryRepository(storage).load();
    expect(loaded).toHaveLength(1);
    expect(loaded[0]?.presetId).toBe("plan-large");
  });

  it("swallows storage write errors (quota / private mode)", () => {
    const throwing: StorageLike = {
      getItem: () => null,
      setItem: () => {
        throw new Error("QuotaExceededError");
      },
    };
    expect(() => new LocalStorageEntryRepository(throwing).save([])).not.toThrow();
  });
});

describe("createEntry", () => {
  it("generates unique ids and stamps the creation time", () => {
    const a = createEntry("Ma production", "plan-large");
    const b = createEntry("Ma production", "plan-large");
    expect(a.id).not.toBe(b.id);
    expect(a.createdAt).toBeGreaterThan(0);
    expect(a).toMatchObject({ production: "Ma production", presetId: "plan-large" });
  });
});
