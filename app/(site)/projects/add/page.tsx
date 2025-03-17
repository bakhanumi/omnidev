import { Metadata } from 'next';
import ProjectForm from '@/components/ProjectForm';

export const metadata: Metadata = {
  title: 'Добавление проекта - Omniscient Dev',
  description: 'Добавление нового проекта',
};

export default function AddProjectPage() {
  return (
    <>
      <p className="welcome">Добавление нового проекта</p>
      <div className="separator"></div>

      <section>
        <h2 className="section-header"># Новый проект</h2>
        <ProjectForm />
      </section>
    </>
  );
}
