import { CalendarDays, MapPin } from 'lucide-react'
import Badge from './Badge'
import Card from './Card'
import { formatDate } from '@/utils/formatDate'

export default function EventCard({ event }) {
  return (
    <Card as="article" className="flex h-full flex-col p-6">
      <Badge className="self-start">{event.category}</Badge>
      <h3 className="mt-3 text-xl">{event.title}</h3>
      <ul className="my-3 space-y-1 text-sm text-muted-foreground">
        <li className="flex items-center gap-2">
          <CalendarDays size={16} className="text-primary" aria-hidden="true" />
          <time dateTime={event.date}>{formatDate(event.date)}</time>
        </li>
        <li className="flex items-center gap-2">
          <MapPin size={16} className="text-primary" aria-hidden="true" /> {event.venue}
        </li>
      </ul>
      <p className="text-muted-foreground">{event.description}</p>
    </Card>
  )
}
