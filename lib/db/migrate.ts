import { db } from './index';
import * as schema from './schema';
import { sql } from 'drizzle-orm';

// Функция для создания таблиц
export async function migrateDatabase() {
  console.log('Начало миграции базы данных...');

  try {
    // Создаем таблицу users, если она не существует
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT NOT NULL UNIQUE,
        password TEXT,
        image TEXT,
        created_at TEXT NOT NULL
      )
    `);
    console.log('Таблица users создана или уже существует');
    
    // Создаем таблицу events, если она не существует
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        date TEXT,
        description TEXT NOT NULL,
        created_at TEXT NOT NULL
      )
    `);
    console.log('Таблица events создана или уже существует');

    // Создаем таблицу projects, если она не существует
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        link TEXT,
        created_at TEXT NOT NULL
      )
    `);
    console.log('Таблица projects создана или уже существует');

    // Создаем таблицу talks, если она не существует
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS talks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        speaker_name TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT,
        created_at TEXT NOT NULL
      )
    `);
    console.log('Таблица talks создана или уже существует');

    // Добавляем тестовую статью, если их еще нет
    const articlesCount = await db.select({ count: sql`count(*)` }).from(schema.articles);
    
    if (articlesCount[0].count === 0) {
      await db.insert(schema.articles).values({
        title: 'Знакомство с React',
        content: 'React — это JavaScript-библиотека для создания пользовательских интерфейсов. React позволяет создавать сложные интерфейсы из небольших изолированных фрагментов кода, которые называются «компонентами».',
        createdAt: new Date().toISOString()
      });
      console.log('Добавлены тестовые данные в таблицу articles');
    }
    const talksCount = await db.select({ count: sql`count(*)` }).from(schema.talks);
    
    if (talksCount[0].count === 0) {
      await db.insert(schema.talks).values({
        title: 'Лингвистическая относительность',
        speakerName: 'Станислав Горман',
        description: 'У каждого языка есть принципы, на которых он основан. В то время, как одни взгляды нам близки, а другие мы не принимаем, они формируют не только дизайн языка и архитектуру библиотек и систем, которые разрабатываются на этом языке, но и сообщество.',
        imageUrl: '/speaker1.jpg',
        createdAt: new Date().toISOString()
      });
      console.log('Добавлены тестовые данные в таблицу talks');
    }

    const eventsCount = await db.select({ count: sql`count(*)` }).from(schema.events);
    
    if (eventsCount[0].count === 0) {
      await db.insert(schema.events).values({
        title: 'Встреча сообщества Omniscient Dev',
        date: new Date('2025-04-15T18:00:00').toISOString(),
        description: 'Обсуждение последних технологических трендов и обмен опытом',
        createdAt: new Date().toISOString()
      });
      console.log('Добавлены тестовые данные в таблицу events');
    }

    const projectsCount = await db.select({ count: sql`count(*)` }).from(schema.projects);
    
    if (projectsCount[0].count === 0) {
      await db.insert(schema.projects).values({
        title: 'Omniscient Web',
        description: 'Разработка веб-платформы для IT-сообщества',
        link: 'https://github.com/omniscientdev/omniscient-web',
        createdAt: new Date().toISOString()
      });
      console.log('Добавлены тестовые данные в таблицу projects');
    }

    console.log('Миграция базы данных успешно завершена');
    return { success: true };
  } catch (error) {
    console.error('Ошибка при миграции базы данных:', error);
    return { success: false, error };
  }
}
