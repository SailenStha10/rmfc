import { useState } from 'react'
import PageBanner from '@/components/common/PageBanner'
import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import NepalMap from '@/components/common/NepalMap'
import WingCard from '@/components/about/WingCard'
import { wings, wingsPage, wingsSection } from '@/data/wings'

export default function Wings() {
  const [active, setActive] = useState(null)
  const [sort, setSort] = useState('members')
  const sorted = [...wings].sort((a, b) =>
    sort === 'members' ? b.members - a.members : b.founded - a.founded,
  )

  return (
    <>
      <PageBanner title="Wings" subtitle={wingsPage.text} />
      <section className="bg-secondary py-16">
        <Container>
          <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
            {wingsSection.text}
          </p>
          <div className="mx-auto max-w-4xl">
            <NepalMap wings={wings} active={active} onActive={setActive} />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-2xl">{wingsPage.heading}</h2>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-md border border-border bg-white px-3 py-2 text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <option value="members">Most Members</option>
                <option value="newest">Newest</option>
              </select>
            </label>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((w, i) => (
              <Reveal as="li" key={w.slug} delay={(i % 3) * 0.08} y={16}>
                <WingCard wing={w} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
