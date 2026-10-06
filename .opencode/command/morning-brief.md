---
description: Generate today's morning brief (emails, calendar, Notion) read-only. Usage: /morning-brief
---

Produce today's morning brief following `work/02-morning-brief/CLAUDE.md`.

1. Collect: unread emails from the last 12 h (if Gmail is available),
   today's calendar events (if available), related Notion project pages
   (use the `notion` MCP tools).
2. Score every item against the Top 5 priorities in `SOUL.md`.
3. Write the four sections: **Urgent · Aujourd'hui · Contexte · FYI**
   (under 3 minutes of reading).
4. Save to `vault/projects/morning-brief/YYYY-MM-DD.md`.
5. Mirror as a page in the Notion "Daily briefs" database — ask first if
   the database does not exist. Title: `Brief YYYY-MM-DD`.
6. New people → `vault/people/`, new companies → `vault/business/`;
   refresh `vault/index.md`; append one dated line to `vault/log.md`.

Hard rules: Gmail/Calendar read-only (never send, archive, delete).
