import { GoogleGenAI } from "@google/genai";
import {
  shotDescriptionSchema,
  type ImageInput,
  type ShotDescription,
  type TextInput,
} from "./schema";

/**
 * `gemini-flash-latest` is Google's stable alias for the newest Flash model,
 * so the name keeps tracking renames without code changes.
 */
const MODEL = "gemini-flash-latest";

const SYSTEM_PROMPT = [
  "You are a cinematography reference analyst for AI video productions.",
  "From the user's shot description or reference image, produce a JSON object with:",
  "shotSize (e.g. gros plan, plan large), cameraAngle, focalLengthMm (a plausible",
  "lens in millimetres), lighting (setup and quality), palette (3 to 6 dominant",
  "hex colors as #RRGGBB), mood, generationPrompt (a self-contained English",
  "prompt that recreates the shot), confidence (0 to 1).",
  "Answer with JSON only, matching the requested schema exactly.",
].join(" ");

const RESPONSE_JSON_SCHEMA = {
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

/** Thrown for upstream problems; the caller maps it to an HttpsError. */
export class GeminiFailure extends Error {
  constructor(
    message: string,
    readonly kind: "empty" | "malformed",
  ) {
    super(message);
    this.name = "GeminiFailure";
  }
}

export async function describeShot(
  apiKey: string,
  input: TextInput | ImageInput,
): Promise<ShotDescription> {
  const ai = new GoogleGenAI({ apiKey });

  const contents =
    "text" in input
      ? [{ text: `Analyze this shot description: ${input.text}` }]
      : [
          { text: "Analyze the shot shown in this reference image." },
          { inlineData: { mimeType: input.mimeType, data: input.imageBase64 } },
        ];

  const response = await ai.models.generateContent({
    model: MODEL,
    contents,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseJsonSchema: RESPONSE_JSON_SCHEMA,
      temperature: 0.3,
    },
  });

  const raw = response.text;
  if (!raw || raw.trim() === "") {
    throw new GeminiFailure("Model returned no text", "empty");
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    throw new GeminiFailure("Model returned non-JSON output", "malformed");
  }

  const parsed = shotDescriptionSchema.safeParse(json);
  if (!parsed.success) {
    throw new GeminiFailure("Model output failed schema validation", "malformed");
  }
  return parsed.data;
}
