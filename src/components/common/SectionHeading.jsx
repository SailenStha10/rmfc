export default function SectionHeading({ label, title, subtitle, align = 'center', light = false }) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`mb-10 max-w-3xl ${alignment}`}>
      {label && (
        <p className="mb-2 font-heading text-sm font-semibold uppercase tracking-widest text-primary">
          {label}
        </p>
      )}
      <h2 className={`text-3xl md:text-4xl ${light ? '!text-white' : ''}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-4 ${light ? 'text-white/80' : 'text-muted-foreground'}`}>{subtitle}</p>
      )}
    </div>
  )
}
