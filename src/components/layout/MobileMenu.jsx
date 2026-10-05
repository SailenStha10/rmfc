import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { authLinks, navLinks } from '@/data/navigation'

const linkClass = ({ isActive }) =>
  `block rounded-md px-3 py-3 font-heading text-base font-semibold ${
    isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-secondary'
  }`

export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity xl:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        id="mobile-menu"
        aria-label="Mobile menu"
        aria-hidden={!open}
        inert={open ? undefined : ''}
        className={`fixed right-0 top-0 z-50 flex h-full w-72 max-w-[85vw] flex-col bg-white p-4 shadow-xl transition-transform duration-300 xl:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="mb-4 self-end rounded-md p-2 hover:bg-secondary"
        >
          <X size={24} />
        </button>
        <nav aria-label="Mobile" className="flex flex-col gap-1 overflow-y-auto">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <hr className="my-3 border-border" />
          {authLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
