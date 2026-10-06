# Personal OS — Agent Playbook

Personal agent operating system (Karpathy LLM-wiki pattern). This file is the
schema and the rules; `vault/index.md` is the map of the memory.

## Core identity

- Before any personal question, read `SOUL.md` — it defines who the human is,
  priorities, voice and constraints. Never answer identity questions from
  memory of this file; `SOUL.md` is the source.
- `brand/config/brand-config.md` defines the visual/verbal brand (ATA SUARL).

## Vault protocol

- `vault/sources/` is **immutable**: read-only inputs (CV, contracts, notes).
  Never edit, move, rename or delete anything under `sources/`.
- The wiki (`vault/me/`, `vault/business/`, `vault/people/`,
  `vault/projects/`) is **owned by the agent**: create, update and link pages
  freely, but only from facts present in sources or confirmed by the human.
- Schema = this file (rules) + `vault/index.md` (map). Every vault page must
  be reachable from `index.md` through `[[wikilinks]]`.
- Pages use `[[Name]]` links, one topic per page, plain Markdown.

## Operations

- **ingest `<path>`** — read a source (PDF/MD/TXT), extract facts, create or
  update wiki pages in `vault/me/`, `vault/business/`, `vault/people/`,
  `vault/projects/`, then update `vault/index.md` and append one dated line to
  `vault/log.md`. Invoked via `/ingest <path>`.
- **query `<question>`** — answer from the vault only; cite the pages used
  (`[[Page]]`). If the vault lacks the answer, say so and offer to ingest.
- **lint** — audit the vault: pages unreachable from `index.md`, broken
  `[[wikilinks]]`, missing dated lines in `log.md`, oversized pages (>2 KB),
  accidental changes under `sources/`. Report + one dated line in `log.md`.
  Invoked via `/lint`.

## Brand protocol

- All outward content (posts, decks, emails) follows
  `brand/config/brand-config.md` (colors, typography, voice).
- Assets live in `brand/images/`, reusable layouts in `brand/templates/`.
- If brand and instructions conflict, brand-config wins for style, this file
  wins for safety.

## Self-correction loop

- Before retrying any failed operation, read `vault/errors.md` — past failures
  and fixes live there.
- Every new fix gets a dated entry in `vault/errors.md` (date, operation,
  error, fix). An error not yet logged must be logged before the next attempt.

## Post-run ingestion

After every substantive session (not just `/ingest`):

1. Update `vault/people/` (new people encountered)
2. Update `vault/business/` (companies, offers, activity)
3. Update `vault/projects/` (active work)
4. Refresh `vault/index.md`
5. Append one dated line to `vault/log.md`

## Hard rules

1. `vault/sources/` is never modified (see Vault protocol).
2. Never invent facts: vault pages contain only sourced or human-confirmed
   information. Unverified = not written.
3. Never print, read into chat, or store secrets/keys in the vault.
4. Every operation ends with one dated line in `vault/log.md`
   (`YYYY-MM-DD — what happened`).
5. This file stays under 200 lines; `SOUL.md` stays under 2 KB.
6. Answer in the language the human writes in (see `SOUL.md`).
