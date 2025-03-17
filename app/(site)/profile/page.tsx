import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Профиль - Omniscient Dev',
  description: 'Личный профиль пользователя Omniscient Dev',
};

export default async function ProfilePage() {
  const user = await getCurrentUser();
  
  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!user) {
    redirect('/auth/signin?callbackUrl=/profile');
  }
  
  return (
    <>
      <p className="welcome">Личный профиль</p>
      <div className="separator"></div>

      <section>
        <h2 className="section-header"># Информация о пользователе</h2>
        <div className="profile-container">
          <div className="profile-card">
            <h3>Профиль</h3>
            <div className="profile-info">
              <p><strong>Имя:</strong> {user.name || 'Не указано'}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
