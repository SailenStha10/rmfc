// Talks only to our own backend (which proxies and caches FotMob); the browser never calls FotMob.
const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '')

export async function getMatches({ signal } = {}) {
  const res = await fetch(`${API_BASE}/api/matches`, { signal, headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`Matches request failed (${res.status})`)
  return res.json()
}
