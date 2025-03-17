import { Metadata } from 'next';
import ProjectForm from '@/components/ProjectForm';
import { getProjectById } from '@/lib/db/index';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Редактирование проекта - Omniscient Dev',
  description: 'Редактирование проекта сообщества Omniscient Dev',
};

interface EditProjectPageProps {
  params: {
    id: string;
  };
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const id = parseInt(params.id, 10);
  
  if (isNaN(id)) {
    notFound();
  }
  
  const project = await getProjectById(id);
  
  if (!project) {
    notFound();
  }
  
  return (
    <>
      <p className="welcome">Редактирование проекта</p>
      <div className="separator"></div>

      <section>
        <h2 className="section-header"># Изменение проекта</h2>
        <ProjectForm project={project} isEdit />
      </section>
    </>
  );
}
