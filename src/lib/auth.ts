import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";

/**
 * Callable rules require a signed-in user (H-1). Anonymous sign-in is
 * invisible to the user and gives the request a verified ID token.
 * Idempotent: only signs in when no user is present yet.
 */
export async function ensureAnonymousAuth(): Promise<void> {
  if (auth.currentUser) return;
  try {
    await signInAnonymously(auth);
  } catch (error) {
    const code = (error as { code?: unknown }).code;
    if (code === "auth/already-signed-in") return;
    throw new Error(
      "Connexion impossible : lancez l'émulateur Auth (voir AGENTS.md).",
    );
  }
}
