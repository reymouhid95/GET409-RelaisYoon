import { GoogleGenAI } from "@google/genai";
import { MODEL, RESPONSE_JSON_SCHEMA, SYSTEM_PROMPT } from "./prompt";
import {
  shotDescriptionSchema,
  type ImageInput,
  type ShotDescription,
  type TextInput,
} from "./schema";

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
