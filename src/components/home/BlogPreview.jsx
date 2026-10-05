import { Link } from 'react-router-dom'
import BlogCard from '@/components/blog/BlogCard'
import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import { blogSection, posts } from '@/data/blog'

export default function BlogPreview() {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <Container>
        <SectionHeading label={blogSection.label} title={blogSection.heading} />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <Reveal as="li" key={post.slug}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </ul>
        <p className="mt-10 text-center">
          <Link to="/blog" className="font-heading font-semibold text-primary hover:underline">
            {blogSection.viewAll}
          </Link>
        </p>
      </Container>
    </section>
  )
}
