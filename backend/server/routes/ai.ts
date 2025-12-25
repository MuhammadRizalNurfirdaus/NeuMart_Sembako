import express, { Request, Response } from 'express'
import { generateRecipeFromCart } from '../../lib/recipeAI'
import { processChatMessage } from '../../lib/chatbotAI'
import { AILearningSystem } from '../../lib/aiLearning'
import { pool } from '../../lib/db'

const router = express.Router()

// POST - Log AI interaction
router.post('/log', async (req: Request, res: Response) => {
  try {
    const { userId, eventType, productId, metadata } = req.body
    
    if (!userId || !eventType) {
      return res.status(400).json({
        success: false,
        message: 'userId and eventType are required'
      })
    }

    await AILearningSystem.logInteraction({
      userId,
      eventType,
      productId,
      metadata
    })

    res.json({ success: true })
  } catch (error) {
    console.error('AI log error:', error)
    res.status(500).json({ success: false, message: 'Failed to log interaction' })
  }
})

// GET - Personalized recommendations
router.get('/recommendations/:userId', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    const limit = parseInt(req.query.limit as string) || 6

    const recommendations = await AILearningSystem.getPersonalizedRecommendations(userId, limit)

    res.json({
      success: true,
      recommendations
    })
  } catch (error) {
    console.error('Recommendations error:', error)
    res.status(500).json({ success: false, message: 'Failed to get recommendations' })
  }
})

// GET - Trending products
router.get('/trending', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 6
    const trending = await AILearningSystem.getTrendingProducts(limit)

    res.json({
      success: true,
      trending
    })
  } catch (error) {
    console.error('Trending error:', error)
    res.status(500).json({ success: false, message: 'Failed to get trending products' })
  }
})

// GET - Frequently bought together
router.get('/frequently-bought/:productId', async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.productId)
    const productIds = await AILearningSystem.getFrequentlyBoughtTogether(productId)

    // Get product details
    if (productIds.length > 0) {
      const result = await pool.query(
        `SELECT p.*, c.category_name 
         FROM products p 
         JOIN categories c ON p.category_id = c.id
         WHERE p.id = ANY($1)`,
        [productIds]
      )

      const products = result.rows.map(row => ({
        id: row.id,
        name: row.name,
        category: row.category_name,
        price: parseFloat(row.price),
        stock: row.stock,
        unit: row.unit,
        image: row.image,
        description: row.description
      }))

      res.json({ success: true, products })
    } else {
      res.json({ success: true, products: [] })
    }
  } catch (error) {
    console.error('Frequently bought error:', error)
    res.status(500).json({ success: false, message: 'Failed to get frequently bought products' })
  }
})

// GET - User preferences
router.get('/preferences/:userId', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    const preferences = await AILearningSystem.getUserPreferences(userId)

    res.json({
      success: true,
      preferences
    })
  } catch (error) {
    console.error('Preferences error:', error)
    res.status(500).json({ success: false, message: 'Failed to get user preferences' })
  }
})

// GET - Search suggestions
router.get('/search-suggestions/:userId', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    const query = req.query.q as string || ''

    const suggestions = await AILearningSystem.getSearchSuggestions(userId, query)

    res.json({
      success: true,
      suggestions
    })
  } catch (error) {
    console.error('Search suggestions error:', error)
    res.status(500).json({ success: false, message: 'Failed to get search suggestions' })
  }
})

// GET - Purchase pattern analysis
router.get('/purchase-patterns/:userId', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    const patterns = await AILearningSystem.analyzePurchasePatterns(userId)

    res.json({
      success: true,
      patterns
    })
  } catch (error) {
    console.error('Purchase patterns error:', error)
    res.status(500).json({ success: false, message: 'Failed to analyze purchase patterns' })
  }
})

// GET - Replenishment reminders
router.get('/replenishment/:userId', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    const reminders = await AILearningSystem.getReplenishmentReminders(userId)

    res.json({
      success: true,
      reminders
    })
  } catch (error) {
    console.error('Replenishment reminders error:', error)
    res.status(500).json({ success: false, message: 'Failed to get replenishment reminders' })
  }
})

// POST - AI Recipe Generator
router.post('/recipe', (req: Request, res: Response) => {
  try {
    const { productNames } = req.body
    
    if (!productNames || !Array.isArray(productNames)) {
      return res.status(400).json({
        success: false,
        message: 'Product names array is required'
      })
    }
    
    const recipes = generateRecipeFromCart(productNames)
    
    res.json({
      success: true,
      data: {
        recipes,
        ingredients: productNames,
        totalRecipes: recipes.length
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating recipes',
      error
    })
  }
})

// POST - Chatbot
router.post('/chat', (req: Request, res: Response) => {
  try {
    const { message } = req.body
    
    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      })
    }
    
    const response = processChatMessage(message)
    
    res.json({
      success: true,
      data: {
        userMessage: message,
        aiResponse: response,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing chat message',
      error
    })
  }
})

// POST - Smart Recommendation
router.post('/recommendations', (req: Request, res: Response) => {
  try {
    const { productIds } = req.body
    
    if (!productIds || !Array.isArray(productIds)) {
      return res.status(400).json({
        success: false,
        message: 'Product IDs array is required'
      })
    }
    
    const relatedIds = new Set<number>()
    
    productIds.forEach(id => {
      const product = products.find(p => p.id === id)
      if (product && product.relatedProducts) {
        product.relatedProducts.forEach(relatedId => {
          if (!productIds.includes(relatedId)) {
            relatedIds.add(relatedId)
          }
        })
      }
    })
    
    const recommendations = Array.from(relatedIds)
      .map(id => products.find(p => p.id === id))
      .filter((p): p is typeof products[0] => p !== undefined)
      .slice(0, 4)
    
    res.json({
      success: true,
      data: {
        recommendations,
        total: recommendations.length
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating recommendations',
      error
    })
  }
})

export default router
