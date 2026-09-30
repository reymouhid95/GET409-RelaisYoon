# E06 · Plugins (opencode adaptation)

Competitive analysis + 4-week marketing plan for Séquence, produced with
project-scoped skills instead of Claude Code plugins.

## Layout

```
opencode.json                      # project config: MCP playwright + skill permissions
.opencode/skills/*/SKILL.md        # 8 skills from anthropics/knowledge-work-plugins (marketing), Apache-2.0
competitive-analysis.md            # 3 competitors, 6 pages, evidence-linked (FR)
marketing-plan.html                # campaign brief, « Diriger l'image », FR, print-friendly
screenshots/                       # 12 page captures + marketing-plan(.png|-full.png)
```

## Claude Code → opencode mapping

| Claude Code | opencode |
|---|---|
| `claude plugin install marketing@knowledge-work-plugins --scope local` | copy `marketing/skills/*` to `.opencode/skills/<name>/SKILL.md` |
| `claude plugin install playwright@claude-plugins-official` | `"mcp": { "playwright": { "type": "local", "command": ["npx","-y","@playwright/mcp@latest"], "enabled": true } }` in `opencode.json` |
| `claude plugin list` | `ls .opencode/skills` + `grep -h '^name:\|^description:' .opencode/skills/*/SKILL.md` |
| `claude plugin disable …` | `"permission": { "skill": { "<name>": "deny" } }` or `"enabled": false` for the MCP |
| browser browsing (Playwright plugin) | Chromium via `playwright-core` (used for this session's captures) |

## Disable the marketing skills after usage

In `opencode.json`:

```json
{ "permission": { "skill": { "campaign-plan": "deny", "competitive-brief": "deny" } } }
```

or remove `.opencode/skills/` entirely (project scope only, nothing global was touched).
Skills are re-discovered at opencode startup: restart the session to see them in the
`skill` tool description.

## Sources

Competitors browsed on 2026-09-30 (HTTP 200 unless noted):

- https://www.dada-animation.com/ + `/en/expertises`
- https://www.d5-xr.com/ + `/about`
- https://dardartdakar.com/ + `/services` (first call HTTP 429, rate-limit, retried OK)
