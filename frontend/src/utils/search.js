import { navLinks } from '@/data/navigation'
import { posts } from '@/data/blog'
import { wings } from '@/data/wings'
import { events } from '@/data/events'
import { recentMatches } from '@/data/matches'
import { products } from '@/data/products'

// Everything searchable, built once from the static data files.
const index = [
  ...navLinks.map((l) => ({ type: 'Page', title: l.label, text: '', to: l.to })),
  ...posts.map((p) => ({
    type: 'Blog',
    title: p.title,
    text: `${p.category} ${p.excerpt} ${p.body.join(' ')}`,
    to: `/blog/${p.slug}`,
  })),
  ...wings.map((w) => ({
    type: 'Wing',
    title: w.name,
    text: `${w.base} ${w.districts.join(' ')} ${w.description}`,
    to: `/wings/${w.slug}`,
  })),
  ...recentMatches.map((m) => ({
    type: 'Match',
    title: `${m.home} vs ${m.away}`,
    text: `${m.competition} ${m.venue}`,
    to: `/match/${m.slug}`,
  })),
  ...events.map((e) => ({
    type: 'Event',
    title: e.title,
    text: `${e.category} ${e.venue} ${e.description}`,
    to: '/events',
  })),
  ...products.map((p) => ({ type: 'Product', title: p.name, text: p.category, to: '/shop' })),
].map((item) => ({ ...item, haystack: `${item.title} ${item.text}`.toLowerCase() }))

export function search(query, limit = 12) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  return index
    .filter((i) => terms.every((t) => i.haystack.includes(t)))
    .sort((a, b) => Number(b.title.toLowerCase().includes(terms[0])) - Number(a.title.toLowerCase().includes(terms[0])))
    .slice(0, limit)
}
