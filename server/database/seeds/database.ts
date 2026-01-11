import { db } from '../index'
import { skills, type InsertSkill } from '../schema/skill'

export const databaseSkills: InsertSkill[] = [
  {
    name: 'MongoDB',
    icon: '/icons/mongodb.svg',
    proficiency: 5,
    category: 'Database',
    isActive: 1,
  },
  {
    name: 'PostgreSQL',
    icon: '/icons/postgresql.svg',
    proficiency: 5,
    category: 'Database',
    isActive: 1,
  },
  {
    name: 'MySQL',
    icon: '/icons/mysql.svg',
    proficiency: 5,
    category: 'Database',
    isActive: 1,
  },
  {
    name: 'Redis',
    icon: '/icons/redis.svg',
    proficiency: 5,
    category: 'Database',
    isActive: 1,
  },
]

export async function seedDatabaseSkills() {
  console.log('🌱 Seeding database skills...')
  await db.insert(skills).values(databaseSkills)
  console.log('✅ Database skills seeded successfully')
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  await seedDatabaseSkills()
  process.exit(0)
}
