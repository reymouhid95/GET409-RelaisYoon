import { bindings, defineConfig } from "cf/config";
import * as entrypoint from "./src/index.ts" with { type: "cf-worker" };

export default defineConfig({
	worker: {
		name: "promptlens-gemini",
		compatibilityDate: "2026-09-30",
		entrypoint,
		env: {
			FIREBASE_PROJECT_ID: bindings.text("promptlens-prod"),
			GEMINI_API_KEY: bindings.secret(),
			FRAMES: bindings.r2({ name: "promptlens-frames" }),
		},
	},
});
