import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarClock, ChevronRight, ExternalLink, MapPin } from 'lucide-react'
import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import TeamLogo from '@/components/common/TeamLogo'
import { matchSection, nextMatch as staticNext, recentMatches } from '@/data/matches'
import { useMatches } from '@/hooks/useMatches'
import { resultFor } from '@/utils/results'
import { formatDate } from '@/utils/formatDate'
import { formatKickoff, formatMatchDate, timeUntil } from '@/utils/formatMatchDate'

const CLUB = 'Real Madrid'
const badge = {
  W: 'bg-accent text-white',
  D: 'bg-muted-foreground/20 text-foreground',
  L: 'bg-primary/10 text-primary',
}
const badgeLabel = { W: 'Win', D: 'Draw', L: 'Loss' }

// Static data (src/data/matches.js) in the same shape as the live API, so one UI renders both.
const staticResults = recentMatches.map((m) => {
  const [home, away] = m.score.split(' - ').map(Number)
  return {
    id: m.slug,
    competition: m.competition,
    dateLabel: formatDate(m.date),
    home: { name: m.home, score: home },
    away: { name: m.away, score: away },
    result: resultFor(m),
  }
})

function useCountdown(kickoffUtc) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60_000)
    return () => clearInterval(t)
  }, [])
  return timeUntil(kickoffUtc, now)
}

function Countdown({ kickoffUtc }) {
  const left = useCountdown(kickoffUtc)
  if (!left) return null
  return (
    <ul className="mt-6 flex gap-3" aria-label="Time until kickoff">
      {[
        ['Days', left.days],
        ['Hours', left.hours],
        ['Mins', left.minutes],
      ].map(([label, value]) => (
        <li key={label} className="min-w-[4.25rem] rounded-xl bg-white/10 px-3 py-2 text-center">
          <span className="block font-display text-3xl leading-none">{String(value).padStart(2, '0')}</span>
          <span className="font-heading text-[0.65rem] font-semibold uppercase tracking-widest text-white/70">{label}</span>
        </li>
      ))}
    </ul>
  )
}

function NextTeam({ team }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
      <TeamLogo team={team} size={56} />
      <p className="font-display text-xl uppercase leading-tight tracking-wide md:text-2xl">{team.name}</p>
    </div>
  )
}

function NextMatchCard({ match, loading }) {
  return (
    <div className="relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-ink to-ink-soft p-7 text-white md:p-9">
      <div aria-hidden="true" className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <p className="relative flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
        <CalendarClock size={16} aria-hidden="true" /> Next match
      </p>
      {loading ? (
        <div className="relative mt-8 animate-pulse space-y-4" aria-hidden="true">
          <div className="h-3 w-24 rounded bg-white/15" />
          <div className="h-24 rounded-xl bg-white/10" />
          <div className="h-3 w-40 rounded bg-white/15" />
          <div className="h-14 w-60 rounded-xl bg-white/10" />
        </div>
      ) : match ? (
        <div className="relative mt-8">
          <p className="font-heading text-xs font-semibold uppercase tracking-widest text-white/70">{match.competition}</p>
          <div className="mt-4 flex items-start gap-3">
            <NextTeam team={match.home} />
            <span className="mt-5 font-display text-2xl text-white/60">vs</span>
            <NextTeam team={match.away} />
          </div>
          <p className="mt-6 text-sm text-white/80">
            {formatMatchDate(match.kickoffUtc)} · {formatKickoff(match.kickoffUtc)}
          </p>
          {match.venue && (
            <p className="mt-1 flex items-center gap-2 text-sm text-white/80">
              <MapPin size={14} aria-hidden="true" /> {match.venue}
            </p>
          )}
          <Countdown kickoffUtc={match.kickoffUtc} />
          <a
            href={match.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-[0.2em] text-white/80 hover:text-white"
          >
            Match page <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      ) : (
        <div className="relative mt-8">
          <p className="font-display text-6xl uppercase leading-none tracking-wide md:text-7xl">TBA</p>
          <p className="mt-4 max-w-xs text-sm text-white/75">Next fixture to be announced.</p>
        </div>
      )}
    </div>
  )
}

function ResultRow({ m }) {
  const r = m.result
  const name = (t) => (
    <span className={t.name === CLUB ? '' : 'font-semibold text-muted-foreground'}>{t.name}</span>
  )
  return (
    <Link
      to={`/match/${m.id}`}
      className="group grid min-h-[4.5rem] grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
    >
      <span
        title={badgeLabel[r]}
        className={`flex h-11 w-11 items-center justify-center rounded-xl font-display text-xl ${badge[r]}`}
      >
        {r}
        <span className="sr-only"> ({badgeLabel[r]})</span>
      </span>
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 truncate font-heading text-sm font-bold text-foreground md:text-base">
          <TeamLogo team={m.home} size={20} />
          {name(m.home)}
          <span className="mx-1 font-normal text-muted-foreground">vs</span>
          <TeamLogo team={m.away} size={20} />
          {name(m.away)}
        </p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {m.competition} · {m.dateLabel}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-display text-2xl tracking-wider text-accent md:text-3xl">
          {m.home.score}–{m.away.score}
        </span>
        <ChevronRight
          size={18}
          aria-hidden="true"
          className="hidden text-muted-foreground transition-transform group-hover:translate-x-1 sm:block"
        />
      </div>
    </Link>
  )
}

function ResultSkeleton() {
  return <div aria-hidden="true" className="h-[4.5rem] animate-pulse rounded-2xl bg-white ring-1 ring-border" />
}

export default function MatchSection() {
  const { data, loading, error } = useMatches()
  const live = !error && data
  const next = live ? data.nextMatch : staticNext
  const results = live
    ? data.recentResults.map((r) => ({ ...r, dateLabel: formatMatchDate(r.dateUtc) }))
    : staticResults
  const showSkeleton = loading && !data
  const unavailable = Boolean(error) && !data

  return (
    <section className="bg-secondary py-16 md:py-24">
      <Container>
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading label={matchSection.label} title={matchSection.heading} align="left" compact className="mb-0" />
          {!showSkeleton && results.length > 0 && (
            <div className="flex items-center gap-2" role="img" aria-label={`Recent form: ${results.map((r) => r.result).join(' ')}`}>
              <span className="mr-1 font-heading text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Form
              </span>
              {results.map((r) => (
                <span
                  key={r.id}
                  aria-hidden="true"
                  className={`flex h-8 w-8 items-center justify-center rounded-full font-heading text-xs font-bold ${badge[r.result]}`}
                >
                  {r.result}
                </span>
              ))}
            </div>
          )}
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <NextMatchCard match={next} loading={showSkeleton} />
          </Reveal>

          <div className="lg:col-span-3">
            <h3 className="sr-only">{matchSection.subheading}</h3>
            <ul className="space-y-3">
              {showSkeleton
                ? Array.from({ length: 5 }, (_, i) => (
                    <li key={i}>
                      <ResultSkeleton />
                    </li>
                  ))
                : results.map((m, i) => (
                    <Reveal as="li" key={m.id} delay={i * 0.06} y={16}>
                      <ResultRow m={m} />
                    </Reveal>
                  ))}
            </ul>
            {!showSkeleton && results.length === 0 && (
              <p className="rounded-2xl bg-white p-6 text-center text-muted-foreground ring-1 ring-border">
                No results to show yet. Check back after the next match.
              </p>
            )}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          {unavailable && <span className="mr-2 font-semibold">Live data unavailable, showing saved results.</span>}
          Match data by{' '}
          <a href="https://www.fotmob.com" target="_blank" rel="noopener noreferrer" className="font-semibold underline">
            FotMob
          </a>
        </p>
      </Container>
    </section>
  )
}
