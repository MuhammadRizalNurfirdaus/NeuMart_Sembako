import { pool } from './db'

/**
 * Enhanced AI Learning System
 * Tracks user behavior and provides intelligent recommendations
 */

export interface AILog {
  userId: number
  eventType: 'search' | 'view' | 'cart' | 'purchase' | 'review' | 'click'
  productId?: number
  metadata?: any
}

export class AILearningSystem {
  
  /**
   * Log user interaction for AI learning
   */
  static async logInteraction(log: AILog): Promise<void> {
    try {
      await pool.query(
        `INSERT INTO ai_logs (user_id, event_type, product_id, metadata, created_at)
         VALUES ($1, $2, $3, $4, NOW())`,
        [log.userId, log.eventType, log.productId, JSON.stringify(log.metadata)]
      )
    } catch (error) {
      console.error('AI log error:', error)
    }
  }

  /**
   * Get user's product preferences based on interaction history
   */
  static async getUserPreferences(userId: number): Promise<string[]> {
    try {
      const result = await pool.query(
        `SELECT c.category_name, COUNT(*) as interaction_count
         FROM ai_logs al
         JOIN products p ON al.product_id = p.id
         JOIN categories c ON p.category_id = c.id
         WHERE al.user_id = $1 
           AND al.event_type IN ('view', 'cart', 'purchase')
           AND al.created_at > NOW() - INTERVAL '30 days'
         GROUP BY c.category_name
         ORDER BY interaction_count DESC
         LIMIT 5`,
        [userId]
      )
      return result.rows.map(row => row.category_name)
    } catch (error) {
      console.error('Get preferences error:', error)
      return []
    }
  }

  /**
   * Get frequently bought together products
   */
  static async getFrequentlyBoughtTogether(productId: number): Promise<number[]> {
    try {
      // Find products that were purchased in the same orders
      const result = await pool.query(
        `SELECT oi2.product_id, COUNT(*) as frequency
         FROM order_items oi1
         JOIN order_items oi2 ON oi1.order_id = oi2.order_id
         WHERE oi1.product_id = $1 
           AND oi2.product_id != $1
         GROUP BY oi2.product_id
         ORDER BY frequency DESC
         LIMIT 4`,
        [productId]
      )
      return result.rows.map(row => row.product_id)
    } catch (error) {
      console.error('Frequently bought together error:', error)
      return []
    }
  }

  /**
   * Get personalized recommendations based on user behavior
   */
  static async getPersonalizedRecommendations(userId: number, limit: number = 6): Promise<any[]> {
    try {
      // Algorithm:
      // 1. User's preferred categories (40% weight)
      // 2. Popular products in those categories (30% weight)
      // 3. Trending products overall (20% weight)
      // 4. New products (10% weight)
      
      const result = await pool.query(
        `WITH user_categories AS (
          SELECT c.id as category_id, COUNT(*) as interaction_score
          FROM ai_logs al
          JOIN products p ON al.product_id = p.id
          JOIN categories c ON p.category_id = c.id
          WHERE al.user_id = $1 
            AND al.event_type IN ('view', 'cart', 'purchase')
            AND al.created_at > NOW() - INTERVAL '30 days'
          GROUP BY c.id
        ),
        product_scores AS (
          SELECT 
            p.*,
            c.category_name,
            COALESCE(uc.interaction_score, 0) * 0.4 as category_score,
            COALESCE(p.review_count, 0) * 0.3 as popularity_score,
            CASE 
              WHEN p.created_at > NOW() - INTERVAL '7 days' THEN 10 
              ELSE 0 
            END as newness_score,
            (
              SELECT COUNT(*) 
              FROM ai_logs al2 
              WHERE al2.product_id = p.id 
                AND al2.event_type = 'view'
                AND al2.created_at > NOW() - INTERVAL '7 days'
            ) * 0.2 as trending_score
          FROM products p
          JOIN categories c ON p.category_id = c.id
          LEFT JOIN user_categories uc ON p.category_id = uc.category_id
          WHERE p.stock > 0
            AND p.id NOT IN (
              SELECT product_id 
              FROM ai_logs 
              WHERE user_id = $1 
                AND event_type = 'purchase'
                AND created_at > NOW() - INTERVAL '7 days'
            )
        )
        SELECT 
          id, name, category_name as category, price, stock, unit, 
          image, description, average_rating, review_count,
          (category_score + popularity_score + newness_score + trending_score) as total_score
        FROM product_scores
        ORDER BY total_score DESC, average_rating DESC NULLS LAST
        LIMIT $2`,
        [userId, limit]
      )

      return result.rows.map(row => ({
        id: row.id,
        name: row.name,
        category: row.category,
        price: parseFloat(row.price),
        stock: row.stock,
        unit: row.unit,
        image: row.image,
        description: row.description,
        averageRating: row.average_rating ? parseFloat(row.average_rating) : undefined,
        reviewCount: row.review_count || 0,
        score: parseFloat(row.total_score)
      }))
    } catch (error) {
      console.error('Personalized recommendations error:', error)
      return []
    }
  }

  /**
   * Get trending products based on recent interactions
   */
  static async getTrendingProducts(limit: number = 6): Promise<any[]> {
    try {
      const result = await pool.query(
        `SELECT 
          p.*,
          c.category_name,
          COUNT(al.id) as view_count,
          p.average_rating,
          p.review_count
         FROM products p
         JOIN categories c ON p.category_id = c.id
         LEFT JOIN ai_logs al ON p.id = al.product_id 
           AND al.event_type IN ('view', 'cart')
           AND al.created_at > NOW() - INTERVAL '7 days'
         WHERE p.stock > 0
         GROUP BY p.id, c.category_name
         ORDER BY view_count DESC, p.average_rating DESC NULLS LAST
         LIMIT $1`,
        [limit]
      )

      return result.rows.map(row => ({
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
        viewCount: row.view_count
      }))
    } catch (error) {
      console.error('Trending products error:', error)
      return []
    }
  }

  /**
   * Get smart search suggestions based on user history
   */
  static async getSearchSuggestions(userId: number, query: string): Promise<string[]> {
    try {
      const result = await pool.query(
        `WITH user_searches AS (
          SELECT DISTINCT metadata->>'query' as search_term
          FROM ai_logs
          WHERE user_id = $1 
            AND event_type = 'search'
            AND metadata->>'query' ILIKE $2
          ORDER BY created_at DESC
          LIMIT 3
        ),
        popular_searches AS (
          SELECT metadata->>'query' as search_term, COUNT(*) as frequency
          FROM ai_logs
          WHERE event_type = 'search'
            AND metadata->>'query' ILIKE $2
            AND created_at > NOW() - INTERVAL '30 days'
          GROUP BY metadata->>'query'
          ORDER BY frequency DESC
          LIMIT 3
        )
        SELECT search_term FROM user_searches
        UNION
        SELECT search_term FROM popular_searches
        LIMIT 5`,
        [userId, `%${query}%`]
      )
      return result.rows.map(row => row.search_term).filter(Boolean)
    } catch (error) {
      console.error('Search suggestions error:', error)
      return []
    }
  }

  /**
   * Analyze user purchase patterns
   */
  static async analyzePurchasePatterns(userId: number): Promise<any> {
    try {
      const result = await pool.query(
        `SELECT 
          AVG(o.total) as avg_order_value,
          COUNT(DISTINCT o.id) as total_orders,
          COUNT(DISTINCT oi.product_id) as unique_products,
          json_object_agg(
            c.category_name, 
            category_data.purchase_count
          ) as category_distribution
         FROM orders o
         JOIN order_items oi ON o.id = oi.order_id
         JOIN products p ON oi.product_id = p.id
         JOIN categories c ON p.category_id = c.id
         JOIN LATERAL (
           SELECT COUNT(*) as purchase_count
           FROM order_items oi2
           JOIN products p2 ON oi2.product_id = p2.id
           WHERE oi2.order_id IN (
             SELECT id FROM orders WHERE user_id = $1
           ) AND p2.category_id = c.id
         ) category_data ON true
         WHERE o.user_id = $1
         GROUP BY o.user_id`,
        [userId]
      )

      if (result.rows.length === 0) {
        return {
          avgOrderValue: 0,
          totalOrders: 0,
          uniqueProducts: 0,
          categoryDistribution: {}
        }
      }

      const row = result.rows[0]
      return {
        avgOrderValue: parseFloat(row.avg_order_value) || 0,
        totalOrders: row.total_orders || 0,
        uniqueProducts: row.unique_products || 0,
        categoryDistribution: row.category_distribution || {}
      }
    } catch (error) {
      console.error('Purchase pattern analysis error:', error)
      return {
        avgOrderValue: 0,
        totalOrders: 0,
        uniqueProducts: 0,
        categoryDistribution: {}
      }
    }
  }

  /**
   * Get replenishment reminders (products user buys regularly)
   */
  static async getReplenishmentReminders(userId: number): Promise<any[]> {
    try {
      const result = await pool.query(
        `WITH user_purchases AS (
          SELECT 
            p.*,
            c.category_name,
            MAX(o.order_date) as last_purchase,
            COUNT(*) as purchase_frequency,
            AVG(EXTRACT(DAY FROM o.order_date - LAG(o.order_date) OVER (PARTITION BY p.id ORDER BY o.order_date))) as avg_days_between
          FROM orders o
          JOIN order_items oi ON o.id = oi.order_id
          JOIN products p ON oi.product_id = p.id
          JOIN categories c ON p.category_id = c.id
          WHERE o.user_id = $1
            AND o.status = 'delivered'
          GROUP BY p.id, c.category_name
          HAVING COUNT(*) >= 2
        )
        SELECT 
          id, name, category_name as category, price, stock, unit,
          image, description, last_purchase, purchase_frequency,
          avg_days_between,
          EXTRACT(DAY FROM NOW() - last_purchase) as days_since_last
        FROM user_purchases
        WHERE avg_days_between IS NOT NULL
          AND EXTRACT(DAY FROM NOW() - last_purchase) >= avg_days_between * 0.8
          AND stock > 0
        ORDER BY days_since_last DESC
        LIMIT 5`,
        [userId]
      )

      return result.rows.map(row => ({
        id: row.id,
        name: row.name,
        category: row.category,
        price: parseFloat(row.price),
        stock: row.stock,
        unit: row.unit,
        image: row.image,
        description: row.description,
        lastPurchase: row.last_purchase,
        purchaseFrequency: row.purchase_frequency,
        avgDaysBetween: parseFloat(row.avg_days_between),
        daysSinceLast: row.days_since_last
      }))
    } catch (error) {
      console.error('Replenishment reminders error:', error)
      return []
    }
  }
}
