import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'

export default function FactsStrip({ facts }) {
  return (
    <section className="border-y border-border bg-white py-10">
      <Container>
        <ul className="grid grid-cols-2 gap-6 text-center md:grid-cols-5">
          {facts.map((f, i) => (
            <Reveal as="li" key={f.label} delay={i * 0.07} y={12}>
              <p className="font-heading text-2xl font-black text-primary md:text-3xl">{f.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{f.label}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
