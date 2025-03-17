import { Metadata } from 'next';
import AuthForm from '@/components/AuthForm';

export const metadata: Metadata = {
  title: 'Вход - Omniscient Dev',
  description: 'Вход в аккаунт Omniscient Dev',
};

export default function SignIn() {
  return (
    <div className="auth-page">
      <AuthForm />
    </div>
  );
}
