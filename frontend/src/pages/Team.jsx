import PageBanner from '@/components/common/PageBanner'
import Seo from '@/components/common/Seo'
import TeamGrid from '@/components/about/TeamGrid'
import { aboutPage } from '@/data/aboutPage'

export default function Team() {
  return (
    <>
      <Seo
        title="Our Team"
        description="Meet the Board of Directors, department heads, wing representatives and advisors of Real Madrid Fan Club Nepal."
        path="/team"
      />
      <PageBanner title="Our Team" crumbs={[{ label: 'About Us', to: '/about' }]} />
      <TeamGrid team={aboutPage.team} />
    </>
  )
}
