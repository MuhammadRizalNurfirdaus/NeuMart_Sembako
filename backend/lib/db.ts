import { Pool, PoolClient } from 'pg'
import dotenv from 'dotenv'
import path from 'path'

// Load .env from backend directory
dotenv.config({ path: path.join(__dirname, '../.env') })

// Create PostgreSQL connection pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
})

// Test connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database')
})

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err)
  process.exit(-1)
})

// Helper function to execute queries
export async function query(text: string, params?: any[]) {
  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('executed query', { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error('Error executing query:', error)
    throw error
  }
}

// Get a client from the pool
export async function getClient(): Promise<PoolClient> {
  const client = await pool.connect()
  return client
}

export default pool
