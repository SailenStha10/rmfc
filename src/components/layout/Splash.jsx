import { useEffect, useState } from 'react'
import { site } from '@/data/site'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const preload = (src) =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = img.onerror = resolve
    img.src = src
  })

// The club logo, shown whole, then split down the middle: each half slides away to reveal the site.
function LogoHalf({ side }) {
  const left = side === 'left'
  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* a full-width layer, so the left and right panels show the two halves of the same logo */}
      <div className={`absolute top-0 flex h-full w-screen items-center justify-center ${left ? 'left-0' : 'right-0'}`}>
        <div className="splash-rise flex h-52 w-52 items-center justify-center rounded-full bg-white p-3 shadow-2xl ring-4 ring-white/10 sm:h-72 sm:w-72 sm:p-4 md:h-80 md:w-80">
          <img src={site.logo} alt="" width="600" height="359" className="h-full w-full object-contain" />
        </div>
      </div>
    </div>
  )
}

// Loading screen: plays on every full page load / refresh (in-app navigation never reloads, so it never replays
// mid-browsing). Waits for the logo, never longer than a few seconds.
export default function Splash() {
  const [phase, setPhase] = useState('show') // show -> open -> gone

  // 1) while showing: wait for a minimum time and the logo, then split open
  useEffect(() => {
    if (phase !== 'show') return undefined
    let cancelled = false
    const minimum = new Promise((r) => setTimeout(r, reducedMotion() ? 500 : 1700))
    const assets = Promise.race([preload(site.logo), new Promise((r) => setTimeout(r, 4000))])
    document.body.style.overflow = 'hidden'
    Promise.all([minimum, assets]).then(() => !cancelled && setPhase('open'))
    return () => {
      cancelled = true
    }
  }, [phase])

  // 2) once open: let the split animation finish, then remove the overlay for good
  useEffect(() => {
    if (phase !== 'open') return undefined
    document.body.style.overflow = ''
    const t = setTimeout(
      () => {
        setPhase('gone')
      },
      reducedMotion() ? 100 : 900,
    )
    return () => clearTimeout(t)
  }, [phase])

  if (phase === 'gone') return null

  const open = phase === 'open'
  const slide = 'transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]'

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className={`fixed inset-0 z-[100] overflow-hidden ${open ? 'pointer-events-none' : ''}`}
    >
      <span className="sr-only">Loading {site.fullName}</span>

      <div className={`absolute inset-y-0 left-0 w-1/2 ${slide} ${open ? '-translate-x-full' : ''}`}>
        <LogoHalf side="left" />
      </div>
      <div className={`absolute inset-y-0 right-0 w-1/2 ${slide} ${open ? 'translate-x-full' : ''}`}>
        <LogoHalf side="right" />
      </div>

      <div
        aria-hidden="true"
        className={`absolute bottom-10 left-1/2 w-44 -translate-x-1/2 text-center transition-opacity duration-300 ${open ? 'opacity-0' : ''}`}
      >
        <p className="mb-3 font-display text-lg uppercase tracking-[0.3em] text-white/80">{site.name}</p>
        <div className="h-0.5 overflow-hidden bg-white/15">
          <div className="splash-bar h-full bg-primary" />
        </div>
      </div>
    </div>
  )
}
