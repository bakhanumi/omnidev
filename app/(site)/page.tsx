import Link from 'next/link';
import { getEvents, getProjects, getArticles } from '@/lib/db/index';
import ProjectCard from '@/components/ProjectCard';
import ArticleCard from '@/components/ArticleCard';
import AdminCheck from '@/components/AdminCheck';

export default async function HomePage() {
  // Получаем данные из базы данных
  let events = [];
  let projects = [];
  let articles = [];
  
  try {
    events = await getEvents();
    projects = await getProjects();
    articles = await getArticles();
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }

  return (
    <>
      <p className="welcome">Welcome to Omniscient community in Fergana!</p>
      <div className="separator"></div>

      {/* Блок События */}
      <section>
        <h2 className="section-header"># События</h2>
        <div className="event-box">
          {events.length > 0 ? (
            <Link href={`/events/${events[0].id}`}>{events[0].title}</Link>
          ) : (
            <a href="#">Meetup #5 (RamblerElixir #3), Москва, Варшавское шоссе 9, стр.1; 2017-06-14 19:00</a>
          )}
        </div>
      </section>

      {/* Блок Проекты */}
      <section>
        <h2 className="section-header">## Проекты</h2>
        <div className="talks-list">
          {projects.length > 0 ? (
            <ProjectCard key={projects[0].id} project={projects[0]} />
          ) : (
            <article className="talk-item">
              <div style={{ width: 70, height: 70, backgroundColor: '#ccc' }} />
              <div className="talk-content">
                <h3>
                  <span className="talk-title">Лингвистическая относительность</span> by{' '}
                  <span className="speaker-name">Станислав Горман</span>
                </h3>
                <p>
                  У каждого языка есть принципы, на которых он основан. В то время, как одни взгляды нам близки, а другие мы не принимаем, они формируют не только дизайн языка и архитектуру библиотек и систем, которые разрабатываются на этом языке, но и сообщество.
                </p>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* Блок Статьи */}
      <section>
        <h2 className="section-header">### Статьи</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <Link href="/articles" className="register-btn">
            Все статьи
          </Link>
          <AdminCheck>
            <Link href="/articles/add" className="submit-button">
              Добавить статью
            </Link>
          </AdminCheck>
        </div>
        
        {articles.length > 0 ? (
          <div className="articles-container">
            <ArticleCard key={articles[0].id} article={articles[0]} />
          </div>
        ) : (
          <div style={{ padding: '8px 12px', background: 'var(--secondary-bg)', border: '1px solid var(--border-color)' }}>
            <Link href="/auth/signin" className="register-btn">
              Register
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
