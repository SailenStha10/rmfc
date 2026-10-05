import TitleTrophy from './TitleTrophy'

// Shared section title: label with a red rule, big condensed display title with the small trophy beside it,
// and a description set in the same condensed family so title and text read as one.
export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = 'mb-10 md:mb-14',
  compact = false,
}) {
  const center = align === 'center'
  return (
    <div className={`${className} ${center ? 'text-center' : 'text-left'}`}>
      {label && (
        <p
          className={`mb-3 flex items-center gap-3 font-heading text-sm font-bold uppercase tracking-[0.3em] ${
            center ? 'justify-center' : ''
          } ${light ? 'text-white/80' : 'text-primary'}`}
        >
          <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
          {label}
          {center && <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />}
        </p>
      )}
      <div className={`flex items-center gap-3 md:gap-5 ${center ? 'justify-center' : ''}`}>
        <TitleTrophy />
        <h2
          className={`font-display text-4xl uppercase leading-[1.05] tracking-wide ${compact ? 'md:text-5xl' : 'md:text-6xl'} ${
            light ? '!text-white' : '!text-accent'
          }`}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl font-heading text-xl font-medium tracking-wide md:text-2xl ${
            center ? 'mx-auto' : ''
          } ${light ? 'text-white/75' : 'text-muted-foreground'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
