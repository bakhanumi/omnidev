import { Metadata } from 'next';
import EventForm from '@/components/EventForm';
import { getEventById } from '@/lib/db/index';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Редактирование события - Omniscient Dev',
  description: 'Редактирование события сообщества Omniscient Dev',
};

interface EditEventPageProps {
  params: {
    id: string;
  };
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const id = parseInt(params.id, 10);
  
  if (isNaN(id)) {
    notFound();
  }
  
  const event = await getEventById(id);
  
  if (!event) {
    notFound();
  }
  
  return (
    <>
      <p className="welcome">Редактирование события</p>
      <div className="separator"></div>

      <section>
        <h2 className="section-header"># Изменение события</h2>
        <EventForm event={event} isEdit />
      </section>
    </>
  );
}
