// Header structure: dropdown groups keep the bar short.
// `children` open in a dropdown; the parent label links to its own page.
export const navItems = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us',
    to: '/about',
    children: [
      { label: 'About Us', to: '/about' },
      { label: 'Wings', to: '/wings' },
      { label: 'Events', to: '/events' },
    ],
  },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'Shop', to: '/shop' },
  {
    label: 'Contact',
    to: '/contact',
    children: [
      { label: 'Contact', to: '/contact' },
      { label: 'Join Club', to: '/join-club' },
    ],
  },
]

// Register is the header's call-to-action; Login lives in its dropdown.
export const authMenu = {
  label: 'Register',
  to: '/register',
  children: [
    { label: 'Register', to: '/register' },
    { label: 'Login', to: '/login' },
  ],
}

// Flat list of every top-level page (used by search).
export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Wings', to: '/wings' },
  { label: 'Events', to: '/events' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'Shop', to: '/shop' },
  { label: 'Join Club', to: '/join-club' },
  { label: 'Contact', to: '/contact' },
]
