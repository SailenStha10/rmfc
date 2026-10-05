import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import { hero } from '@/data/hero'

// Minimal landing: one deep-navy field, the Champions League trophy, one message, one action.
export default function Hero() {
  return (
    <section aria-label="Welcome" className="relative isolate overflow-hidden bg-gradient-to-b from-ink to-ink-soft text-white">
      {/* soft light behind the trophy (a gradient, so it fades out instead of being clipped) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_45%,rgba(255,255,255,0.09),transparent_55%)]"
      />
      <Container className="grid items-center gap-6 py-10 lg:min-h-[36rem] lg:grid-cols-2 lg:gap-10 lg:py-0">
        <div className="order-2 pb-4 lg:order-1 lg:pb-0">
          <p className="mb-5 flex items-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
            <span aria-hidden="true" className="h-0.5 w-10 bg-primary" />
            {hero.eyebrow}
          </p>
          <h1 className="font-display text-5xl uppercase leading-[1.02] tracking-wide !text-white sm:text-6xl lg:text-7xl">
            {hero.heading}
          </h1>
          <p className="mt-6 max-w-md text-base text-white/75">{hero.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to={hero.primary.to}>{hero.primary.label}</Button>
            <Button to={hero.secondary.to} variant="outline" className="text-white">
              {hero.secondary.label}
            </Button>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <img
            src={hero.image}
            alt={hero.imageAlt}
            width="720"
            height="1080"
            className="float-slow h-72 w-auto select-none object-contain [mask-image:radial-gradient(ellipse_62%_58%_at_50%_50%,#000_60%,transparent_100%)] sm:h-96 lg:h-[34rem]"
          />
        </div>
      </Container>
    </section>
  )
}
