import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'

// Full-width story card, used when there is only one post to show.
export default function FeaturedPost({ post, as: Heading = 'h3' }) {
  return (
    <article className="grid overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-border md:grid-cols-5">
      <div className="relative flex min-h-56 flex-col justify-between overflow-hidden bg-gradient-to-br from-ink to-ink-soft p-8 text-white md:col-span-2 md:p-10">
        <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-8 font-display text-[10rem] leading-none text-white/10">
          “
        </span>
        <p className="relative font-heading text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
          {post.category}
        </p>
        <time dateTime={post.date} className="relative font-display text-3xl uppercase tracking-wide md:text-4xl">
          {formatDate(post.date)}
        </time>
      </div>
      <div className="flex flex-col justify-center p-8 md:col-span-3 md:p-12">
        <Heading className="font-display text-3xl uppercase leading-tight tracking-wide !text-accent md:text-4xl">
          <Link to={`/blog/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-4 text-muted-foreground">{post.excerpt}</p>
        <Link
          to={`/blog/${post.slug}`}
          className="mt-6 inline-flex items-center gap-2 self-start font-heading text-sm font-semibold text-primary hover:gap-3"
        >
          Read more<span className="sr-only"> about {post.title}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
