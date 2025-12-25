import { pool } from './db'

export async function initializeDatabase() {
  const client = await pool.connect()
  
  try {
    console.log('🔄 Initializing database schema...')

    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        uid VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        role VARCHAR(50) DEFAULT 'customer',
        photo_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Table "users" ready')

    // Create categories table
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        category_name VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Table "categories" ready')

    // Create products table
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        category_id INTEGER REFERENCES categories(id),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock INTEGER DEFAULT 0,
        unit VARCHAR(50),
        image TEXT,
        average_rating DECIMAL(3, 2) DEFAULT 0,
        review_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Table "products" ready')

    // Create related_products junction table
    await client.query(`
      CREATE TABLE IF NOT EXISTS related_products (
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        related_product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        PRIMARY KEY (product_id, related_product_id)
      )
    `)
    console.log('✅ Table "related_products" ready')

    // Create orders table
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(255) PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        total_price DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50),
        payment_status VARCHAR(50) DEFAULT 'Pending',
        order_status VARCHAR(50) DEFAULT 'Pending',
        shipping_address JSONB,
        notes TEXT,
        delivered_at TIMESTAMP,
        can_review BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Table "orders" ready')

    // Create order_items table
    await client.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id VARCHAR(255) REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id),
        product_name VARCHAR(255),
        quantity INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        reviewed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Table "order_items" ready')

    // Create reviews table
    await client.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id VARCHAR(255) PRIMARY KEY,
        order_id VARCHAR(255) REFERENCES orders(id),
        product_id INTEGER REFERENCES products(id),
        product_name VARCHAR(255),
        user_id INTEGER REFERENCES users(id),
        user_name VARCHAR(255),
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        product_quality INTEGER CHECK (product_quality >= 1 AND product_quality <= 5),
        service_rating INTEGER CHECK (service_rating >= 1 AND service_rating <= 5),
        delivery_rating INTEGER CHECK (delivery_rating >= 1 AND delivery_rating <= 5),
        comment TEXT,
        status VARCHAR(50) DEFAULT 'approved',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Table "reviews" ready')

    // Create ai_logs table for AI recommendations and learning
    await client.query(`
      CREATE TABLE IF NOT EXISTS ai_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        event_type VARCHAR(50) NOT NULL,
        product_id INTEGER REFERENCES products(id),
        metadata JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Table "ai_logs" ready')

    // Create indexes for better performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
      CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
      CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
      CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);
      CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
      CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
      CREATE INDEX IF NOT EXISTS idx_ai_logs_user ON ai_logs(user_id);
      CREATE INDEX IF NOT EXISTS idx_ai_logs_product ON ai_logs(product_id);
    `)
    console.log('✅ Indexes created')

    // Insert default categories
    await client.query(`
      INSERT INTO categories (category_name) 
      VALUES 
        ('Beras'),
        ('Minyak'),
        ('Gula'),
        ('Tepung'),
        ('Telur'),
        ('Kopi'),
        ('Teh'),
        ('Susu'),
        ('Mie Instan'),
        ('Bumbu')
      ON CONFLICT (category_name) DO NOTHING
    `)
    console.log('✅ Default categories inserted')

    // Create default admin user
    await client.query(`
      INSERT INTO users (uid, username, email, role, password)
      VALUES 
        ('admin-001', 'Admin NeuMart', 'admin@neumart.com', 'admin', 'admin123'),
        ('customer-001', 'Customer Demo', 'customer@example.com', 'customer', 'customer123')
      ON CONFLICT (uid) DO NOTHING
    `)
    console.log('✅ Default users created')

    console.log('🎉 Database initialization complete!')
    
  } catch (error) {
    console.error('❌ Error initializing database:', error)
    throw error
  } finally {
    client.release()
  }
}

// Function to seed sample products
export async function seedProducts() {
  const client = await pool.connect()
  
  try {
    console.log('🌱 Seeding sample products...')

    const sampleProducts = [
      { name: 'Beras Premium', category: 'Beras', price: 85000, stock: 50, unit: '5kg', description: 'Beras pulen berkualitas tinggi', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop' },
      { name: 'Minyak Goreng', category: 'Minyak', price: 25000, stock: 100, unit: '1L', description: 'Minyak goreng murni tanpa kolesterol', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop' },
      { name: 'Gula Pasir', category: 'Gula', price: 15000, stock: 75, unit: '1kg', description: 'Gula pasir kristal putih', image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&h=400&fit=crop' },
      { name: 'Tepung Terigu', category: 'Tepung', price: 12000, stock: 60, unit: '1kg', description: 'Tepung terigu serbaguna', image: 'https://images.unsplash.com/photo-1628775463043-fb2c0e8e0e3f?w=400&h=400&fit=crop' },
      { name: 'Telur Ayam', category: 'Telur', price: 30000, stock: 40, unit: '10 butir', description: 'Telur ayam segar dari peternakan', image: 'https://images.unsplash.com/photo-1582722872445-44dc1f3e3b78?w=400&h=400&fit=crop' },
      { name: 'Kopi Bubuk', category: 'Kopi', price: 35000, stock: 30, unit: '200g', description: 'Kopi bubuk robusta premium', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop' },
    ]

    for (const product of sampleProducts) {
      const categoryResult = await client.query(
        'SELECT id FROM categories WHERE category_name = $1',
        [product.category]
      )
      
      const categoryId = categoryResult.rows[0]?.id

      await client.query(`
        INSERT INTO products (category_id, name, description, price, stock, unit, image)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT DO NOTHING
      `, [categoryId, product.name, product.description, product.price, product.stock, product.unit, product.image])
    }

    console.log('✅ Sample products seeded')
    
  } catch (error) {
    console.error('❌ Error seeding products:', error)
    throw error
  } finally {
    client.release()
  }
}
