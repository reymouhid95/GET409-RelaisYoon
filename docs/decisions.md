# PromptLens — decision log

## 2026-10-02 — Initial build

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
