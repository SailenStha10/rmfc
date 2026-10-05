import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import { heroSlides } from '@/data/hero'

const arrow =
  'absolute top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:flex'

export default function HeroSlider() {
  return (
    <section aria-label="Featured highlights" className="hero-slider relative h-[70vh] md:h-[85vh]">
      <h1 className="sr-only">Real Madrid Fan Club Nepal</h1>
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination, A11y]}
        effect="fade"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        navigation={{ prevEl: '.hero-prev', nextEl: '.hero-next' }}
        className="h-full"
      >
        {heroSlides.map((s, i) => (
          <SwiperSlide key={s.heading}>
            <div className="relative h-full w-full bg-accent">
              <img
                src={s.image}
                srcSet={s.srcSet}
                sizes={s.srcSet ? '100vw' : undefined}
                width="1600"
                height="900"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
              <Container className="relative z-10 flex h-full items-center">
                <div className="max-w-2xl text-white">
                  <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-widest text-white/80">
                    {s.eyebrow}
                  </p>
                  <h2 className="mb-4 text-4xl !text-white md:text-6xl md:leading-tight">
                    {s.heading}
                  </h2>
                  <p className="mb-8 max-w-xl text-base text-white/85 md:text-lg">{s.text}</p>
                  <Button to={s.to}>{s.cta}</Button>
                </div>
              </Container>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button type="button" aria-label="Previous slide" className={`hero-prev left-4 ${arrow}`}>
        <ChevronLeft />
      </button>
      <button type="button" aria-label="Next slide" className={`hero-next right-4 ${arrow}`}>
        <ChevronRight />
      </button>
    </section>
  )
}
