import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  email: text('email').notNull().unique(),
  password: text('password'),
  image: text('image'),
  role: text('role').default('user'),
  createdAt: text('created_at').notNull()
});

export const events = sqliteTable('events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  date: text('date'),
  description: text('description').notNull(),
  createdAt: text('created_at').notNull()
});

export const articles = sqliteTable('articles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: text('created_at').notNull()
});

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  link: text('link'),
  createdAt: text('created_at').notNull()
});

export const talks = sqliteTable('talks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  speakerName: text('speaker_name').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url'),
  createdAt: text('created_at').notNull()
});

export type User = typeof users.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Talk = typeof talks.$inferSelect;

export type NewUser = typeof users.$inferInsert;
export type NewEvent = typeof events.$inferInsert;
export type NewArticle = typeof articles.$inferInsert;
export type NewProject = typeof projects.$inferInsert;
export type NewTalk = typeof talks.$inferInsert;
