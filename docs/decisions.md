# PromptLens — decision log

## 2026-10-04 — Initial build

**What** — Phase 1 of PromptLens: a searchable library of 20 built-in shot
presets plus a journal per production (counter, delete, duplicate), persisted
in `localStorage` behind a small `EntryRepository` interface.

**Why**
- The journal is the core loop (pick a production → log shots → reload and
  still find them), so persistence ships first even before any Gemini call.
- Presets are static data: 20 curated entries in `src/features/presets/` are
  easier to review and test than a remote catalogue, and the search index is
  just an array filter.

**Trade-offs / deferred**
- `LocalStorageEntryRepository` reads and writes the whole list as one JSON
  document. Fine for hundreds of entries; a Firestore implementation (Phase 3)
  will replace it behind the same `EntryRepository` interface — components
  never touch `window.localStorage` directly.
- Corrupt or foreign data under the storage key is filtered out at the API
  boundary (`isEntry` guard) instead of crashing the app.
- No router, no auth, no UI library (per AGENTS.md): tab switching lives in
  `App.tsx` state.
- `public/presets/` thumbnails deferred: no artwork exists yet; cards render
  text metadata only.
- `AGENTS.md` conventions unchanged by this phase; no doc updates needed.

**Verified** — `npm run typecheck`, `npm test`, `npm run build` green;
browser check: add 3 entries, reload → entries survive.

## 2026-10-04 — AI backend

**What** — Two callable Cloud Functions (2nd gen, TypeScript) wrapping Gemini:
`describeShotFromText` and `describeShotFromImage`, returning one shared shot
schema (shotSize, cameraAngle, focalLengthMm, lighting, palette, mood,
generationPrompt in English, confidence).

**Why**
- Gemini is called server-side only: the key lives in `defineSecret`
  (`GEMINI_API_KEY`), never in the client, never in a `VITE_` variable.
- `gemini-flash-latest` (official alias) instead of a pinned model id: model
  names rotate, the alias tracks the current Flash — the exact drift the course
  warns about (Context7 docs check; MCP configured in `opencode.json`, active
  after the next opencode restart).
- zod validates both the inputs (text ≤ 2000 chars, image ≤ 4 MB decoded,
  mime allow-list) and the model's JSON output, so a malformed completion
  becomes an `internal` HttpsError instead of corrupt data.

**Trade-offs / deferred**
- Emulator project is `demo-promptlens` (`.firebaserc`): runs without
  `firebase login`; replace with the real project id before deploying.
- `firebase-tools` is not a dependency — commands go through `npx
  firebase-tools` (no global install rights on this machine).
- `functions/.secret.local` is created empty and git-ignored; the key is
  pasted by the operator, never by the agent (read/edit deny rules).
- Confidence is model self-assessment, not calibrated — treat as a hint.

## 2026-10-04 — AI backend: switch to Flash Lite

**What** — `MODEL` in `functions/src/gemini.ts` changed from
`gemini-flash-latest` to `gemini-flash-lite-latest`.

**Why** — `gemini-flash-latest` resolved to `gemini-3.8-flash`, whose free tier
allows only 20 generateContent requests per day, per project, per model
(`GenerateRequestsPerDayPerProjectPerModel-FreeTier`); repeated E2E runs
exhausted it (429, retry in ~22 h). Quotas are scoped per model, and Flash Lite
keeps its own, larger budget — also the model family the course cited
originally. The `*-latest` alias keeps tracking renames either way.

**Trade-off** — Lite is slightly less capable than full Flash; acceptable for
structured shot descriptions. To move up later, change the one `MODEL`
constant.

## 2026-10-04 — Firestore migration (bonus)

**What** — Journal entries move from localStorage to Firestore through an
async `EntryRepository` interface with a second implementation,
`FirestoreEntryRepository`. Startup picks the repository in
`createRepository.ts` and performs a one-shot migration of existing
localStorage entries when Firestore is empty.

**Why** — Phase 3 needs server-side persistence and cross-device access;
the async interface means components never care which backend is active.

**Security rules** (user-reviewed and approved before any wiring):
- `firestore.rules` (production, pointed at by `firebase.json`):
  `allow read, write: if false` — deny-all until Firebase Auth exists.
- `firestore.dev.rules` (emulator only, pointed at by `firebase.dev.json`):
  open read/write for local development.
- Emulator command loads the dev file via the global `--config` flag:
  `npx -y firebase-tools --config firebase.dev.json emulators:start --only functions,firestore`.
  `firebase deploy` always reads `firebase.json`, so test rules can never
  be deployed.

**Trade-offs / deferred**
- If Firestore is unreachable at startup the app falls back to
  localStorage (console warning) and re-probes on the next load — no
  in-session failover loop.
- Save failures after startup are logged, not retried; in-memory state
  survives until reload.
- Full-collection read on every save (journal scale); batching chunks at
  400 ops per write batch.
- Firebase Auth still pending: production rules stay deny-all.

**Emulator probe** — observed during E2E: the Firestore SDK resolves
`getDocs` with an empty list instead of throwing while the dev emulator is
down, so repository selection probes the emulator port itself (`fetch`,
no-cors) before trusting Firestore; only a refused connection triggers the
localStorage fallback.
