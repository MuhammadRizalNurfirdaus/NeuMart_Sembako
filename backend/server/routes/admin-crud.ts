import express, { Request, Response } from 'express'
import { pool } from '../../lib/db'
import { upload } from '../../lib/upload'
import bcrypt from 'bcrypt'

const router = express.Router()

// ==================== USERS CRUD ====================

// GET - Get all users
router.get('/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT id, uid, username, email, role, photo_url, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
    `)

    res.json({
      success: true,
      users: result.rows
    })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch users' })
  }
})

// GET - Get user by ID
router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      `SELECT id, uid, username, email, role, photo_url, created_at, updated_at
       FROM users WHERE id = $1`,
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    res.json({
      success: true,
      user: result.rows[0]
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch user' })
  }
})

// POST - Create new user
router.post('/users', async (req: Request, res: Response) => {
  try {
    const { username, email, password, role = 'customer' } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username, email, and password are required' 
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    const uid = `user-${Date.now()}`

    const result = await pool.query(
      `INSERT INTO users (uid, username, email, password, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, uid, username, email, role, created_at`,
      [uid, username, email, hashedPassword, role]
    )

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: result.rows[0]
    })
  } catch (error: any) {
    console.error('Create user error:', error)
    if (error.code === '23505') { // Unique violation
      res.status(409).json({ success: false, message: 'Email already exists' })
    } else {
      res.status(500).json({ success: false, message: 'Failed to create user' })
    }
  }
})

// PUT - Update user
router.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { username, email, role, password } = req.body

    let query = 'UPDATE users SET username = $1, email = $2, role = $3, updated_at = NOW()'
    const params: any[] = [username, email, role]

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      query += ', password = $4'
      params.push(hashedPassword)
      query += ' WHERE id = $5 RETURNING id, uid, username, email, role, updated_at'
      params.push(id)
    } else {
      query += ' WHERE id = $4 RETURNING id, uid, username, email, role, updated_at'
      params.push(id)
    }

    const result = await pool.query(query, params)

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      user: result.rows[0]
    })
  } catch (error) {
    console.error('Update user error:', error)
    res.status(500).json({ success: false, message: 'Failed to update user' })
  }
})

// DELETE - Delete user
router.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING id',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    })
  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({ success: false, message: 'Failed to delete user' })
  }
})

// ==================== CATEGORIES CRUD ====================

// GET - Get all categories
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT c.*, COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id
      GROUP BY c.id
      ORDER BY c.category_name
    `)

    res.json({
      success: true,
      categories: result.rows
    })
  } catch (error) {
    console.error('Get categories error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch categories' })
  }
})

// GET - Get category by ID
router.get('/categories/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'SELECT * FROM categories WHERE id = $1',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' })
    }

    res.json({
      success: true,
      category: result.rows[0]
    })
  } catch (error) {
    console.error('Get category error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch category' })
  }
})

// POST - Create new category
router.post('/categories', async (req: Request, res: Response) => {
  try {
    const { category_name } = req.body

    if (!category_name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Category name is required' 
      })
    }

    const result = await pool.query(
      `INSERT INTO categories (category_name)
       VALUES ($1)
       RETURNING *`,
      [category_name]
    )

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category: result.rows[0]
    })
  } catch (error: any) {
    console.error('Create category error:', error)
    if (error.code === '23505') {
      res.status(409).json({ success: false, message: 'Category already exists' })
    } else {
      res.status(500).json({ success: false, message: 'Failed to create category' })
    }
  }
})

// PUT - Update category
router.put('/categories/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { category_name } = req.body

    const result = await pool.query(
      `UPDATE categories 
       SET category_name = $1
       WHERE id = $2
       RETURNING *`,
      [category_name, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' })
    }

    res.json({
      success: true,
      message: 'Category updated successfully',
      category: result.rows[0]
    })
  } catch (error) {
    console.error('Update category error:', error)
    res.status(500).json({ success: false, message: 'Failed to update category' })
  }
})

// DELETE - Delete category
router.delete('/categories/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Check if category has products
    const checkProducts = await pool.query(
      'SELECT COUNT(*) as count FROM products WHERE category_id = $1',
      [id]
    )

    if (parseInt(checkProducts.rows[0].count) > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot delete category with existing products' 
      })
    }

    const result = await pool.query(
      'DELETE FROM categories WHERE id = $1 RETURNING id',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' })
    }

    res.json({
      success: true,
      message: 'Category deleted successfully'
    })
  } catch (error) {
    console.error('Delete category error:', error)
    res.status(500).json({ success: false, message: 'Failed to delete category' })
  }
})

// ==================== PRODUCTS CRUD ====================
// (Already implemented in products.ts, but adding admin-specific endpoints)

// GET - Get all products with full details (admin view)
router.get('/products', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.*,
        c.category_name,
        COUNT(DISTINCT oi.id) as total_sold
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN order_items oi ON p.id = oi.product_id
      GROUP BY p.id, c.category_name
      ORDER BY p.created_at DESC
    `)

    const products = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      category: row.category_name,
      category_id: row.category_id,
      price: parseFloat(row.price),
      stock: row.stock,
      unit: row.unit,
      image: row.image,
      description: row.description,
      averageRating: row.average_rating ? parseFloat(row.average_rating) : 0,
      reviewCount: row.review_count || 0,
      totalSold: parseInt(row.total_sold) || 0,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }))

    res.json({
      success: true,
      products
    })
  } catch (error) {
    console.error('Get products error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch products' })
  }
})

// ==================== ORDERS CRUD ====================

// GET - Get all orders
router.get('/orders', async (req: Request, res: Response) => {
  try {
    const { status, payment_status } = req.query

    let query = `
      SELECT 
        o.*,
        u.username,
        u.email,
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'product_name', oi.product_name,
            'quantity', oi.quantity,
            'price', oi.price,
            'subtotal', oi.subtotal
          )
        ) as items
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
    `

    const conditions: string[] = []
    const params: any[] = []
    let paramCount = 1

    if (status) {
      conditions.push(`o.order_status = $${paramCount}`)
      params.push(status)
      paramCount++
    }

    if (payment_status) {
      conditions.push(`o.payment_status = $${paramCount}`)
      params.push(payment_status)
      paramCount++
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ')
    }

    query += `
      GROUP BY o.id, u.username, u.email
      ORDER BY o.created_at DESC
    `

    const result = await pool.query(query, params)

    const orders = result.rows.map(row => ({
      id: row.id,
      userId: row.user_id,
      username: row.username,
      email: row.email,
      totalPrice: parseFloat(row.total_price),
      paymentMethod: row.payment_method,
      paymentStatus: row.payment_status,
      orderStatus: row.order_status,
      shippingAddress: row.shipping_address,
      notes: row.notes,
      deliveredAt: row.delivered_at,
      canReview: row.can_review,
      items: row.items,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }))

    res.json({
      success: true,
      orders
    })
  } catch (error) {
    console.error('Get orders error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch orders' })
  }
})

// GET - Get order by ID
router.get('/orders/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await pool.query(`
      SELECT 
        o.*,
        u.username,
        u.email,
        u.uid,
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'product_name', oi.product_name,
            'quantity', oi.quantity,
            'price', oi.price,
            'subtotal', oi.subtotal
          )
        ) as items
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.id = $1
      GROUP BY o.id, u.username, u.email, u.uid
    `, [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    const order = result.rows[0]
    res.json({
      success: true,
      order: {
        id: order.id,
        userId: order.user_id,
        username: order.username,
        email: order.email,
        uid: order.uid,
        totalPrice: parseFloat(order.total_price),
        paymentMethod: order.payment_method,
        paymentStatus: order.payment_status,
        orderStatus: order.order_status,
        shippingAddress: order.shipping_address,
        notes: order.notes,
        deliveredAt: order.delivered_at,
        canReview: order.can_review,
        items: order.items,
        createdAt: order.created_at,
        updatedAt: order.updated_at
      }
    })
  } catch (error) {
    console.error('Get order error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch order' })
  }
})

// PUT - Update order status
router.put('/orders/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { order_status, payment_status } = req.body

    let query = 'UPDATE orders SET updated_at = NOW()'
    const params: any[] = []
    let paramCount = 1

    if (order_status) {
      query += `, order_status = $${paramCount}`
      params.push(order_status)
      paramCount++

      // If order is delivered, set delivered_at and allow reviews
      if (order_status === 'delivered') {
        query += `, delivered_at = NOW(), can_review = TRUE`
      }
    }

    if (payment_status) {
      query += `, payment_status = $${paramCount}`
      params.push(payment_status)
      paramCount++
    }

    query += ` WHERE id = $${paramCount} RETURNING *`
    params.push(id)

    const result = await pool.query(query, params)

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order: result.rows[0]
    })
  } catch (error) {
    console.error('Update order status error:', error)
    res.status(500).json({ success: false, message: 'Failed to update order status' })
  }
})

// DELETE - Delete order (admin only, use with caution)
router.delete('/orders/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Delete order items first (cascade should handle this, but being explicit)
    await pool.query('DELETE FROM order_items WHERE order_id = $1', [id])

    const result = await pool.query(
      'DELETE FROM orders WHERE id = $1 RETURNING id',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    res.json({
      success: true,
      message: 'Order deleted successfully'
    })
  } catch (error) {
    console.error('Delete order error:', error)
    res.status(500).json({ success: false, message: 'Failed to delete order' })
  }
})

// ==================== DASHBOARD STATS ====================

router.get('/dashboard/stats', async (req: Request, res: Response) => {
  try {
    // Get total revenue
    const revenueResult = await pool.query(`
      SELECT COALESCE(SUM(total_price), 0) as total_revenue
      FROM orders
      WHERE payment_status = 'paid'
    `)

    // Get total orders
    const ordersResult = await pool.query('SELECT COUNT(*) as total_orders FROM orders')

    // Get total products
    const productsResult = await pool.query('SELECT COUNT(*) as total_products FROM products')

    // Get total customers
    const customersResult = await pool.query(`
      SELECT COUNT(*) as total_customers 
      FROM users 
      WHERE role = 'customer'
    `)

    // Get pending orders
    const pendingResult = await pool.query(`
      SELECT COUNT(*) as pending_orders 
      FROM orders 
      WHERE order_status = 'pending'
    `)

    // Get low stock products
    const lowStockResult = await pool.query(`
      SELECT COUNT(*) as low_stock 
      FROM products 
      WHERE stock < 10
    `)

    res.json({
      success: true,
      stats: {
        totalRevenue: parseFloat(revenueResult.rows[0].total_revenue),
        totalOrders: parseInt(ordersResult.rows[0].total_orders),
        totalProducts: parseInt(productsResult.rows[0].total_products),
        totalCustomers: parseInt(customersResult.rows[0].total_customers),
        pendingOrders: parseInt(pendingResult.rows[0].pending_orders),
        lowStockProducts: parseInt(lowStockResult.rows[0].low_stock)
      }
    })
  } catch (error) {
    console.error('Get dashboard stats error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats' })
  }
})

export default router
