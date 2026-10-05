import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'

const groupOf = (role) => {
  if (role.startsWith('Wing Representative')) return 'Wing Representatives'
  if (role === 'Advisor') return 'Advisors'
  if (role.startsWith('Head of')) return 'Department Heads'
  return 'Executive Committee'
}
const ORDER = ['Executive Committee', 'Department Heads', 'Wing Representatives', 'Advisors']

// Members are grouped by role, and every group is a centred row-wrap of identical cards,
// so an incomplete last row is centred instead of leaving a lone card at the edge.
export default function TeamGrid({ team }) {
  const groups = ORDER.map((title) => ({
    title,
    members: team.members.filter((m) => groupOf(m.role) === title),
  })).filter((g) => g.members.length)

  return (
    <section className="bg-secondary py-16 md:py-24">
      <Container>
        <SectionHeading label={team.label} title={team.heading} subtitle={team.text} />
        <div className="space-y-14 md:space-y-16">
          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="mb-8 flex items-center gap-4 font-display text-2xl font-normal uppercase tracking-[0.15em] text-accent">
                <span aria-hidden="true" className="h-0.5 flex-1 bg-border" />
                {g.title}
                <span className="font-heading text-base font-bold tracking-widest text-primary">
                  {String(g.members.length).padStart(2, '0')}
                </span>
                <span aria-hidden="true" className="h-0.5 flex-1 bg-border" />
              </h3>
              <ul className="flex flex-wrap justify-center gap-5">
                {g.members.map((m, i) => (
                  <Reveal
                    as="li"
                    key={m.name}
                    delay={(i % 4) * 0.06}
                    y={16}
                    className="w-[calc(50%-0.625rem)] sm:w-[calc(33.333%-0.84rem)] lg:w-[calc(25%-0.95rem)] xl:w-[calc(20%-1rem)]"
                  >
                    <figure className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/40">
                      <div className="aspect-[4/5] overflow-hidden bg-secondary">
                        <img
                          src={m.photo}
                          alt={m.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <figcaption className="flex min-h-[5.5rem] flex-col items-center justify-center px-3 py-4 text-center">
                        <p className="font-display text-xl uppercase leading-tight tracking-wide text-accent">{m.name}</p>
                        <p className="mt-1 text-sm leading-snug text-muted-foreground">{m.role}</p>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
