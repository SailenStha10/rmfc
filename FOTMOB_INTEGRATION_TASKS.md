# FotMob Integration – Next Match & Recent Results

Target: replace static data in the Home page "Matchday" section with live data from FotMob.
Team: Real Madrid (FotMob team id `8633`)
Source endpoint: `https://www.fotmob.com/api/data/teams?id=8633`

## Instructions for Claude Code

- Work through the tasks in order. Complete and verify each before moving on.
- Inspect the existing project first (frontend and backend). Follow its existing conventions, language, folder structure and libraries. Do not introduce new frameworks unless a task says so.
- Do not hard-code content inside components. Keep API logic out of UI components.
- Do not change unrelated files. Keep the current Matchday section design and colors.
- After each task, tick its checkbox and list changed files.

## Known constraints

- The FotMob endpoint is unofficial and undocumented. The JSON shape below is based on prior knowledge and **must be verified against the real response in Task 1**. Trust the real response over this file.
- FotMob may block direct browser requests (CORS, request headers). Therefore the frontend must call our own backend, and the backend calls FotMob.
- Cache responses on the backend. Do not call FotMob on every page view.
- Use the data for display only and credit FotMob in the section footer.

## Expected response shape (verify in Task 1)

```
overview.nextMatch                      -> upcoming fixture object
overview.lastMatches                    -> recent fixtures (or similar key)
overview.overviewFixtures               -> mixed list of upcoming fixtures
fixtures.allFixtures.fixtures           -> full season fixtures list
```

Typical fixture object:

```
{
  id,
  pageUrl,
  tournament: { name, leagueId },
  home: { id, name, score },
  away: { id, name, score },
  status: { utcTime, started, finished, cancelled, scoreStr, reason: { short } }
}
```

Team logo URL pattern: `https://images.fotmob.com/image_resources/logo/teamlogo/{teamId}.png`

---

## Task 1 – Discovery

**Goal:** Know the exact JSON structure before writing code.

- [ ] 1.1 Detect the backend stack, framework, router layout, env handling and HTTP client already in use. Summarize in a short comment at the top of the new service file.
- [ ] 1.2 Call the FotMob endpoint from the backend environment (curl or a script) with browser-like headers (`User-Agent`, `Accept`, `Accept-Language`, `Referer: https://www.fotmob.com/`).
- [ ] 1.3 Save one real response to `docs/fotmob-sample.json` (trim if very large).
- [ ] 1.4 Identify the actual paths for: next match, last N finished matches, tournament name, team names, ids, scores, UTC time, finished/cancelled flags.
- [ ] 1.5 If the endpoint returns 401/403 or requires a signed header (for example `x-mas`), document the failure and the workaround in `docs/fotmob-notes.md`, and stop to ask the user before continuing.

**Done when:** `docs/fotmob-sample.json` exists and the real field paths are written in `docs/fotmob-notes.md`.

---

## Task 2 – Backend Proxy + Normalizer

**Goal:** Expose a clean, stable endpoint so the frontend never depends on FotMob's raw shape.

- [ ] 2.1 Add env variables (and `.env.example` entries):
  - `FOTMOB_TEAM_ID=8633`
  - `FOTMOB_BASE_URL=https://www.fotmob.com`
  - `FOTMOB_CACHE_TTL_SECONDS=300`
- [ ] 2.2 Create a FotMob service (`fotmob.service`) that fetches the team endpoint with timeout (8s) and the headers from Task 1.
- [ ] 2.3 Create a normalizer that maps the raw response to this contract:

```json
{
  "team": { "id": 8633, "name": "Real Madrid" },
  "nextMatch": {
    "id": "string",
    "competition": "LaLiga",
    "kickoffUtc": "2026-09-27T19:00:00.000Z",
    "home": { "id": 0, "name": "", "logo": "" },
    "away": { "id": 0, "name": "", "logo": "" },
    "venue": null,
    "url": "https://www.fotmob.com/..."
  },
  "recentResults": [
    {
      "id": "string",
      "competition": "LaLiga",
      "dateUtc": "2026-09-20T19:00:00.000Z",
      "home": { "id": 0, "name": "", "logo": "", "score": 2 },
      "away": { "id": 0, "name": "", "logo": "", "score": 1 },
      "result": "W",
      "url": "https://www.fotmob.com/..."
    }
  ],
  "updatedAt": "ISO timestamp"
}
```

  - `result` is `W`, `D` or `L` from Real Madrid's perspective.
  - `recentResults`: only finished, non-cancelled matches, newest first, max 5.
  - `nextMatch`: first upcoming non-started fixture, or `null`.
  - Build logo URLs from the team id pattern above.
- [ ] 2.5 Add an in-memory cache with TTL from env. On FotMob failure, serve the last cached data (stale) if available.
- [ ] 2.6 Add route `GET /api/matches` returning the contract. Return `502` with `{ "error": "..." }` only when there is no fresh or cached data.
- [ ] 2.7 Enable CORS for the frontend origin only (read from env).
- [ ] 2.8 Add unit tests for the normalizer using `docs/fotmob-sample.json` (finished filter, ordering, W/D/L, null next match).

**Done when:** `GET /api/matches` returns the contract and tests pass.

---

## Task 3 – Frontend Data Layer

**Goal:** Fetch and expose match data cleanly to components.

- [ ] 3.1 Add env variable `VITE_API_BASE_URL` (and `.env.example`). Adjust the prefix if the project is not Vite.
- [ ] 3.2 Create `src/services/matchService.js` with `getMatches()` using `fetch` and `AbortController`. Throw on non-OK responses.
- [ ] 3.3 Create hook `src/hooks/useMatches.js` returning `{ data, loading, error, refetch }`. Fetch on mount, cache result in module scope for the session, no refetch on every re-render.
- [ ] 3.4 Create `src/utils/formatMatchDate.js`: format UTC to local readable date, for example `September 20, 2026`, and kickoff time using the user's locale and timezone (Asia/Kathmandu fallback).
- [ ] 3.5 Keep the existing static `src/data/matches.js` as a fallback dataset.

**Done when:** the hook returns real data in the browser console with no CORS errors.

---

## Task 4 – Matchday UI

**Goal:** Wire the data into the existing section without changing its design language.

- [ ] 4.1 Update `MatchSection.jsx` to use `useMatches()`.
- [ ] 4.2 **Next Match card:**
  - Competition badge, date, kickoff time (local timezone).
  - Both team logos and names, "vs" separator.
  - Live countdown (days, hours, minutes) to kickoff, updating every minute; hide when kickoff has passed.
  - Link to the FotMob match page (opens in new tab, `rel="noopener noreferrer"`).
  - If `nextMatch` is null, show "Next fixture to be announced".
- [ ] 4.3 **Recent Results list (5 items):**
  - Row: date, competition, home logo + name, score, away logo + name.
  - W / D / L badge with distinct colors taken from the existing design tokens.
  - Highlight Real Madrid's name.
  - Each row links to the FotMob match page, or to the existing `/match/:slug` route if still used.
- [ ] 4.4 **States:**
  - Loading: skeleton placeholders matching the card and row sizes.
  - Error: fall back to static `matches.js` data and show a small "Live data unavailable" note.
  - Empty: friendly message.
- [ ] 4.5 Logos: `loading="lazy"`, fixed width and height to avoid layout shift, alt text with team name, hide broken images gracefully.
- [ ] 4.6 Footer line in the section: "Match data by FotMob" linking to https://www.fotmob.com.
- [ ] 4.7 Fully responsive at 375, 768, 1024 and 1440 px.

**Done when:** the section shows live data, falls back correctly when the backend is stopped, and has no layout shift.

---

## Task 5 – Match Detail Route (if present)

- [ ] 5.1 Check whether `/match/:slug` exists in the project. If not, skip this task.
- [ ] 5.2 Update the page to read the match from the same data source (by FotMob match id) and render scoreboard, competition and date.
- [ ] 5.3 Handle unknown ids with the NotFound page.

---

## Task 6 – Hardening & QA

- [ ] 6.1 Backend: rate-limit `/api/matches` (for example 60 requests per minute per IP).
- [ ] 6.2 Backend: log FotMob failures with status and duration, no secrets.
- [ ] 6.3 Frontend: no console errors or warnings; no uncaught promise rejections.
- [ ] 6.4 Manual test matrix:
  - Backend running, FotMob reachable
  - Backend running, FotMob unreachable (cache served)
  - Backend stopped (frontend fallback)
  - No upcoming match
  - Slow network (throttle to Slow 3G)
- [ ] 6.5 Update `README.md`: new env variables, how the proxy and cache work, how to refresh the sample JSON, and the unofficial-API risk.

**Done when:** all scenarios in 6.4 behave as described and the README is updated.

---

## Acceptance Criteria (overall)

- Matchday section shows the real next match and the last 5 finished results for Real Madrid.
- Frontend never calls FotMob directly.
- Data refreshes at most once per cache TTL.
- UI keeps the existing look, with loading, error and empty states.
- Static fallback keeps the section working if the API fails.
