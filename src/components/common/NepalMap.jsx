import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { wingMapConfig } from '@/data/wings'
import { MAP_SIZE, geometryToPath, project } from '@/utils/geo'

// Nepal district map. `wings` decides which districts are coloured and which pins show.
export default function NepalMap({ wings, active = null, onActive = () => {} }) {
  const navigate = useNavigate()
  const [features, setFeatures] = useState([])
  const box = useRef(null)

  // The district shapes are ~0.5 MB: only fetch them once the map is about to scroll into view,
  // so they never compete with the page's first paint.
  useEffect(() => {
    const el = box.current
    if (!el) return undefined
    let cancelled = false
    const load = () =>
      fetch(wingMapConfig.geoJsonUrl)
        .then((r) => r.json())
        .then((g) => !cancelled && setFeatures(g.features))
        .catch(() => {})
    if (!('IntersectionObserver' in window)) {
      load()
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect()
          load()
        }
      },
      { rootMargin: '600px' },
    )
    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
    }
  }, [])

  const paths = useMemo(
    () => features.map((f) => ({ name: f.properties.DIST_EN, d: geometryToPath(f.geometry) })),
    [features],
  )
  const owner = useMemo(
    () => Object.fromEntries(wings.flatMap((w) => w.districts.map((d) => [d, w]))),
    [wings],
  )

  const activeWing = wings.find((w) => w.slug === active)
  const tip = activeWing && project([activeWing.coords[1], activeWing.coords[0]])

  return (
    <div ref={box} className="relative overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-sm">
      <svg
        viewBox={`0 0 ${MAP_SIZE.width} ${MAP_SIZE.height}`}
        role="group"
        aria-label="Map of Nepal showing wing locations"
        className="h-auto w-full"
      >
        {paths.map((p) => {
          const w = owner[p.name]
          return (
            <path
              key={p.name}
              d={p.d}
              fill={w ? wingMapConfig.color : '#e5e7eb'}
              fillOpacity={w ? (w.slug === active ? 0.75 : 0.45) : 1}
              stroke="#fff"
              strokeWidth="0.8"
              className={w ? 'cursor-pointer transition-all' : ''}
              onMouseEnter={w ? () => onActive(w.slug) : undefined}
              onMouseLeave={w ? () => onActive(null) : undefined}
              onClick={w ? () => navigate(`/wings/${w.slug}`) : undefined}
            >
              <title>{w ? `${p.name} – ${w.name}` : p.name}</title>
            </path>
          )
        })}
        {wings.map((w) => {
          const [x, y] = project([w.coords[1], w.coords[0]])
          return (
            <Link
              key={w.slug}
              to={`/wings/${w.slug}`}
              aria-label={`${w.name}, ${w.base}`}
              onMouseEnter={() => onActive(w.slug)}
              onMouseLeave={() => onActive(null)}
              onFocus={() => onActive(w.slug)}
              onBlur={() => onActive(null)}
              className="outline-none [&:focus-visible>circle:last-child]:stroke-accent"
            >
              <circle cx={x} cy={y} r="22" fill="transparent" />
              <circle cx={x} cy={y} r="9" fill={wingMapConfig.color} stroke="#fff" strokeWidth="3" />
            </Link>
          )
        })}
      </svg>
      {activeWing && (
        <div
          role="status"
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
          style={{
            left: `${(tip[0] / MAP_SIZE.width) * 100}%`,
            top: `calc(${(tip[1] / MAP_SIZE.height) * 100}% - 8px)`,
          }}
        >
          {activeWing.name}
          <span className="block font-normal text-white/70">{activeWing.base}, Nepal</span>
        </div>
      )}
    </div>
  )
}
