import { pgTable, serial, varchar, jsonb, boolean, timestamp } from 'drizzle-orm/pg-core'

// Define types for complex JSONB fields
export type ProjectLink = {
  type: string
  label?: string
  path: string
  icon?: string
}

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  projectCode: varchar('project_code', { length: 100 }).notNull().unique(),
  category: varchar('category', { length: 100 }).notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  subtitle: varchar('subtitle', { length: 300 }).notNull(),

  // Contents as JSONB array of markdown strings
  contents: jsonb('contents').$type<string[]>().notNull(),

  isActive: boolean('is_active').notNull().default(true),
  displayTheme: varchar('display_theme', { length: 100 }).notNull(),

  // Photos as JSONB object
  photos: jsonb('photos')
    .$type<{
      background: string
      titlecard: string
    }>()
    .notNull(),

  // Skills as JSONB object with icons array
  skills: jsonb('skills')
    .$type<{
      icons: string[]
    }>()
    .notNull(),

  // Links as JSONB array of link objects
  links: jsonb('links').$type<ProjectLink[]>(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Type inference for select and insert
export type Project = typeof projects.$inferSelect
export type InsertProject = typeof projects.$inferInsert
