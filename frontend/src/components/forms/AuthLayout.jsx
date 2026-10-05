import PageBanner from '@/components/common/PageBanner'
import Container from '@/components/common/Container'

export default function AuthLayout({ bannerTitle, heading, text, children }) {
  return (
    <>
      <PageBanner title={bannerTitle} />
      <section className="bg-secondary py-12 md:py-20">
        <Container className="max-w-md">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl">{heading}</h2>
            <p className="mb-6 mt-1 text-sm text-muted-foreground">{text}</p>
            {children}
          </div>
        </Container>
      </section>
    </>
  )
}
