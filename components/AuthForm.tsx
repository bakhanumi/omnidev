'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

type AuthMode = 'signin' | 'signup';

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  
  const [mode, setMode] = useState<AuthMode>('signin');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setError(null);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      if (mode === 'signup') {
        // Регистрация
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Ошибка при регистрации');
        }
        
        // После успешной регистрации выполняем вход
        await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false
        });
        
        router.push(callbackUrl);
      } else {
        // Вход
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false
        });
        
        if (result?.error) {
          throw new Error('Неверный email или пароль');
        }
        
        router.push(callbackUrl);
      }
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{mode === 'signin' ? 'Вход' : 'Регистрация'}</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        {mode === 'signup' && (
          <input
            type="text"
            name="name"
            placeholder="Имя"
            className="auth-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="auth-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="auth-input"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />
        
        <button 
          type="submit" 
          className="auth-button"
          disabled={isLoading}
        >
          {isLoading ? 'Загрузка...' : mode === 'signin' ? 'Войти' : 'Зарегистрироваться'}
        </button>
        
        <p>
          {mode === 'signin' ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <button 
            type="button" 
            onClick={toggleMode}
            className="auth-toggle"
          >
            {mode === 'signin' ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </p>
      </form>
    </div>
  );
}
