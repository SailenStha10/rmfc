import ComingSoon from '@/components/common/ComingSoon'
import Seo from '@/components/common/Seo'
import { shopNotice } from '@/data/products'

export default function Cart() {
  return (
    <>
      <Seo title="Cart" description="Your RMFC Nepal cart." path="/cart" noindex />
      <ComingSoon
        bannerTitle="Cart"
        label="Your cart is empty"
        heading={shopNotice.heading}
        text={shopNotice.text}
      />
    </>
  )
}
