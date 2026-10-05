import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-heading text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border-2 border-current bg-transparent hover:bg-white/10',
  ghost: 'bg-transparent text-foreground hover:bg-secondary',
}

export default function Button({
  variant = 'primary',
  to,
  href,
  className = '',
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
