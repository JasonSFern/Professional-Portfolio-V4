import { db } from '../database'
import { skills } from '../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // Fetch all active skills
    const activeSkills = await db
      .select()
      .from(skills)
      .where(eq(skills.isActive, 1))
      .orderBy(skills.category, skills.name)

    return activeSkills
  } catch (error) {
    console.error('Error fetching skills:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch skills data',
    })
  }
})
