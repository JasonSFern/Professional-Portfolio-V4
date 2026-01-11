import { db } from '../index'
import { skills, type InsertSkill } from '../schema/skill'

export const frontendSkills: InsertSkill[] = [
  {
    name: 'React',
    icon: '/icons/react.svg',
    proficiency: 5,
    category: 'Frontend',
    isActive: 1,
  },
  {
    name: 'Vue.js',
    icon: '/icons/vuejs.svg',
    proficiency: 5,
    category: 'Frontend',
    isActive: 1,
  },
  {
    name: 'Next.js',
    icon: '/icons/nextjs.svg',
    proficiency: 5,
    category: 'Frontend',
    isActive: 1,
  },
  {
    name: 'Nuxt.js',
    icon: '/icons/nuxtjs.svg',
    proficiency: 5,
    category: 'Frontend',
    isActive: 1,
  },
  {
    name: 'HTML5',
    icon: '/icons/html5.svg',
    proficiency: 5,
    category: 'Frontend',
    isActive: 1,
  },
  {
    name: 'CSS3',
    icon: '/icons/css3.svg',
    proficiency: 5,
    category: 'Frontend',
    isActive: 1,
  },
  {
    name: 'Tailwind CSS',
    icon: '/icons/tailwind.svg',
    proficiency: 5,
    category: 'Frontend',
    isActive: 1,
  },
  {
    name: 'Bootstrap CSS',
    icon: '/icons/bootstrap.svg',
    proficiency: 5,
    category: 'Frontend',
    isActive: 1,
  },
  {
    name: 'Sass/SCSS',
    icon: '/icons/sass.svg',
    proficiency: 5,
    category: 'Frontend',
    isActive: 1,
  },
]

export async function seedFrontendSkills() {
  console.log('🌱 Seeding frontend skills...')
  await db.insert(skills).values(frontendSkills)
  console.log('✅ Frontend skills seeded successfully')
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  await seedFrontendSkills()
  process.exit(0)
}
