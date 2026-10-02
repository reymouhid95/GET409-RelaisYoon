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

export interface Entry {
  id: string;
  production: string;
  presetId: string;
  createdAt: number;
}

/** Phase 1: a logged shot is a journal entry; text/frame paths arrive later. */
export type Shot = Entry;
