import { useState } from 'react'
import { Search } from 'lucide-react'
import PageBanner from '@/components/common/PageBanner'
import Container from '@/components/common/Container'
import EventCard from '@/components/common/EventCard'
import { eventCategories, events } from '@/data/events'
import Seo from '@/components/common/Seo'

const timeTabs = ['Upcoming', 'Past']
const today = new Date().toISOString().slice(0, 10)

const tabClass = (on) =>
  `rounded-full px-4 py-2 font-heading text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
    on ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-border'
  }`

export default function Events() {
  const [category, setCategory] = useState('All')
  const [when, setWhen] = useState('Upcoming')
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const shown = events
    .filter((e) => (when === 'Upcoming' ? e.date >= today : e.date < today))
    .filter((e) => category === 'All' || e.category === category)
    .filter((e) => !q || `${e.title} ${e.venue} ${e.description}`.toLowerCase().includes(q))
    .sort((a, b) => (when === 'Upcoming' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)))

  return (
    <>
      <Seo title="Events" description="Futsal tournaments, meetups and match screenings organised by Real Madrid Fan Club Nepal." path="/events" />
      <PageBanner title="Events" subtitle="Futsal, meetups and match screenings with fellow Madridistas." />
      <section className="bg-white py-12 md:py-16">
        <Container>
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div role="tablist" aria-label="Event timing" className="flex gap-2">
              {timeTabs.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={when === t}
                  onClick={() => setWhen(t)}
                  className={tabClass(when === t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Event category">
              {eventCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                  className={tabClass(category === c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="relative block lg:w-64">
              <span className="sr-only">Search events</span>
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events"
                className="w-full rounded-lg border border-border bg-secondary/50 py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
          </div>

          {shown.length ? (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {shown.map((e) => (
                <li key={e.slug}>
                  <EventCard event={e} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed border-border py-16 text-center">
              <p className="font-heading text-lg font-semibold text-foreground">No events found.</p>
              <p className="mt-1 text-muted-foreground">
                Try clearing the search or selecting another category.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
