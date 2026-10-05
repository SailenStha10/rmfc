import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import Button from '@/components/common/Button'
import { authMenu, navItems } from '@/data/navigation'

const linkClass = ({ isActive }) =>
  `block border-l-[3px] px-4 py-3 font-display text-lg uppercase tracking-[0.1em] ${
    isActive ? 'border-primary bg-primary/5 text-primary' : 'border-transparent text-accent hover:bg-secondary'
  }`
const subLinkClass = ({ isActive }) =>
  `block border-l-[3px] py-2 pl-9 pr-4 font-heading text-lg font-semibold uppercase tracking-[0.08em] ${
    isActive ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-primary'
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
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        id="mobile-menu"
        aria-label="Mobile menu"
        aria-hidden={!open}
        inert={open ? undefined : ''}
        className={`fixed right-0 top-0 z-50 flex h-full w-80 max-w-[88vw] flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between bg-gradient-to-r from-ink to-ink-soft px-5 py-4 text-white">
          <span className="font-display text-xl uppercase tracking-[0.2em]">Menu</span>
          <button type="button" aria-label="Close menu" onClick={onClose} className="rounded-md p-1.5 hover:bg-white/10">
            <X size={22} />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-1 flex-col gap-0.5 overflow-y-auto py-3">
          {navItems.map((item) => (
            <div key={item.label}>
              <NavLink to={item.to} end={item.to === '/'} className={linkClass}>
                {item.label}
              </NavLink>
              {item.children
                ?.filter((c) => c.to !== item.to)
                .map((c) => (
                  <NavLink key={c.to} to={c.to} className={subLinkClass}>
                    {c.label}
                  </NavLink>
                ))}
            </div>
          ))}
        </nav>
        <div className="space-y-2 border-t border-border p-4">
          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
          <Button to={authMenu.to} className="w-full">
            {authMenu.label}
          </Button>
        </div>
      </aside>
    </>
  )
}
