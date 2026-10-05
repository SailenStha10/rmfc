import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Container from '@/components/common/Container'
import NepalMap from '@/components/common/NepalMap'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import { wings, wingsSection } from '@/data/wings'

// Dark, like the landing: red districts on a navy map, wings listed as numbered rows.
export default function WingsMap() {
  const [active, setActive] = useState(null)

  return (
    <section className="bg-gradient-to-b from-ink-soft to-ink py-16 text-white md:py-24">
      <Container>
        <SectionHeading label={wingsSection.label} title={wingsSection.heading} subtitle={wingsSection.text} light />
        <Reveal className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <NepalMap wings={wings} active={active} onActive={setActive} dark />
          <ul className="divide-y divide-ink-line rounded-3xl bg-white/5 px-2 ring-1 ring-ink-line">
            {wings.map((w, i) => (
              <li key={w.slug}>
                <Link
                  to={`/wings/${w.slug}`}
                  onMouseEnter={() => setActive(w.slug)}
                  onMouseLeave={() => setActive(null)}
                  className="group flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span
                    className={`w-8 font-display text-2xl leading-none transition-colors ${
                      active === w.slug ? 'text-primary' : 'text-white/30'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-xl uppercase tracking-wide text-white">{w.name}</span>
                    <span className="block text-sm text-white/60">
                      {w.base} · {w.members} members
                    </span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    aria-hidden="true"
                    className="text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
