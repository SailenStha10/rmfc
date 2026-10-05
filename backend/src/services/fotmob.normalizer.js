// Maps FotMob's raw team response to the stable contract served by GET /api/matches.
// Field paths are documented in docs/fotmob-notes.md.

export const FOTMOB_SITE = 'https://www.fotmob.com'
const logoUrl = (id) => `https://images.fotmob.com/image_resources/logo/teamlogo/${id}.png`
const matchUrl = (pageUrl) => (pageUrl ? `${FOTMOB_SITE}${pageUrl}` : FOTMOB_SITE)

const side = (t, withScore) => {
  const out = { id: t.id, name: t.name, logo: logoUrl(t.id) }
  if (withScore) out.score = t.score
  return out
}

// W / D / L from the tracked team's perspective.
export function resultFor(fixture, teamId) {
  const ours = fixture.home.id === teamId ? fixture.home.score : fixture.away.score
  const theirs = fixture.home.id === teamId ? fixture.away.score : fixture.home.score
  if (ours > theirs) return 'W'
  if (ours < theirs) return 'L'
  return 'D'
}

export function normalizeTeamResponse(raw, teamId, now = new Date()) {
  const fixtures = raw?.fixtures?.allFixtures?.fixtures ?? raw?.overview?.overviewFixtures ?? []
  const time = (f) => new Date(f.status.utcTime).getTime()

  const next =
    fixtures
      .filter((f) => !f.status.started && !f.status.finished && !f.status.cancelled && time(f) >= now.getTime())
      .sort((a, b) => time(a) - time(b))[0] ?? null

  const recent = fixtures
    .filter((f) => f.status.finished && !f.status.cancelled)
    .sort((a, b) => time(b) - time(a))
    .slice(0, 5)

  return {
    team: { id: teamId, name: raw?.details?.name ?? 'Real Madrid' },
    nextMatch: next && {
      id: String(next.id),
      competition: next.tournament.name,
      kickoffUtc: next.status.utcTime,
      home: side(next.home),
      away: side(next.away),
      venue: null,
      url: matchUrl(next.pageUrl),
    },
    recentResults: recent.map((f) => ({
      id: String(f.id),
      competition: f.tournament.name,
      dateUtc: f.status.utcTime,
      home: side(f.home, true),
      away: side(f.away, true),
      result: resultFor(f, teamId),
      url: matchUrl(f.pageUrl),
    })),
    updatedAt: now.toISOString(),
  }
}
