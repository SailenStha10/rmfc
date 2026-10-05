import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Container from './Container'

// crumbs: [{ label, to? }] shown between "Home" and the page title
export default function PageBanner({ title, subtitle, crumbs = [] }) {
  return (
    <section className="bg-gradient-to-br from-accent to-[hsl(348_70%_28%)] py-14 text-white md:py-20">
      <Container className="text-center">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/70">
          <ol className="flex flex-wrap items-center justify-center gap-1">
            {[{ label: 'Home', to: '/' }, ...crumbs, { label: title }].map((c, i, all) => (
              <li key={c.label} className="flex items-center gap-1">
                {c.to && i < all.length - 1 ? (
                  <Link to={c.to} className="hover:text-white hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current={i === all.length - 1 ? 'page' : undefined}>{c.label}</span>
                )}
                {i < all.length - 1 && <ChevronRight size={14} aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-4xl !text-white md:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-white/80">{subtitle}</p>}
      </Container>
    </section>
  )
}
