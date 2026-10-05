# FotMob endpoint notes

Endpoint: `GET https://www.fotmob.com/api/data/teams?id=8633` (unofficial, undocumented).

**Verified:** returns HTTP 200 (about 680 KB) with plain browser-like headers
(`User-Agent`, `Accept`, `Accept-Language`, `Referer: https://www.fotmob.com/`).
No signed header (`x-mas`) was required when checked. If FotMob starts answering
401/403, the backend serves the last cached data and logs the failure.

`docs/fotmob-sample.json` is a trimmed copy of the real response (stats/odds removed).

## Real field paths

| Need | Path |
| --- | --- |
| Full season fixtures (chronological, all competitions) | `fixtures.allFixtures.fixtures[]` (same list as `overview.overviewFixtures`) |
| Next match (single object) | `overview.nextMatch` / `fixtures.allFixtures.nextMatch` |
| Last match | `overview.lastMatch` (**not** `lastMatches`; that key does not exist) |
| Competition | `tournament.name` (`LaLiga`, `Champions League`, `Club Friendlies`, `Super Cup`) |
| Team ids / names | `home.id`, `home.name`, `away.id`, `away.name` |
| Scores | `home.score`, `away.score` (also `status.scoreStr`, e.g. `"2 - 1"`, finished only) |
| UTC time | `status.utcTime` (ISO, e.g. `2026-10-10T19:00:00.000Z`) |
| Flags | `status.finished`, `status.started`, `status.cancelled`, top-level `notStarted` |
| Match page | `pageUrl` (relative, prefix with `https://www.fotmob.com`) |
| Venue | not present per fixture (only the team's home stadium in `overview.venue`), so `venue` is `null` |

Notes:
- Upcoming fixtures have `score: 0` and no `scoreStr`; never read scores unless `finished`.
- Finished fixtures include `result` (1 / 0 / -1 from Real Madrid's view); we compute W/D/L from scores instead.
- The list includes club friendlies; they count as finished results.
