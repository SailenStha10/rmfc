import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import Container from '@/components/common/Container'
import NepalMap from '@/components/common/NepalMap'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import { wings, wingsSection } from '@/data/wings'

export default function WingsMap() {
  const [active, setActive] = useState(null)

  return (
    <section className="bg-secondary py-16 md:py-24">
      <Container>
        <SectionHeading
          label={wingsSection.label}
          title={wingsSection.heading}
          subtitle={wingsSection.text}
        />
        <Reveal className="grid items-center gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <NepalMap wings={wings} active={active} onActive={setActive} />
          </div>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {wings.map((w) => (
              <li key={w.slug}>
                <Link
                  to={`/wings/${w.slug}`}
                  onMouseEnter={() => setActive(w.slug)}
                  onMouseLeave={() => setActive(null)}
                  className={`flex items-center gap-3 rounded-lg border bg-white px-4 py-3 font-heading text-sm font-semibold transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                    active === w.slug ? 'border-primary text-primary' : 'border-border text-foreground'
                  }`}
                >
                  <MapPin size={16} className="shrink-0 text-primary" aria-hidden="true" />
                  {w.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
