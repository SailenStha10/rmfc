// Result of a match from Real Madrid's side: 'W' | 'D' | 'L'.
export function resultFor(match, club = 'Real Madrid') {
  const [home, away] = match.score.split(' - ').map(Number)
  const [mine, theirs] = match.home === club ? [home, away] : [away, home]
  if (mine === theirs) return 'D'
  return mine > theirs ? 'W' : 'L'
}
