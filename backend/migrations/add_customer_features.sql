-- Migration: Add Customer Account Management Features
-- Date: 2025-12-28
-- Description: Menambahkan tabel untuk alamat, metode pembayaran, wishlist, dan fitur customer lainnya

-- ====================================
-- 1. Tabel CUSTOMER ADDRESSES
-- ====================================
CREATE TABLE IF NOT EXISTS customer_addresses (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  label VARCHAR(50) NOT NULL, -- 'Rumah', 'Kantor', 'Kos', dll
  recipient_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city VARCHAR(100) NOT NULL,
  province VARCHAR(100) NOT NULL,
  postal_code VARCHAR(10) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_default BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_customer_addresses_user_id ON customer_addresses(user_id);
CREATE INDEX idx_customer_addresses_default ON customer_addresses(is_default);

-- Trigger untuk memastikan hanya satu alamat default per user
CREATE OR REPLACE FUNCTION ensure_single_default_address()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_default = TRUE THEN
    UPDATE customer_addresses 
    SET is_default = FALSE 
    WHERE user_id = NEW.user_id AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_single_default_address
  BEFORE INSERT OR UPDATE ON customer_addresses
  FOR EACH ROW
  EXECUTE FUNCTION ensure_single_default_address();

-- ====================================
-- 2. Tabel PAYMENT METHODS
-- ====================================
CREATE TABLE IF NOT EXISTS payment_methods (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  method_type VARCHAR(50) NOT NULL, -- 'bank_transfer', 'e_wallet', 'credit_card'
  provider VARCHAR(100) NOT NULL, -- 'BCA', 'Mandiri', 'GoPay', 'OVO', 'Dana', dll
  account_number VARCHAR(100),
  account_name VARCHAR(255),
  card_number VARCHAR(20), -- 4 digit terakhir untuk credit card
  is_default BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_payment_methods_user_id ON payment_methods(user_id);
CREATE INDEX idx_payment_methods_default ON payment_methods(is_default);

-- Trigger untuk memastikan hanya satu payment method default per user
CREATE OR REPLACE FUNCTION ensure_single_default_payment()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_default = TRUE THEN
    UPDATE payment_methods 
    SET is_default = FALSE 
    WHERE user_id = NEW.user_id AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_single_default_payment
  BEFORE INSERT OR UPDATE ON payment_methods
  FOR EACH ROW
  EXECUTE FUNCTION ensure_single_default_payment();

-- ====================================
-- 3. Tabel WISHLIST
-- ====================================
CREATE TABLE IF NOT EXISTS wishlist (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  product_id INT REFERENCES products(id) ON DELETE CASCADE,
  added_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX idx_wishlist_product_id ON wishlist(product_id);
CREATE UNIQUE INDEX idx_wishlist_unique ON wishlist(user_id, product_id);

-- ====================================
-- 4. Tabel CUSTOMER PREFERENCES
-- ====================================
CREATE TABLE IF NOT EXISTS customer_preferences (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) UNIQUE NOT NULL,
  preferred_categories TEXT[], -- Array kategori favorit
  notification_email BOOLEAN DEFAULT TRUE,
  notification_promo BOOLEAN DEFAULT TRUE,
  notification_order BOOLEAN DEFAULT TRUE,
  language VARCHAR(10) DEFAULT 'id',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_customer_preferences_user_id ON customer_preferences(user_id);

-- ====================================
-- 5. Tabel SHIPPING RATES (untuk gratis ongkir)
-- ====================================
CREATE TABLE IF NOT EXISTS shipping_rates (
  id SERIAL PRIMARY KEY,
  city VARCHAR(100) NOT NULL,
  province VARCHAR(100) NOT NULL,
  base_rate DECIMAL(10, 2) NOT NULL,
  free_shipping_min DECIMAL(10, 2), -- Minimal belanja untuk gratis ongkir
  estimated_days VARCHAR(20) NOT NULL, -- '1-2 hari', '2-3 hari'
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_shipping_rates_city ON shipping_rates(city);

-- Insert data ongkir default
INSERT INTO shipping_rates (city, province, base_rate, free_shipping_min, estimated_days) VALUES
('Jakarta', 'DKI Jakarta', 10000, 100000, '1-2 hari'),
('Bandung', 'Jawa Barat', 15000, 150000, '2-3 hari'),
('Surabaya', 'Jawa Timur', 15000, 150000, '2-3 hari'),
('Semarang', 'Jawa Tengah', 15000, 150000, '2-3 hari'),
('Yogyakarta', 'DI Yogyakarta', 15000, 150000, '2-3 hari'),
('Medan', 'Sumatera Utara', 25000, 200000, '3-5 hari'),
('Makassar', 'Sulawesi Selatan', 30000, 250000, '3-5 hari'),
('Denpasar', 'Bali', 25000, 200000, '3-5 hari');

-- ====================================
-- 6. Tabel PROMOTIONS
-- ====================================
CREATE TABLE IF NOT EXISTS promotions (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) NOT NULL, -- 'percentage', 'fixed_amount', 'free_shipping'
  discount_value DECIMAL(10, 2) NOT NULL,
  min_purchase DECIMAL(10, 2),
  max_discount DECIMAL(10, 2),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  usage_limit INT,
  usage_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_promotions_code ON promotions(code);
CREATE INDEX idx_promotions_active ON promotions(is_active);

-- Insert promo default
INSERT INTO promotions (code, name, description, discount_type, discount_value, min_purchase, start_date, end_date, usage_limit) VALUES
('WELCOME10', 'Selamat Datang', 'Diskon 10% untuk pembelian pertama', 'percentage', 10, 50000, NOW(), NOW() + INTERVAL '30 days', 1000),
('GRATIS100K', 'Gratis Ongkir', 'Gratis ongkir min belanja 100rb', 'free_shipping', 0, 100000, NOW(), NOW() + INTERVAL '30 days', NULL),
('HEMAT20K', 'Hemat 20 Ribu', 'Diskon 20rb min belanja 150rb', 'fixed_amount', 20000, 150000, NOW(), NOW() + INTERVAL '30 days', 500);

-- ====================================
-- 7. Tabel PROMO USAGE (tracking)
-- ====================================
CREATE TABLE IF NOT EXISTS promo_usage (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  promotion_id INT REFERENCES promotions(id) ON DELETE CASCADE,
  order_id INT,
  used_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_promo_usage_user_id ON promo_usage(user_id);
CREATE INDEX idx_promo_usage_promotion_id ON promo_usage(promotion_id);

-- ====================================
-- 8. Update Tabel ORDERS (tambah kolom)
-- ====================================
ALTER TABLE orders ADD COLUMN IF NOT EXISTS address_id INT REFERENCES customer_addresses(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method_id INT REFERENCES payment_methods(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS promotion_id INT REFERENCES promotions(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS subtotal DECIMAL(10, 2);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_cost DECIMAL(10, 2) DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS discount_amount DECIMAL(10, 2) DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number VARCHAR(100);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS courier VARCHAR(50);

-- ====================================
-- SELESAI
-- ====================================
