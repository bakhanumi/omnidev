import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isAdmin } from '@/lib/auth';
import { db } from '@/lib/db';
import { articles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    
    // Проверка, является ли пользователь администратором
    if (!user || !isAdmin(user)) {
      return NextResponse.json(
        { message: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { message: 'Неверный ID статьи' },
        { status: 400 }
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
    
    // Обновление статьи
    await db.update(articles)
      .set({
        title,
        content
      })
      .where(eq(articles.id, id))
      .run();
    
    return NextResponse.json(
      { message: 'Статья успешно обновлена' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Ошибка обновления статьи:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    
    // Проверка, является ли пользователь администратором
    if (!user || !isAdmin(user)) {
      return NextResponse.json(
        { message: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { message: 'Неверный ID статьи' },
        { status: 400 }
      );
    }
    
    // Удаление статьи
    await db.delete(articles)
      .where(eq(articles.id, id))
      .run();
    
    return NextResponse.json(
      { message: 'Статья успешно удалена' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Ошибка удаления статьи:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
