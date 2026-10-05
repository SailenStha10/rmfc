import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageBanner from '@/components/common/PageBanner'
import Seo from '@/components/common/Seo'
import Container from '@/components/common/Container'
import Button from '@/components/common/Button'
import NepalMap from '@/components/common/NepalMap'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import NotFound from './NotFound'
import { wings } from '@/data/wings'
import { galleryImages } from '@/data/gallery'

export default function WingDetail() {
  const { slug } = useParams()
  const [active, setActive] = useState(null)
  const wing = wings.find((w) => w.slug === slug)
  if (!wing) return <NotFound />

  const stats = [
    { value: `${wing.members}+`, label: 'Active Members' },
    { value: wing.bodMembers, label: 'BOD Members' },
    { value: wing.founded, label: 'Established' },
  ]

  return (
    <>
      <Seo
        title={wing.name}
        description={`${wing.name} of Real Madrid Fan Club Nepal, based in ${wing.base}. ${wing.members} members, founded ${wing.founded}.`}
        path={`/wings/${wing.slug}`}
      />
      <PageBanner
        title={wing.name}
        subtitle={`${wing.base}, Nepal · ${wing.members} Members · Founded ${wing.founded}`}
        crumbs={[{ label: 'Wings', to: '/wings' }]}
      />

      <section className="bg-white py-16 md:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <SectionHeading label="About the Wing" title={`The story of ${wing.name}`} align="left" />
            <p className="text-muted-foreground">{wing.description}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Contact: <span className="font-semibold text-foreground">{wing.contact}</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/join-club">Apply to Join</Button>
              <Button to="/wings" variant="ghost">
                <ArrowLeft size={16} aria-hidden="true" /> All Wings
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <ul className="grid grid-cols-3 gap-3 text-center">
              {stats.map((s) => (
                <li key={s.label} className="rounded-xl bg-secondary p-4">
                  <p className="font-heading text-2xl font-black text-primary">{s.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="bg-secondary py-16">
        <Container className="max-w-3xl">
          <SectionHeading
            label="Wing Location"
            title="Where we are"
            subtitle="See where this wing is based and the districts it covers."
          />
          <NepalMap wings={[wing]} active={active} onActive={setActive} />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Districts: {wing.districts.join(', ')}
          </p>
        </Container>
      </section>

      {wing.head && (
        <section className="bg-white py-16">
          <Container className="max-w-3xl text-center">
            <SectionHeading label="Leadership" title="Message from the Regional Head" />
            <blockquote className="text-lg italic text-muted-foreground">“{wing.head.message}”</blockquote>
            <p className="mt-6 font-heading font-bold text-foreground">{wing.head.name}</p>
            <p className="text-sm text-primary">{wing.head.title}</p>
          </Container>
        </section>
      )}

      {wing.bod && (
        <section className="bg-secondary py-16">
          <Container>
            <SectionHeading
              label="Board of Directors"
              title="Meet the BOD"
              subtitle={`The dedicated leaders driving ${wing.name} forward — organizing events, building community and championing Madridismo across the region.`}
            />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {wing.bod.map((m) => (
                <li key={m.name} className="rounded-xl border border-border bg-white p-5 text-center">
                  <p className="font-heading font-bold text-foreground">{m.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="bg-white py-16 md:py-24">
        <Container>
          <SectionHeading
            label="Wing Gallery"
            title={`Moments from ${wing.name}`}
            subtitle={`${wing.galleryCount} photos`}
          />
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {galleryImages.slice(0, 4).map((img) => (
              <li key={img.id}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="aspect-square w-full rounded-xl object-cover"
                />
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center">
            <Link to="/gallery" className="font-heading font-semibold text-primary hover:underline">
              View Gallery ({wing.galleryCount} photos)
            </Link>
          </p>
        </Container>
      </section>
    </>
  )
}
