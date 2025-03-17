import { formatDate } from '@/lib/utils';
import type { Event } from '@/lib/db/schema';
import AdminCheck from './AdminCheck';
import Link from 'next/link';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="event-card">
      <h2>{event.title}</h2>
      <p className="event-date">Дата: {formatDate(event.date)}</p>
      <p className="event-description">{event.description}</p>
      
      <AdminCheck>
        <div className="card-actions" style={{ marginTop: '10px' }}>
          <Link href={`/events/edit/${event.id}`} className="cancel-button">
            Редактировать
          </Link>
        </div>
      </AdminCheck>
    </div>
  );
}
