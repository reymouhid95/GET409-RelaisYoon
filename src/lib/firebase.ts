import { initializeApp } from "firebase/app";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

/**
 * Demo-only Firebase config: the Functions emulator never validates it.
 * Real credentials belong to Phase 3 hosting config — never in the bundle.
 */
const app = initializeApp({
  apiKey: "demo-api-key",
  appId: "1:000000000000:web:demo",
  projectId: "demo-promptlens",
});

export const functions = getFunctions(app, "us-central1");

if (import.meta.env.DEV) {
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}
