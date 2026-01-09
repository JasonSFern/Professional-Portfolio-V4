import { seedBackendSkills } from './backend'
import { seedFrontendSkills } from './frontend'
import { seedDatabaseSkills } from './database'
import { seedLanguageSkills } from './languages'
import { seedToolSkills } from './tools'
import { seedProfile } from './profile'
import { seedProjects } from './projects'
import { client } from '../index'

async function seedAll() {
  try {
    console.log('🌱 Starting database seeding...\n')

    // Seed profile first
    await seedProfile()

    // Seed skills
    await seedBackendSkills()
    await seedFrontendSkills()
    await seedDatabaseSkills()
    await seedLanguageSkills()
    await seedToolSkills()

    // Seed projects
    await seedProjects()

    console.log('\n✅ All seeds completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    await client.end()
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  await seedAll()
}

export { seedAll }
