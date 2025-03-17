'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="side-nav">
      <ul>
        <li>
          <Link href="/" className={isActive('/') ? 'active' : ''}>
            - Главная
          </Link>
        </li>
        <li>
          <Link href="/events" className={isActive('/events') ? 'active' : ''}>
            - События
          </Link>
        </li>
        <li>
          <Link href="/projects" className={isActive('/projects') ? 'active' : ''}>
            - Проекты
          </Link>
        </li>
        <li>
          <Link href="/articles" className={isActive('/articles') ? 'active' : ''}>
            - Статьи
          </Link>
        </li>
        <li>
          <Link href="/contacts" className={isActive('/contacts') ? 'active' : ''}>
            - Контакты
          </Link>
        </li>
        <li>
          <Link href="/profile" className={isActive('/profile') ? 'active' : ''}>
            - Профиль
          </Link>
        </li>
      </ul>
    </nav>
  );
}
