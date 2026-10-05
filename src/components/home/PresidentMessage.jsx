import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import { president } from '@/data/president'

// Mobile order: heading -> photo -> message. Desktop: photo left, heading + message right.
export default function PresidentMessage() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container className="grid gap-x-14 lg:grid-cols-5">
        <Reveal className="lg:col-span-3 lg:col-start-3 lg:row-start-1 lg:self-end">
          <SectionHeading label={president.label} title={president.heading} align="left" />
        </Reveal>

        <Reveal
          delay={0.1}
          className="mx-auto mb-8 w-full max-w-sm lg:col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mb-0 lg:self-center"
        >
          <img
            src={president.image}
            alt={`${president.name}, ${president.title}`}
            loading="lazy"
            width="768"
            height="807"
            className="w-full rounded-2xl object-cover shadow-lg"
          />
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-3 lg:col-start-3 lg:row-start-2">
          <blockquote className="space-y-4 text-muted-foreground">
            {president.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </blockquote>
          <p className="mt-6 font-heading text-lg font-bold text-foreground">{president.name}</p>
          <p className="text-sm text-primary">{president.title}</p>
        </Reveal>
      </Container>
    </section>
  )
}
