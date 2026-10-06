import { httpsCallable } from "firebase/functions";
import { ensureAnonymousAuth } from "./auth";
import { functions } from "./firebase";
import type { ShotDescription } from "../types";

const describeText = httpsCallable<{ text: string }, ShotDescription>(
  functions,
  "describeShotFromText",
);

const describeImage = httpsCallable<
  { imageBase64: string; mimeType: string },
  ShotDescription
>(functions, "describeShotFromImage");

const EMULATOR_HINT =
  "Impossible de joindre l'émulateur. Lancez : npx -y firebase-tools emulators:start --only functions";

/** Narrow the callable result at the API boundary before trusting it. */
function looksLikeDescription(value: unknown): value is ShotDescription {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.shotSize === "string" &&
    typeof v.cameraAngle === "string" &&
    typeof v.focalLengthMm === "number" &&
    typeof v.lighting === "string" &&
    Array.isArray(v.palette) &&
    typeof v.mood === "string" &&
    typeof v.generationPrompt === "string" &&
    typeof v.confidence === "number"
  );
}

function toUserError(error: unknown): Error {
  const code = (error as { code?: unknown }).code;
  const message = error instanceof Error ? error.message : "";
  if (typeof code === "string") {
    if (/emulator|fetch|connect/i.test(message)) return new Error(EMULATOR_HINT);
    if (message) return new Error(message);
  }
  return new Error(EMULATOR_HINT);
}

async function unwrap(call: Promise<{ data: unknown }>): Promise<ShotDescription> {
  let data: unknown;
  try {
    ({ data } = await call);
  } catch (error) {
    throw toUserError(error);
  }
  if (!looksLikeDescription(data)) {
    throw new Error("Réponse inattendue du service d'analyse.");
  }
  return data;
}

export async function analyzeText(text: string): Promise<ShotDescription> {
  await ensureAnonymousAuth();
  return unwrap(describeText({ text }));
}

export async function analyzeImage(
  imageBase64: string,
  mimeType: string,
): Promise<ShotDescription> {
  await ensureAnonymousAuth();
  return unwrap(describeImage({ imageBase64, mimeType }));
}
