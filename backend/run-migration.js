const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function runMigration() {
  try {
    await client.connect();
    console.log('📡 Connected to database...');
    
    const sql = fs.readFileSync(
      path.join(__dirname, 'migrations/add_customer_features.sql'), 
      'utf8'
    );
    
    await client.query(sql);
    console.log('✅ Migration completed successfully!');
    
  } catch (err) {
    console.error('❌ Migration error:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
