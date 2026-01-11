import { db } from '../database'
import { profiles } from '../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // Fetch the first profile entry
    const profile = await db.select().from(profiles).limit(1)

    if (!profile || profile.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Profile not found',
      })
    }

    return profile[0]
  } catch (error) {
    console.error('Error fetching profile:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch profile data',
    })
  }
})
