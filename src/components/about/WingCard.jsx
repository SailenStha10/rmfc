import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, User } from 'lucide-react'

export default function WingCard({ wing }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-7 shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/40">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
      />
      <h3 className="font-display text-3xl font-normal uppercase tracking-wide text-accent">
        <Link to={`/wings/${wing.slug}`} className="hover:text-primary">
          {wing.name}
        </Link>
      </h3>
      <p className="mt-4 flex items-end gap-2">
        <span className="font-display text-6xl leading-none text-primary">{wing.members}</span>
        <span className="pb-1 font-heading text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">Members</span>
      </p>
      <ul className="my-5 flex-1 space-y-2 text-muted-foreground">
        <li className="flex items-center gap-2.5">
          <MapPin size={18} className="shrink-0 text-primary" aria-hidden="true" /> {wing.base}
        </li>
        <li className="flex items-start gap-2.5">
          <User size={18} className="mt-1 shrink-0 text-primary" aria-hidden="true" /> {wing.contact}
        </li>
      </ul>
      <Link
        to={`/wings/${wing.slug}`}
        aria-label={`Visit ${wing.name}`}
        className="inline-flex items-center gap-2 font-heading text-base font-bold uppercase tracking-[0.12em] text-primary group-hover:gap-3"
      >
        Visit Wing <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </article>
  )
}
