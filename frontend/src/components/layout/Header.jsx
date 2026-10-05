import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Search, ShoppingCart } from 'lucide-react'
import Container from '@/components/common/Container'
import MobileMenu from './MobileMenu'
import NavDropdown from './NavDropdown'
import { navLinkClass } from './navStyles'
import SearchOverlay from './SearchOverlay'
import { useCart } from '@/hooks/useCart'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { authMenu, navItems } from '@/data/navigation'
import { site } from '@/data/site'

const iconBtn =
  'relative flex h-10 w-10 items-center justify-center rounded-full border border-border text-accent transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary'

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
    <>
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur transition-shadow ${scrolled ? 'shadow-lg' : ''}`}
      >
        <Container
          className={`flex items-center justify-between gap-6 transition-all ${scrolled ? 'h-[4.25rem]' : 'h-20'}`}
        >
          <Link to="/" aria-label={`${site.name} home`} className="shrink-0">
            <img
              src={site.logo}
              alt={site.fullName}
              width="600"
              height="359"
              className={`w-auto transition-all ${scrolled ? 'h-11' : 'h-14'}`}
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) =>
              item.children ? (
                <NavDropdown key={item.label} item={item} />
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => navLinkClass(isActive)}
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              aria-label="Search"
              aria-haspopup="dialog"
              onClick={() => setSearchOn(pathname)}
              className={iconBtn}
            >
              <Search size={18} />
            </button>
            <Link to="/cart" aria-label={`Cart, ${count} items`} className={iconBtn}>
              <ShoppingCart size={18} />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>
            <div className="ml-3 hidden lg:block">
              <NavDropdown item={authMenu} cta />
            </div>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOn(pathname)}
              className={`${iconBtn} lg:hidden`}
            >
              <Menu size={20} />
            </button>
          </div>
        </Container>
        {/* club-colour accent line under the bar: navy fading into red, echoing the landing */}
        <div
          aria-hidden="true"
          className="h-[3px] bg-gradient-to-r from-ink via-accent to-primary"
        />
      </header>
      {/* rendered outside <header>: its backdrop blur would otherwise trap these fixed-position layers inside the bar */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOn(null)} />
      <SearchOverlay key={searchOpen} open={searchOpen} onClose={() => setSearchOn(null)} />
    </>
  )
}
