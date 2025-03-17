import { getProjects } from '@/lib/db/index';
import ProjectCard from '@/components/ProjectCard';
import { Metadata } from 'next';
import Link from 'next/link';
import AdminCheck from '@/components/AdminCheck';

export const metadata: Metadata = {
  title: 'Проекты - Omniscient Dev',
  description: 'Проекты сообщества Omniscient Dev',
};

export default async function ProjectsPage() {
  let projects = [];
  
  try {
    projects = await getProjects();
  } catch (error) {
    console.error('Ошибка при получении данных о проектах:', error);
    // Если таблица не существует или другая ошибка, показываем пустой список
  }

  return (
    <>
      <p className="welcome">Наши проекты</p>
      <div className="separator"></div>

      <AdminCheck>
        <div className="admin-controls">
          <Link href="/projects/add" className="submit-button">
            Добавить проект
          </Link>
        </div>
      </AdminCheck>

      <section>
        <h2 className="section-header"># Активные проекты</h2>
        <div className="projects-container">
          {projects.length > 0 ? (
            projects.map((project) => <ProjectCard key={project.id} project={project} />)
          ) : (
            <div className="project-card">
              <h2>Название проекта</h2>
              <p className="project-description">Описание проекта будет добавлено позже.</p>
              <a href="#" className="project-link">Подробнее</a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
