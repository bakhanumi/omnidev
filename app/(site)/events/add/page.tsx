import { Metadata } from 'next';
import EventForm from '@/components/EventForm';

export const metadata: Metadata = {
  title: 'Добавление события - Omniscient Dev',
  description: 'Добавление нового события',
};

export default function AddEventPage() {
  return (
    <>
      <p className="welcome">Добавление нового события</p>
      <div className="separator"></div>

      <section>
        <h2 className="section-header"># Новое событие</h2>
        <EventForm />
      </section>
    </>
  );
}
