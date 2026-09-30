# PromptLens

## What this is

PromptLens is a web app for logging visual references used in AI video productions.
Each entry is a **shot**: how the frame is composed, lit, prompted and tagged, so a
production can be reproduced and compared later. Three ways to add an entry: pick one
of 20 built-in shot presets, describe a shot in text, or upload a frame. Phase 2 calls
Gemini through Firebase Cloud Functions to enrich entries.

## Stack & versions

- Vite + React + TypeScript, `strict: true`, no `any`
- Firebase: Hosting, Cloud Functions (Node 20); Firestore arrives in Phase 3
- Node 20+, npm; Vitest for tests
- Gemini is called server-side only (Cloud Functions), never from the browser

## Commands

| Task | Command |
|---|---|
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Type check | `npm run typecheck` |
| Tests | `npm test` |
| Firebase emulators | `npm run emulators` |
| Deploy (Hosting + Functions) | `npm run deploy` |

## Folder structure (target)

```
src/
  components/      # React components (PascalCase.tsx)
  features/        # shots/ presets/ upload/ — one folder per use case
  lib/             # typed helpers; no business logic inside components
  types/           # shared types: Shot, Preset, GenerationPrompt
  App.tsx          # routes and layout only
functions/         # Cloud Functions (Phase 2: Gemini calls)
public/presets/    # thumbnails for the 20 shot presets
docs/decisions.md  # decision log, updated by the Workflow below
```

## Conventions

- TypeScript strict everywhere; narrow types at API boundaries, never cast to escape errors
- Naming: `camelCase` variables/functions, `PascalCase` components and types,
  kebab-case files except components (`ShotCard.tsx`)
- Code, comments, commits and docs in **English**; UI copy in **French**
- Components stay presentational; data access lives in `src/lib/`
- Keep files small: split when a file passes ~200 lines

## Domain terms

| Term | Meaning in PromptLens |
|---|---|
| Shot size | How much of the subject fills the frame (gros plan → plan large) |
| Focal length | Lens reach in mm; drives perspective and background compression |
| Camera angle | Eye level, low, high, dutch — where the camera sits relative to the subject |
| Lighting setup | Key/fill/rim arrangement and quality (hard, soft, natural) |
| Palette | Dominant colours of the reference frame |
| Generation prompt | The text sent to Gemini that should recreate the shot |

## Workflow

1. **Plan** — state the approach before editing files
2. **Implement** — smallest change that satisfies the plan
3. **Test** — `npm run typecheck` and `npm test`; fix before moving on
4. **Document** — record the decision and its rationale in `docs/decisions.md`

## Never

- Never commit `.env*`, `functions/.secret.local`, or any key/service account file
- Never call Gemini (or any LLM) from the browser; Cloud Functions only
- Never modify Firebase security rules or indexes without asking first
- Never add a dependency that is not needed by the current step
