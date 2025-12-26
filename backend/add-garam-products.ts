import { pool } from './lib/db'

async function addGaramProducts() {
  const client = await pool.connect()
  
  try {
    console.log('📦 Menambahkan produk Garam...\n')

    // Opsi 1: Kategori "Gula & Garam" sudah ada (gabung)
    // Opsi 2: Buat kategori "Bumbu Dapur" baru
    
    console.log('Pilihan kategori:')
    console.log('1. Gula & Garam (sudah ada)')
    console.log('2. Bumbu Dapur (baru)\n')
    
    // Saya akan gunakan "Bumbu Dapur" sebagai kategori baru
    const categoryName = 'Bumbu Dapur'
    
    // Tambahkan kategori jika belum ada
    await client.query(`
      INSERT INTO categories (category_name) 
      VALUES ($1)
      ON CONFLICT (category_name) DO NOTHING
    `, [categoryName])
    
    console.log(`✅ Kategori "${categoryName}" siap\n`)

    // Produk bumbu dapur yang akan ditambahkan
    const garamProducts = [
      // Garam
      {
        name: 'Garam Dapur Halus 500g',
        category: categoryName,
        cost_price: 3000,
        sell_price: 3500,
        stock: 100,
        unit: '500g',
        description: 'Garam dapur halus untuk masakan sehari-hari'
      },
      {
        name: 'Garam Bata 250g',
        category: categoryName,
        cost_price: 2000,
        sell_price: 2500,
        stock: 80,
        unit: '250g',
        description: 'Garam bata tradisional untuk bumbu masakan'
      },
      // Bumbu Bubuk
      {
        name: 'Merica Bubuk 50g',
        category: categoryName,
        cost_price: 8000,
        sell_price: 9500,
        stock: 60,
        unit: '50g',
        description: 'Merica bubuk berkualitas untuk penyedap masakan'
      },
      {
        name: 'Kunyit Bubuk 100g',
        category: categoryName,
        cost_price: 5500,
        sell_price: 7000,
        stock: 50,
        unit: '100g',
        description: 'Kunyit bubuk asli untuk bumbu dan pewarna alami'
      },
      {
        name: 'Ketumbar Bubuk 75g',
        category: categoryName,
        cost_price: 6000,
        sell_price: 7500,
        stock: 55,
        unit: '75g',
        description: 'Ketumbar bubuk harum untuk berbagai masakan'
      },
      {
        name: 'Bawang Putih Bubuk 100g',
        category: categoryName,
        cost_price: 12000,
        sell_price: 14000,
        stock: 40,
        unit: '100g',
        description: 'Bawang putih bubuk praktis untuk masakan'
      },
      // Bumbu Instant/Racikan
      {
        name: 'Royco Ayam 100g',
        category: categoryName,
        cost_price: 8500,
        sell_price: 10000,
        stock: 70,
        unit: '100g',
        description: 'Penyedap rasa ayam untuk masakan lezat'
      },
      {
        name: 'Masako Sapi 250g',
        category: categoryName,
        cost_price: 9000,
        sell_price: 11000,
        stock: 65,
        unit: '250g',
        description: 'Penyedap rasa sapi untuk masakan berkuah'
      },
      // Kecap dan Saos
      {
        name: 'Kecap Manis ABC 600ml',
        category: categoryName,
        cost_price: 10000,
        sell_price: 12500,
        stock: 80,
        unit: '600ml',
        description: 'Kecap manis premium untuk masakan Indonesia'
      },
      {
        name: 'Kecap Asin 300ml',
        category: categoryName,
        cost_price: 7000,
        sell_price: 8500,
        stock: 60,
        unit: '300ml',
        description: 'Kecap asin untuk tumisan dan marinasi'
      },
      {
        name: 'Saos Tomat ABC 340ml',
        category: categoryName,
        cost_price: 9000,
        sell_price: 11000,
        stock: 70,
        unit: '340ml',
        description: 'Saos tomat untuk pelengkap makanan'
      },
      {
        name: 'Saos Sambal ABC 335ml',
        category: categoryName,
        cost_price: 9500,
        sell_price: 11500,
        stock: 65,
        unit: '335ml',
        description: 'Saos sambal pedas untuk teman makan'
      },
      // Cuka dan Saus Lainnya
      {
        name: 'Cuka Makan 150ml',
        category: categoryName,
        cost_price: 4000,
        sell_price: 5000,
        stock: 45,
        unit: '150ml',
        description: 'Cuka untuk masakan dan asinan'
      },
      {
        name: 'Kecap Ikan 200ml',
        category: categoryName,
        cost_price: 8000,
        sell_price: 10000,
        stock: 35,
        unit: '200ml',
        description: 'Kecap ikan untuk masakan Thailand dan Vietnam'
      },
      // Minyak Wijen
      {
        name: 'Minyak Wijen 100ml',
        category: categoryName,
        cost_price: 15000,
        sell_price: 18000,
        stock: 30,
        unit: '100ml',
        description: 'Minyak wijen harum untuk masakan oriental'
      }
    ]

    for (const product of garamProducts) {
      // Get category ID
      const categoryResult = await client.query(
        'SELECT id FROM categories WHERE category_name = $1',
        [product.category]
      )
      
      const categoryId = categoryResult.rows[0]?.id

      // Insert product
      const result = await client.query(`
        INSERT INTO products (category_id, name, description, cost_price, sell_price, price, stock, unit, image)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id, name, cost_price, sell_price, stock
      `, [
        categoryId,
        product.name,
        product.description,
        product.cost_price,
        product.sell_price,
        product.sell_price, // price = sell_price
        product.stock,
        product.unit,
        null // image akan diupload nanti
      ])

      console.log(`✅ ${result.rows[0].name}`)
      console.log(`   Harga Beli: Rp ${result.rows[0].cost_price.toLocaleString()}`)
      console.log(`   Harga Jual: Rp ${result.rows[0].sell_price.toLocaleString()}`)
      console.log(`   Stok: ${result.rows[0].stock}\n`)
    }

    // Tampilkan semua produk di kategori Bumbu Dapur
    console.log('📋 Produk di kategori "Bumbu Dapur":')
    const allProducts = await client.query(`
      SELECT p.id, p.name, p.sell_price, p.stock, p.unit
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE c.category_name = $1
      ORDER BY p.id
    `, [categoryName])
    
    allProducts.rows.forEach(row => {
      console.log(`   ${row.id}. ${row.name} - Rp ${parseFloat(row.sell_price).toLocaleString()} (${row.unit}) - Stok: ${row.stock}`)
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

addGaramProducts()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
