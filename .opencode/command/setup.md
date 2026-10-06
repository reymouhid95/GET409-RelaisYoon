---
description: Initialize or repair the personal-os folder structure (dirs, vault files, index).
---

Verify the Personal OS structure and repair what is missing.

1. Check directories: `brand/{config,images,templates}`,
   `vault/{sources,me,business,people,projects}`, `work/`, `.opencode/command/`.
2. Check files: `AGENTS.md`, `SOUL.md`, `vault/{index,log,errors}.md`,
   `brand/config/brand-config.md`.
3. Recreate anything missing (never touching `vault/sources/`).
4. Append one dated line to `vault/log.md`.
5. Report what was created vs already present.
