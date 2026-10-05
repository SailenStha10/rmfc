import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { normalizeTeamResponse, resultFor } from '../src/services/fotmob.normalizer.js'

const sample = JSON.parse(readFileSync(new URL('../../docs/fotmob-sample.json', import.meta.url)))
const ID = 8633
const NOW = new Date('2026-09-25T12:00:00Z')

test('recentResults: max 5, finished only, newest first', () => {
  const { recentResults } = normalizeTeamResponse(sample, ID, NOW)
  assert.equal(recentResults.length, 5)
  const dates = recentResults.map((r) => r.dateUtc)
  assert.deepEqual(dates, [...dates].sort().reverse())
  assert.equal(recentResults[0].home.name, 'Atlético Madrid')
  assert.equal(recentResults[0].away.name, 'Real Madrid')
  assert.ok(recentResults.every((r) => typeof r.home.score === 'number'))
})

test('recentResults: skips cancelled fixtures', () => {
  const raw = structuredClone(sample)
  raw.fixtures.allFixtures.fixtures.find((f) => f.id === 5868072).status.cancelled = true
  const { recentResults } = normalizeTeamResponse(raw, ID, NOW)
  assert.ok(!recentResults.some((r) => r.id === '5868072'))
})

test('W/D/L from Real Madrid perspective', () => {
  const { recentResults } = normalizeTeamResponse(sample, ID, NOW)
  assert.deepEqual(
    recentResults.map((r) => r.result),
    ['L', 'W', 'W', 'W', 'L'],
  )
  const f = (h, a, hs, as) => ({ home: { id: h, score: hs }, away: { id: a, score: as } })
  assert.equal(resultFor(f(ID, 1, 2, 2), ID), 'D')
  assert.equal(resultFor(f(1, ID, 0, 1), ID), 'W')
})

test('nextMatch is the first upcoming fixture with logos and url', () => {
  const { nextMatch } = normalizeTeamResponse(sample, ID, NOW)
  assert.equal(nextMatch.id, '5868089')
  assert.equal(nextMatch.competition, 'LaLiga')
  assert.equal(nextMatch.kickoffUtc, '2026-10-10T19:00:00.000Z')
  assert.equal(nextMatch.away.name, 'Villarreal')
  assert.equal(nextMatch.venue, null)
  assert.equal(nextMatch.home.logo, 'https://images.fotmob.com/image_resources/logo/teamlogo/8633.png')
  assert.match(nextMatch.url, /^https:\/\/www\.fotmob\.com\/matches\//)
})

test('nextMatch is null when no fixture is upcoming', () => {
  const raw = structuredClone(sample)
  raw.fixtures.allFixtures.fixtures = raw.fixtures.allFixtures.fixtures.filter((f) => f.status.finished)
  assert.equal(normalizeTeamResponse(raw, ID, NOW).nextMatch, null)
})
