import { useState } from 'react'
import PageBanner from '@/components/common/PageBanner'
import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import NepalMap from '@/components/common/NepalMap'
import WingCard from '@/components/about/WingCard'
import { wings, wingsPage, wingsSection } from '@/data/wings'
import Seo from '@/components/common/Seo'

export default function Wings() {
  const [active, setActive] = useState(null)
  const [sort, setSort] = useState('members')
  const sorted = [...wings].sort((a, b) =>
    sort === 'members' ? b.members - a.members : b.founded - a.founded,
  )

  return (
    <>
      <Seo title="Wings" description="Explore the seven regional wings of Real Madrid Fan Club Nepal: Kathmandu, Pokhara, Chitwan, Nuwakot, Province 1, Butwal and Jumla." path="/wings" />
      <PageBanner title="Wings" subtitle={wingsPage.text} />
      <section className="bg-gradient-to-b from-ink-soft to-ink py-14 md:py-20">
        <Container>
          <SectionHeading label={wingsSection.label} title={wingsSection.heading} subtitle={wingsSection.text} light />
          <div className="mx-auto max-w-5xl">
            <NepalMap wings={wings} active={active} onActive={setActive} dark />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading label="Regional fan groups" title={wingsPage.heading} align="left" compact className="mb-0" />
            <label className="flex items-center gap-3 font-heading text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground">
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-md border-2 border-border bg-white px-3 py-2 font-heading text-base font-semibold normal-case tracking-normal text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <option value="members">Most Members</option>
                <option value="newest">Newest</option>
              </select>
            </label>
          </div>
          <ul className="flex flex-wrap justify-center gap-6">
            {sorted.map((w, i) => (
              <Reveal
                as="li"
                key={w.slug}
                delay={(i % 4) * 0.08}
                y={16}
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]"
              >
                <WingCard wing={w} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
