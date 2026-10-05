import { useState } from 'react'
import PageBanner from '@/components/common/PageBanner'
import Container from '@/components/common/Container'
import FilterChips from '@/components/common/FilterChips'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import Lightbox from '@/components/gallery/Lightbox'
import { galleryImages } from '@/data/gallery'

const categories = ['All', ...new Set(galleryImages.map((i) => i.category))]

export default function Gallery() {
  const [category, setCategory] = useState('All')
  const [openAt, setOpenAt] = useState(-1)
  const shown = galleryImages.filter((i) => category === 'All' || i.category === category)

  return (
    <>
      <PageBanner title="Gallery" subtitle="Moments from our meetups, matches and events across Nepal." />
      <section className="bg-white py-12 md:py-16">
        <Container>
          <div className="mb-8">
            <FilterChips
              label="Gallery category"
              options={categories}
              value={category}
              onChange={setCategory}
            />
          </div>
          <GalleryGrid images={shown} onOpen={setOpenAt} />
        </Container>
      </section>
      <Lightbox images={shown} index={openAt} onClose={() => setOpenAt(-1)} />
    </>
  )
}
