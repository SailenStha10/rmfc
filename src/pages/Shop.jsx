import ComingSoon from '@/components/common/ComingSoon'
import Seo from '@/components/common/Seo'
import { shopNotice } from '@/data/products'

export default function Shop() {
  return (
    <>
      <Seo title="Shop" description="The official RMFC Nepal store is coming soon." path="/shop" />
      <ComingSoon
        bannerTitle="Shop"
        label={shopNotice.title}
        heading={shopNotice.heading}
        text={shopNotice.text}
      />
    </>
  )
}
