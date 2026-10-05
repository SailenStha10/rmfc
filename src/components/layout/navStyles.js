// Shared look for header links: condensed display face, red underline that grows on hover / when active.
export const navLinkClass = (active) =>
  `relative py-2 font-display text-[0.95rem] uppercase tracking-[0.1em] transition-colors hover:text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:bg-primary after:transition-transform after:duration-300 ${
    active ? 'text-primary after:scale-x-100' : 'text-accent after:scale-x-0 hover:after:scale-x-100'
  }`

export const isActivePath = (pathname, to) =>
  to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`)
