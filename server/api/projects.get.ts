import { db } from '../database'
import { projects } from '../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // Fetch all active projects
    const activeProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.isActive, true))
      .orderBy(projects.createdAt)

    return activeProjects
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch projects data',
    })
  }
})
