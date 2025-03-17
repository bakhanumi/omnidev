'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Article } from '@/lib/db/schema';

type ArticleFormProps = {
  article?: Article;
  isEdit?: boolean;
};

export default function ArticleForm({ article, isEdit = false }: ArticleFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: article?.title || '',
    content: article?.content || ''
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
    
    if (!formData.title || !formData.content) {
      setError('Заполните обязательные поля');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`/api/articles${isEdit && article ? `/${article.id}` : ''}`, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Произошла ошибка при сохранении статьи');
      }
      
      router.push('/articles');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="article-form-container">
      <h2>{isEdit ? 'Редактирование статьи' : 'Добавление новой статьи'}</h2>
      
      {error && <div className="form-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-group">
          <label htmlFor="title">Заголовок статьи *</label>
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
          <label htmlFor="content">Содержание статьи *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="form-textarea"
            rows={10}
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => router.push('/articles')} 
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
            {isLoading ? 'Сохранение...' : isEdit ? 'Сохранить изменения' : 'Добавить статью'}
          </button>
        </div>
      </form>
    </div>
  );
}
