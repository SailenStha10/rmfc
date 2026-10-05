// Shared section title: small label with a red rule, big condensed display heading.
export default function SectionHeading({ label, title, subtitle, align = 'center', light = false }) {
  const center = align === 'center'
  return (
    <div className={`mb-10 max-w-3xl ${center ? 'mx-auto text-center' : 'text-left'}`}>
      {label && (
        <p
          className={`mb-3 flex items-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.25em] ${
            center ? 'justify-center' : ''
          } ${light ? 'text-white/80' : 'text-primary'}`}
        >
          <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
          {label}
          {center && <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />}
        </p>
      )}
      <h2
        className={`font-display text-4xl uppercase leading-tight tracking-wide md:text-5xl ${
          light ? '!text-white' : '!text-accent'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 ${light ? 'text-white/80' : 'text-muted-foreground'}`}>{subtitle}</p>
      )}
    </div>
  )
}
