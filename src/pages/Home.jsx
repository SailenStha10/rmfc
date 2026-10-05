import HeroSlider from '@/components/home/HeroSlider'
import AboutSection from '@/components/home/AboutSection'
import MatchSection from '@/components/home/MatchSection'
import LegacyStats from '@/components/home/LegacyStats'
import PresidentMessage from '@/components/home/PresidentMessage'
import GalleryPreview from '@/components/home/GalleryPreview'
import BlogPreview from '@/components/home/BlogPreview'
import PartnersGrid from '@/components/home/PartnersGrid'
import WingsMap from '@/components/home/WingsMap'
import CTABanner from '@/components/home/CTABanner'

export default function Home() {
  return (
    <>
      <HeroSlider />
      <AboutSection />
      <MatchSection />
      <LegacyStats />
      <PresidentMessage />
      <GalleryPreview />
      <BlogPreview />
      <PartnersGrid />
      <WingsMap />
      <CTABanner />
    </>
  )
}
