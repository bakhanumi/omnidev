import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isAdmin } from '@/lib/auth';
import { db } from '@/lib/db';
import { events } from '@/lib/db/schema';
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
        { message: 'Неверный ID события' },
        { status: 400 }
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
    
    // Обновление события
    await db.update(events)
      .set({
        title,
        date: date || null,
        description
      })
      .where(eq(events.id, id))
      .run();
    
    return NextResponse.json(
      { message: 'Событие успешно обновлено' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Ошибка обновления события:', error);
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
        { message: 'Неверный ID события' },
        { status: 400 }
      );
    }
    
    // Удаление события
    await db.delete(events)
      .where(eq(events.id, id))
      .run();
    
    return NextResponse.json(
      { message: 'Событие успешно удалено' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Ошибка удаления события:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
