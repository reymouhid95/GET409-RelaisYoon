import { describe, expect, it } from "vitest";
import {
  LocalStorageEntryRepository,
  createAiEntry,
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

describe("phase 2 compatibility", () => {
  it("normalizes legacy entries without a source to 'preset'", () => {
    const storage = new MemoryStorage();
    storage.setItem(
      KEY,
      JSON.stringify([
        { id: "old", production: "P", presetId: "plan-large", createdAt: 1 },
      ]),
    );
    const loaded = new LocalStorageEntryRepository(storage).load();
    expect(loaded).toHaveLength(1);
    expect(loaded[0]?.source).toBe("preset");
  });

  it("round-trips AI entries with their description", () => {
    const repo = new LocalStorageEntryRepository(new MemoryStorage());
    const description = {
      shotSize: "Gros plan",
      cameraAngle: "Face",
      focalLengthMm: 85,
      lighting: "Douce",
      palette: ["#101010", "#ff6b4a"],
      mood: "Intime",
      generationPrompt: "Close-up with soft window light",
      confidence: 0.9,
    };
    const entry = createAiEntry("P", "image", description);
    repo.save([entry]);
    expect(repo.load()).toEqual([entry]);
    expect(entry.source).toBe("image");
    expect(entry.presetId).toBeUndefined();
  });

  it("drops entries carrying an unknown source value", () => {
    const storage = new MemoryStorage();
    storage.setItem(
      KEY,
      JSON.stringify([
        { id: "x", production: "P", createdAt: 1, source: "banana" },
        { id: "y", production: "P", createdAt: 2, source: "text" },
      ]),
    );
    const loaded = new LocalStorageEntryRepository(storage).load();
    expect(loaded.map((entry) => entry.id)).toEqual(["y"]);
  });
});
