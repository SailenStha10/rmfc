export const gallerySection = {
  label: 'Moments',
  heading: 'Gallery',
  cta: 'View Full Gallery',
}

export const galleryImages = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/gallery-${i + 1}.webp`,
  thumb: `/images/gallery/gallery-${i + 1}-thumb.webp`, // 640px square, used in grids; `src` opens in the lightbox
  alt: `Kathmandu Wing meetup photo ${i + 1}`,
  caption: 'Kathmandu Wing · Meetups',
  category: 'Meetups',
}))
