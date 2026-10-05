import ComingSoon from '@/components/common/ComingSoon'
import { shopNotice } from '@/data/products'

export default function Cart() {
  return (
    <ComingSoon
      bannerTitle="Cart"
      label="Your cart is empty"
      heading={shopNotice.heading}
      text={shopNotice.text}
    />
  )
}
