import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'

export default function TeamGrid({ team }) {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <Container>
        <SectionHeading label={team.label} title={team.heading} subtitle={team.text} />
        <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {team.members.map((m, i) => (
            <Reveal as="li" key={m.name} delay={(i % 4) * 0.06} y={16}>
              <figure className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <div className="aspect-[4/5] overflow-hidden bg-secondary">
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <figcaption className="p-5 text-center">
                  <p className="font-heading text-lg font-bold text-foreground">{m.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
