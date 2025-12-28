import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import productRoutes from './routes/products'
import aiRoutes from './routes/ai'
import authRoutes from './routes/auth'
import adminRoutes from './routes/admin'
import adminCrudRoutes from './routes/admin-crud'
import orderRoutes from './routes/orders'
import reviewRoutes from './routes/reviews'
import customerRoutes from './routes/customer'
import { pool } from '../lib/db'
import { initializeDatabase, seedProducts } from '../lib/initDb'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3003

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Routes
app.use('/api/products', productRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/admin', adminCrudRoutes)  // Admin CRUD operations
app.use('/api/orders', orderRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/customer', customerRoutes) // Customer account management routes

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'NeuMart Sembako API is running' })
})

// Database connection test
app.get('/api/db-test', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json({ 
      success: true, 
      message: 'Database connected successfully!', 
      timestamp: result.rows[0].now 
    })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed', 
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Initialize database and start server
async function startServer() {
  try {
    // Test database connection
    console.log('🔍 Testing database connection...')
    const dbTestPromise = pool.query('SELECT NOW()')
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database connection timeout')), 5000)
    )
    
    try {
      await Promise.race([dbTestPromise, timeoutPromise])
      console.log('✅ Database connection successful!')

      // Initialize database schema
      await initializeDatabase()

      // Seed sample products (optional - comment out after first run)
      const result = await pool.query('SELECT COUNT(*) FROM products')
      if (result.rows[0].count === '0') {
        await seedProducts()
      }
      
      console.log('✅ Database ready!')
    } catch (dbError) {
      console.warn('⚠️  Database connection failed - Running in FALLBACK mode')
      console.warn('⚠️  Some features may not work without database')
      console.warn('⚠️  Error:', dbError instanceof Error ? dbError.message : 'Unknown error')
    }

    // Start server regardless of database status
    app.listen(PORT, () => {
      console.log(`🚀 Backend server running on http://localhost:${PORT}`)
      console.log(`📡 API available at http://localhost:${PORT}/api`)
      console.log(`🖼️  Upload directory: ${path.join(__dirname, '../uploads')}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

export default app
