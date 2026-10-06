import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";

/**
 * Callable rules require a signed-in user (H-1) and entries live under
 * `users/{uid}` (M-4). Anonymous sign-in is invisible to the user and
 * gives the request a verified ID token. Idempotent: only signs in when
 * no user is present yet. Returns the uid for per-user paths.
 */
export async function ensureAnonymousAuth(): Promise<string> {
  if (!auth.currentUser) {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      const code = (error as { code?: unknown }).code;
      if (code !== "auth/already-signed-in") {
        throw new Error(
          "Connexion impossible : lancez l'émulateur Auth (voir AGENTS.md).",
        );
      }
    }
  }
  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error(
      "Connexion impossible : lancez l'émulateur Auth (voir AGENTS.md).",
    );
  }
  return uid;
}
