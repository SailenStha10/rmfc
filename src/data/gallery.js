export const gallerySection = {
  label: 'Moments',
  heading: 'Gallery',
  cta: 'View Full Gallery',
}

export const galleryImages = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/gallery-${i + 1}.jpg`,
  alt: `Kathmandu Wing meetup photo ${i + 1}`,
  caption: 'Kathmandu Wing · Meetups',
  category: 'Meetups',
}))
