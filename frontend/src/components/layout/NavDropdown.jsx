import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { isActivePath, navLinkClass } from './navStyles'

// Desktop dropdown. The label is a real link to the parent page; the chevron toggles the menu.
// Opens on hover, focus or click; closes on Esc, outside click and navigation.
// `cta` renders the Register button: one pill, one height, with a sliding navy fill on hover.
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
  const toggle = () => setOpenOn(open ? null : pathname)

  const trigger = cta ? (
    <div className="group/cta relative isolate flex h-11 items-stretch overflow-hidden rounded-md bg-primary text-primary-foreground shadow-md transition-shadow hover:shadow-lg">
      {/* navy fill sweeps in from the left on hover / keyboard focus */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 -translate-x-full bg-accent transition-transform duration-300 ease-out group-focus-within/cta:translate-x-0 group-hover/cta:translate-x-0"
      />
      <Link to={item.to} className="flex items-center px-5 font-display text-[0.95rem] uppercase tracking-[0.12em]">
        {item.label}
      </Link>
      <button
        type="button"
        aria-label={`${item.label} menu`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={toggle}
        className="flex w-10 items-center justify-center border-l border-white/25"
      >
        <ChevronDown size={16} aria-hidden="true" className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-0.5">
      <Link to={item.to} className={navLinkClass(active)}>
        {item.label}
      </Link>
      <button
        type="button"
        aria-label={`${item.label} menu`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={toggle}
        className={`px-0.5 py-2 transition-colors hover:text-primary ${active ? 'text-primary' : 'text-accent'}`}
      >
        <ChevronDown size={14} aria-hidden="true" className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
    </div>
  )

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpenOn(pathname)}
      onMouseLeave={close}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && close()}
    >
      {trigger}
      {/* the CTA menu is exactly as wide as the button; plain menus size to their content */}
      <div id={menuId} className={`absolute top-full z-50 pt-3 ${cta ? 'inset-x-0' : 'left-1/2 -translate-x-1/2'} ${open ? '' : 'hidden'}`}>
        <ul className={`overflow-hidden rounded-xl border-t-2 border-primary bg-white py-2 shadow-2xl ring-1 ring-black/5 ${cta ? '' : 'min-w-48'}`}>
          {item.children.map((c) => {
            const here = isActivePath(pathname, c.to)
            return (
              <li key={c.to}>
                <Link
                  to={c.to}
                  className={`block border-l-[3px] px-5 py-2.5 font-display text-[0.9rem] uppercase tracking-[0.1em] transition-all hover:border-primary hover:bg-secondary hover:pl-6 hover:text-primary ${
                    here ? 'border-primary text-primary' : 'border-transparent text-accent'
                  }`}
                >
                  {c.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
