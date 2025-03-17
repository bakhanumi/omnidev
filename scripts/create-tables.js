const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Удостоверимся, что директория scripts существует
const scriptsDir = path.join(__dirname);
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

console.log('Начинаем создание базы данных и таблиц...');

// Путь к файлу базы данных
const dbPath = path.join(process.cwd(), 'sqlite.db');

// Удалить существующую базу данных, если она существует
if (fs.existsSync(dbPath)) {
  console.log('Удаляем существующую базу данных...');
  fs.unlinkSync(dbPath);
  console.log('Существующая база данных удалена.');
}

// Создаем новую базу данных
const db = new Database(dbPath);
console.log('Создана новая база данных:', dbPath);

// Создаем таблицу users
console.log('Создаем таблицу users...');
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT NOT NULL UNIQUE,
    password TEXT,
    image TEXT,
    role TEXT DEFAULT 'user',
    created_at TEXT NOT NULL
  )
`);
console.log('Таблица users создана.');

// Создаем таблицу events
console.log('Создаем таблицу events...');
db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT,
    description TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`);
console.log('Таблица events создана.');

// Создаем таблицу projects
console.log('Создаем таблицу projects...');
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    link TEXT,
    created_at TEXT NOT NULL
  )
`);
console.log('Таблица projects создана.');

// Создаем таблицу talks
console.log('Создаем таблицу talks...');
db.exec(`
  CREATE TABLE IF NOT EXISTS talks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    speaker_name TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    created_at TEXT NOT NULL
  )
`);
console.log('Таблица talks создана.');

// Создаем таблицу articles
console.log('Создаем таблицу articles...');
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`);
console.log('Таблица articles создана.');

// Добавляем тестовые данные
console.log('Добавляем тестовые данные...');

// Добавляем тестовый доклад
db.exec(`
  INSERT INTO talks (title, speaker_name, description, image_url, created_at)
  VALUES (
    'Лингвистическая относительность',
    'Станислав Горман',
    'У каждого языка есть принципы, на которых он основан. В то время, как одни взгляды нам близки, а другие мы не принимаем, они формируют не только дизайн языка и архитектуру библиотек и систем, которые разрабатываются на этом языке, но и сообщество.',
    '/speaker1.jpg',
    '${new Date().toISOString()}'
  )
`);
console.log('Тестовый доклад добавлен.');

// Добавляем тестовое событие
db.exec(`
  INSERT INTO events (title, date, description, created_at)
  VALUES (
    'Встреча сообщества Omniscient Dev',
    '${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()}',
    'Обсуждение последних технологических трендов и обмен опытом',
    '${new Date().toISOString()}'
  )
`);
console.log('Тестовое событие добавлено.');

// Добавляем тестовый проект
db.exec(`
  INSERT INTO projects (title, description, link, created_at)
  VALUES (
    'Omniscient Web',
    'Разработка веб-платформы для IT-сообщества',
    'https://github.com/omniscientdev/omniscient-web',
    '${new Date().toISOString()}'
  )
`);
console.log('Тестовый проект добавлен.');

// Добавляем тестовую статью
db.exec(`
  INSERT INTO articles (title, content, created_at)
  VALUES (
    'Знакомство с React',
    'React — это JavaScript-библиотека для создания пользовательских интерфейсов. React позволяет создавать сложные интерфейсы из небольших изолированных фрагментов кода, которые называются «компонентами».',
    '${new Date().toISOString()}'
  )
`);
console.log('Тестовая статья добавлена.');

// Закрываем соединение с базой данных
db.close();
console.log('Соединение с базой данных закрыто.');

console.log('База данных и таблицы успешно созданы и заполнены тестовыми данными!');
