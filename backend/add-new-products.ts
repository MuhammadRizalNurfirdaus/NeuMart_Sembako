import { pool } from './lib/db'

async function addNewProducts() {
  const client = await pool.connect()
  
  try {
    console.log('🔄 Menambahkan produk baru...')

    // Pastikan kategori sudah ada
    await client.query(`
      INSERT INTO categories (category_name) 
      VALUES 
        ('Beras'),
        ('Minyak'),
        ('Gula & Garam'),
        ('Mie Instan'),
        ('Telur'),
        ('Tepung'),
        ('Susu & Dairy'),
        ('Minuman'),
        ('Snack & Kue'),
        ('Bumbu Dapur'),
        ('Sabun & Detergen'),
        ('Perawatan Pribadi'),
        ('Alat Rumah Tangga'),
        ('Makanan Kaleng'),
        ('Pasta & Saus')
      ON CONFLICT (category_name) DO NOTHING
    `)
    console.log('✅ Kategori sudah siap')

    // Tambahkan kolom cost_price dan sell_price jika belum ada
    try {
      await client.query(`
        ALTER TABLE products ADD COLUMN IF NOT EXISTS cost_price DECIMAL(10,2)
      `)
      await client.query(`
        ALTER TABLE products ADD COLUMN IF NOT EXISTS sell_price DECIMAL(10,2)
      `)
      console.log('✅ Kolom cost_price dan sell_price ditambahkan')
    } catch (e: any) {
      console.log('ℹ️  Kolom sudah ada atau error minor:', e?.message || e)
    }

    // Data produk baru dengan berbagai kategori
    const newProducts = [
      // BERAS
      {
        name: 'Beras Bulog SPHP 5kg',
        category: 'Beras',
        cost_price: 58000,
        sell_price: 62000,
        stock: 50,
        unit: '5kg',
        description: 'Beras Bulog Stabilisasi Pasokan dan Harga Pangan - Beras berkualitas dengan harga terjangkau dari pemerintah'
      },
      {
        name: 'Beras Pandan Wangi 5kg',
        category: 'Beras',
        cost_price: 70000,
        sell_price: 75000,
        stock: 40,
        unit: '5kg',
        description: 'Beras pandan wangi harum dan pulen'
      },
      {
        name: 'Beras Organik 2kg',
        category: 'Beras',
        cost_price: 38000,
        sell_price: 42000,
        stock: 30,
        unit: '2kg',
        description: 'Beras organik sehat tanpa pestisida'
      },
      // MINYAK
      {
        name: 'Minyak Goreng Kita 1L',
        category: 'Minyak',
        cost_price: 14500,
        sell_price: 16000,
        stock: 100,
        unit: '1L',
        description: 'Minyak goreng kelapa sawit murni merek Kita - Jernih dan berkualitas'
      },
      {
        name: 'Minyak Goreng Bimoli 2L',
        category: 'Minyak',
        cost_price: 30000,
        sell_price: 33000,
        stock: 80,
        unit: '2L',
        description: 'Minyak goreng premium untuk masakan lezat'
      },
      {
        name: 'Minyak Zaitun 250ml',
        category: 'Minyak',
        cost_price: 45000,
        sell_price: 50000,
        stock: 20,
        unit: '250ml',
        description: 'Minyak zaitun extra virgin untuk kesehatan'
      },
      // GULA & GARAM
      {
        name: 'Gula Pasir Gulaku 1kg',
        category: 'Gula & Garam',
        cost_price: 16000,
        sell_price: 18000,
        stock: 40,
        unit: '1kg',
        description: 'Gula pasir kristal putih merek Gulaku - Manis alami untuk kebutuhan sehari-hari'
      },
      {
        name: 'Gula Merah 500g',
        category: 'Gula & Garam',
        cost_price: 12000,
        sell_price: 14000,
        stock: 50,
        unit: '500g',
        description: 'Gula merah asli untuk kue dan minuman tradisional'
      },
      {
        name: 'Garam Beryodium Cap Kapal 250g',
        category: 'Gula & Garam',
        cost_price: 3000,
        sell_price: 3500,
        stock: 120,
        unit: '250g',
        description: 'Garam beryodium untuk kesehatan keluarga'
      },
      // MIE INSTAN
      {
        name: 'Indomie Goreng',
        category: 'Mie Instan',
        cost_price: 2700,
        sell_price: 3100,
        stock: 200,
        unit: 'pcs',
        description: 'Indomie Goreng Original - Mie instan rasa goreng favorit Indonesia'
      },
      {
        name: 'Indomie Soto',
        category: 'Mie Instan',
        cost_price: 2700,
        sell_price: 3100,
        stock: 180,
        unit: 'pcs',
        description: 'Indomie Kuah Soto - Rasa soto khas Indonesia'
      },
      {
        name: 'Mie Sedaap Goreng',
        category: 'Mie Instan',
        cost_price: 2600,
        sell_price: 3000,
        stock: 150,
        unit: 'pcs',
        description: 'Mie Sedaap Goreng Original'
      },
      {
        name: 'Sarimi Ayam Bawang',
        category: 'Mie Instan',
        cost_price: 2300,
        sell_price: 2700,
        stock: 160,
        unit: 'pcs',
        description: 'Sarimi mie kuah rasa ayam bawang'
      },
      // TELUR
      {
        name: 'Telur Ayam Negeri',
        category: 'Telur',
        cost_price: 25000,
        sell_price: 28000,
        stock: 30,
        unit: '10 butir',
        description: 'Telur ayam negeri segar pilihan - Kaya protein untuk kebutuhan gizi keluarga'
      },
      {
        name: 'Telur Ayam Kampung',
        category: 'Telur',
        cost_price: 35000,
        sell_price: 38000,
        stock: 20,
        unit: '10 butir',
        description: 'Telur ayam kampung organik lebih sehat'
      },
      // TEPUNG
      {
        name: 'Tepung Terigu Segitiga Biru 1kg',
        category: 'Tepung',
        cost_price: 11000,
        sell_price: 13000,
        stock: 70,
        unit: '1kg',
        description: 'Tepung terigu serbaguna untuk kue dan gorengan'
      },
      {
        name: 'Tepung Beras Rose Brand 500g',
        category: 'Tepung',
        cost_price: 9000,
        sell_price: 11000,
        stock: 50,
        unit: '500g',
        description: 'Tepung beras untuk kue tradisional'
      },
      {
        name: 'Tepung Maizena 400g',
        category: 'Tepung',
        cost_price: 8500,
        sell_price: 10000,
        stock: 45,
        unit: '400g',
        description: 'Tepung maizena untuk pengental masakan'
      },
      {
        name: 'Tepung Tapioka 500g',
        category: 'Tepung',
        cost_price: 7000,
        sell_price: 9000,
        stock: 55,
        unit: '500g',
        description: 'Tepung tapioka untuk bakso dan cilok'
      },
      // SUSU & DAIRY
      {
        name: 'Susu Kental Manis Indomilk 370g',
        category: 'Susu & Dairy',
        cost_price: 10000,
        sell_price: 12000,
        stock: 60,
        unit: '370g',
        description: 'Susu kental manis untuk kopi dan minuman'
      },
      {
        name: 'Susu UHT Indomilk 1L',
        category: 'Susu & Dairy',
        cost_price: 16000,
        sell_price: 18500,
        stock: 40,
        unit: '1L',
        description: 'Susu UHT full cream segar'
      },
      {
        name: 'Susu Bubuk Dancow 800g',
        category: 'Susu & Dairy',
        cost_price: 65000,
        sell_price: 70000,
        stock: 25,
        unit: '800g',
        description: 'Susu bubuk untuk anak dan keluarga'
      },
      {
        name: 'Keju Cheddar Kraft 180g',
        category: 'Susu & Dairy',
        cost_price: 28000,
        sell_price: 32000,
        stock: 30,
        unit: '180g',
        description: 'Keju cheddar untuk sandwich dan masakan'
      },
      {
        name: 'Mentega Blue Band 200g',
        category: 'Susu & Dairy',
        cost_price: 15000,
        sell_price: 17500,
        stock: 50,
        unit: '200g',
        description: 'Mentega untuk roti dan kue'
      },
      // MINUMAN
      {
        name: 'Teh Celup Sariwangi 25s',
        category: 'Minuman',
        cost_price: 7000,
        sell_price: 8500,
        stock: 80,
        unit: '25 bags',
        description: 'Teh celup aroma harum'
      },
      {
        name: 'Kopi Kapal Api 165g',
        category: 'Minuman',
        cost_price: 16000,
        sell_price: 18500,
        stock: 60,
        unit: '165g',
        description: 'Kopi bubuk premium khas Indonesia'
      },
      {
        name: 'Sirup Marjan Cocopandan 460ml',
        category: 'Minuman',
        cost_price: 12000,
        sell_price: 14000,
        stock: 50,
        unit: '460ml',
        description: 'Sirup rasa cocopandan untuk minuman segar'
      },
      {
        name: 'Air Mineral Aqua 600ml',
        category: 'Minuman',
        cost_price: 3000,
        sell_price: 3500,
        stock: 200,
        unit: '600ml',
        description: 'Air mineral dalam kemasan'
      },
      // SNACK & KUE
      {
        name: 'Biskuit Roma Kelapa 300g',
        category: 'Snack & Kue',
        cost_price: 9000,
        sell_price: 11000,
        stock: 70,
        unit: '300g',
        description: 'Biskuit kelapa renyah dan lezat'
      },
      {
        name: 'Wafer Tango Cokelat 130g',
        category: 'Snack & Kue',
        cost_price: 6000,
        sell_price: 7500,
        stock: 90,
        unit: '130g',
        description: 'Wafer cokelat renyah'
      },
      {
        name: 'Keripik Kentang Chitato 68g',
        category: 'Snack & Kue',
        cost_price: 8000,
        sell_price: 10000,
        stock: 100,
        unit: '68g',
        description: 'Keripik kentang berbagai rasa'
      },
      // SABUN & DETERGEN
      {
        name: 'Sabun Mandi Lifebuoy 85g',
        category: 'Sabun & Detergen',
        cost_price: 3500,
        sell_price: 4500,
        stock: 120,
        unit: '85g',
        description: 'Sabun mandi anti kuman'
      },
      {
        name: 'Detergen Rinso 800g',
        category: 'Sabun & Detergen',
        cost_price: 18000,
        sell_price: 21000,
        stock: 60,
        unit: '800g',
        description: 'Detergen bubuk untuk mencuci pakaian'
      },
      {
        name: 'Sabun Cuci Piring Sunlight 800ml',
        category: 'Sabun & Detergen',
        cost_price: 13000,
        sell_price: 15500,
        stock: 70,
        unit: '800ml',
        description: 'Sabun cuci piring jeruk nipis'
      },
      // PERAWATAN PRIBADI
      {
        name: 'Shampo Pantene 170ml',
        category: 'Perawatan Pribadi',
        cost_price: 16000,
        sell_price: 19000,
        stock: 50,
        unit: '170ml',
        description: 'Shampo untuk rambut sehat berkilau'
      },
      {
        name: 'Pasta Gigi Pepsodent 190g',
        category: 'Perawatan Pribadi',
        cost_price: 10000,
        sell_price: 12500,
        stock: 80,
        unit: '190g',
        description: 'Pasta gigi untuk gigi sehat'
      },
      {
        name: 'Sikat Gigi Formula',
        category: 'Perawatan Pribadi',
        cost_price: 5000,
        sell_price: 7000,
        stock: 100,
        unit: 'pcs',
        description: 'Sikat gigi dengan bulu lembut'
      },
      // MAKANAN KALENG
      {
        name: 'Sarden ABC 155g',
        category: 'Makanan Kaleng',
        cost_price: 11000,
        sell_price: 13500,
        stock: 60,
        unit: '155g',
        description: 'Sarden dalam saus tomat'
      },
      {
        name: 'Kornet Pronas 198g',
        category: 'Makanan Kaleng',
        cost_price: 18000,
        sell_price: 21000,
        stock: 50,
        unit: '198g',
        description: 'Kornet sapi untuk lauk praktis'
      },
      {
        name: 'Susu Kental Manis Frisian Flag 370g',
        category: 'Makanan Kaleng',
        cost_price: 11000,
        sell_price: 13000,
        stock: 70,
        unit: '370g',
        description: 'Susu kental manis dalam kaleng'
      },
      // PASTA & SAUS
      {
        name: 'Spaghetti La Fonte 500g',
        category: 'Pasta & Saus',
        cost_price: 14000,
        sell_price: 16500,
        stock: 40,
        unit: '500g',
        description: 'Pasta spaghetti import'
      },
      {
        name: 'Saus Pasta Prego 300g',
        category: 'Pasta & Saus',
        cost_price: 22000,
        sell_price: 25000,
        stock: 30,
        unit: '300g',
        description: 'Saus pasta siap pakai'
      }
    ]

    // Insert setiap produk
    for (const product of newProducts) {
      // Dapatkan category_id
      const categoryResult = await client.query(
        'SELECT id FROM categories WHERE category_name = $1',
        [product.category]
      )
      
      if (categoryResult.rows.length === 0) {
        console.log(`⚠️  Kategori "${product.category}" tidak ditemukan, melewati produk ${product.name}`)
        continue
      }

      const categoryId = categoryResult.rows[0].id

      // Insert produk
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

      console.log(`✅ Produk ditambahkan:`, result.rows[0])
    }

    // Tampilkan semua produk yang baru ditambahkan
    console.log('\n📦 Daftar produk yang berhasil ditambahkan:')
    const productsResult = await client.query(`
      SELECT p.id, p.name, c.category_name, p.cost_price, p.sell_price, p.stock, p.unit
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY c.category_name, p.id DESC
      LIMIT 100
    `)

    console.table(productsResult.rows)
    console.log('\n🎉 Selesai! Total produk ditambahkan:', newProducts.length)
    
    // Tampilkan jumlah produk per kategori
    console.log('\n📊 Produk per kategori:')
    const categoryCount = await client.query(`
      SELECT c.category_name, COUNT(p.id) as total
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id
      GROUP BY c.category_name
      ORDER BY c.category_name
    `)
    console.table(categoryCount.rows)
    
  } catch (error) {
    console.error('❌ Error menambahkan produk:', error)
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

// Jalankan fungsi
addNewProducts()
  .then(() => {
    console.log('✅ Proses selesai')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Proses gagal:', error)
    process.exit(1)
  })
