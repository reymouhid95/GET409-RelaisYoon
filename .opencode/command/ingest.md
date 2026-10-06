---
description: Ingest a source document into the vault wiki. Usage: /ingest vault/sources/cv.pdf
---

Ingest the source at `$ARGUMENTS` into the vault.

1. Read the file (PDF/MD/TXT). Never modify it — `vault/sources/` is immutable.
2. Extract verified facts and create/update wiki pages:
   - `vault/me/` — profile, experience, skills
   - `vault/business/` — companies, offers, activity
   - `vault/people/` — people mentioned
   - `vault/projects/` — projects mentioned
3. Link pages with `[[wikilinks]]`; make each new page reachable from
   `vault/index.md`.
4. Refresh `vault/index.md`.
5. Append one dated line to `vault/log.md`.
6. Report the pages created/updated (per AGENTS.md post-run ingestion).
