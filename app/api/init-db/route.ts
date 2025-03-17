import { NextResponse } from 'next/server';
import { migrateDatabase } from '@/lib/db/migrate';

export async function GET() {
  try {
    const result = await migrateDatabase();
    return NextResponse.json(
      { message: 'База данных успешно инициализирована', ...result },
      { status: 200 }
    );
  } catch (error) {
    console.error('Ошибка при инициализации базы данных:', error);
    return NextResponse.json(
      { message: 'Ошибка при инициализации базы данных', error: String(error) },
      { status: 500 }
    );
  }
}
