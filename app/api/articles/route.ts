import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isAdmin } from '@/lib/auth';
import { createArticle } from '@/lib/db/index';

export async function GET() {
  try {
    // Получение статей может быть доступно всем
    return NextResponse.json({
      message: "Эндпоинт для получения списка статей"
    });
  } catch (error) {
    console.error('Ошибка получения статей:', error);
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
    const { title, content } = body;
    
    // Валидация данных
    if (!title || !content) {
      return NextResponse.json(
        { message: 'Заголовок и содержание статьи обязательны' },
        { status: 400 }
      );
    }
    
    // Создание статьи
    await createArticle({
      title,
      content,
      createdAt: new Date().toISOString()
    });
    
    return NextResponse.json(
      { message: 'Статья успешно создана' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Ошибка создания статьи:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
