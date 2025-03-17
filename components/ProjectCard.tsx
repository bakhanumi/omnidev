import Link from 'next/link';
import type { Project } from '@/lib/db/schema';
import AdminCheck from './AdminCheck';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card">
      <h2>{project.title}</h2>
      <p className="project-description">{project.description}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        {project.link && (
          <Link href={project.link} className="project-link">
            Подробнее
          </Link>
        )}
        
        <AdminCheck>
          <div className="card-actions">
            <Link href={`/projects/edit/${project.id}`} className="cancel-button">
              Редактировать
            </Link>
          </div>
        </AdminCheck>
      </div>
    </div>
  );
}
