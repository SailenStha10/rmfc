import { ArrowRight } from 'lucide-react'
import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import { galleryImages, gallerySection } from '@/data/gallery'

export default function GalleryPreview() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <SectionHeading label={gallerySection.label} title={gallerySection.heading} />
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {galleryImages.map((img, i) => (
            <Reveal as="li" key={img.id} delay={(i % 4) * 0.08} y={16}>
              <figure className="group relative aspect-square overflow-hidden rounded-xl bg-secondary">
                <img
                  src={img.thumb}
                  alt={img.alt}
                  width="640"
                  height="640"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/10 to-transparent p-3 text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {img.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Button to="/gallery">
            {gallerySection.cta} <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  )
}
