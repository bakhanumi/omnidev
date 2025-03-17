import { Metadata } from 'next';
import AuthForm from '@/components/AuthForm';

export const metadata: Metadata = {
  title: 'Регистрация - Omniscient Dev',
  description: 'Создание аккаунта Omniscient Dev',
};

export default function SignUp() {
  return (
    <div className="auth-page">
      <AuthForm />
    </div>
  );
}
