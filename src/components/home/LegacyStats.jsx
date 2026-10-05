import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { Globe, Medal, Trophy } from 'lucide-react'
import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import { legacyHeading, legacyStats } from '@/data/legacy'

const icons = { Trophy, Medal, Globe }

function CountUp({ to }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return undefined
    const controls = animate(0, to, { duration: 1.8, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduce, to])

  return <span ref={ref}>{reduce ? to : n}</span>
}

// Sits directly under the hero: same navy family, big numbers, no boxes.
export default function LegacyStats() {
  return (
    <section className="bg-ink-soft pb-16 pt-8 text-white md:pb-24">
      <Container>
        <SectionHeading label="Legacy" title={legacyHeading} light />
        <ul className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {legacyStats.map((s, i) => {
            const Icon = icons[s.icon]
            return (
              <Reveal
                as="li"
                key={s.label}
                delay={i * 0.1}
                className="px-4 text-center lg:border-l lg:border-ink-line lg:first:border-l-0"
              >
                <Icon className="mx-auto mb-3 text-white/60" size={26} aria-hidden="true" />
                <p className="font-display text-6xl leading-none tracking-wide text-white md:text-8xl">
                  <CountUp to={s.value} />
                </p>
                <p className="mt-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  {s.label}
                </p>
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
