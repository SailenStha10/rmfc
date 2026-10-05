import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import { history, historySection } from '@/data/history'

// Vertical timeline: the red line draws itself as you scroll, and each milestone's dot pops in
// while its card slides in from its own side. Cards alternate on desktop and stack to one side on mobile.
export default function HistoryTimeline() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <SectionHeading label={historySection.label} title={historySection.heading} subtitle={historySection.text} />

        <ol ref={ref} className="relative mx-auto max-w-4xl">
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[0.9375rem] top-2 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2"
          />
          <m.span
            aria-hidden="true"
            style={reduce ? undefined : { scaleY: draw }}
            className="absolute bottom-2 left-[0.9375rem] top-2 w-0.5 origin-top bg-primary md:left-1/2 md:-translate-x-1/2"
          />

          {history.map((item, i) => {
            const right = i % 2 === 1
            return (
              <li key={item.year} className="relative pb-10 pl-12 last:pb-0 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
                <m.span
                  aria-hidden="true"
                  initial={reduce ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-30% 0px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className={`absolute left-0 top-5 grid h-8 w-8 place-items-center rounded-full bg-white ring-4 md:left-1/2 md:-translate-x-1/2 ${
                    item.highlight ? 'ring-primary' : 'ring-border'
                  }`}
                >
                  <span className={`h-3 w-3 rounded-full ${item.highlight ? 'bg-primary' : 'bg-accent'}`} />
                </m.span>

                <m.div
                  initial={reduce ? false : { opacity: 0, x: right ? 32 : -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20% 0px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`rounded-2xl p-5 shadow-sm ring-1 md:p-6 ${
                    right ? 'md:col-start-2' : 'md:col-start-1 md:text-right'
                  } ${item.highlight ? 'bg-ink-soft text-white ring-ink-line' : 'bg-secondary ring-border'}`}
                >
                  <p
                    className={`font-display text-5xl leading-none tracking-wide md:text-6xl ${
                      item.highlight ? 'text-white' : 'text-primary'
                    }`}
                  >
                    {item.year}
                  </p>
                  {item.date && (
                    <p
                      className={`mt-1 font-heading text-xs font-bold uppercase tracking-[0.25em] ${
                        item.highlight ? 'text-white/70' : 'text-muted-foreground'
                      }`}
                    >
                      {item.date}
                    </p>
                  )}
                  <h3
                    className={`mt-3 font-display text-2xl uppercase tracking-wide ${
                      item.highlight ? '!text-white' : 'text-accent'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className={`mt-1 text-sm md:text-base ${item.highlight ? 'text-white/75' : 'text-muted-foreground'}`}>
                    {item.text}
                  </p>
                </m.div>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
