import { pgTable, serial, jsonb, timestamp, varchar } from 'drizzle-orm/pg-core'

// Define types for complex JSONB fields
export type MottoItem = { class: string; text: string }
export type Location = {
  city: string
  region: string
  postal_code: string
  country: string
}
export type ServiceItem = {
  title: string
  description: string[]
}
export type EthosItem = {
  title: string
  tagline: string
  description: string
}
export type ContactInfo = {
  link: string
  label: string
}

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  pronouns: varchar('pronouns', { length: 50 }).notNull(),

  // Motto as JSONB array of objects: [{ class: string, text: string }]
  motto: varchar('motto', { length: 200 }).notNull(),

  // Location as JSONB object: { city, region, postal_code, country }
  location: jsonb('location').$type<Location>().notNull(),

  // Bio as array of strings
  bio: jsonb('bio').$type<string[]>().notNull(),

  // Services object with intro and content array
  services: jsonb('services')
    .$type<{
      intro: string
      content: ServiceItem[]
    }>()
    .notNull(),

  // Ethos object with intro and content array
  ethos: jsonb('ethos')
    .$type<{
      intro: string
      content: EthosItem[]
    }>()
    .notNull(),

  // Contact as JSONB object (key-value map)
  // Structure: { email: { link: string, label: string }, phone: { ... }, etc. }
  contact: jsonb('contact').$type<Record<string, ContactInfo>>().notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Type inference for select and insert
export type Profile = typeof profiles.$inferSelect
export type InsertProfile = typeof profiles.$inferInsert
