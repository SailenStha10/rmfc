import { useState } from 'react'
import { Search } from 'lucide-react'
import PageBanner from '@/components/common/PageBanner'
import Container from '@/components/common/Container'
import FilterChips from '@/components/common/FilterChips'
import BlogCard from '@/components/blog/BlogCard'
import { posts } from '@/data/blog'
import Seo from '@/components/common/Seo'

const categories = ['All', ...new Set(posts.map((p) => p.category))]

export default function Blog() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  const shown = posts
    .filter((p) => category === 'All' || p.category === category)
    .filter((p) => !q || `${p.title} ${p.excerpt} ${p.body.join(' ')}`.toLowerCase().includes(q))
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <Seo title="Blog" description="Stories, news and fan journeys from the Nepalese Madridista community." path="/blog" />
      <PageBanner title="Blog" subtitle="Stories, news and fan journeys from the Madridista community." />
      <section className="bg-secondary py-12 md:py-16">
        <Container>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <FilterChips label="Post category" options={categories} value={category} onChange={setCategory} />
            <label className="relative block md:w-72">
              <span className="sr-only">Search posts</span>
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts"
                className="w-full rounded-lg border border-border bg-white py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
          </div>

          {shown.length ? (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {shown.map((p) => (
                <li key={p.slug}>
                  <BlogCard post={p} as="h2" />
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-dashed border-border bg-white py-16 text-center text-muted-foreground">
              No posts found. Try a different search or category.
            </p>
          )}
        </Container>
      </section>
    </>
  )
}
