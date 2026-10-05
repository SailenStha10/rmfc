import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '@/components/common/Button'
import { heroSlides } from '@/data/hero'

const INTERVAL = 2000 // each slide stays for 2 seconds

// Full-screen landing split 50 / 50: message on the left, photo filling the whole right half.
// It fills the viewport under the header, so nothing from the next section peeks in.
// Autoplay pauses on hover / keyboard focus and is off for reduced-motion users.
export default function Hero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const count = heroSlides.length
  const go = (i) => setIndex((i + count) % count)

  useEffect(() => {
    if (paused || reduce) return undefined
    const id = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL)
    return () => clearInterval(id)
  }, [paused, reduce, count])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative isolate overflow-hidden bg-gradient-to-b from-ink to-ink-soft text-white"
    >
      <h1 className="sr-only">Real Madrid Fan Club Nepal</h1>

      <div className="grid min-h-[calc(100svh-5.25rem)] lg:grid-cols-2">
        {/* photo half (on top for small screens) */}
        <div className="relative order-1 min-h-[40svh] lg:order-2 lg:min-h-0">
          <div className="absolute inset-0 grid bg-ink">
            {heroSlides.map((s, i) => (
              <img
                key={s.image}
                src={s.image}
                srcSet={s.srcSet}
                sizes={s.srcSet ? '(min-width: 1024px) 50vw, 100vw' : undefined}
                alt={s.alt}
                width="1600"
                height="1100"
                loading={i === 0 ? 'eager' : 'lazy'}
                aria-hidden={i !== index}
                className={`[grid-area:1/1] h-full w-full object-cover transition-all duration-700 ease-out ${
                  i === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                }`}
              />
            ))}
          </div>
          {/* soft navy edge where the photo meets the text half */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-ink/70 lg:via-transparent lg:to-transparent"
          />
        </div>

        {/* message half */}
        <div className="order-2 flex items-center px-5 py-12 sm:px-8 lg:order-1 lg:py-16 lg:pl-12 lg:pr-14 xl:pl-16 xl:pr-20">
          <div className="w-full max-w-2xl">
            <div className="grid">
              {heroSlides.map((s, i) => (
                <div
                  key={s.heading}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}`}
                  aria-hidden={i !== index}
                  inert={i === index ? undefined : ''}
                  className={`[grid-area:1/1] transition-all duration-500 ${
                    i === index ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
                  }`}
                >
                  <p className="mb-5 flex items-center gap-3 font-heading text-sm font-bold uppercase tracking-[0.3em] text-white/70">
                    <span aria-hidden="true" className="h-0.5 w-10 bg-primary" />
                    {s.eyebrow}
                  </p>
                  <h2 className="font-display text-5xl uppercase leading-[1.02] tracking-wide !text-white sm:text-6xl xl:text-7xl">
                    {s.heading}
                  </h2>
                  <p className="mt-6 max-w-lg font-heading text-xl font-medium tracking-wide text-white/75 md:text-2xl">
                    {s.text}
                  </p>
                  <div className="mt-8">
                    <Button to={s.to}>{s.cta}</Button>
                  </div>
                </div>
              ))}
            </div>

            {/* slide controls: quiet, same navy */}
            <div className="mt-10 flex items-center gap-5">
              <div className="flex items-center gap-2" role="group" aria-label="Choose slide">
                {heroSlides.map((s, i) => (
                  <button
                    key={s.heading}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index}
                    onClick={() => setIndex(i)}
                    className="group flex h-6 w-12 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <span
                      className={`block h-1 w-full rounded-full transition-colors ${
                        i === index ? 'bg-primary' : 'bg-white/25 group-hover:bg-white/50'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span aria-hidden="true" className="whitespace-nowrap font-display text-xl tracking-widest text-white/60">
                0{index + 1}
                <span className="text-white/30"> / 0{count}</span>
              </span>
              <div className="ml-auto flex gap-2 lg:ml-6">
                {[
                  { label: 'Previous slide', Icon: ChevronLeft, to: index - 1 },
                  { label: 'Next slide', Icon: ChevronRight, to: index + 1 },
                ].map(({ label, Icon, to }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    onClick={() => go(to)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-primary hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
