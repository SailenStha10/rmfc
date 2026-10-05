import { useState } from 'react'
import { ChevronDown, Quote } from 'lucide-react'
import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import { president } from '@/data/president'

// Compact: title, portrait + one pull-quote. The complete message opens on demand.
export default function PresidentMessage() {
  const [open, setOpen] = useState(false)
  const id = 'president-full-message'

  return (
    <section className="bg-white py-14 md:py-20">
      <Container>
        <SectionHeading label={president.label} title={president.heading} align="left" compact className="mb-8" />
        <Reveal className="grid items-center gap-8 sm:grid-cols-[13rem_1fr] sm:gap-12">
          <img
            src={president.image}
            alt={`${president.name}, ${president.title}`}
            loading="lazy"
            width="768"
            height="807"
            className="mx-auto aspect-[4/5] w-44 rounded-3xl object-cover object-top shadow-xl sm:w-full"
          />
          <div>
            <blockquote>
              <Quote aria-hidden="true" size={34} className="mb-2 text-primary/40" />
              <p className="font-display text-3xl uppercase leading-tight tracking-wide text-accent md:text-5xl">
                {president.quote}
              </p>
            </blockquote>
            <p className="mt-5 font-heading text-lg font-bold uppercase tracking-[0.12em] text-foreground">
              {president.name}
              <span className="font-medium normal-case tracking-normal text-muted-foreground"> · {president.title}</span>
            </p>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={id}
              onClick={() => setOpen((o) => !o)}
              className="mt-5 inline-flex items-center gap-2 font-heading text-base font-bold uppercase tracking-[0.12em] text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              {open ? 'Hide the full message' : 'Read the full message'}
              <ChevronDown size={18} aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </Reveal>

        <div id={id} hidden={!open} className="mt-8 max-w-4xl space-y-4 border-l-4 border-primary/40 pl-6 text-lg text-muted-foreground">
          {president.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Container>
    </section>
  )
}
