import PageBanner from '@/components/common/PageBanner'
import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import FactsStrip from '@/components/about/FactsStrip'
import TeamGrid from '@/components/about/TeamGrid'
import LegacyStats from '@/components/home/LegacyStats'
import PresidentMessage from '@/components/home/PresidentMessage'
import { aboutPage } from '@/data/aboutPage'
import { about } from '@/data/about'
import Seo from '@/components/common/Seo'

export default function About() {
  return (
    <>
      <Seo title="About Us" description="Pe�a Madridista de Nepal is a non-profit Real Madrid fan club founded on July 2, 2014 and officially recognised by Real Madrid C.F. in 2020." path="/about" />
      <PageBanner title={aboutPage.banner} />

      <section className="bg-white py-16 md:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <SectionHeading label={aboutPage.label} title={aboutPage.heading} align="left" />
            <div className="space-y-4 text-muted-foreground">
              {aboutPage.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="font-heading text-lg font-bold text-primary">{aboutPage.closing}</p>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="space-y-4 lg:col-span-2">
            {about.images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={i === 0 ? 'Madridistas at a fan club event' : 'RMFC Nepal community'}
                loading="lazy"
                width="1024"
                height={i === 0 ? 768 : 489}
                className="w-full rounded-2xl object-cover shadow-lg"
              />
            ))}
          </Reveal>
        </Container>
      </section>

      <FactsStrip facts={aboutPage.facts} />
      <PresidentMessage />
      <LegacyStats />
      <TeamGrid team={aboutPage.team} />
    </>
  )
}
