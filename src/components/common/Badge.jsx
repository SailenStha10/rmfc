const tones = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent text-accent-foreground',
  muted: 'bg-secondary text-muted-foreground',
}

export default function Badge({ tone = 'primary', className = '', children }) {
  return (
    <span
      className={`inline-block rounded-md px-3 py-1 font-heading text-sm font-bold uppercase tracking-[0.15em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
