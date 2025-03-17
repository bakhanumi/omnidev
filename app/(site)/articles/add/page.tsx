import { Metadata } from 'next';
import ArticleForm from '@/components/ArticleForm';

export const metadata: Metadata = {
  title: 'Добавление статьи - Omniscient Dev',
  description: 'Добавление новой статьи',
};

export default function AddArticlePage() {
  return (
    <>
      <p className="welcome">Добавление новой статьи</p>
      <div className="separator"></div>

      <section>
        <h2 className="section-header"># Новая статья</h2>
        <ArticleForm />
      </section>
    </>
  );
}
