import { db } from '../index'
import { skills, type InsertSkill } from '../schema/skill'

export const backendSkills: InsertSkill[] = [
  {
    name: 'Node.js',
    icon: '/icons/nodejs.svg',
    proficiency: 5,
    category: 'Backend',
    isActive: 1,
  },
  {
    name: 'Express.js',
    icon: '/icons/express.svg',
    proficiency: 5,
    category: 'Backend',
    isActive: 1,
  },
  {
    name: 'Django',
    icon: '/icons/django.svg',
    proficiency: 5,
    category: 'Backend',
    isActive: 1,
  },
  {
    name: 'Flask',
    icon: '/icons/flask.svg',
    proficiency: 5,
    category: 'Backend',
    isActive: 1,
  },
  {
    name: 'FastAPI',
    icon: '/icons/fastapi.svg',
    proficiency: 5,
    category: 'Backend',
    isActive: 1,
  },
  {
    name: 'Ruby on Rails',
    icon: '/icons/rails.svg',
    proficiency: 5,
    category: 'Backend',
    isActive: 1,
  },
  {
    name: 'Laravel',
    icon: '/icons/laravel.svg',
    proficiency: 5,
    category: 'Backend',
    isActive: 1,
  },
]

export async function seedBackendSkills() {
  console.log('🌱 Seeding backend skills...')
  await db.insert(skills).values(backendSkills)
  console.log('✅ Backend skills seeded successfully')
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  await seedBackendSkills()
  process.exit(0)
}
