import Container from '@/components/common/Container'
import Button from '@/components/common/Button'
import Seo from '@/components/common/Seo'

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <Seo title="Page not found" description="This page does not exist." noindex />
      <p className="font-heading text-6xl font-black text-primary">404</p>
      <h1 className="mt-4 text-3xl">Page not found</h1>
      <p className="mt-2 text-muted-foreground">The page you are looking for does not exist.</p>
      <Button to="/" className="mt-8">
        Back to Home
      </Button>
    </Container>
  )
}
