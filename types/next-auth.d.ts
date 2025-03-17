import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Расширяем типы для User и Session
   */
  interface User {
    id: string;
  }

  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}
