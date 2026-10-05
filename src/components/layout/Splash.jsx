import { useEffect, useState } from 'react'
import { site } from '@/data/site'

const KEY = 'rmfc-splash'
const CROWN = '/images/brand/crown.webp'
const TROPHY = '/images/hero/ucl-trophy.webp'

const seenAlready = () => {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const preload = (src) =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = img.onerror = resolve
    img.src = src
  })

// Loading screen: two halves (club crown | Champions League trophy) that slide apart to reveal the site.
// Shown once per browser session; waits for the artwork to load, never longer than a few seconds.
export default function Splash() {
  const [phase, setPhase] = useState(() => (seenAlready() ? 'gone' : 'show')) // show -> open -> gone

  // 1) while showing: wait for a minimum time and the artwork, then open the panels
  useEffect(() => {
    if (phase !== 'show') return undefined
    let cancelled = false
    const minimum = new Promise((r) => setTimeout(r, reducedMotion() ? 500 : 1700))
    const assets = Promise.race([
      Promise.all([preload(CROWN), preload(TROPHY)]),
      new Promise((r) => setTimeout(r, 4000)),
    ])
    document.body.style.overflow = 'hidden'
    Promise.all([minimum, assets]).then(() => !cancelled && setPhase('open'))
    return () => {
      cancelled = true
    }
  }, [phase])

  // 2) once open: let the slide-away animation finish, then remove the overlay for good
  useEffect(() => {
    if (phase !== 'open') return undefined
    document.body.style.overflow = ''
    const t = setTimeout(
      () => {
        try {
          sessionStorage.setItem(KEY, '1')
        } catch {
          /* private mode: it will simply show again next visit */
        }
        setPhase('gone')
      },
      reducedMotion() ? 100 : 900,
    )
    return () => clearTimeout(t)
  }, [phase])

  if (phase === 'gone') return null

  const open = phase === 'open'
  const panel =
    'absolute top-0 flex h-full w-1/2 items-center transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]'

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className={`fixed inset-0 z-[100] overflow-hidden ${open ? 'pointer-events-none' : ''}`}
    >
      <span className="sr-only">Loading {site.fullName}</span>

      <div className={`${panel} left-0 justify-end bg-ink pr-3 sm:pr-6 ${open ? '-translate-x-full' : ''}`}>
        <img src={CROWN} alt="" width="480" height="324" className="splash-rise w-32 sm:w-52 md:w-64" />
      </div>
      <div className={`${panel} right-0 justify-start bg-ink-soft pl-3 sm:pl-6 ${open ? 'translate-x-full' : ''}`}>
        <img
          src={TROPHY}
          alt=""
          width="720"
          height="1080"
          className="splash-rise h-44 w-auto sm:h-72 md:h-96"
          style={{ animationDelay: '0.15s' }}
        />
      </div>

      {/* seam + progress line */}
      <div
        aria-hidden="true"
        className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/15 transition-opacity duration-300 ${open ? 'opacity-0' : ''}`}
      />
      <div
        aria-hidden="true"
        className={`absolute bottom-10 left-1/2 w-40 -translate-x-1/2 text-center transition-opacity duration-300 ${open ? 'opacity-0' : ''}`}
      >
        <p className="mb-3 font-display text-lg uppercase tracking-[0.3em] text-white/80">{site.name}</p>
        <div className="h-0.5 overflow-hidden bg-white/15">
          <div className="splash-bar h-full bg-primary" />
        </div>
      </div>
    </div>
  )
}
