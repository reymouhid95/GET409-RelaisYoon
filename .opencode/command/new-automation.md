---
description: Define a new recurring operation or rule for the personal agent. Usage: /new-automation <idea>
---

Turn `$ARGUMENTS` into a repeatable operation.

1. Clarify the trigger, the inputs, the outputs and the frequency.
2. Choose the form: a new command in `.opencode/command/<name>.md`, a new
   section/rule in `AGENTS.md`, or a new vault template.
3. Implement it (create/update the file, keep AGENTS.md under 200 lines).
4. Append one dated line to `vault/log.md` and, if this replaces a fix,
   a row in `vault/errors.md`.
