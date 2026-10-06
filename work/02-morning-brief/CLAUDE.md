# Morning brief — automation playbook

Build 2 of the Personal OS. Invoked manually via `/morning-brief`.

## Data sources

- Gmail — unread emails from the last 12 h. **READ-ONLY.**
- Google Calendar — today's events. **READ-ONLY.**
- Notion — pages related to my projects (MCP `notion`).
- `SOUL.md` — ranked priorities used to score every item.

## Scoring

Score each item against the Top 5 priorities in `SOUL.md`. An item ranks
Urgent only if it blocks a higher priority or is due today.

## Output

Four sections, readable in under 3 minutes:

1. **Urgent** — blocks a top priority or due today
2. **Aujourd'hui** — today's events and deadlines
3. **Contexte** — related Notion project pages, threads to watch
4. **FYI** — everything else worth knowing

Then:

- Save the brief to `vault/projects/morning-brief/YYYY-MM-DD.md`
- Mirror it as a page in the Notion "Daily briefs" database
  (**ask me before creating the database**)
- New people → `vault/people/`, new companies → `vault/business/`
- Refresh `vault/index.md`, append one dated line to `vault/log.md`

## Hard rules

1. Gmail and Calendar are read-only: never send, archive, or delete.
2. Ask before creating the Notion database.
3. Notion page title always carries the date: `Brief YYYY-MM-DD`.
4. No brief content ever leaves the machine except the Notion mirror page.

## Learned fixes

_(symptom → cause → prevention; every fix also logged in `vault/errors.md`)_

- Token lookup fails with "no access token" → credential JSON keys are
  `access`/`refresh` → read `value.access` from `opencode.db`; never print it.
- MCP HTTP initialize returns Cloudflare 1010 → python-urllib UA banned →
  always send `User-Agent: curl/8.5.0`.
- `notion-query-data-sources` rejects args (`data: Invalid input`) → params
  must be nested → wrap as `{"data": {"mode": "rows", ...}}`.
- Tool schemas are the source of truth: fetch `tools/list` and read the exact
  `inputSchema` before calling an unfamiliar Notion tool.
