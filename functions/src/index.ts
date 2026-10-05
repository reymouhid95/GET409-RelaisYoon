import { defineSecret } from "firebase-functions/params";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import { describeShot } from "./gemini";
import {
  MAX_IMAGE_BYTES,
  decodedImageBytes,
  imageInputSchema,
  textInputSchema,
} from "./schema";

export const geminiApiKey = defineSecret("GEMINI_API_KEY");

const REGION = "us-central1";

function invalidArgument(message: string): HttpsError {
  return new HttpsError("invalid-argument", message);
}

function toHttpsError(error: unknown): HttpsError {
  if (error instanceof HttpsError) return error;
  const status = (error as { status?: unknown }).status;
  console.error(
    "Gemini call failed:",
    error instanceof Error ? `${error.name}: ${error.message}` : String(error),
  );
  if (status === 429) {
    return new HttpsError(
      "resource-exhausted",
      "Quota Gemini dépassé pour le moment, réessayez dans quelques minutes.",
    );
  }
  if (status === 503) {
    return new HttpsError(
      "unavailable",
      "Le service IA est en surcharge, réessayez dans un instant.",
    );
  }
  return new HttpsError(
    "internal",
    "Le service d'analyse est momentanément indisponible.",
  );
}

export const describeShotFromText = onCall(
  {
    region: REGION,
    secrets: [geminiApiKey],
    timeoutSeconds: 60,
    memory: "256MiB",
  },
  async (request) => {
    const parsed = textInputSchema.safeParse(request.data);
    if (!parsed.success) {
      throw invalidArgument("Texte invalide : 1 à 2000 caractères attendus.");
    }
    try {
      return await describeShot(geminiApiKey.value(), parsed.data);
    } catch (error) {
      throw toHttpsError(error);
    }
  },
);

export const describeShotFromImage = onCall(
  {
    region: REGION,
    secrets: [geminiApiKey],
    timeoutSeconds: 60,
    memory: "256MiB",
  },
  async (request) => {
    const parsed = imageInputSchema.safeParse(request.data);
    if (!parsed.success) {
      throw invalidArgument(
        "Image invalide : formats PNG, JPEG, WebP, HEIC ou HEIF attendus.",
      );
    }
    if (decodedImageBytes(parsed.data.imageBase64) > MAX_IMAGE_BYTES) {
      throw invalidArgument("Image trop volumineuse : 4 Mo maximum.");
    }
    try {
      return await describeShot(geminiApiKey.value(), parsed.data);
    } catch (error) {
      throw toHttpsError(error);
    }
  },
);
