# 📚 Database Schema - NeuMart Sembako

## Database Name
```
db_neumart_sembako
```

---

## 📋 Tabel-Tabel Database

### 1. **users** - Tabel Pengguna
Menyimpan data semua pengguna (customer dan admin)

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  display_name VARCHAR(255),
  photo_url VARCHAR(500),
  role VARCHAR(20) DEFAULT 'customer', -- 'admin' atau 'customer'
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Index untuk query cepat
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
```

**Kolom Penting:**
- `id`: Primary key auto-increment
- `username`: Username unik untuk login
- `email`: Email unik
- `password`: Password ter-hash (bcrypt)
- `role`: 'admin' atau 'customer'
- `created_at`: Waktu registrasi

---

### 2. **categories** - Kategori Produk
Kategori sembako (Beras, Minyak, Mie, Bumbu, dll)

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50), -- emoji atau icon class
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (category_name, icon, description) VALUES
('Beras', '🍚', 'Beras premium berbagai jenis'),
('Minyak Goreng', '🛢️', 'Minyak goreng kemasan'),
('Mie Instan', '🍜', 'Mie instan berbagai merek'),
('Bumbu Dapur', '🧂', 'Bumbu dan rempah-rempah'),
('Gula & Garam', '🧂', 'Gula pasir dan garam dapur'),
('Kopi & Teh', '☕', 'Kopi dan teh kemasan'),
('Telur', '🥚', 'Telur ayam dan bebek'),
('Susu & Minuman', '🥛', 'Susu dan minuman kemasan');
```

---

### 3. **products** - Produk Sembako
Semua stok barang yang dijual

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES categories(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  unit VARCHAR(20) DEFAULT 'pcs', -- kg, liter, pcs, pack
  image VARCHAR(500), -- URL gambar produk
  emoji VARCHAR(10), -- emoji untuk quick display
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index untuk query cepat
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);

-- Trigger untuk update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

**Kolom Penting:**
- `category_id`: Foreign key ke tabel categories
- `price`: Harga per unit (Rupiah)
- `stock`: Jumlah stok tersedia
- `unit`: Satuan (kg, liter, pcs, pack)

---

### 4. **orders** - Pesanan Pelanggan
Transaksi pembelian dari customer

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  total_price DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL, -- 'COD', 'Transfer', 'E-Wallet'
  payment_status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Paid', 'Failed'
  order_status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'
  shipping_address TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  delivered_at TIMESTAMP
);

-- Index untuk query cepat
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_orders_payment ON orders(payment_method);
CREATE INDEX idx_orders_date ON orders(created_at DESC);

-- Trigger untuk update updated_at
CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON orders 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

**Kolom Penting:**
- `payment_method`: COD, Transfer, E-Wallet
- `payment_status`: Status pembayaran
- `order_status`: Status pengiriman

---

### 5. **order_items** - Detail Item Pesanan
Item-item dalam setiap pesanan

```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  product_id INT REFERENCES products(id) ON DELETE SET NULL,
  product_name VARCHAR(255) NOT NULL, -- Snapshot nama produk saat order
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL, -- Snapshot harga saat order
  subtotal DECIMAL(10,2) NOT NULL, -- quantity * price
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index untuk query cepat
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
```

**Kolom Penting:**
- `product_name`: Snapshot nama (case produk dihapus)
- `price`: Snapshot harga saat order
- `subtotal`: Total harga item (quantity × price)

---

### 6. **ai_logs** - Log Interaksi AI
Untuk machine learning dan analisis

```sql
CREATE TABLE ai_logs (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  interaction_type VARCHAR(100) NOT NULL, -- 'search', 'view', 'add_to_cart', 'purchase', 'recommendation_shown', 'recommendation_clicked'
  product_id INT REFERENCES products(id) ON DELETE SET NULL,
  recommended_product_id INT REFERENCES products(id) ON DELETE SET NULL,
  search_query TEXT, -- Untuk interaction_type = 'search'
  session_id VARCHAR(100), -- Track user session
  metadata JSONB, -- Additional data (browser, device, etc)
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index untuk query AI analytics
CREATE INDEX idx_ai_logs_user ON ai_logs(user_id);
CREATE INDEX idx_ai_logs_type ON ai_logs(interaction_type);
CREATE INDEX idx_ai_logs_product ON ai_logs(product_id);
CREATE INDEX idx_ai_logs_date ON ai_logs(created_at DESC);
CREATE INDEX idx_ai_logs_metadata ON ai_logs USING GIN(metadata);
```

**Use Case AI:**
- Track apa yang user cari (search_query)
- Track produk mana yang sering dilihat
- Track rekomendasi AI yang di-klik
- Train model untuk prediksi demand
- Collaborative filtering recommendations

---

### 7. **cart** - Keranjang Belanja
Keranjang sementara sebelum checkout

```sql
CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  product_id INT REFERENCES products(id) ON DELETE CASCADE,
  quantity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id) -- Satu produk hanya sekali per user
);

-- Index untuk query cepat
CREATE INDEX idx_cart_user ON cart(user_id);

-- Trigger untuk update updated_at
CREATE TRIGGER update_cart_updated_at 
  BEFORE UPDATE ON cart 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

---

### 8. **product_views** - Tracking View Produk
Analytics produk paling sering dilihat

```sql
CREATE TABLE product_views (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  session_id VARCHAR(100),
  viewed_at TIMESTAMP DEFAULT NOW()
);

-- Index untuk analytics
CREATE INDEX idx_product_views_product ON product_views(product_id);
CREATE INDEX idx_product_views_date ON product_views(viewed_at DESC);
```

---

## 📊 Query Penting untuk Admin Dashboard

### 1. Total Pendapatan
```sql
SELECT 
  SUM(total_price) as total_revenue
FROM orders 
WHERE payment_status = 'Paid';
```

### 2. Pendapatan COD vs Online
```sql
SELECT 
  payment_method,
  SUM(total_price) as revenue,
  COUNT(*) as order_count
FROM orders 
WHERE payment_status = 'Paid'
GROUP BY payment_method;
```

### 3. Top 5 Produk Terlaris
```sql
SELECT 
  p.name,
  p.image,
  SUM(oi.quantity) as total_sold,
  SUM(oi.subtotal) as total_revenue
FROM order_items oi
JOIN products p ON p.id = oi.product_id
JOIN orders o ON o.id = oi.order_id
WHERE o.payment_status = 'Paid'
GROUP BY p.id, p.name, p.image
ORDER BY total_sold DESC
LIMIT 5;
```

### 4. Produk yang Perlu Restock (Stock < 10)
```sql
SELECT 
  name,
  stock,
  unit,
  category_id
FROM products 
WHERE stock < 10 AND is_active = TRUE
ORDER BY stock ASC;
```

### 5. Customer Paling Aktif
```sql
SELECT 
  u.username,
  u.email,
  COUNT(o.id) as total_orders,
  SUM(o.total_price) as total_spent
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.payment_status = 'Paid'
GROUP BY u.id, u.username, u.email
ORDER BY total_spent DESC
LIMIT 10;
```

### 6. Tren Penjualan Harian (30 Hari)
```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as order_count,
  SUM(total_price) as daily_revenue
FROM orders
WHERE created_at >= NOW() - INTERVAL '30 days'
  AND payment_status = 'Paid'
GROUP BY DATE(created_at)
ORDER BY date ASC;
```

### 7. AI - Produk Paling Sering Dicari
```sql
SELECT 
  search_query,
  COUNT(*) as search_count
FROM ai_logs
WHERE interaction_type = 'search'
  AND created_at >= NOW() - INTERVAL '7 days'
GROUP BY search_query
ORDER BY search_count DESC
LIMIT 20;
```

### 8. AI - Recommendation Click-Through Rate
```sql
SELECT 
  p.name as recommended_product,
  COUNT(CASE WHEN interaction_type = 'recommendation_shown' THEN 1 END) as shown,
  COUNT(CASE WHEN interaction_type = 'recommendation_clicked' THEN 1 END) as clicked,
  ROUND(
    COUNT(CASE WHEN interaction_type = 'recommendation_clicked' THEN 1 END)::decimal / 
    NULLIF(COUNT(CASE WHEN interaction_type = 'recommendation_shown' THEN 1 END), 0) * 100,
    2
  ) as ctr_percentage
FROM ai_logs al
LEFT JOIN products p ON p.id = al.recommended_product_id
WHERE al.created_at >= NOW() - INTERVAL '30 days'
GROUP BY p.id, p.name
ORDER BY ctr_percentage DESC;
```

---

## 🔐 Sample Admin User (untuk testing)

```sql
-- Insert admin user
INSERT INTO users (username, email, password, role, display_name, email_verified)
VALUES (
  'admin123',
  'admin123@gmail.com',
  -- Password: admin123 (hashed with bcrypt)
  '$2b$10$YourHashedPasswordHere',
  'admin',
  'Administrator',
  TRUE
);
```

---

## 🚀 Setup Database

### 1. Install PostgreSQL
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS (Homebrew)
brew install postgresql
brew services start postgresql
```

### 2. Create Database
```bash
# Login ke PostgreSQL
sudo -u postgres psql

# Buat database
CREATE DATABASE db_neumart_sembako;

# Buat user
CREATE USER neumart_admin WITH PASSWORD 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE db_neumart_sembako TO neumart_admin;

# Connect ke database
\c db_neumart_sembako

# Run semua schema SQL di atas
```

### 3. Environment Variables
```env
# .env (backend)
DATABASE_URL=postgresql://neumart_admin:your_secure_password@localhost:5432/db_neumart_sembako
```

---

## 📦 Migrasi dari Mock Data ke Database

Setelah database siap, update backend untuk menggunakan PostgreSQL:

```bash
# Install PostgreSQL client
npm install pg
npm install --save-dev @types/pg

# Atau gunakan ORM seperti Prisma
npm install @prisma/client
npm install prisma --save-dev
npx prisma init
```

---

**Status:** Database schema ready! Tinggal setup PostgreSQL server dan run migrations. 🎉
