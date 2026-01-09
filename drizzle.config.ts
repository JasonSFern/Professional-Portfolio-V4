import type { Config } from 'drizzle-kit'

export default {
  schema: './server/database/schema/*',
  out: './server/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/portfolio',
  },
} satisfies Config
