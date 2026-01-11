import { db } from '../../database'
import { projects } from '../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code')

  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Project code is required',
    })
  }

  try {
    // Fetch project by code
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.projectCode, code))
      .limit(1)

    if (!project || project.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found',
      })
    }

    return project[0]
  } catch (error) {
    console.error('Error fetching project:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch project data',
    })
  }
})
