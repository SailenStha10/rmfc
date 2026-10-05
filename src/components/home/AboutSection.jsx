import { ArrowRight } from 'lucide-react'
import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import { about } from '@/data/about'

// Short on purpose: one paragraph, the motto, and a path to the full story.
export default function AboutSection() {
  const [first, second] = about.images
  return (
    <section className="bg-white py-16 md:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="mb-3 flex items-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            <span aria-hidden="true" className="h-0.5 w-8 bg-primary" /> Who We Are
          </p>
          <h2 className="font-display text-4xl uppercase leading-tight tracking-wide text-accent md:text-5xl">
            {about.heading}
          </h2>
          <p className="mt-5 max-w-xl text-muted-foreground">{about.paragraphs[0]}</p>
          <p className="mt-5 font-heading text-lg font-bold text-primary">{about.closing}</p>
          <Button to="/about" variant="ghost" className="-ml-4 mt-4 text-accent">
            Our story <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </Reveal>

        <Reveal delay={0.15} className="relative mx-auto w-full max-w-xl pb-14 pr-10">
          <img
            src={first}
            alt="Madridistas gathered at a Real Madrid fan club event in Nepal"
            loading="lazy"
            width="1024"
            height="768"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
          />
          <img
            src={second}
            alt="Real Madrid Fan Club Nepal community"
            loading="lazy"
            width="1024"
            height="489"
            className="absolute bottom-0 right-0 w-3/5 rounded-2xl border-4 border-white object-cover shadow-xl"
          />
        </Reveal>
      </Container>
    </section>
  )
}
