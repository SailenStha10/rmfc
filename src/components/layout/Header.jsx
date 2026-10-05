import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Search, ShoppingCart } from 'lucide-react'
import Container from '@/components/common/Container'
import MobileMenu from './MobileMenu'
import { useCart } from '@/hooks/useCart'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { authLinks, navLinks } from '@/data/navigation'
import { site } from '@/data/site'

const linkClass = ({ isActive }) =>
  `font-heading text-sm font-semibold transition-colors hover:text-primary ${
    isActive ? 'text-primary' : 'text-foreground'
  }`

export default function Header() {
  const { pathname } = useLocation()
  // menu is "open" only for the page it was opened on, so navigating closes it
  const [openOn, setOpenOn] = useState(null)
  const menuOpen = openOn === pathname
  const { count } = useCart()
  const scrolled = useScrollPosition() > 10

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-shadow ${scrolled ? 'shadow-md' : 'border-b border-border'}`}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link to="/" aria-label={`${site.name} home`} className="shrink-0">
          <img src={site.logo} alt={site.fullName} className="h-14 w-auto" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Search"
            className="rounded-md p-2 hover:bg-secondary"
          >
            <Search size={20} />
          </button>
          <Link
            to="/cart"
            aria-label={`Cart, ${count} items`}
            className="relative rounded-md p-2 hover:bg-secondary"
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <div className="hidden items-center gap-4 md:flex">
            {authLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </div>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setOpenOn(pathname)}
            className="rounded-md p-2 hover:bg-secondary xl:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </Container>
      <MobileMenu open={menuOpen} onClose={() => setOpenOn(null)} />
    </header>
  )
}
