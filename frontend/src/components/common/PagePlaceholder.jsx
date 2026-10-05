import Container from './Container'

export default function PagePlaceholder({ title, children }) {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-4xl">{title}</h1>
      <p className="mt-4 text-muted-foreground">{children ?? 'Content coming soon.'}</p>
    </Container>
  )
}
