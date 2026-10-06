---
description: Audit the vault (orphan pages, broken links, log dates, sources untouched). Usage: /lint
---

Audit the vault against AGENTS.md.

1. Pages not reachable from `vault/index.md`.
2. `[[wikilinks]]` that point to pages that do not exist.
3. Missing dated lines in `vault/log.md` for recent operations.
4. Pages over 2 KB (SOUL.md must stay under 2 KB).
5. Confirm `vault/sources/` is unchanged (e.g. `git status vault/sources`).
6. Report findings with suggested fixes; append one dated line to
   `vault/log.md`. If fixing anything, log each fix in `vault/errors.md`.
