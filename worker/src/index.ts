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
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

/** Stored keys look like `uid/uuid.ext`; anything else never reaches R2. */
const FRAME_KEY_PATTERN =
  /^[A-Za-z0-9_-]+\/[A-Za-z0-9-]+\.(png|jpg|webp|heic|heif)$/;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

/** Returns the verified uid, or the error Response to send back. */
async function requireAuth(request: Request): Promise<string | Response> {
  const header = request.headers.get("Authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return json({ error: "Sign-in required." }, 401);
  const uid = await verifyFirebaseIdToken(
    token,
    (env as WorkerEnv).FIREBASE_PROJECT_ID,
  );
  if (!uid) return json({ error: "Sign-in required." }, 401);
  return uid;
}

function invalidImageResponse(): Response {
  return json(
    { error: "Image invalide : formats PNG, JPEG, WebP, HEIC ou HEIF attendus." },
    400,
  );
}

function decodeFrame(base64: string): Uint8Array {
  const clean = base64.replace(/[\r\n]/g, "");
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/**
 * POST /frames stores an authenticated user's frame in R2 and returns its
 * key; GET /frames/<key> streams it back. The key embeds the uid and a
 * random uuid, so a GET is only possible with the exact key handed out at
 * upload time (image tags cannot carry an Authorization header).
 */
async function handleFramesRoute(
  request: Request,
  pathname: string,
): Promise<Response> {
  if (pathname === "/frames" && request.method === "POST") {
    const auth = await requireAuth(request);
    if (auth instanceof Response) return auth;

    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return json({ error: "Body JSON invalide." }, 400);
    }
    const parsed = imageInputSchema.safeParse(payload);
    if (!parsed.success) return invalidImageResponse();
    if (decodedImageBytes(parsed.data.imageBase64) > MAX_IMAGE_BYTES) {
      return json({ error: "Image trop volumineuse : 4 Mo maximum." }, 400);
    }

    const extension =
      parsed.data.mimeType === "image/jpeg"
        ? "jpg"
        : parsed.data.mimeType.slice("image/".length);
    const key = `${auth}/${crypto.randomUUID()}.${extension}`;
    await env.FRAMES.put(key, decodeFrame(parsed.data.imageBase64), {
      httpMetadata: { contentType: parsed.data.mimeType },
    });
    return json({ frameId: key }, 201);
  }

  if (pathname.startsWith("/frames/") && request.method === "GET") {
    const key = decodeURIComponent(pathname.slice("/frames/".length));
    if (!FRAME_KEY_PATTERN.test(key)) return json({ error: "Not found." }, 404);
    const object = await env.FRAMES.get(key);
    if (!object) return json({ error: "Not found." }, 404);
    return new Response(object.body, {
      headers: {
        "Content-Type": object.httpMetadata?.contentType ?? "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
        ...CORS_HEADERS,
      },
    });
  }

  return json({ error: "Not found." }, 404);
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
    if (pathname === "/frames" || pathname.startsWith("/frames/")) {
      return handleFramesRoute(request, pathname);
    }

    const isText = pathname === "/describe-text";
    const isImage = pathname === "/describe-image";
    if (request.method !== "POST" || (!isText && !isImage)) {
      return json({ error: "Not found." }, 404);
    }

    const auth = await requireAuth(request);
    if (auth instanceof Response) return auth;

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
      if (!parsed.success) return invalidImageResponse();
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
