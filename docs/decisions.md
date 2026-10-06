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
- `firestore.dev.rules` — **removed 2026-10-06** (E14 audit, M-2): the dev
  config carries no `firestore` section anymore, so the emulator falls back
  to firebase-tools' built-in open default ("no rules file specified" →
  allow all reads and writes), while `deploy --config firebase.dev.json`
  has no rules target left to publish. Correcting an earlier claim (M-3):
  `firebase deploy` reads `firebase.json` **unless `--config` is passed** —
  that lever no longer points at any rules file, which is what actually
  makes open rules undeployable.
- Emulator command unchanged:
  `npx -y firebase-tools --config firebase.dev.json emulators:start --only functions,firestore`.

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

## 2026-10-06 — Ralph round 1: what changed

**Issues ranked (frontend-design review, before/after screenshots in
`screenshots/e10-ralph-*`):** (1) horizontal overflow at 360 px — the tab
row was a no-wrap flex, `scrollWidth` 391 > 360; (2) no date in the header
and no per-production progress, both required by the Ralph brief; (3) the
journal was a stack of full-width rows with dead space, not cards.

**Fixed (top 3):**
- Tabs now `flex-wrap: wrap` — pills flow to a second line at 360 px, no
  horizontal scroll (verified: no element past the viewport).
- Header shows today's date (fr-FR, weekday + long date); the production
  picker gained a progress bar with `count / total prises`
  (`role="progressbar"`, ARIA values).
- Journal entries became a responsive card grid
  (`auto-fill minmax(300px, 1fr)`): vertical card anatomy (title, meta,
  clamped prompt, actions at the bottom).

**Checks:** `npm run typecheck`, `npm test` (15/15), `npm run build` all
green. `functions/`, `.env*` and Firebase rules untouched.

## 2026-10-06 — Ralph round 2: what changed

**Remaining brief gap:** filter by shot size in the journal. Everything
else from round 1 held up under re-review (no overflow at 360 px, header
date and progress present, card grid intact).

**Fixed:**
- Journal gained a shot-size filter: pill chips ("Toutes" + every size
  present in the production, fr-sorted), `aria-pressed` toggles, reset via
  a specific empty state with a "Voir toutes les prises" action.
- Filter state is local to `JournalView`; entries are derived with
  `useMemo` so large journals stay cheap.

**Checks:** `npm run typecheck`, `npm test` (15/15), `npm run build`
green; headless verification: `scrollWidth` 360/360 at 360 px, filter
shows 1 of 2 entries on "Premier plan" and restores both on "Toutes",
progress bar reports a valid `aria-valuenow`.
`functions/`, `.env*` and Firebase rules untouched (per brief).

## 2026-10-06 — Pre-deploy security review (E14 safe fixes)

**What** — First batch of `firebase-reviewer` audit fixes (the "safe" batch,
no product decision): `storage.rules` deny-all + `storage` key in
`firebase.json` (M-1); `firestore.dev.rules` deleted and the `firestore`
section removed from `firebase.dev.json` so the emulator uses its built-in
open default while no open rules file exists to deploy (M-2/M-3); hosting
block (`public: dist`, SPA rewrite) + `npm run deploy` script (L-4);
base64 charset/length validation on `imageBase64` (L-2); `key=` redaction
in the Gemini error log (L-1); unused `firebase-admin` dependency removed
(L-3).

**Why** — The audit showed the only way to publish open rules was
`firebase deploy --config firebase.dev.json --only firestore:rules`; the
lever is now gone instead of only documented. Storage gets a deny-all file
before any bucket exists, so the first upload cannot ship with default
rules.

**Verified** — `functions: typecheck + build`, root `typecheck`, `npm test`
15/15 green; emulator A/B probe (JDK 21): `--config firebase.dev.json` →
HTTP 200 (open default, dev flow intact), default `firebase.json` → HTTP 403
`PERMISSION_DENIED @ firestore.rules:12`.

**Deferred (audit, needs product decisions)** — H-1 callable auth/App Check;
M-4 `users/{uid}/entries/{id}` structure (requires Auth); M-5/M-6 real
Firebase project config instead of `demo-*`.

## 2026-10-06 — E14 H-1: callable auth gate

**What** — Both Gemini callables (`describeShotFromText`,
`describeShotFromImage`) now reject unauthenticated requests via a
`requireAuth` guard (`functions/src/auth.ts`). The frontend signs the user
in anonymously on demand (`src/lib/auth.ts`, called before each callable)
and connects to the Auth emulator in dev (`firebase.ts`, port 9099 added to
both emulator configs; AGENTS.md emulator command now includes `auth`).

**Why** — Audit finding H-1: anyone could invoke the callables and spend
the Gemini quota (billing risk once hosting is deployed). Anonymous auth
keeps the flow invisible to users while giving every request a
platform-verified ID token.

**Verified** — root `typecheck` + `build` functions + 15/15 tests green;
emulator A/B probe (`functions,auth`, demo project): no token →
`HTTP 401 UNAUTHENTICATED` on both callables, anonymous ID token +
invalid payload → `HTTP 400 INVALID_ARGUMENT` (auth passed, validation
reached, no Gemini call made).

**Deferred** — App Check needs a real Firebase project (with M-5/M-6);
the **Anonymous provider must be enabled in the Firebase console before the
first production deploy**, otherwise sign-in fails and callables stay
closed.

## 2026-10-06 — E14 M-4: per-user entries subtree

**What** — Entries moved from the root `entries` collection to
`users/{uid}/entries/{entryId}`: `FirestoreEntryRepository` now takes the
uid, the workspace bootstrap signs in anonymously first (the auth helper
now returns the uid), and a one-shot migration copies legacy root
documents (else localStorage) into the per-user subtree when it is empty.
`firestore.rules` changed from total deny-all to owner-only access on
`users/{uid}/**` (authenticated + `request.auth.uid == userId`), deny-all
everywhere else including the legacy root collection. Human-approved per
AGENTS.md (rules change requires asking).

**Why** — Audit M-4: a flat shared collection cannot be isolated per user;
rules alone were impossible without Auth. Anonymous Auth now ships (H-1),
so ownership can be enforced at the path level.

**Verified** — root `typecheck` + 15/15 tests green; emulator probe
(`auth,firestore` with the production `firestore.rules`, JS SDK path):
own-subtree write/read allowed, read of another uid →
`permission-denied`, legacy root write → `permission-denied`, final own
read still OK. Rules are edited only — `firebase deploy --only
firestore:rules` happens at the first real deploy (M-5/M-6).

**Deferred** — data already sitting in the legacy `entries` collection on
any live project is copied on first load; the legacy docs themselves stay
deny-all and can be deleted later.

## 2026-10-06 — E14 M-5 (partial): real project wired, first hosting release

**What** — Firebase project `promptlens-prod` created from the CLI (alias
`prod`), web app registered (App ID `1:751740675752:web:c464911c3061813059c49d`),
its config written to gitignored `.env.local` (6 `VITE_FIREBASE_*` vars,
values never printed) and `src/lib/firebase.ts` now prefers those vars with
the demo config as fallback for emulators. Enabled the Firestore, Identity
Toolkit, Cloud Functions and Firebase Hosting APIs, created the Firestore
database (`europe-west1`, closed by default), released the M-4 production
rules (`firebase deploy --only firestore:rules`) and shipped the first
Hosting release: https://promptlens-prod.web.app (HTTP 200, SPA rewrites OK).

**Why** — E14 M-5/M-6: the app must run on a real project instead of the
demo config; rules were human-approved in M-4 and only needed releasing.

**Blocked — no billing account on the Google Cloud project.** The Anonymous
provider stays OFF (`identityPlatform:initializeAuth` →
`BILLING_NOT_ENABLED`) and the Cloud Build / Artifact Registry / Cloud Run
APIs cannot be enabled, so the functions deploy (`npm run deploy`) and App
Check are deferred. Once a billing account is linked in the console (free
tier), the rest is: re-enable Anonymous, `firebase functions:secrets:set
GEMINI_API_KEY`, `npm run deploy`, then App Check.

**Verified** — root `typecheck` + 15/15 tests green; production build
embeds the real config; hosting URL answers 200 on `/` and a SPA route.

## 2026-10-06 — E14 M-6: blocked on billing, gen1 conversion reverted

**What** — Attempted the first full deploy (Anonymous provider, Gemini
secret, functions) on `promptlens-prod`. Every remaining step is gated by
billing: the linked account ("Paiement de Firebase", `012C1B-42FC07-103603`)
stays closed because the card is declined, so Cloud Build, Artifact
Registry, Secret Manager and the Identity Platform initialization cannot be
enabled. A gen1 conversion of the two callables (v1 API, no Cloud Run) was
implemented on `lab/e14-gen1` and reverted: firebase-tools enables Cloud
Build + Artifact Registry for **any** functions deploy, so gen1 buys
nothing. Code stays gen2; M-5 rules and hosting remain live.

**Why** — No free-lunch deploy path exists on this project until the
billing account is open; the console-only Anonymous activation is pending
verification (the Identity Toolkit config API is unreachable without
initialization).

**Verified** — after revert: root typecheck + 15/15 tests green,
functions typecheck/build green, `functions:list` empty, hosting URL still
HTTP 200.

**Next, once the card works** — open the billing account → enable
`cloudbuild`/`artifactregistry`/`secretmanager` → Anonymous provider (or
`initializeAuth`) → `firebase functions:secrets:set GEMINI_API_KEY` →
`npm run deploy` (gen2 as-is) → App Check.
