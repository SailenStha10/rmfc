import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import Button from '@/components/common/Button'
import { authMenu, navItems } from '@/data/navigation'

const linkClass = ({ isActive }) =>
  `block rounded-md px-3 py-3 font-heading text-base font-semibold ${
    isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-secondary'
  }`
const subLinkClass = ({ isActive }) =>
  `block rounded-md py-2 pl-8 pr-3 text-sm font-semibold ${
    isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
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
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        id="mobile-menu"
        aria-label="Mobile menu"
        aria-hidden={!open}
        inert={open ? undefined : ''}
        className={`fixed right-0 top-0 z-50 flex h-full w-72 max-w-[85vw] flex-col bg-white p-4 shadow-xl transition-transform duration-300 lg:hidden ${
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
          <hr className="my-3 border-border" />
          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
          <Button to={authMenu.to} className="mt-2 w-full">
            {authMenu.label}
          </Button>
        </nav>
      </aside>
    </>
  )
}
