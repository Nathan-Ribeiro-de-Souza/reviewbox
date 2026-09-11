import 'dotenv/config'
import { Pool } from 'pg'

export const database = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1,
  ssl: {
    rejectUnauthorized: false
  }
})

export async function test() {
  try {
    await database.query('SELECT NOW()')

    console.log('Database connected successfully')
  } catch (error) {
    console.error('Database connection failed:', error)
  }
}