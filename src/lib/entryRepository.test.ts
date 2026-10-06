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
  it("returns an empty list on a fresh storage", async () => {
    const repo = new LocalStorageEntryRepository(new MemoryStorage());
    await expect(repo.load()).resolves.toEqual([]);
  });

  it("round-trips entries through save/load", async () => {
    const storage = new MemoryStorage();
    const repo = new LocalStorageEntryRepository(storage);
    const entry = createEntry("Court métrage", "gros-plan-visage");
    await repo.save([entry]);
    await expect(repo.load()).resolves.toEqual([entry]);
  });

  it("returns an empty list when the stored value is corrupt", async () => {
    const storage = new MemoryStorage();
    storage.setItem(KEY, "{not json");
    await expect(new LocalStorageEntryRepository(storage).load()).resolves.toEqual([]);
  });

  it("drops entries that do not match the Entry shape", async () => {
    const storage = new MemoryStorage();
    storage.setItem(KEY, JSON.stringify([42, { id: "x" }, createEntry("P", "plan-large")]));
    const loaded = await new LocalStorageEntryRepository(storage).load();
    expect(loaded).toHaveLength(1);
    expect(loaded[0]?.presetId).toBe("plan-large");
  });

  it("swallows storage write errors (quota / private mode)", async () => {
    const throwing: StorageLike = {
      getItem: () => null,
      setItem: () => {
        throw new Error("QuotaExceededError");
      },
    };
    await expect(new LocalStorageEntryRepository(throwing).save([])).resolves.toBeUndefined();
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
  it("normalizes legacy entries without a source to 'preset'", async () => {
    const storage = new MemoryStorage();
    storage.setItem(
      KEY,
      JSON.stringify([
        { id: "old", production: "P", presetId: "plan-large", createdAt: 1 },
      ]),
    );
    const loaded = await new LocalStorageEntryRepository(storage).load();
    expect(loaded).toHaveLength(1);
    expect(loaded[0]?.source).toBe("preset");
  });

  it("round-trips AI entries with their description", async () => {
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
    await repo.save([entry]);
    await expect(repo.load()).resolves.toEqual([entry]);
    expect(entry.source).toBe("image");
    expect(entry.presetId).toBeUndefined();
  });

  it("drops entries carrying an unknown source value", async () => {
    const storage = new MemoryStorage();
    storage.setItem(
      KEY,
      JSON.stringify([
        { id: "x", production: "P", createdAt: 1, source: "banana" },
        { id: "y", production: "P", createdAt: 2, source: "text" },
      ]),
    );
    const loaded = await new LocalStorageEntryRepository(storage).load();
    expect(loaded.map((entry) => entry.id)).toEqual(["y"]);
  });

  it("round-trips an image entry with its stored frameId", async () => {
    const repo = new LocalStorageEntryRepository(new MemoryStorage());
    const entry = createAiEntry(
      "P",
      "image",
      {
        shotSize: "Plan large",
        cameraAngle: "Contre-plongée",
        focalLengthMm: 24,
        lighting: "Naturelle",
        palette: ["#224466"],
        mood: "Calme",
        generationPrompt: "Wide shot of a quiet street at dawn",
        confidence: 0.9,
      },
      "uid-1/abc-123.jpg",
    );
    await repo.save([entry]);
    const [loaded] = await repo.load();
    expect(loaded.frameId).toBe("uid-1/abc-123.jpg");
  });

  it("drops entries whose frameId is not a string", async () => {
    const storage = new MemoryStorage();
    storage.setItem(
      KEY,
      JSON.stringify([
        { id: "x", production: "P", createdAt: 1, source: "image", frameId: 42 },
        { id: "y", production: "P", createdAt: 2, source: "image", frameId: "uid/ok.jpg" },
      ]),
    );
    const loaded = await new LocalStorageEntryRepository(storage).load();
    expect(loaded.map((entry) => entry.id)).toEqual(["y"]);
  });
});
