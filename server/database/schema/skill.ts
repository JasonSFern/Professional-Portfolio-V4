import { pgTable, serial, varchar, integer, timestamp } from 'drizzle-orm/pg-core'

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  icon: varchar('icon', { length: 100 }).notNull(),

  // Proficiency level between 1-5
  proficiency: integer('proficiency').notNull(),

  // Category with enum-like constraint
  category: varchar('category', { length: 50 }).notNull(),

  // isActive as integer (0 or 1) to match original schema
  isActive: integer('is_active').notNull().default(1),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Type inference for select and insert
export type Skill = typeof skills.$inferSelect
export type InsertSkill = typeof skills.$inferInsert

// Category enum for TypeScript type checking
export const SkillCategory = {
  Frontend: 'Frontend',
  Backend: 'Backend',
  Database: 'Database',
  Tools: 'Tools',
  Languages: 'Languages',
  Other: 'Other',
} as const

export type SkillCategoryType = typeof SkillCategory[keyof typeof SkillCategory]
