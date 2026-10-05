export const matchSection = {
  label: 'Matchday',
  heading: 'Next Match & Recent Results',
  subheading: 'Recent Results',
}

// Next fixture. The live site has none yet, so this stays null ("to be announced").
// To show one: { home, away, competition, date: 'YYYY-MM-DD', time: '20:30', venue }
export const nextMatch = null

// timeline entries are copied as listed on rmfcn.com
export const recentMatches = [
  {
    slug: 'laliga-matchday-7',
    home: 'Atletico Madrid',
    away: 'Real Madrid',
    competition: 'LaLiga',
    round: 'Madrid Derby',
    date: '2026-09-20',
    score: '2 - 1',
    venue: 'Riyadh Air Metropolitano',
    screening: 'N/A',
    timeline: [{ team: 'Atletico Madrid', minute: "0'", type: 'Goal', player: '' }],
  },
  {
    slug: 'laliga-matchday-6',
    home: 'Elche',
    away: 'Real Madrid',
    competition: 'LaLiga',
    round: 'Matchday 6',
    date: '2026-09-16',
    score: '2 - 3',
    venue: 'Estadio Manuel Martinez Valero',
    screening: 'N/A',
    timeline: [
      { team: 'Elche', minute: "71'", type: 'Goal', player: 'Osorio' },
      { team: 'Elche', minute: "83'", type: 'Goal', player: 'Nino' },
      { team: 'Real Madrid', minute: "25'", type: 'Goal', player: 'Dituro (OG)' },
      { team: 'Real Madrid', minute: "33'", type: 'Goal', player: 'Mbappe' },
      { team: 'Real Madrid', minute: "90'", type: 'Goal', player: 'Espi' },
    ],
  },
  {
    slug: 'laliga-matchday-5',
    home: 'Real Madrid',
    away: 'Rayo Vallecano',
    competition: 'LaLiga',
    round: 'Matchday 5',
    date: '2026-09-13',
    score: '4 - 1',
    venue: 'Estadio Bernabeu',
    screening: 'N/A',
    timeline: [
      { team: 'Real Madrid', minute: "14'", type: 'Goal', player: 'Mbappe (Pen)' },
      { team: 'Real Madrid', minute: "17'", type: 'Goal', player: 'Carreras' },
      { team: 'Real Madrid', minute: "35'", type: 'Goal', player: 'Bellingham' },
      // listed under Real Madrid on the source site, but the 4 - 1 score implies it is Rayo's goal
      { team: 'Rayo Vallecano', minute: "51'", type: 'Goal', player: 'Camello' },
      { team: 'Real Madrid', minute: "91'", type: 'Goal', player: 'Mbappe' },
    ],
  },
  {
    slug: 'ucl-matchday-1',
    home: 'Real Madrid',
    away: 'Inter Milan',
    competition: 'UEFA Champions League',
    round: 'UCL Matchday 1',
    date: '2026-09-09',
    score: '2 - 1',
    venue: 'Estadio Bernabeu',
    screening: 'N/A',
    timeline: [
      { team: 'Real Madrid', minute: "14'", type: 'Goal', player: 'Mbappe' },
      { team: 'Real Madrid', minute: "23'", type: 'Goal', player: 'Valverde' },
      { team: 'Inter Milan', minute: "177'", type: 'Goal', player: 'Augusto' },
    ],
  },
  {
    slug: 'laliga-matchday-4',
    home: 'Real Betis',
    away: 'Real Madrid',
    competition: 'LaLiga',
    round: 'Matchday 4',
    date: '2026-09-05',
    score: '1 - 0',
    venue: 'Estadio La Cartuja de Sevilla',
    screening: 'N/A',
    timeline: [{ team: 'Real Betis', minute: "81'", type: 'Goal', player: 'Parrott' }],
  },
]
