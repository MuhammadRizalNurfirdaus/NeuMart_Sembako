-- Script untuk menambahkan produk sembako baru
-- File: add_products.sql

-- Pastikan kategori sudah ada
INSERT INTO categories (category_name) 
VALUES 
  ('Beras'),
  ('Minyak'),
  ('Gula & Garam'),
  ('Mie Instan'),
  ('Telur')
ON CONFLICT (category_name) DO NOTHING;

-- Tambahkan kolom cost_price dan sell_price jika belum ada
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='products' AND column_name='cost_price') THEN
    ALTER TABLE products ADD COLUMN cost_price DECIMAL(10,2);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='products' AND column_name='sell_price') THEN
    ALTER TABLE products ADD COLUMN sell_price DECIMAL(10,2);
  END IF;
END $$;

-- Insert produk baru dengan cost_price dan sell_price
INSERT INTO products (category_id, name, cost_price, sell_price, price, stock, unit, description, image)
VALUES
  (
    (SELECT id FROM categories WHERE category_name = 'Beras'),
    'Beras Bulog SPHP 5kg', 
    58000, 
    62000,
    62000,
    50,
    '5kg',
    'Beras Bulog Stabilisasi Pasokan dan Harga Pangan - Beras berkualitas dengan harga terjangkau dari pemerintah',
    NULL  -- Foto akan diupload nanti
  ),
  (
    (SELECT id FROM categories WHERE category_name = 'Minyak'),
    'Minyak Goreng Kita 1L', 
    14500, 
    16000,
    16000,
    100,
    '1L',
    'Minyak goreng kelapa sawit murni merek Kita - Jernih dan berkualitas',
    NULL
  ),
  (
    (SELECT id FROM categories WHERE category_name = 'Gula & Garam'),
    'Gula Pasir Gulaku 1kg', 
    16000, 
    18000,
    18000,
    40,
    '1kg',
    'Gula pasir kristal putih merek Gulaku - Manis alami untuk kebutuhan sehari-hari',
    NULL
  ),
  (
    (SELECT id FROM categories WHERE category_name = 'Mie Instan'),
    'Indomie Goreng', 
    2700, 
    3100,
    3100,
    200,
    'pcs',
    'Indomie Goreng Original - Mie instan rasa goreng favorit Indonesia',
    NULL
  ),
  (
    (SELECT id FROM categories WHERE category_name = 'Telur'),
    'Telur Ayam Negeri', 
    25000, 
    28000,
    28000,
    30,
    '10 butir',
    'Telur ayam negeri segar pilihan - Kaya protein untuk kebutuhan gizi keluarga',
    NULL
  )
ON CONFLICT DO NOTHING;

-- Tampilkan hasil
SELECT id, name, cost_price, sell_price, price, stock, unit 
FROM products 
WHERE name IN (
  'Beras Bulog SPHP 5kg',
  'Minyak Goreng Kita 1L',
  'Gula Pasir Gulaku 1kg',
  'Indomie Goreng',
  'Telur Ayam Negeri'
)
ORDER BY id DESC;
