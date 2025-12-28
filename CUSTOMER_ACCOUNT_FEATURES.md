# 🎯 Customer Account Management - NeuMart Sembako

## 📋 Overview

Fitur manajemen akun customer yang lengkap seperti Shopee dan e-commerce modern lainnya. Customer dapat mengelola profil, alamat, metode pembayaran, wishlist, pesanan, review, dan preferensi dengan mudah. Dilengkapi dengan AI Assistant yang cerdas untuk membantu customer.

---

## ✨ Fitur Utama

### 1. **Profil Customer** 👤
- Dashboard overview dengan statistik personal
- Informasi akun lengkap
- Status verifikasi email
- Quick stats (Total Pesanan, Ulasan, Wishlist)
- Link cepat ke chatbot AI

### 2. **Manajemen Alamat** 📍
Fitur alamat pengiriman yang powerful:

**Fitur:**
- ✅ Tambah multiple alamat (Rumah, Kantor, Kos, dll)
- ✅ Set alamat default untuk checkout cepat
- ✅ Edit dan hapus alamat
- ✅ Form lengkap: nama penerima, telepon, alamat lengkap, kota, provinsi, kode pos
- ✅ Support koordinat (latitude/longitude) untuk integrasi maps
- ✅ Label custom untuk alamat

**Keuntungan:**
- Checkout lebih cepat (tidak perlu isi alamat berulang)
- Bisa simpan banyak alamat untuk berbagai tujuan
- Auto-select alamat default

### 3. **Metode Pembayaran** 💳
Simpan metode pembayaran favorit:

**Tipe Pembayaran:**
- 🏦 Transfer Bank (BCA, Mandiri, BNI, BRI)
- 💰 E-Wallet (GoPay, OVO, Dana, ShopeePay)
- 💳 Kartu Kredit/Debit

**Fitur:**
- Set metode pembayaran default
- Simpan info rekening/akun
- Hapus metode yang tidak digunakan
- Keamanan data terjamin

### 4. **Riwayat Pesanan** 📦
Tracking pesanan lengkap:

**Informasi:**
- ✅ Semua pesanan dengan status real-time
- ✅ Detail produk yang dibeli
- ✅ Total pembayaran dan ongkir
- ✅ Nomor resi pengiriman
- ✅ Status: Pending, Dikemas, Dikirim, Selesai

**Aksi:**
- Lacak pengiriman
- Review produk setelah diterima
- Re-order produk favorit

### 5. **Wishlist** ❤️
Simpan produk favorit:

- Tambah/hapus produk dari wishlist
- Lihat semua produk yang disimpan
- Notifikasi saat ada promo atau stok kembali
- Quick add to cart dari wishlist

### 6. **Ulasan Saya** ⭐
Kelola review yang sudah diberikan:

- Lihat semua review yang pernah dibuat
- Edit review
- Upload foto produk
- Rating produk 1-5 bintang

### 7. **Pengaturan & Preferensi** ⚙️

**Notifikasi:**
- Notifikasi Email
- Notifikasi Promo & Diskon
- Notifikasi Status Pesanan

**Preferensi:**
- Bahasa (Indonesia/English)
- Kategori produk favorit
- Dark mode (coming soon)

---

## 🤖 AI Assistant - Fitur Canggih

Chatbot AI yang sudah di-upgrade dengan kemampuan luar biasa:

### **Kemampuan Baru:**

#### 1. **Gratis Ongkir & Pengiriman** 🚚
```
User: "Info gratis ongkir"
AI: Menjelaskan syarat gratis ongkir (min 100rb)
    Estimasi pengiriman per kota
    Tips untuk dapat gratis ongkir
```

#### 2. **Promo & Diskon** 🎁
```
User: "Promo apa aja?"
AI: Daftar semua promo aktif
    Kode voucher
    Syarat penggunaan
    Cara pakai promo
```

#### 3. **Tracking Pesanan** 📦
```
User: "Lacak pesanan saya"
AI: Status pesanan terakhir
    Nomor resi
    Estimasi sampai
    Link ke halaman detail
```

#### 4. **Cara Belanja** 🛒
```
User: "Cara belanja"
AI: Step-by-step panduan belanja
    Tips checkout cepat
    Cara pakai alamat tersimpan
```

#### 5. **Info Pembayaran** 💳
```
User: "Metode pembayaran"
AI: Semua metode tersedia
    Cara simpan payment method
    Keamanan transaksi
```

#### 6. **Rekomendasi Cerdas** 💡
```
User: "Rekomendasi budget 50rb"
AI: Produk yang sesuai budget
    Kombinasi untuk gratis ongkir
    Promo yang bisa digunakan
```

#### 7. **Info Produk Real-time** 📊
```
User: "Harga beras"
AI: Harga terkini
    Stok tersedia
    Info gratis ongkir
    Tambah Rp X lagi untuk gratis ongkir
```

### **Konteks Aware:**
- AI tahu siapa yang bertanya (userId)
- Bisa akses order history customer
- Rekomendasi personal berdasarkan pembelian sebelumnya
- Response disesuaikan dengan status user

---

## 🗄️ Database Schema (Tambahan)

### Tabel Baru:

#### 1. **customer_addresses**
```sql
- id, user_id, label, recipient_name
- phone, address_line1, address_line2
- city, province, postal_code
- latitude, longitude
- is_default, is_active
- created_at, updated_at
```

#### 2. **payment_methods**
```sql
- id, user_id, method_type, provider
- account_number, account_name, card_number
- is_default, is_verified, is_active
- created_at, updated_at
```

#### 3. **wishlist**
```sql
- id, user_id, product_id
- added_at
```

#### 4. **customer_preferences**
```sql
- id, user_id
- preferred_categories (array)
- notification_email, notification_promo, notification_order
- language
- created_at, updated_at
```

#### 5. **shipping_rates**
```sql
- id, city, province
- base_rate, free_shipping_min
- estimated_days, is_active
- created_at, updated_at
```

#### 6. **promotions**
```sql
- id, code, name, description
- discount_type, discount_value
- min_purchase, max_discount
- start_date, end_date
- usage_limit, usage_count
- is_active, created_at
```

#### 7. **promo_usage**
```sql
- id, user_id, promotion_id
- order_id, used_at
```

### Update Tabel Orders:
```sql
ALTER TABLE orders ADD:
- address_id
- payment_method_id  
- promotion_id
- subtotal, shipping_cost, discount_amount
- tracking_number, courier
```

---

## 🔧 API Endpoints

### **Customer Management**

#### Addresses
```
GET    /api/customer/addresses/:userId
POST   /api/customer/addresses
PUT    /api/customer/addresses/:id
DELETE /api/customer/addresses/:id
PUT    /api/customer/addresses/:id/set-default
```

#### Payment Methods
```
GET    /api/customer/payment-methods/:userId
POST   /api/customer/payment-methods
DELETE /api/customer/payment-methods/:id
```

#### Wishlist
```
GET    /api/customer/wishlist/:userId
POST   /api/customer/wishlist
DELETE /api/customer/wishlist/:userId/:productId
```

#### Preferences
```
GET /api/customer/preferences/:userId
PUT /api/customer/preferences/:userId
```

#### Shipping & Promo
```
POST /api/customer/shipping/calculate
GET  /api/customer/promotions/active
POST /api/customer/promotions/validate
```

---

## 🎨 UI/UX Design

### **Konsep Design:**
- ✅ Mengikuti design system yang sudah ada
- ✅ Gradient biru-hijau sesuai brand NeuMart
- ✅ Card-based layout yang clean
- ✅ Responsive untuk mobile & desktop
- ✅ Icon & emoji untuk visual appeal
- ✅ Hover effects & transitions smooth

### **Color Palette:**
- Primary: Blue (#3B82F6)
- Secondary: Green (#10B981)
- Accent colors untuk setiap section
- Neutral grays untuk text

### **Components:**
- Sidebar navigation dengan icon
- Tab-based content switching
- Modal forms untuk add/edit
- Cards untuk data display
- Badges untuk status
- Toast notifications

---

## 📱 User Flow

### **Checkout dengan Alamat Tersimpan:**
```
1. User masuk ke cart
2. Klik Checkout
3. Sistem auto-load alamat default
4. User bisa ganti alamat dari dropdown
5. Pilih metode pembayaran tersimpan
6. Input kode promo (optional)
7. Review & confirm
8. Order created
```

### **Manajemen Alamat:**
```
1. User ke Profile → Alamat Saya
2. Klik "Tambah Alamat"
3. Isi form lengkap
4. Centang "Jadikan alamat utama" (optional)
5. Klik Simpan
6. Alamat tersimpan & bisa digunakan di checkout
```

---

## 🚀 Cara Menggunakan

### **1. Setup Database**
```bash
# Jalankan migration SQL
psql -U your_user -d db_neumart_sembako -f backend/migrations/add_customer_features.sql
```

### **2. Update Dependencies**
Tidak ada dependency baru yang diperlukan. Semua menggunakan library yang sudah ada.

### **3. Restart Server**
```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

### **4. Akses Fitur**
```
1. Login sebagai customer
2. Klik foto profil di navbar
3. Pilih "Profil Saya"
4. Explore semua fitur!
```

---

## 💡 Tips untuk Customer

### **Maksimalkan Fitur:**

1. **Simpan Alamat Utama** 📍
   - Checkout jadi lebih cepat
   - Tidak perlu isi ulang alamat

2. **Gunakan Wishlist** ❤️
   - Simpan produk favorit
   - Dapat notif saat ada promo

3. **Chat dengan AI** 🤖
   - Tanya tentang promo
   - Dapat rekomendasi budget
   - Info gratis ongkir

4. **Simpan Payment Method** 💳
   - Checkout lebih praktis
   - Payment info aman

5. **Review Produk** ⭐
   - Bantu customer lain
   - Dapat poin loyalitas (future)

---

## 🔐 Keamanan

### **Data Protection:**
- ✅ User authentication required
- ✅ Data enkripsi di transit (HTTPS)
- ✅ Input validation & sanitization
- ✅ SQL injection protection
- ✅ XSS prevention
- ✅ CSRF tokens (recommended)

### **Payment Data:**
- Simpan hanya info non-sensitif
- Kartu kredit: simpan 4 digit terakhir saja
- No CVV atau PIN disimpan
- PCI DSS compliance (production)

---

## 🎯 Roadmap Future

### **Coming Soon:**
- [ ] Social login (Google, Facebook)
- [ ] Points & Loyalty program
- [ ] Voucher wallet
- [ ] Product comparison
- [ ] Chat with seller
- [ ] Live tracking dengan maps
- [ ] Push notifications
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Export order history (PDF)

---

## 📞 Support

Jika ada pertanyaan atau butuh bantuan:
- 💬 Chat dengan AI Assistant
- 📧 Email: support@neumart.com
- 📱 WhatsApp: +62 xxx xxxx xxxx

---

## 🎉 Kesimpulan

Fitur Customer Account Management ini membuat NeuMart Sembako:
- ✅ Setara dengan e-commerce modern (Shopee, Tokopedia)
- ✅ Customer experience yang excellent
- ✅ AI-powered untuk kemudahan
- ✅ Proses checkout super cepat
- ✅ Manajemen data personal yang mudah

**Selamat berbelanja di NeuMart Sembako! 🛒✨**
