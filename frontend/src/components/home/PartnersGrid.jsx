import Container from '@/components/common/Container'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import { partners, partnersSection } from '@/data/partners'

function Logo({ partner }) {
  const img = (
    <img
      src={partner.logo}
      alt={partner.name}
      loading="lazy"
      className="max-h-full max-w-full object-contain grayscale transition duration-300 group-hover:scale-105 group-hover:grayscale-0"
    />
  )
  const box =
    'group flex h-24 items-center justify-center rounded-2xl border border-border bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg sm:h-32 sm:p-6'
  return partner.href ? (
    <a
      href={partner.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${partner.name} (opens in a new tab)`}
      className={`${box} focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary`}
    >
      {img}
    </a>
  ) : (
    <div className={box}>{img}</div>
  )
}

// Nine partners = a perfect 3 x 3 grid at every screen size, so no row is ever left with a gap.
export default function PartnersGrid() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <SectionHeading
          label={partnersSection.label}
          title={partnersSection.heading}
          subtitle={partnersSection.text}
        />
        <ul className="mx-auto grid max-w-5xl grid-cols-3 gap-3 sm:gap-5">
          {partners.map((p, i) => (
            <Reveal as="li" key={p.name} delay={(i % 3) * 0.07} y={16}>
              <Logo partner={p} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
