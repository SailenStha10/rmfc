import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Badge from '@/components/common/Badge'
import Card from '@/components/common/Card'
import { formatDate } from '@/utils/formatDate'

// `as` sets the title's heading level so pages never skip levels (h2 on /blog, h3 under a section heading)
export default function BlogCard({ post, as: Heading = 'h3' }) {
  return (
    <Card as="article" className="flex h-full flex-col p-6 transition-shadow hover:shadow-md">
      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <Badge>{post.category}</Badge>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>
      <Heading className="mb-3 text-xl">
        <Link to={`/blog/${post.slug}`} className="hover:text-primary">
          {post.title}
        </Link>
      </Heading>
      <p className="mb-5 flex-1 text-muted-foreground">{post.excerpt}</p>
      <Link
        to={`/blog/${post.slug}`}
        className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-primary hover:gap-3"
      >
        Read more<span className="sr-only"> about {post.title}</span>
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </Card>
  )
}
