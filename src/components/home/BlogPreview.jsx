import { Link } from 'react-router-dom'
import BlogCard from '@/components/blog/BlogCard'
import FeaturedPost from '@/components/blog/FeaturedPost'
import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import { blogSection, posts } from '@/data/blog'

export default function BlogPreview() {
  const latest = posts.slice(0, 3)
  return (
    <section className="bg-secondary py-16 md:py-24">
      <Container>
        <SectionHeading label={blogSection.label} title={blogSection.heading} />
        {latest.length === 1 ? (
          // a single story fills the whole section instead of leaving empty columns
          <Reveal>
            <FeaturedPost post={latest[0]} />
          </Reveal>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((post) => (
              <Reveal as="li" key={post.slug}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </ul>
        )}
        <p className="mt-10 text-center">
          <Link to="/blog" className="font-heading font-semibold text-primary hover:underline">
            {blogSection.viewAll}
          </Link>
        </p>
      </Container>
    </section>
  )
}
