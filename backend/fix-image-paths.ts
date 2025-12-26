import { pool } from './lib/db'

async function fixImagePaths() {
  const client = await pool.connect()
  
  try {
    console.log('🔧 Memperbaiki image paths di database...')

    // Update semua image paths yang mengandung full URL menjadi filename saja
    const result = await client.query(`
      UPDATE products 
      SET image = regexp_replace(image, '^https?://[^/]+/uploads/', '')
      WHERE image ~ '^https?://[^/]+/uploads/'
      RETURNING id, name, image
    `)

    if (result.rows.length > 0) {
      console.log('\n✅ Berhasil memperbaiki image paths:')
      result.rows.forEach(row => {
        console.log(`   ID ${row.id}: ${row.name} -> ${row.image}`)
      })
    } else {
      console.log('\nℹ️  Tidak ada image path yang perlu diperbaiki')
    }

    // Tampilkan semua produk dengan image
    console.log('\n📦 Produk dengan gambar:')
    const allProducts = await client.query(`
      SELECT id, name, image 
      FROM products 
      WHERE image IS NOT NULL AND image != ''
      ORDER BY id
    `)
    
    allProducts.rows.forEach(row => {
      console.log(`   ${row.id}. ${row.name}: ${row.image}`)
    })

    console.log('\n🎉 Selesai!')
    
  } catch (error) {
    console.error('❌ Error:', error)
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

fixImagePaths()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
