import { useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Tv } from 'lucide-react'
import PageBanner from '@/components/common/PageBanner'
import Seo from '@/components/common/Seo'
import Container from '@/components/common/Container'
import Button from '@/components/common/Button'
import Badge from '@/components/common/Badge'
import NotFound from './NotFound'
import { recentMatches } from '@/data/matches'
import { formatDate } from '@/utils/formatDate'

function TimelineColumn({ team, entries }) {
  return (
    <div>
      <h3 className="mb-4 text-center text-base text-accent">{team}</h3>
      <ul className="space-y-3">
        {entries.map((e) => (
          <li
            key={`${e.minute}-${e.player}`}
            className="rounded-lg border border-primary/30 bg-primary/10 p-4"
          >
            <p className="font-heading text-xs font-bold text-primary">
              {e.minute} · {e.type}
            </p>
            {e.player && <p className="mt-1 text-sm font-semibold">{e.player}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function MatchDetail() {
  const { slug } = useParams()
  const match = recentMatches.find((m) => m.slug === slug)
  if (!match) return <NotFound />

  const [homeScore, awayScore] = match.score.split(' - ')

  return (
    <>
      <Seo
        title={`${match.home} vs ${match.away}`}
        description={`${match.home} ${match.score} ${match.away} – ${match.competition}, ${formatDate(match.date)} at ${match.venue}.`}
        path={`/match/${match.slug}`}
      />
      <PageBanner title={`${match.home} vs ${match.away}`} subtitle={match.round} />

      <section className="bg-secondary py-12 md:py-16">
        <Container className="max-w-3xl">
          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm md:p-10">
            <Badge>{match.competition}</Badge>
            <p className="mt-2 text-sm text-muted-foreground">
              {match.round} · {formatDate(match.date)} · FT
            </p>
            <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6">
              <p className="font-heading text-base font-bold md:text-xl">{match.home}</p>
              <p
                className="rounded-lg bg-accent px-5 py-3 font-heading text-3xl font-black text-accent-foreground md:text-5xl"
                aria-label={`Score ${homeScore} to ${awayScore}`}
              >
                {homeScore} - {awayScore}
              </p>
              <p className="font-heading text-base font-bold md:text-xl">{match.away}</p>
            </div>
            <ul className="mt-6 flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-6">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" aria-hidden="true" /> Venue: {match.venue}
              </li>
              <li className="flex items-center gap-2">
                <Tv size={16} className="text-primary" aria-hidden="true" /> Screening: {match.screening}
              </li>
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 md:py-16">
        <Container className="max-w-4xl">
          <h2 className="mb-8 text-center text-2xl">Match timeline</h2>
          <div className="grid gap-10 md:grid-cols-2">
            {[match.home, match.away].map((team) => (
              <TimelineColumn
                key={team}
                team={team}
                entries={match.timeline.filter((e) => e.team === team)}
              />
            ))}
          </div>
          <p className="mt-12 text-center">
            <Button to="/" variant="ghost">
              <ArrowLeft size={16} aria-hidden="true" /> Back to home
            </Button>
          </p>
        </Container>
      </section>
    </>
  )
}
