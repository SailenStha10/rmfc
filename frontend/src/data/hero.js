// Landing slides (rotate automatically). Each photo is cropped to its subject: `image` is the wide crop for
// desktop (subject toward the right, because the left of the hero is solid navy under the text) and
// `mobile` is a square crop centred on the subject.
export const heroSlides = [
  {
    eyebrow: 'Real Madrid Fan Club Nepal',
    heading: "Nepal's Official Madridista Community",
    text: 'A home for every Nepalese Madridista to connect, support, and live the spirit of Real Madrid together.',
    cta: 'Join Now',
    to: '/join-club',
    image: '/images/hero/hero-1.webp',
    mobile: '/images/hero/hero-1-m.webp',
    position: 'lg:object-[center_100%]',
    alt: 'Players and members of Real Madrid Fan Club Nepal posing with their trophies at the futsal tournament',
  },
  {
    eyebrow: 'Match Screening',
    heading: 'Watch Together. Cheer Together.',
    text: 'Experience match-day energy with fellow Madridistas.',
    cta: 'View Events',
    to: '/events',
    image: '/images/hero/hero-2.webp',
    mobile: '/images/hero/hero-2-m.webp',
    position: 'lg:object-[center_85%]',
    alt: 'Madridistas in Real Madrid shirts cheering together at a match screening',
  },
  {
    eyebrow: 'Official Merchandise',
    heading: 'Wear The White Pride',
    text: 'Shop jerseys, caps, hoodies, accessories & more.',
    cta: 'Shop Now',
    to: '/shop',
    image: '/images/hero/hero-3.webp',
    mobile: '/images/hero/hero-3-m.webp',
    position: 'lg:object-[center_85%]',
    alt: 'The Santiago Bernabéu pitch under the roof, with the REAL MADRID stand',
  },
]
