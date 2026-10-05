import { Link } from 'react-router-dom'
import { CalendarClock, ChevronRight, MapPin } from 'lucide-react'
import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import { matchSection, nextMatch, recentMatches } from '@/data/matches'
import { resultFor } from '@/utils/results'
import { formatDate } from '@/utils/formatDate'

const badge = {
  W: 'bg-accent text-white',
  D: 'bg-muted-foreground/20 text-foreground',
  L: 'bg-primary/10 text-primary',
}
const badgeLabel = { W: 'Win', D: 'Draw', L: 'Loss' }

function NextMatchCard() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-ink to-ink-soft p-7 text-white md:p-9">
      <div aria-hidden="true" className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <p className="relative flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
        <CalendarClock size={16} aria-hidden="true" /> Next match
      </p>
      {nextMatch ? (
        <div className="relative mt-8">
          <p className="font-heading text-xs font-semibold uppercase tracking-widest text-white/70">
            {nextMatch.competition}
          </p>
          <p className="mt-3 font-display text-4xl uppercase leading-tight tracking-wide md:text-5xl">
            {nextMatch.home}
            <span className="block text-2xl text-white/60 md:text-3xl">vs</span>
            {nextMatch.away}
          </p>
          <p className="mt-5 text-sm text-white/80">
            {formatDate(nextMatch.date)} · {nextMatch.time}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm text-white/80">
            <MapPin size={14} aria-hidden="true" /> {nextMatch.venue}
          </p>
        </div>
      ) : (
        <div className="relative mt-8">
          <p className="font-display text-6xl uppercase leading-none tracking-wide md:text-7xl">TBA</p>
          <p className="mt-4 max-w-xs text-sm text-white/75">
            The next fixture will appear here as soon as it is confirmed.
          </p>
        </div>
      )}
    </div>
  )
}

export default function MatchSection() {
  const form = recentMatches.map((m) => resultFor(m))

  return (
    <section className="bg-secondary py-16 md:py-24">
      <Container>
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 flex items-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <span aria-hidden="true" className="h-0.5 w-8 bg-primary" /> {matchSection.label}
            </p>
            <h2 className="font-display text-4xl uppercase tracking-wide text-accent md:text-5xl">
              {matchSection.heading}
            </h2>
          </div>
          <div className="flex items-center gap-2" role="img" aria-label={`Recent form: ${form.join(' ')}`}>
            <span className="mr-1 font-heading text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Form
            </span>
            {form.map((r, i) => (
              <span
                key={recentMatches[i].slug}
                aria-hidden="true"
                className={`flex h-8 w-8 items-center justify-center rounded-full font-heading text-xs font-bold ${badge[r]}`}
              >
                {r}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <NextMatchCard />
          </Reveal>

          <div className="lg:col-span-3">
            <h3 className="sr-only">{matchSection.subheading}</h3>
            <ul className="space-y-3">
              {recentMatches.map((m, i) => {
                const r = form[i]
                const [home, away] = m.score.split(' - ')
                return (
                  <Reveal as="li" key={m.slug} delay={i * 0.06} y={16}>
                    <Link
                      to={`/match/${m.slug}`}
                      className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                    >
                      <span
                        title={badgeLabel[r]}
                        className={`flex h-11 w-11 items-center justify-center rounded-xl font-display text-xl ${badge[r]}`}
                      >
                        {r}
                        <span className="sr-only"> ({badgeLabel[r]})</span>
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-heading text-sm font-bold text-foreground md:text-base">
                          <span className={m.home === 'Real Madrid' ? '' : 'font-semibold text-muted-foreground'}>
                            {m.home}
                          </span>
                          <span className="mx-2 font-normal text-muted-foreground">vs</span>
                          <span className={m.away === 'Real Madrid' ? '' : 'font-semibold text-muted-foreground'}>
                            {m.away}
                          </span>
                        </p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {m.competition} · {formatDate(m.date)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-2xl tracking-wider text-accent md:text-3xl">
                          {home}–{away}
                        </span>
                        <ChevronRight
                          size={18}
                          aria-hidden="true"
                          className="hidden text-muted-foreground transition-transform group-hover:translate-x-1 sm:block"
                        />
                      </div>
                    </Link>
                  </Reveal>
                )
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
