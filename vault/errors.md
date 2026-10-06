# Errors

Self-correction memory. **Read this before retrying a failed operation.**
Log every new fix: `YYYY-MM-DD | operation | error | fix`.

| Date | Operation | Error | Fix |
| --- | --- | --- | --- |
| 2026-10-06 | /morning-brief (MCP token read) | "no access token in credential value" | Credential JSON uses keys `access`/`refresh` — read `value.access` from `opencode.db`, never print it |
| 2026-10-06 | /morning-brief (MCP HTTP) | Cloudflare Error 1010 `browser_signature_banned` on initialize | Default python-urllib User-Agent is blocked — send `User-Agent: curl/8.5.0` |
| 2026-10-06 | /morning-brief (notion-query-data-sources) | `Input validation error: data: Invalid input` | Row/SQL params must be nested under `data` — `{"data":{"mode":"rows",...}}` |
