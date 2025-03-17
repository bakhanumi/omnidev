import { getArticles } from '@/lib/db/index';
import ArticleCard from '@/components/ArticleCard';
import { Metadata } from 'next';
import Link from 'next/link';
import AdminCheck from '@/components/AdminCheck';

export const metadata: Metadata = {
  title: 'Статьи - Omniscient Dev',
  description: 'Статьи сообщества Omniscient Dev',
};

export default async function ArticlesPage() {
  let articles = [];
  
  try {
    articles = await getArticles();
  } catch (error) {
    console.error('Ошибка при получении статей:', error);
  }

  return (
    <>
      <p className="welcome">Статьи</p>
      <div className="separator"></div>

      <AdminCheck>
        <div className="admin-controls">
          <Link href="/articles/add" className="submit-button">
            Добавить статью
          </Link>
        </div>
      </AdminCheck>

      <section>
        <h2 className="section-header"># Список статей</h2>
        <div className="articles-container">
          {articles.length > 0 ? (
            articles.map((article) => <ArticleCard key={article.id} article={article} />)
          ) : (
            <p>Статьи пока не добавлены.</p>
          )}
        </div>
      </section>
    </>
  );
}
