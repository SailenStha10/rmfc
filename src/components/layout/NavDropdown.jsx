import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const isActivePath = (pathname, to) => (to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`))

// Desktop dropdown. The label is a real link to the parent page; the chevron toggles the menu.
// Opens on hover, focus or click; closes on Esc, outside click and navigation.
export default function NavDropdown({ item, cta = false }) {
  const { pathname } = useLocation()
  const menuId = useId()
  const ref = useRef(null)
  // "open" is tied to the page it was opened on, so navigating closes it without an effect
  const [openOn, setOpenOn] = useState(null)
  const open = openOn === pathname
  const close = () => setOpenOn(null)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && close()
    const onClick = (e) => !ref.current?.contains(e.target) && close()
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  const active = item.children.some((c) => isActivePath(pathname, c.to))

  const labelClass = cta
    ? 'rounded-l-md bg-primary px-4 py-2 font-heading text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90'
    : `py-2 font-heading text-sm font-semibold transition-colors hover:text-primary ${active ? 'text-primary' : 'text-foreground'}`
  const chevronClass = cta
    ? 'rounded-r-md border-l border-white/30 bg-primary px-2 py-2 text-primary-foreground hover:bg-primary/90'
    : `px-1 py-2 hover:text-primary ${active ? 'text-primary' : 'text-foreground'}`

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpenOn(pathname)}
      onMouseLeave={close}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && close()}
    >
      <div className="flex items-center">
        <Link to={item.to} className={labelClass}>
          {item.label}
        </Link>
        <button
          type="button"
          aria-label={`${item.label} menu`}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpenOn(open ? null : pathname)}
          className={chevronClass}
        >
          <ChevronDown size={14} aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <div id={menuId} className={`absolute top-full z-50 pt-2 ${cta ? 'right-0' : 'left-0'} ${open ? '' : 'hidden'}`}>
        <ul className="min-w-44 overflow-hidden rounded-xl border border-border bg-white py-2 shadow-xl">
          {item.children.map((c) => (
            <li key={c.to}>
              <Link
                to={c.to}
                className={`block px-4 py-2.5 font-heading text-sm font-semibold hover:bg-secondary hover:text-primary ${
                  isActivePath(pathname, c.to) ? 'text-primary' : 'text-foreground'
                }`}
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
