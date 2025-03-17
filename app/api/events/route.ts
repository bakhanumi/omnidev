import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isAdmin } from '@/lib/auth';
import { createEvent } from '@/lib/db/index';

export async function GET() {
  try {
    // Получение событий может быть доступно всем
    return NextResponse.json({
      message: "Эндпоинт для получения списка событий"
    });
  } catch (error) {
    console.error('Ошибка получения событий:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    // Проверка, является ли пользователь администратором
    if (!user || !isAdmin(user)) {
      return NextResponse.json(
        { message: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const { title, date, description } = body;
    
    // Валидация данных
    if (!title || !description) {
      return NextResponse.json(
        { message: 'Название и описание события обязательны' },
        { status: 400 }
      );
    }
    
    // Создание события
    await createEvent({
      title,
      date: date || null,
      description,
      createdAt: new Date().toISOString()
    });
    
    return NextResponse.json(
      { message: 'Событие успешно создано' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Ошибка создания события:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
