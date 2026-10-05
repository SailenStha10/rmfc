export const cta = {
  eyebrow: 'Join the legacy',
  heading: 'Become a Madridista Member Today',
  text: 'Join our community and enjoy exclusive access to screenings, merch, and events.',
  image: '/images/hero/cta-bg.webp',
  primary: { label: 'Join Club', to: '/join-club' },
  secondary: { label: 'Shop Merchandise', to: '/shop' },
  // icon names map to lucide-react icons in CTABanner
  perks: [
    { icon: 'Tv', title: 'Screenings', text: 'Watch every big match together.', to: '/events?category=Screening' },
    { icon: 'Shirt', title: 'Merch', text: 'Official fan club merchandise.', to: '/shop' },
    { icon: 'CalendarDays', title: 'Events', text: 'Futsal, meetups and more.', to: '/events' },
  ],
}
