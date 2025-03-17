import type { Metadata } from 'next';
import '@/app/globals.css';
import { Providers } from '@/app/providers';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Аутентификация - Omniscient Dev',
  description: 'Вход и регистрация в Omniscient Dev',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <ThemeToggle />
          <div className="container">
            <Logo />
            <div className="content">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
