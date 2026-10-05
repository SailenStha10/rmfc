import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Search, ShoppingCart } from 'lucide-react'
import Container from '@/components/common/Container'
import MobileMenu from './MobileMenu'
import NavDropdown from './NavDropdown'
import SearchOverlay from './SearchOverlay'
import { useCart } from '@/hooks/useCart'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { authMenu, navItems } from '@/data/navigation'
import { site } from '@/data/site'

const linkClass = ({ isActive }) =>
  `py-2 font-heading text-sm font-semibold transition-colors hover:text-primary ${
    isActive ? 'text-primary' : 'text-foreground'
  }`

export default function Header() {
  const { pathname } = useLocation()
  // menus are "open" only for the page they were opened on, so navigating closes them
  const [menuOn, setMenuOn] = useState(null)
  const [searchOn, setSearchOn] = useState(null)
  const menuOpen = menuOn === pathname
  const searchOpen = searchOn === pathname
  const { count } = useCart()
  const scrolled = useScrollPosition() > 10

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-shadow ${scrolled ? 'shadow-md' : 'border-b border-border'}`}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link to="/" aria-label={`${site.name} home`} className="shrink-0">
          <img src={site.logo} alt={site.fullName} width="600" height="359" className="h-14 w-auto" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <NavDropdown key={item.label} item={item} />
            ) : (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            aria-haspopup="dialog"
            onClick={() => setSearchOn(pathname)}
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
          <div className="ml-2 hidden lg:block">
            <NavDropdown item={authMenu} cta />
          </div>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOn(pathname)}
            className="rounded-md p-2 hover:bg-secondary lg:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </Container>
      <MobileMenu open={menuOpen} onClose={() => setMenuOn(null)} />
      <SearchOverlay key={searchOpen} open={searchOpen} onClose={() => setSearchOn(null)} />
    </header>
  )
}
