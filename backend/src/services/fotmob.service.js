// Stack found in Task 1: Node (ESM) + Express 5, dotenv for env, cors, no HTTP client (uses Node's built-in fetch).
// FotMob's team endpoint is unofficial; it answers plain browser-like requests (see docs/fotmob-notes.md).
// Responses are cached in memory; if FotMob fails, the last cached data is served (stale).
import { config } from '../config.js'
import { normalizeTeamResponse } from './fotmob.normalizer.js'

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  Accept: 'application/json',
  'Accept-Language': 'en-US,en;q=0.9',
  Referer: 'https://www.fotmob.com/',
}

let cache = null // { data, fetchedAt }
let inflight = null

async function fetchRaw() {
  const { baseUrl, teamId, timeoutMs } = config.fotmob
  const started = Date.now()
  try {
    const res = await fetch(`${baseUrl}/api/data/teams?id=${teamId}`, {
      headers: HEADERS,
      signal: AbortSignal.timeout(timeoutMs),
    })
    if (!res.ok) throw new Error(`FotMob responded ${res.status}`)
    return await res.json()
  } catch (err) {
    console.error(`[fotmob] request failed after ${Date.now() - started}ms: ${err.message}`)
    throw err
  }
}

// Returns normalized match data. Fresh cache > new fetch > stale cache; throws only when nothing is available.
export async function getMatches() {
  const { cacheTtlMs, teamId } = config.fotmob
  if (cache && Date.now() - cache.fetchedAt < cacheTtlMs) return cache.data

  inflight ??= fetchRaw()
    .then((raw) => {
      cache = { data: normalizeTeamResponse(raw, teamId), fetchedAt: Date.now() }
      return cache.data
    })
    .finally(() => {
      inflight = null
    })

  try {
    return await inflight
  } catch (err) {
    if (cache) return cache.data
    throw err
  }
}
