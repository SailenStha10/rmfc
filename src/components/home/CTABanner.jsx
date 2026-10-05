import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import { cta } from '@/data/cta'

export default function CTABanner() {
  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28">
      <img
        src={cta.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-accent/95 via-accent/85 to-primary/70" />
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center text-white">
          <h2 className="mb-4 text-3xl !text-white md:text-5xl">{cta.heading}</h2>
          <p className="mb-8 text-lg text-white/85">{cta.text}</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button to={cta.primary.to}>{cta.primary.label}</Button>
            <Button to={cta.secondary.to} variant="outline" className="text-white">
              {cta.secondary.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
