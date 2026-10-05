import { Store } from 'lucide-react'
import Button from './Button'
import Container from './Container'
import PageBanner from './PageBanner'

export default function ComingSoon({ bannerTitle, label, heading, text }) {
  return (
    <>
      <PageBanner title={bannerTitle} />
      <section className="bg-white py-20 md:py-28">
        <Container className="max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Store size={30} aria-hidden="true" />
          </div>
          <p className="font-heading text-sm font-semibold uppercase tracking-widest text-primary">{label}</p>
          <h2 className="mt-2 text-3xl md:text-5xl">{heading}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{text}</p>
          <Button to="/" className="mt-8">
            Back to Home
          </Button>
        </Container>
      </section>
    </>
  )
}
