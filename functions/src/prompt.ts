/**
 * Prompt and response contract shared by the callable functions (dev,
 * emulator) and the Cloudflare Worker (prod). Keeping them in one file
 * means both paths ask Gemini the same thing.
 */

/**
 * `gemini-flash-lite-latest` is Google's stable alias for the current Flash
 * Lite model: the name tracks renames, and Lite keeps a separate (larger)
 * free-tier daily budget than full Flash (20 req/day/model on Flash).
 */
export const MODEL = "gemini-flash-lite-latest";

export const SYSTEM_PROMPT = [
  "You are a cinematography reference analyst for AI video productions.",
  "From the user's shot description or reference image, produce a JSON object with:",
  "shotSize (e.g. gros plan, plan large), cameraAngle, focalLengthMm (a plausible",
  "lens in millimetres), lighting (setup and quality), palette (3 to 6 dominant",
  "hex colors as #RRGGBB), mood, generationPrompt (a self-contained English",
  "prompt that recreates the shot), confidence (0 to 1).",
  "Answer with JSON only, matching the requested schema exactly.",
].join(" ");

export const RESPONSE_JSON_SCHEMA = {
  type: "object",
  properties: {
    shotSize: { type: "string" },
    cameraAngle: { type: "string" },
    focalLengthMm: { type: "number" },
    lighting: { type: "string" },
    palette: { type: "array", items: { type: "string" } },
    mood: { type: "string" },
    generationPrompt: { type: "string" },
    confidence: { type: "number" },
  },
  required: [
    "shotSize",
    "cameraAngle",
    "focalLengthMm",
    "lighting",
    "palette",
    "mood",
    "generationPrompt",
    "confidence",
  ],
  additionalProperties: false,
} as const;
