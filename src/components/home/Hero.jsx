import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '@/components/common/Button'
import { heroSlides } from '@/data/hero'

const INTERVAL = 2000 // each slide stays for 2 seconds

// Same navy as the page background: solid under the text, fading away to reveal the photo on the right.
const FADE_DESKTOP =
  'linear-gradient(to right, #060a1c 0%, #060a1c 42%, rgba(6,10,28,0.92) 52%, rgba(6,10,28,0.55) 66%, rgba(6,10,28,0.15) 82%, rgba(6,10,28,0) 100%)'
const FADE_MOBILE =
  'linear-gradient(to bottom, rgba(6,10,28,0.15) 0%, rgba(6,10,28,0.7) 28%, #060a1c 52%)'

// The trophy is 82% of the hero height (a 62:100 image) and is pushed half its own width off the left edge,
// so the screen cuts it in two. HALF_TROPHY = the visible half, used to inset the text.
const HERO_H = '(100svh - 5.25rem)'
const TROPHY_H = `calc(${HERO_H} * 0.82)`
const HALF_TROPHY = `calc(${HERO_H} * 0.82 * 0.31)`

const arrowClass =
  'absolute top-[22svh] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:h-11 sm:w-11 lg:top-1/2 lg:h-14 lg:w-14'

// Full-screen landing: the photo spans the whole hero and the message sits on a solid navy area that
// fades into the photo. Translucent arrows sit mid-height on each edge. Autoplay pauses on hover /
// keyboard focus and is off for reduced-motion users.
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
      className="relative isolate flex min-h-[calc(100svh-5.25rem)] overflow-hidden bg-ink text-white"
      style={{ '--trophy-half': HALF_TROPHY }}
    >
      <h1 className="sr-only">Real Madrid Fan Club Nepal</h1>

      {/* photos: full width, crossfading */}
      <div className="absolute inset-0 -z-20 grid">
        {heroSlides.map((s, i) => (
          <img
            key={s.image}
            src={s.image}
            srcSet={s.srcSet}
            sizes={s.srcSet ? '100vw' : undefined}
            alt={s.alt}
            width="1600"
            height="1100"
            loading={i === 0 ? 'eager' : 'lazy'}
            aria-hidden={i !== index}
            className={`h-full w-full object-cover object-[70%_center] transition-all duration-700 ease-out [grid-area:1/1] lg:object-center ${
              i === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
            }`}
          />
        ))}
      </div>
      {/* solid navy under the text, fading out to the photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 lg:hidden"
        style={{ background: FADE_MOBILE }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden lg:block"
        style={{ background: FADE_DESKTOP }}
      />

      {/* UEFA Champions League trophy: only its right half shows, cut by the screen edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden items-center lg:flex"
      >
        <div className="absolute left-0 top-1/2 h-[70%] w-[70%] -translate-x-1/3 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="-translate-x-1/2">
          <img
            src="/images/hero/ucl-trophy.webp"
            alt=""
            width="620"
            height="1000"
            className="float-slow w-auto select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            style={{ height: TROPHY_H }}
          />
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
        className={`${arrowClass} left-3 sm:left-5 lg:left-8`}
      >
        <ChevronLeft className="h-5 w-5 lg:h-7 lg:w-7" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(index + 1)}
        className={`${arrowClass} right-3 sm:right-5 lg:right-8`}
      >
        <ChevronRight className="h-5 w-5 lg:h-7 lg:w-7" />
      </button>

      {/* message: sits in the solid area, ends before the photo takes over */}
      <div className="relative z-10 flex w-full items-end px-6 pb-12 pt-[40svh] sm:px-16 lg:w-[62%] lg:items-center lg:pb-16 lg:pl-[calc(var(--trophy-half)+2.75rem)] lg:pr-12 lg:pt-16">
        <div className="grid w-full max-w-2xl">
          {heroSlides.map((s, i) => (
            <div
              key={s.heading}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
              inert={i === index ? undefined : ''}
              className={`self-center transition-all duration-500 [grid-area:1/1] ${
                i === index
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-4 opacity-0'
              }`}
            >
              <p className="mb-4 flex items-center gap-3 font-heading text-[clamp(0.75rem,0.9vw+0.4rem,0.95rem)] font-bold uppercase tracking-[0.3em] text-white/70 md:mb-5">
                <span aria-hidden="true" className="h-0.5 w-8 bg-primary md:w-10" />
                {s.eyebrow}
              </p>
              <h2 className="font-display text-[clamp(2.4rem,3.7vw+0.7rem,4.75rem)] uppercase leading-[1.03] tracking-wide !text-white">
                {s.heading}
              </h2>
              <p className="mt-5 max-w-lg font-heading text-[clamp(1.1rem,1.1vw+0.7rem,1.6rem)] font-medium leading-snug tracking-wide text-white/75 md:mt-6">
                {s.text}
              </p>
              <div className="mt-7 md:mt-9">
                <Button to={s.to}>{s.cta}</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
