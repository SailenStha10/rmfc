import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Badge from '@/components/common/Badge'
import Card from '@/components/common/Card'
import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import { matchSection, recentMatches } from '@/data/matches'
import { formatDate } from '@/utils/formatDate'

export default function MatchSection() {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <Container>
        <SectionHeading label={matchSection.label} title={matchSection.heading} />

        <Reveal className="mx-auto mb-10 max-w-4xl">
          <Card className="border-dashed p-6 text-center text-muted-foreground">
            Next match details will appear here.
          </Card>
        </Reveal>

        <h3 className="mx-auto mb-4 max-w-4xl font-heading text-xl">{matchSection.subheading}</h3>
        <ul className="mx-auto max-w-4xl space-y-3">
          {recentMatches.map((m, i) => (
            <Reveal as="li" key={m.slug} delay={i * 0.06} y={16}>
              <Link
                to={`/match/${m.slug}`}
                className="group block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <Card className="flex flex-col gap-3 p-4 transition-shadow group-hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-5">
                  <div>
                    <Badge>{m.competition}</Badge>
                    <p className="mt-2 font-heading font-semibold text-foreground">
                      {m.home} vs {m.away}
                    </p>
                    <p className="text-sm text-muted-foreground">{formatDate(m.date)}</p>
                  </div>
                  <div className="flex items-center gap-3 sm:justify-end">
                    <span className="rounded-md bg-accent px-4 py-2 font-heading text-lg font-bold text-accent-foreground">
                      {m.score}
                    </span>
                    <ChevronRight
                      size={20}
                      className="hidden text-muted-foreground transition-transform group-hover:translate-x-1 sm:block"
                      aria-hidden="true"
                    />
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
