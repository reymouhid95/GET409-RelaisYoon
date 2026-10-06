import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import {
  connectFirestoreEmulator,
  getFirestore,
} from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

/**
 * Real config comes from VITE_FIREBASE_* env vars (.env.local, gitignored).
 * Without them the demo config keeps emulators working; the web API key is
 * public by design but must never be committed in source.
 */
const envConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as
    | string
    | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as
    | string
    | undefined,
};

const app = initializeApp(
  envConfig.apiKey && envConfig.projectId
    ? {
        apiKey: envConfig.apiKey,
        authDomain: envConfig.authDomain,
        projectId: envConfig.projectId,
        appId: envConfig.appId,
        storageBucket: envConfig.storageBucket,
        messagingSenderId: envConfig.messagingSenderId,
      }
    : {
        apiKey: "demo-api-key",
        appId: "1:000000000000:web:demo",
        projectId: "demo-promptlens",
      },
);

export const auth = getAuth(app);
export const functions = getFunctions(app, "us-central1");
export const db = getFirestore(app);

if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", {
    disableWarnings: true,
  });
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}
