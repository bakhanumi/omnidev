'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function UserNav() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };
  
  return (
    <div className="user-nav">
      {isLoading ? (
        <span>Загрузка...</span>
      ) : isAuthenticated ? (
        <div className="user-info">
          <span>Привет, {session?.user?.name || 'пользователь'}</span>
          <button onClick={handleSignOut} className="signout-button">
            Выйти
          </button>
        </div>
      ) : (
        <Link href="/auth/signin" className="signin-button">
          Войти
        </Link>
      )}
    </div>
  );
}
