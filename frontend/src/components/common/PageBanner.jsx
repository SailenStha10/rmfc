import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Container from './Container'
import TitleTrophy from './TitleTrophy'

// Inner-page header in the same deep navy as the landing: breadcrumb, big display title with the trophy,
// description, and a ghosted outline of the title behind. crumbs: [{ label, to? }] between "Home" and the title.
export default function PageBanner({ title, subtitle, crumbs = [] }) {
  const trail = [{ label: 'Home', to: '/' }, ...crumbs, { label: title }]
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-ink to-ink-soft text-white">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 right-6 -z-10 hidden select-none font-display text-[12rem] uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)] lg:block xl:text-[16rem]"
      >
        {title.split(' ')[0]}
      </span>
      <Container className="py-12 md:py-20">
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-1 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            {trail.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1">
                {c.to && i < trail.length - 1 ? (
                  <Link to={c.to} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/90" aria-current={i === trail.length - 1 ? 'page' : undefined}>
                    {c.label}
                  </span>
                )}
                {i < trail.length - 1 && <ChevronRight size={14} aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </nav>
        <div className="flex items-center gap-4 md:gap-6">
          <TitleTrophy className="h-12 md:h-20" />
          <h1 className="font-display text-5xl uppercase leading-none tracking-wide !text-white md:text-7xl">{title}</h1>
        </div>
        {subtitle && (
          <p className="mt-5 max-w-2xl font-heading text-xl font-medium tracking-wide text-white/75 md:text-2xl">
            {subtitle}
          </p>
        )}
      </Container>
      <div aria-hidden="true" className="h-1 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
    </section>
  )
}
