const FALLBACK_TZ = 'Asia/Kathmandu'

// Falls back to Kathmandu time if the browser cannot report a timezone.
const timeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || FALLBACK_TZ

// '2026-09-20T19:00:00.000Z' -> 'September 20, 2026' (viewer's timezone)
export function formatMatchDate(utc) {
  return new Date(utc).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: timeZone() })
}

// '2026-10-10T19:00:00.000Z' -> '7:00 PM' (viewer's locale and timezone)
export function formatKickoff(utc) {
  return new Date(utc).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', timeZone: timeZone() })
}

// Whole days / hours / minutes until kickoff, or null once it has passed.
export function timeUntil(utc, now = Date.now()) {
  const ms = new Date(utc).getTime() - now
  if (ms <= 0) return null
  const minutes = Math.floor(ms / 60000)
  return { days: Math.floor(minutes / 1440), hours: Math.floor((minutes % 1440) / 60), minutes: minutes % 60 }
}
