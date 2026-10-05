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

export default function LegacyStats() {
  return (
    <section className="bg-accent py-16 md:py-24">
      <Container>
        <SectionHeading label="Legacy" title={legacyHeading} light />
        <ul className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {legacyStats.map((s, i) => {
            const Icon = icons[s.icon]
            return (
              <Reveal as="li" key={s.label} delay={i * 0.1}>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center backdrop-blur-sm">
                  <Icon className="mx-auto mb-3 text-primary" size={36} aria-hidden="true" />
                  <p className="font-heading text-4xl font-black text-white md:text-5xl">
                    <CountUp to={s.value} />
                  </p>
                  <p className="mt-1 text-sm text-white/75">{s.label}</p>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
