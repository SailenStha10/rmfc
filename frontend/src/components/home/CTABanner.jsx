import { Link } from 'react-router-dom'
import { ArrowUpRight, CalendarDays, Shirt, Tv } from 'lucide-react'
import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import { cta } from '@/data/cta'

const icons = { Tv, Shirt, CalendarDays }

export default function CTABanner() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-20 text-white md:py-28">
      <img
        src={cta.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink-soft/70"
      />
      <Container className="grid items-center gap-12 lg:grid-cols-5 lg:gap-16">
        <Reveal className="lg:col-span-3">
          <p className="mb-5 flex items-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
            <span aria-hidden="true" className="h-0.5 w-10 bg-primary" />
            {cta.eyebrow}
          </p>
          <h2 className="font-display text-5xl uppercase leading-[1.02] tracking-wide !text-white md:text-7xl">
            {cta.heading}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/75">{cta.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to={cta.primary.to}>{cta.primary.label}</Button>
            <Button to={cta.secondary.to} variant="outline" className="text-white">
              {cta.secondary.label}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-2">
          <ul className="space-y-3">
            {cta.perks.map((perk) => {
              const Icon = icons[perk.icon]
              return (
                <li key={perk.title}>
                  <Link
                    to={perk.to}
                    className="group flex items-center gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-ink-line transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:ring-primary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-105">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-xl uppercase tracking-wide">
                        {perk.title}
                      </span>
                      <span className="block text-sm text-white/70">{perk.text}</span>
                    </span>
                    <ArrowUpRight
                      size={22}
                      aria-hidden="true"
                      className="text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
