import { env } from "cloudflare:workers";
import {
  MAX_IMAGE_BYTES,
  decodedImageBytes,
  imageInputSchema,
  textInputSchema,
  type ImageInput,
  type TextInput,
} from "../../functions/src/schema";
import { verifyFirebaseIdToken } from "./auth";
import { describeShot, GeminiFailure } from "./gemini";

/**
 * Remote secrets are not part of the generated `Env` type (only declared
 * bindings are), so the GEMINI_API_KEY secret is added here.
 */
type WorkerEnv = Env & { GEMINI_API_KEY: string };

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

async function requireAuth(request: Request): Promise<Response | null> {
  const header = request.headers.get("Authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return json({ error: "Sign-in required." }, 401);
  const uid = await verifyFirebaseIdToken(
    token,
    (env as WorkerEnv).FIREBASE_PROJECT_ID,
  );
  if (!uid) return json({ error: "Sign-in required." }, 401);
  return null;
}

function upstreamError(error: GeminiFailure): Response {
  if (error.status === 429) {
    return json(
      {
        error:
          "Quota Gemini dépassé pour le moment, réessayez dans quelques minutes.",
      },
      429,
    );
  }
  if (error.status === 503) {
    return json(
      { error: "Le service IA est en surcharge, réessayez dans un instant." },
      503,
    );
  }
  console.error("Gemini call failed:", error.message);
  return json(
    { error: "Le service d'analyse est momentanément indisponible." },
    500,
  );
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const { pathname } = new URL(request.url);
    const isText = pathname === "/describe-text";
    const isImage = pathname === "/describe-image";
    if (request.method !== "POST" || (!isText && !isImage)) {
      return json({ error: "Not found." }, 404);
    }

    const authError = await requireAuth(request);
    if (authError) return authError;

    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return json({ error: "Body JSON invalide." }, 400);
    }

    let input: TextInput | ImageInput;
    if (isText) {
      const parsed = textInputSchema.safeParse(payload);
      if (!parsed.success) {
        return json(
          { error: "Texte invalide : 1 à 2000 caractères attendus." },
          400,
        );
      }
      input = parsed.data;
    } else {
      const parsed = imageInputSchema.safeParse(payload);
      if (!parsed.success) {
        return json(
          {
            error:
              "Image invalide : formats PNG, JPEG, WebP, HEIC ou HEIF attendus.",
          },
          400,
        );
      }
      if (decodedImageBytes(parsed.data.imageBase64) > MAX_IMAGE_BYTES) {
        return json(
          { error: "Image trop volumineuse : 4 Mo maximum." },
          400,
        );
      }
      input = parsed.data;
    }

    try {
      const result = await describeShot(
        (env as WorkerEnv).GEMINI_API_KEY,
        input,
      );
      return json(result);
    } catch (error) {
      if (error instanceof GeminiFailure) return upstreamError(error);
      console.error("Unexpected error:", error);
      return json(
        { error: "Le service d'analyse est momentanément indisponible." },
        500,
      );
    }
  },
} satisfies ExportedHandler;
