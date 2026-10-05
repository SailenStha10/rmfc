import { site } from '@/data/site'

// Bold, scrolling club motto. Decorative repeats are hidden from assistive tech.
export default function StatementBand() {
  const text = site.tagline.toUpperCase()
  return (
    <section aria-label={site.tagline} className="overflow-hidden border-b border-border bg-white py-6 md:py-8">
      <p className="sr-only">{site.tagline}</p>
      <div aria-hidden="true" className="marquee flex w-max select-none whitespace-nowrap">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="flex items-center">
                <span className="font-display text-5xl tracking-wide text-accent md:text-7xl">{text}</span>
                <span className="mx-6 h-3 w-3 rotate-45 bg-primary md:mx-10 md:h-4 md:w-4" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
