import { HttpsError } from "firebase-functions/v2/https";

interface AuthCarrier {
  auth?: { uid: string } | null;
}

/**
 * Reject unauthenticated callable requests before any work happens.
 * Callers must be signed in (Firebase Auth); the ID token arrives in
 * `request.auth` and is verified by the Functions platform itself.
 */
export function requireAuth(request: AuthCarrier): void {
  if (!request.auth?.uid) {
    throw new HttpsError(
      "unauthenticated",
      "Sign-in required to use the analysis service.",
    );
  }
}
