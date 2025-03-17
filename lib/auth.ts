import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import bcrypt from 'bcryptjs';
import { createUser, getUserByEmail } from './db/index';

// Функция для получения текущей сессии на сервере
export async function getSession() {
  return await getServerSession(authOptions);
}

// Проверка, авторизован ли пользователь
export async function getCurrentUser() {
  const session = await getSession();
  
  return session?.user;
}

// Проверка, является ли пользователь администратором
export function isAdmin(user: { id: string; name?: string | null; role?: string }) {
  return user?.role === 'admin' || user?.name === 'bakhanumi';
}

// Регистрация нового пользователя
export async function registerUser(userData: { 
  name: string; 
  email: string; 
  password: string;
}) {
  const { name, email, password } = userData;
  
  // Проверка, существует ли пользователь
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error('Пользователь с таким email уже существует');
  }
  
  // Определение роли пользователя
  const role = name === 'bakhanumi' ? 'admin' : 'user';
  
  // Хеширование пароля
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Создание пользователя
  await createUser({
    name,
    email,
    password: hashedPassword,
    role,
    createdAt: new Date().toISOString()
  });
  
  return { success: true };
}
