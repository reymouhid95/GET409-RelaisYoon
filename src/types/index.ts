/** The text sent to Gemini (or another model) that should recreate a shot. */
export type GenerationPrompt = string;

export interface Preset {
  id: string;
  name: string;
  shotSize: string;
  cameraAngle: string;
  focalLength: string;
  lighting: string;
  mood: string;
  generationPrompt: GenerationPrompt;
}

/** JSON schema returned by both callable functions (mirror of functions/src/schema.ts). */
export interface ShotDescription {
  shotSize: string;
  cameraAngle: string;
  focalLengthMm: number;
  lighting: string;
  palette: string[];
  mood: string;
  generationPrompt: GenerationPrompt;
  confidence: number;
}

export type EntrySource = "preset" | "text" | "image";

export interface Entry {
  id: string;
  production: string;
  createdAt: number;
  source: EntrySource;
  presetId?: string;
  description?: ShotDescription;
}

/** Phase 1: a logged shot is a journal entry; text/frame paths arrive later. */
export type Shot = Entry;
