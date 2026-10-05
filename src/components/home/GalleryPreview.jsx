import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import { galleryImages, gallerySection } from '@/data/gallery'

// A short taste of the collage: six photos; any tap goes to the full gallery.
export default function GalleryPreview() {
  const navigate = useNavigate()
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <SectionHeading label={gallerySection.label} title={gallerySection.heading} />
        <GalleryGrid
          images={galleryImages.slice(0, 6)}
          onOpen={() => navigate('/gallery')}
          eagerCount={0}
          columns="three"
        />
        <div className="mt-6 text-center">
          <Button to="/gallery">
            {gallerySection.cta} <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  )
}
