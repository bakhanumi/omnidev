import { Metadata } from 'next';
import ArticleForm from '@/components/ArticleForm';
import { getArticleById } from '@/lib/db/index';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Редактирование статьи - Omniscient Dev',
  description: 'Редактирование статьи Omniscient Dev',
};

interface EditArticlePageProps {
  params: {
    id: string;
  };
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
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
      <p className="welcome">Редактирование статьи</p>
      <div className="separator"></div>

      <section>
        <h2 className="section-header"># Изменение статьи</h2>
        <ArticleForm article={article} isEdit />
      </section>
    </>
  );
}
