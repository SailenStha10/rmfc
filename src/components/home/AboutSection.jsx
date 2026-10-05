import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import { about } from '@/data/about'

export default function AboutSection() {
  const [first, second] = about.images
  return (
    <section className="bg-white py-16 md:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading label="Who We Are" title={about.heading} align="left" />
          <div className="space-y-4 text-muted-foreground">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="font-heading text-lg font-bold text-primary">{about.closing}</p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative mx-auto w-full max-w-xl pb-16 pr-10">
          <img
            src={first}
            alt="Madridistas gathered at a Real Madrid fan club event in Nepal"
            loading="lazy"
            width="1024"
            height="768"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
          />
          <img
            src={second}
            alt="Real Madrid Fan Club Nepal community"
            loading="lazy"
            width="1024"
            height="489"
            className="absolute bottom-0 right-0 w-3/5 rounded-2xl border-4 border-white object-cover shadow-xl"
          />
        </Reveal>
      </Container>
    </section>
  )
}
