'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toDateTimeLocal } from '@/lib/utils';
import type { Event } from '@/lib/db/schema';

type EventFormProps = {
  event?: Event;
  isEdit?: boolean;
};

export default function EventForm({ event, isEdit = false }: EventFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: event?.title || '',
    date: event?.date ? toDateTimeLocal(event.date) : '',
    description: event?.description || ''
  });
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    if (!formData.title || !formData.description) {
      setError('Заполните обязательные поля');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`/api/events${isEdit && event ? `/${event.id}` : ''}`, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Произошла ошибка при сохранении события');
      }
      
      router.push('/events');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="event-form-container">
      <h2>{isEdit ? 'Редактирование события' : 'Добавление нового события'}</h2>
      
      {error && <div className="form-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="title">Название события *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="date">Дата и время</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Описание события *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-textarea"
            rows={5}
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => router.push('/events')} 
            className="cancel-button"
            disabled={isLoading}
          >
            Отмена
          </button>
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Сохранение...' : isEdit ? 'Сохранить изменения' : 'Добавить событие'}
          </button>
        </div>
      </form>
    </div>
  );
}
