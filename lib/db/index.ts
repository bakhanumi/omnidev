import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { eq } from 'drizzle-orm';

// Инициализация базы данных
const sqlite = new Database(process.env.DATABASE_URL || './sqlite.db');
export const db = drizzle(sqlite, { schema });

// Функции для работы с событиями
export async function getEvents() {
  return db.select().from(schema.events).all();
}

export async function getEventById(id: number) {
  return db.select().from(schema.events).where(eq(schema.events.id, id)).get();
}

export async function createEvent(event: schema.NewEvent) {
  return db.insert(schema.events).values(event).run();
}

// Функции для работы с проектами
export async function getProjects() {
  return db.select().from(schema.projects).all();
}

export async function getProjectById(id: number) {
  return db.select().from(schema.projects).where(eq(schema.projects.id, id)).get();
}

export async function createProject(project: schema.NewProject) {
  return db.insert(schema.projects).values(project).run();
}

// Функции для работы с докладами
export async function getTalks() {
  return db.select().from(schema.talks).all();
}

export async function getTalkById(id: number) {
  return db.select().from(schema.talks).where(eq(schema.talks.id, id)).get();
}

export async function createTalk(talk: schema.NewTalk) {
  return db.insert(schema.talks).values(talk).run();
}

// Функции для работы со статьями
export async function getArticles() {
  return db.select().from(schema.articles).all();
}

export async function getArticleById(id: number) {
  return db.select().from(schema.articles).where(eq(schema.articles.id, id)).get();
}

export async function createArticle(article: schema.NewArticle) {
  return db.insert(schema.articles).values(article).run();
}

// Функции для работы с пользователями
export async function getUserByEmail(email: string) {
  return db.select().from(schema.users).where(eq(schema.users.email, email)).get();
}

export async function getUserById(id: number) {
  return db.select().from(schema.users).where(eq(schema.users.id, id)).get();
}

export async function createUser(user: schema.NewUser) {
  return db.insert(schema.users).values(user).run();
}
