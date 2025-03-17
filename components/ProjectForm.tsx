'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Project } from '@/lib/db/schema';

type ProjectFormProps = {
  project?: Project;
  isEdit?: boolean;
};

export default function ProjectForm({ project, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    link: project?.link || ''
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
      const response = await fetch(`/api/projects${isEdit && project ? `/${project.id}` : ''}`, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Произошла ошибка при сохранении проекта');
      }
      
      router.push('/projects');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="project-form-container">
      <h2>{isEdit ? 'Редактирование проекта' : 'Добавление нового проекта'}</h2>
      
      {error && <div className="form-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label htmlFor="title">Название проекта *</label>
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
          <label htmlFor="description">Описание проекта *</label>
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
        
        <div className="form-group">
          <label htmlFor="link">Ссылка на проект</label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => router.push('/projects')} 
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
            {isLoading ? 'Сохранение...' : isEdit ? 'Сохранить изменения' : 'Добавить проект'}
          </button>
        </div>
      </form>
    </div>
  );
}
