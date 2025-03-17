'use client';

import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';

// Компонент, который рендерит содержимое только для администраторов
export default function AdminCheck({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  
  const isAdmin = 
    session?.user?.role === 'admin' || 
    session?.user?.name === 'bakhanumi';
  
  if (!isAdmin) {
    return null;
  }
  
  return <>{children}</>;
}
