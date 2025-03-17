import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    
    // Базовая валидация
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: 'Отсутствуют обязательные поля' },
        { status: 400 }
      );
    }
    
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Пароль должен содержать минимум 6 символов' },
        { status: 400 }
      );
    }
    
    // Регистрация пользователя
    await registerUser({ name, email, password });
    
    return NextResponse.json(
      { success: true, message: 'Пользователь успешно зарегистрирован' },
      { status: 201 }
    );
    
  } catch (error: any) {
    console.error('Ошибка при регистрации:', error);
    
    // Обработка ошибки дублирования email
    if (error.message.includes('уже существует')) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Ошибка при регистрации пользователя' },
      { status: 500 }
    );
  }
}
