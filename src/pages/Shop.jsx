import ComingSoon from '@/components/common/ComingSoon'
import { shopNotice } from '@/data/products'

export default function Shop() {
  return (
    <ComingSoon
      bannerTitle="Shop"
      label={shopNotice.title}
      heading={shopNotice.heading}
      text={shopNotice.text}
    />
  )
}
