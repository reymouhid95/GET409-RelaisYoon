import type { Preset } from "../../types";

/** Lowercase + strip diacritics so « lumière » matches "lumiere". */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

/** Search presets across every visible field. Empty query returns everything. */
export function filterPresets(presets: Preset[], query: string): Preset[] {
  const q = normalize(query.trim());
  if (q === "") return presets;
  return presets.filter((preset) =>
    [
      preset.name,
      preset.shotSize,
      preset.cameraAngle,
      preset.focalLength,
      preset.lighting,
      preset.mood,
      preset.generationPrompt,
    ].some((field) => normalize(field).includes(q)),
  );
}
