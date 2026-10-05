import Hero from '@/components/home/Hero'
import LegacyStats from '@/components/home/LegacyStats'
import StatementBand from '@/components/home/StatementBand'
import AboutSection from '@/components/home/AboutSection'
import MatchSection from '@/components/home/MatchSection'
import PresidentMessage from '@/components/home/PresidentMessage'
import GalleryPreview from '@/components/home/GalleryPreview'
import BlogPreview from '@/components/home/BlogPreview'
import PartnersGrid from '@/components/home/PartnersGrid'
import WingsMap from '@/components/home/WingsMap'
import CTABanner from '@/components/home/CTABanner'
import Seo from '@/components/common/Seo'

export default function Home() {
  return (
    <>
      <Seo description="Join Nepal's official Real Madrid fan club: match screenings, events, wings across Nepal and the Madridista community." path="/" />
      <Hero />
      <LegacyStats />
      <StatementBand />
      <AboutSection />
      <MatchSection />
      <PresidentMessage />
      <GalleryPreview />
      <BlogPreview />
      <PartnersGrid />
      <WingsMap />
      <CTABanner />
    </>
  )
}
