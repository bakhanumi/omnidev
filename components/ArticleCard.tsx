'use client';

import type { Article } from '@/lib/db/schema';
import Link from 'next/link';
import AdminCheck from './AdminCheck';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="article-card">
      <h3>{article.title}</h3>
      <p className="article-content">
        {article.content.length > 150
          ? article.content.substring(0, 150) + '...'
          : article.content}
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <Link href={`/articles/${article.id}`} className="article-link">
          Читать полностью
        </Link>
        
        <AdminCheck>
          <div className="card-actions">
            <Link href={`/articles/edit/${article.id}`} className="cancel-button">
              Редактировать
            </Link>
          </div>
        </AdminCheck>
      </div>
    </div>
  );
}
