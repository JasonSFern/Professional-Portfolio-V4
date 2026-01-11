import { sql } from 'drizzle-orm'
import { db, client } from './index'

async function resetDatabase() {
  try {
    console.log('🗑️  Dropping all tables...')

    // Drop tables in reverse order of dependencies
    await db.execute(sql`DROP TABLE IF EXISTS projects CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS profiles CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS skills CASCADE`)

    console.log('✅ All tables dropped successfully!')
    console.log('\n💡 Run the following commands to recreate the database:')
    console.log('   1. yarn db:push    (to create tables)')
    console.log('   2. yarn db:seed    (to populate data)')
  } catch (error) {
    console.error('❌ Error resetting database:', error)
    throw error
  } finally {
    await client.end()
  }
}

resetDatabase()
