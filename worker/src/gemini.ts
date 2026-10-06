import {
  MODEL,
  RESPONSE_JSON_SCHEMA,
  SYSTEM_PROMPT,
} from "../../functions/src/prompt";
import {
  shotDescriptionSchema,
  type ImageInput,
  type ShotDescription,
  type TextInput,
} from "../../functions/src/schema";

const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

/** Thrown for upstream problems; the caller maps it to an HTTP status. */
export class GeminiFailure extends Error {
  constructor(
    message: string,
    readonly kind: "empty" | "malformed",
    readonly status?: number,
  ) {
    super(message);
    this.name = "GeminiFailure";
  }
}

export async function describeShot(
  apiKey: string,
  input: TextInput | ImageInput,
): Promise<ShotDescription> {
  const parts =
    "text" in input
      ? [{ text: `Analyze this shot description: ${input.text}` }]
      : [
          { text: "Analyze the shot shown in this reference image." },
          {
            inlineData: {
              mimeType: input.mimeType,
              data: input.imageBase64,
            },
          },
        ];

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: "user", parts }],
      generationConfig: {
        responseMimeType: "application/json",
        responseJsonSchema: RESPONSE_JSON_SCHEMA,
        temperature: 0.3,
      },
    }),
  });

  if (!res.ok) {
    const body = (await res.text()).slice(0, 200);
    console.error(`Gemini HTTP ${res.status}:`, body);
    throw new GeminiFailure(`Gemini returned ${res.status}`, "empty", res.status);
  }

  const data = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const raw = data.candidates
    ?.flatMap((c) => c.content?.parts ?? [])
    .map((p) => p.text ?? "")
    .join("");

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
    throw new GeminiFailure(
      "Model output failed schema validation",
      "malformed",
    );
  }
  return parsed.data;
}
