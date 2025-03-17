import type { Metadata } from 'next';
import '@/app/globals.css';
import Logo from '@/components/Logo';
import Navigation from '@/components/Navigation';
import ThemeToggle from '@/components/ThemeToggle';
import UserNav from '@/components/UserNav';
import { Providers } from '@/app/providers';

export const metadata: Metadata = {
  title: 'Omniscient Dev',
  description: 'Сообщество разработчиков Omniscient в Фергане',
};

export default function RootLayout({
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
            <div className="header">
              <Logo />
              <UserNav />
            </div>
            <div className="content">
              <div className="main-content">
                <Navigation />
                <main>{children}</main>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
