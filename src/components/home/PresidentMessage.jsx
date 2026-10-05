import { useState } from 'react'
import { ChevronDown, Quote } from 'lucide-react'
import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import { president } from '@/data/president'

// Compact: portrait + one pull-quote. The complete message opens on demand.
export default function PresidentMessage() {
  const [open, setOpen] = useState(false)
  const id = 'president-full-message'

  return (
    <section className="bg-white py-14 md:py-20">
      <Container className="max-w-4xl">
        <Reveal className="grid items-center gap-6 sm:grid-cols-[11rem_1fr] sm:gap-10">
          <div className="sm:order-1">
            <p className="mb-3 flex items-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-primary sm:hidden">
              <span aria-hidden="true" className="h-0.5 w-8 bg-primary" /> {president.label}
            </p>
            <h2 className="mb-4 font-display text-3xl uppercase tracking-wide text-accent sm:hidden">
              {president.heading}
            </h2>
            <img
              src={president.image}
              alt={`${president.name}, ${president.title}`}
              loading="lazy"
              width="768"
              height="807"
              className="mx-auto aspect-[4/5] w-40 rounded-2xl object-cover object-top shadow-md sm:w-full"
            />
          </div>

          <div className="sm:order-2">
            <p className="mb-3 hidden items-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-primary sm:flex">
              <span aria-hidden="true" className="h-0.5 w-8 bg-primary" /> {president.label}
            </p>
            <h2 className="mb-5 hidden font-display text-3xl uppercase tracking-wide text-accent sm:block md:text-4xl">
              {president.heading}
            </h2>
            <blockquote className="relative">
              <Quote aria-hidden="true" size={28} className="mb-2 text-primary/30" />
              <p className="font-heading text-xl font-bold leading-snug text-foreground md:text-2xl">
                {president.quote}
              </p>
            </blockquote>
            <p className="mt-4 font-heading text-sm font-bold text-foreground">
              {president.name} <span className="font-normal text-muted-foreground">· {president.title}</span>
            </p>

            <button
              type="button"
              aria-expanded={open}
              aria-controls={id}
              onClick={() => setOpen((o) => !o)}
              className="mt-4 inline-flex items-center gap-2 font-heading text-sm font-semibold text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              {open ? 'Hide the full message' : 'Read the full message'}
              <ChevronDown size={16} aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </Reveal>

        <div id={id} hidden={!open} className="mt-8 space-y-4 border-l-2 border-primary/40 pl-5 text-muted-foreground">
          {president.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Container>
    </section>
  )
}
