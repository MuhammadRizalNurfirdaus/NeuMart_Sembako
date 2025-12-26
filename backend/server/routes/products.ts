import express, { Request, Response } from 'express'
import { pool } from '../../lib/db'
import { upload } from '../../lib/upload'

const router = express.Router()

// GET - Get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.*,
        c.category_name,
        COALESCE(
          json_agg(
            DISTINCT rp.related_product_id
          ) FILTER (WHERE rp.related_product_id IS NOT NULL),
          '[]'
        ) as related_products
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN related_products rp ON p.id = rp.product_id
      GROUP BY p.id, c.category_name
      ORDER BY p.id
    `)

    const products = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      category: row.category_name,
      price: parseFloat(row.price),
      stock: row.stock,
      unit: row.unit,
      image: row.image,
      description: row.description,
      averageRating: row.average_rating ? parseFloat(row.average_rating) : undefined,
      reviewCount: row.review_count || 0,
      relatedProducts: Array.isArray(row.related_products) ? row.related_products.filter((id: any) => id !== null) : []
    }))

    res.json({
      success: true,
      products
    })
  } catch (error) {
    console.error('Get products error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    })
  }
})

// GET - Get product by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await pool.query(`
      SELECT 
        p.*,
        c.category_name,
        COALESCE(
          json_agg(
            DISTINCT rp.related_product_id
          ) FILTER (WHERE rp.related_product_id IS NOT NULL),
          '[]'
        ) as related_products
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN related_products rp ON p.id = rp.product_id
      WHERE p.id = $1
      GROUP BY p.id, c.category_name
    `, [id])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    const row = result.rows[0]
    const product = {
      id: row.id,
      name: row.name,
      category: row.category_name,
      price: parseFloat(row.price),
      stock: row.stock,
      unit: row.unit,
      image: row.image,
      description: row.description,
      averageRating: row.average_rating ? parseFloat(row.average_rating) : undefined,
      reviewCount: row.review_count || 0,
      relatedProducts: Array.isArray(row.related_products) ? row.related_products.filter((id: any) => id !== null) : []
    }

    res.json({
      success: true,
      product
    })
  } catch (error) {
    console.error('Get product error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product'
    })
  }
})

// POST - Create new product (with image upload)
router.post('/', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { name, category, price, stock, unit, description, relatedProducts } = req.body
    
    // Get category ID
    const categoryResult = await pool.query(
      'SELECT id FROM categories WHERE category_name = $1',
      [category]
    )
    
    let categoryId = categoryResult.rows[0]?.id

    // If category doesn't exist, create it
    if (!categoryId) {
      const newCategoryResult = await pool.query(
        'INSERT INTO categories (category_name) VALUES ($1) RETURNING id',
        [category]
      )
      categoryId = newCategoryResult.rows[0].id
    }

    // Handle image - save filename only, not full URL
    const imageUrl = req.file 
      ? req.file.filename
      : null

    // Insert product
    const result = await pool.query(`
      INSERT INTO products (category_id, name, description, price, stock, unit, image)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [categoryId, name, description, price, stock, unit, imageUrl])

    const newProduct = result.rows[0]

    // Add related products if provided
    if (relatedProducts && Array.isArray(relatedProducts)) {
      for (const relatedId of relatedProducts) {
        await pool.query(`
          INSERT INTO related_products (product_id, related_product_id)
          VALUES ($1, $2)
          ON CONFLICT DO NOTHING
        `, [newProduct.id, relatedId])
      }
    }

    res.json({
      success: true,
      message: 'Product created successfully',
      product: newProduct
    })
  } catch (error) {
    console.error('Create product error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create product'
    })
  }
})

// PUT - Update product (with optional image upload)
router.put('/:id', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, category, price, stock, unit, description, relatedProducts } = req.body

    // Get category ID
    const categoryResult = await pool.query(
      'SELECT id FROM categories WHERE category_name = $1',
      [category]
    )
    
    let categoryId = categoryResult.rows[0]?.id

    // If category doesn't exist, create it
    if (!categoryId) {
      const newCategoryResult = await pool.query(
        'INSERT INTO categories (category_name) VALUES ($1) RETURNING id',
        [category]
      )
      categoryId = newCategoryResult.rows[0].id
    }

    // Build update query - save filename only, not full URL
    let imageUrl = null
    if (req.file) {
      imageUrl = req.file.filename
    }

    const updateQuery = imageUrl
      ? `UPDATE products 
         SET category_id = $1, name = $2, description = $3, price = $4, stock = $5, unit = $6, image = $7, updated_at = CURRENT_TIMESTAMP
         WHERE id = $8
         RETURNING *`
      : `UPDATE products 
         SET category_id = $1, name = $2, description = $3, price = $4, stock = $5, unit = $6, updated_at = CURRENT_TIMESTAMP
         WHERE id = $7
         RETURNING *`

    const params = imageUrl
      ? [categoryId, name, description, price, stock, unit, imageUrl, id]
      : [categoryId, name, description, price, stock, unit, id]

    const result = await pool.query(updateQuery, params)

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    // Update related products
    if (relatedProducts) {
      // Delete existing relations
      await pool.query('DELETE FROM related_products WHERE product_id = $1', [id])

      // Add new relations
      if (Array.isArray(relatedProducts)) {
        for (const relatedId of relatedProducts) {
          await pool.query(`
            INSERT INTO related_products (product_id, related_product_id)
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING
          `, [id, relatedId])
        }
      }
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      product: result.rows[0]
    })
  } catch (error) {
    console.error('Update product error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update product'
    })
  }
})

// DELETE - Delete product
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    console.error('Delete product error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete product'
    })
  }
})

// GET - Get categories
router.get('/categories/list', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY category_name')

    res.json({
      success: true,
      categories: result.rows
    })
  } catch (error) {
    console.error('Get categories error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories'
    })
  }
})

export default router
