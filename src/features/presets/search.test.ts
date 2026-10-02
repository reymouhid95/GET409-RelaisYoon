import { describe, expect, it } from "vitest";
import { PRESETS } from "./presets";
import { filterPresets } from "./search";

describe("PRESETS catalogue", () => {
  it("ships exactly 20 presets with unique ids", () => {
    expect(PRESETS).toHaveLength(20);
    expect(new Set(PRESETS.map((preset) => preset.id)).size).toBe(20);
  });
});

describe("filterPresets", () => {
  it("returns everything for an empty query", () => {
    expect(filterPresets(PRESETS, "   ")).toHaveLength(20);
  });

  it("matches on name, case-insensitively", () => {
    const result = filterPresets(PRESETS, "DRONE");
    expect(result.map((preset) => preset.id)).toContain("plan-aerien");
  });

  it("matches ignoring diacritics", () => {
    const result = filterPresets(PRESETS, "lumiere");
    expect(result.length).toBeGreaterThan(0);
  });

  it("matches technical fields such as focal length", () => {
    const result = filterPresets(PRESETS, "85 mm");
    expect(result.map((preset) => preset.id)).toEqual(
      expect.arrayContaining(["gros-plan-visage", "rack-focus"]),
    );
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterPresets(PRESETS, "zzz-no-match")).toEqual([]);
  });
});
