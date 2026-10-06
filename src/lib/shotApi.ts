import { httpsCallable } from "firebase/functions";
import { ensureAnonymousAuth } from "./auth";
import { auth, functions } from "./firebase";
import type { ShotDescription } from "../types";

/**
 * In production the analysis lives in a Cloudflare Worker (Gemini called
 * server-side, ID token required); in dev the callable hits the emulator.
 */
const WORKER_URL = import.meta.env.VITE_GEMINI_WORKER_URL as
  | string
  | undefined;

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

async function unwrap(
  call: Promise<{ data: unknown }>,
): Promise<ShotDescription> {
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

async function workerCall(
  path: string,
  body: unknown,
): Promise<ShotDescription> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error(
      "Connexion impossible : lancez l'émulateur Auth (voir AGENTS.md).",
    );
  }
  const token = await user.getIdToken();

  let response: Response;
  try {
    response = await fetch(`${WORKER_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Service d'analyse injoignable (réseau).");
  }

  if (!response.ok) {
    let message = "Le service d'analyse est momentanément indisponible.";
    try {
      const parsed = (await response.json()) as { error?: unknown };
      if (typeof parsed.error === "string" && parsed.error) {
        message = parsed.error;
      }
    } catch {
      // keep the default message
    }
    throw new Error(message);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new Error("Réponse inattendue du service d'analyse.");
  }
  if (!looksLikeDescription(data)) {
    throw new Error("Réponse inattendue du service d'analyse.");
  }
  return data;
}

export async function analyzeText(text: string): Promise<ShotDescription> {
  await ensureAnonymousAuth();
  if (WORKER_URL) return workerCall("/describe-text", { text });
  return unwrap(describeText({ text }));
}

export async function analyzeImage(
  imageBase64: string,
  mimeType: string,
): Promise<ShotDescription> {
  await ensureAnonymousAuth();
  if (WORKER_URL) {
    return workerCall("/describe-image", { imageBase64, mimeType });
  }
  return unwrap(describeImage({ imageBase64, mimeType }));
}
