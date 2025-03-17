import { getArticleById } from '@/lib/db/index';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import AdminCheck from '@/components/AdminCheck';

interface ArticleDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const id = parseInt(params.id, 10);
  
  if (isNaN(id)) {
    return {
      title: 'Статья не найдена - Omniscient Dev',
    };
  }
  
  const article = await getArticleById(id);
  
  if (!article) {
    return {
      title: 'Статья не найдена - Omniscient Dev',
    };
  }
  
  return {
    title: `${article.title} - Omniscient Dev`,
    description: article.content.substring(0, 150) + '...',
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const id = parseInt(params.id, 10);
  
  if (isNaN(id)) {
    notFound();
  }
  
  const article = await getArticleById(id);
  
  if (!article) {
    notFound();
  }
  
  return (
    <>
      <p className="welcome">Статья</p>
      <div className="separator"></div>

      <section>
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2># Статья</h2>
          <div>
            <Link href="/articles" className="cancel-button">
              Назад к списку
            </Link>
            <AdminCheck>
              <Link href={`/articles/edit/${article.id}`} className="submit-button" style={{ marginLeft: '10px' }}>
                Редактировать
              </Link>
            </AdminCheck>
          </div>
        </div>
        
        <div className="article-detail">
          <h1>{article.title}</h1>
          <div className="article-detail-content">
            {article.content}
          </div>
        </div>
      </section>
    </>
  );
}
