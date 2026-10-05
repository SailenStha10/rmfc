import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Badge from '@/components/common/Badge'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import BlogCard from '@/components/blog/BlogCard'
import NotFound from './NotFound'
import { posts } from '@/data/blog'
import { formatDate } from '@/utils/formatDate'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  if (!post) return <NotFound />

  const [lead, ...rest] = post.body
  const related = posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3)

  return (
    <>
      <article className="bg-white py-12 md:py-16">
        <Container className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link> /{' '}
            <Link to="/blog" className="hover:text-primary">Blog</Link> / <span>{post.title}</span>
          </nav>
          <Link
            to="/blog"
            className="mb-6 inline-flex items-center gap-2 font-heading text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back to Blog
          </Link>

          <header className="mb-8">
            <Badge>{post.category}</Badge>
            <h1 className="mt-4 text-3xl md:text-5xl md:leading-tight">{post.title}</h1>
            <p className="mt-4 text-sm text-muted-foreground">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.author && <> · By {post.author}</>}
            </p>
          </header>

          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p className="text-xl font-semibold text-foreground">{lead}</p>
            {rest.map((p) => (
              <p key={p} className={p.startsWith('Hala Madrid') ? 'font-heading font-bold text-primary' : ''}>
                {p}
              </p>
            ))}
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="bg-secondary py-16">
          <Container>
            <SectionHeading title="Related posts" />
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  )
}
