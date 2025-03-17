import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isAdmin } from '@/lib/auth';
import { createProject } from '@/lib/db/index';

export async function GET() {
  try {
    // Получение проектов может быть доступно всем
    return NextResponse.json({
      message: "Эндпоинт для получения списка проектов"
    });
  } catch (error) {
    console.error('Ошибка получения проектов:', error);
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
    const { title, description, link } = body;
    
    // Валидация данных
    if (!title || !description) {
      return NextResponse.json(
        { message: 'Название и описание проекта обязательны' },
        { status: 400 }
      );
    }
    
    // Создание проекта
    await createProject({
      title,
      description,
      link: link || null,
      createdAt: new Date().toISOString()
    });
    
    return NextResponse.json(
      { message: 'Проект успешно создан' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Ошибка создания проекта:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
