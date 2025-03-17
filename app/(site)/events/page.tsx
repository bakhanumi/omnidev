import { getEvents } from '@/lib/db/index';
import EventCard from '@/components/EventCard';
import { Metadata } from 'next';
import Link from 'next/link';
import AdminCheck from '@/components/AdminCheck';

export const metadata: Metadata = {
  title: 'События - Omniscient Dev',
  description: 'Предстоящие события сообщества Omniscient Dev',
};

export default async function EventsPage() {
  let events = [];
  
  try {
    events = await getEvents();
  } catch (error) {
    console.error('Ошибка при получении данных о событиях:', error);
    // Если таблица не существует или другая ошибка, показываем пустой список
  }

  return (
    <>
      <p className="welcome">Предстоящие события</p>
      <div className="separator"></div>

      <AdminCheck>
        <div className="admin-controls">
          <Link href="/events/add" className="submit-button">
            Добавить событие
          </Link>
        </div>
      </AdminCheck>

      <section>
        <h2 className="section-header"># Ближайшие мероприятия</h2>
        <div className="events-container">
          {events.length > 0 ? (
            events.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <div className="event-card">
              <h2>Название события</h2>
              <p className="event-date">Дата: Будет объявлена позже</p>
              <p className="event-description">Описание события будет добавлено позже.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
