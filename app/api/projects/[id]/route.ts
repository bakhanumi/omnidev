import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isAdmin } from '@/lib/auth';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
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
        { message: 'Неверный ID проекта' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    const { title, description, link } = body;
    
    // Валидация данных
    if (!title || !description) {
      return NextResponse.json(
        { message: 'Название и описание проекта обязательны' },
        { status: 400 }
      );
    }
    
    // Обновление проекта
    await db.update(projects)
      .set({
        title,
        description,
        link: link || null
      })
      .where(eq(projects.id, id))
      .run();
    
    return NextResponse.json(
      { message: 'Проект успешно обновлен' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Ошибка обновления проекта:', error);
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
        { message: 'Неверный ID проекта' },
        { status: 400 }
      );
    }
    
    // Удаление проекта
    await db.delete(projects)
      .where(eq(projects.id, id))
      .run();
    
    return NextResponse.json(
      { message: 'Проект успешно удален' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Ошибка удаления проекта:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
