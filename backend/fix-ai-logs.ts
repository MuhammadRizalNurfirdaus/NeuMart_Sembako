import { pool } from './lib/db'

async function fixAiLogsTable() {
  const client = await pool.connect()
  
  try {
    console.log('🔄 Fixing ai_logs table schema...')
    
    // Drop existing table
    await client.query('DROP TABLE IF EXISTS ai_logs CASCADE')
    console.log('✅ Dropped old ai_logs table')
    
    // Recreate with correct schema
    await client.query(`
      CREATE TABLE ai_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        event_type VARCHAR(50) NOT NULL,
        product_id INTEGER REFERENCES products(id),
        metadata JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Created new ai_logs table')
    
    // Create indexes
    await client.query(`
      CREATE INDEX idx_ai_logs_user ON ai_logs(user_id);
      CREATE INDEX idx_ai_logs_product ON ai_logs(product_id);
      CREATE INDEX idx_ai_logs_event ON ai_logs(event_type);
      CREATE INDEX idx_ai_logs_created ON ai_logs(created_at);
    `)
    console.log('✅ Created indexes')
    
    console.log('🎉 ai_logs table fixed successfully!')
    
  } catch (error) {
    console.error('❌ Error fixing ai_logs table:', error)
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

fixAiLogsTable()
