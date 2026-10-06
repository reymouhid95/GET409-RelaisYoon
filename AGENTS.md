# PromptLens

## What this is

PromptLens is a web app for logging visual references used in AI video productions.
Each entry is a **shot**: how the frame is composed, lit, prompted and tagged, so a
production can be reproduced and compared later. Three ways to add an entry: pick one
of 20 built-in shot presets, describe a shot in text, or upload a frame. Gemini
enriches entries: through Firebase Cloud Functions in dev (emulator), through a
Cloudflare Worker in production.

## Stack & versions

- Vite + React + TypeScript, `strict: true`, no `any`
- Firebase: Hosting, Cloud Functions (Node 20, gen2), Firestore (per-user
  `users/{uid}/**` rules live in production)
- Cloudflare Worker (`worker/`): production Gemini endpoint (`/describe-*`)
  and frame storage (`POST /frames` / `GET /frames/:key` on the private R2
  bucket `promptlens-frames`), requires a Firebase ID token, secret
  `GEMINI_API_KEY` (deployed with `cf deploy --secrets-file`)
- Node 20+, npm; Vitest for tests
- Gemini is called server-side only (callable in dev, Worker in prod), never
  from the browser

## Commands

| Task | Command |
|---|---|
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Type check | `npm run typecheck` |
| Tests | `npm test` |
| Firebase emulators | `npx -y firebase-tools --config firebase.dev.json emulators:start --only functions,firestore,auth` |
| Deploy (Hosting + Functions) | `npm run deploy` |
| Worker dev server | `cd worker && cf dev` |
| Worker typecheck | `cd worker && npm run typecheck` |
| Worker deploy (prod Gemini) | `cd worker && cf deploy` |

## Folder structure (target)

```
src/
  components/      # React components (PascalCase.tsx)
  features/        # shots/ presets/ upload/ — one folder per use case
  lib/             # typed helpers; no business logic inside components
  types/           # shared types: Shot, Preset, GenerationPrompt
  App.tsx          # routes and layout only
functions/         # Cloud Functions (dev: Gemini calls against emulator)
worker/            # Cloudflare Worker (prod: Gemini calls, cf CLI)
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
