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
      className="max-h-full max-w-full object-contain grayscale transition duration-300 group-hover:grayscale-0"
    />
  )
  const box =
    'group flex h-28 items-center justify-center rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md'
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

export default function PartnersGrid() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <SectionHeading
          label={partnersSection.label}
          title={partnersSection.heading}
          subtitle={partnersSection.text}
        />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {partners.map((p, i) => (
            <Reveal as="li" key={p.name} delay={(i % 5) * 0.06} y={16}>
              <Logo partner={p} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
