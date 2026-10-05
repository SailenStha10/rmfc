import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'

// Key facts as one navy band: huge display figures, quiet labels.
export default function FactsStrip({ facts }) {
  return (
    <section className="bg-gradient-to-b from-ink to-ink-soft py-12 text-white md:py-16">
      <Container>
        <ul className="grid grid-cols-2 gap-y-8 text-center md:grid-cols-5">
          {facts.map((f, i) => (
            <Reveal
              as="li"
              key={f.label}
              delay={i * 0.07}
              y={12}
              className="flex flex-col items-center px-3 md:border-l md:border-ink-line md:first:border-l-0"
            >
              <p className="whitespace-nowrap font-display text-3xl leading-none tracking-wide text-white md:text-3xl lg:text-4xl xl:text-5xl">{f.value}</p>
              <p className="mt-3 max-w-[14rem] font-heading text-sm font-bold uppercase tracking-[0.2em] text-white/65">{f.label}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
