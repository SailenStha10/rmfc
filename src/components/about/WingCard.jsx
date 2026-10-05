import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, User, Users } from 'lucide-react'
import Card from '@/components/common/Card'

export default function WingCard({ wing }) {
  return (
    <Card as="article" className="flex h-full flex-col p-6 transition-shadow hover:shadow-md">
      <h3 className="text-xl">
        <Link to={`/wings/${wing.slug}`} className="hover:text-primary">
          {wing.name}
        </Link>
      </h3>
      <ul className="my-4 flex-1 space-y-2 text-sm text-muted-foreground">
        <li className="flex items-center gap-2">
          <MapPin size={16} className="text-primary" aria-hidden="true" /> {wing.base}
        </li>
        <li className="flex items-center gap-2">
          <Users size={16} className="text-primary" aria-hidden="true" /> {wing.members} Members
        </li>
        <li className="flex items-start gap-2">
          <User size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
          Contact: {wing.contact}
        </li>
      </ul>
      <Link
        to={`/wings/${wing.slug}`}
        aria-label={`Visit ${wing.name}`}
        className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-primary hover:gap-3"
      >
        Visit Wing <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </Card>
  )
}
