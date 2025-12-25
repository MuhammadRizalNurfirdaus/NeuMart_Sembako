# 🎨 DEMO & SCREENSHOT GUIDE

## 🌐 Akses Website

Website sudah berjalan di: **http://localhost:3000**

---

## 📸 HALAMAN-HALAMAN UTAMA

### 1. Homepage (/)
**URL:** http://localhost:3000

**Fitur:**
- Hero section dengan gradient background
- Logo NeuMart Sembako
- Tombol CTA "Mulai Belanja" dan "Coba Fitur AI"
- Section fitur AI (4 kartu)
- Grid produk sembako
- Footer dengan social media

**Yang Perlu Difoto:**
- Full page hero section
- Section fitur AI
- Grid produk

---

### 2. Halaman Produk (/products)
**URL:** http://localhost:3000/products

**Fitur:**
- Search bar untuk mencari produk
- Filter kategori (Semua, Beras, Minyak, Gula, dll)
- Grid semua produk (12 produk)
- Setiap card produk punya:
  - Emoji icon besar
  - Nama & deskripsi
  - Harga
  - Info stok
  - Tombol "Tambah ke Keranjang"

**Cara Test:**
1. Klik kategori "Beras" → Hanya tampil produk beras
2. Search "telur" → Filter hasil
3. Klik "Tambah ke Keranjang" → Muncul notifikasi

---

### 3. Keranjang (/cart)
**URL:** http://localhost:3000/cart

**Cara Test Lengkap:**

**Step 1:** Tambah 3 produk
- Beras Premium
- Telur Ayam  
- Minyak Goreng

**Step 2:** Buka /cart

**Akan Terlihat:**
- ✅ 3 produk di keranjang
- ✅ Quantity adjuster (+/-)
- ✅ Tombol hapus (trash icon)
- ✅ Total harga
- ✅ Tombol "Bingung Mau Masak Apa?"
- ✅ **REKOMENDASI AI** di bawah (produk terkait)

**Screenshot Penting:**
- Keranjang dengan 3 item
- Section rekomendasi AI

---

### 4. AI Recipe Generator (/ai-recipe)
**URL:** http://localhost:3000/ai-recipe

**Test Case 1: Keranjang Kosong**
- Akan muncul message "Tambahkan produk terlebih dahulu"

**Test Case 2: Dengan Beras + Telur**
1. Tambah Beras dan Telur ke keranjang
2. Klik "Bingung Mau Masak Apa?" atau buka /ai-recipe
3. Akan muncul:
   - Header AI-Powered
   - Box "Bahan yang Tersedia" (chip produk)
   - Card resep "Nasi Goreng Telur" dengan:
     - Icon chef
     - Cooking time
     - Difficulty level
     - List bahan
     - Numbered steps

**Screenshot:**
- Header dengan badge AI
- Bahan yang tersedia
- Card resep lengkap

---

### 5. Chatbot (/chatbot)
**URL:** http://localhost:3000/chatbot

**Cara Test:**

**Pertanyaan 1:**
```
User: Apakah beras masih ada?
AI: ✅ Beras Premium masih tersedia! Stok kami: 50 5kg. Harga: Rp 85.000
```

**Pertanyaan 2:**
```
User: Berapa harga telur?
AI: 💰 Harga Telur Ayam (1kg): Rp 30.000
Stok tersedia: 40
```

**Pertanyaan 3:**
```
User: Produk apa yang paling murah?
AI: 💸 Produk termurah kami:
• Mie Instan: Rp 2.500
• Garam Dapur: Rp 3.000
• Teh Celup: Rp 7.000
```

**Pertanyaan 4:**
```
User: Tampilkan produk terlaris
AI: 🔥 Produk paling laris (hampir habis!):
• Kopi Bubuk - Sisa 35 stok!
• Telur Ayam - Sisa 40 stok!
```

**Screenshot:**
- Chat interface
- Quick questions buttons
- Beberapa pertanyaan & jawaban AI

---

## 🎯 FLOW DEMO LENGKAP

### Skenario: User Pertama Kali Belanja

**1. Landing di Homepage**
- Lihat hero section
- Scroll ke fitur AI
- Klik "Mulai Belanja"

**2. Browse Produk**
- Pilih kategori "Beras"
- Search "premium"
- Add "Beras Premium" ke cart

**3. Tambah Produk Lain**
- Filter kategori "Telur"
- Add "Telur Ayam"
- Add "Minyak Goreng"

**4. Cek Keranjang**
- Klik icon cart (badge angka 3)
- Lihat total belanja
- **AI REKOMENDASI** muncul: Gula, Kecap, dll

**5. Coba AI Recipe**
- Klik "Bingung Mau Masak Apa?"
- AI generate: Nasi Goreng Telur
- Baca ingredients & steps

**6. Tanya Chatbot**
- Klik menu "Tanya Stok"
- Tanya: "Apakah garam masih ada?"
- AI jawab dengan info lengkap

---

## 🎨 UI/UX HIGHLIGHTS

### Color Scheme
- **Primary Blue:** #1E88E5 (NeuMart blue)
- **Primary Green:** #66BB6A (Sembako green)
- **Accent Brown:** #A67C52 (Basket color)

### Gradients
- Hero: Blue to Green
- AI Features: Per fitur punya warna sendiri
- Recipe page: Green to Blue

### Animations
- Hover cards: Transform & shadow
- Product add notification: Bounce animation
- Chatbot typing: Dot animation

---

## 📱 RESPONSIVE DESIGN

Test di berbagai ukuran:

**Desktop (1920px)**
- 4 kolom produk
- Full navigation menu
- Sidebar summary

**Tablet (768px)**  
- 2-3 kolom produk
- Hamburger menu
- Responsive grid

**Mobile (375px)**
- 1 kolom produk
- Mobile menu
- Stack layout

---

## ✅ CHECKLIST DEMO

Pastikan test semua ini:

### Fitur E-Commerce
- [ ] Browse produk
- [ ] Filter kategori
- [ ] Search produk
- [ ] Add to cart (dengan notifikasi)
- [ ] Update quantity di cart
- [ ] Remove dari cart
- [ ] Lihat total harga

### Fitur AI #1: Smart Recommendation
- [ ] Add Beras → Lihat rekomendasi Gula, Telur
- [ ] Add Minyak → Lihat rekomendasi Beras, Kecap, Mie
- [ ] Rekomendasi tidak tampil produk yang sudah di cart

### Fitur AI #2: Recipe Generator
- [ ] Keranjang kosong → Message "Tambahkan produk"
- [ ] Beras + Telur → Resep Nasi Goreng
- [ ] Tepung + Telur → Resep Pancake
- [ ] Mie + Telur → Resep Mie Goreng
- [ ] Default recipes untuk kombinasi lain

### Fitur AI #3: Chatbot
- [ ] Greeting message saat pertama buka
- [ ] Tanya stok → Jawab dengan info lengkap
- [ ] Tanya harga → Jawab dengan harga + stok
- [ ] Tanya "termurah" → List 3 produk termurah
- [ ] Tanya "terlaris" → List produk hampir habis
- [ ] Quick questions button berfungsi

### UI/UX
- [ ] Logo muncul di navbar
- [ ] Cart badge update otomatis
- [ ] Responsive di mobile
- [ ] Smooth scroll animations
- [ ] Footer lengkap dengan social media

---

## 🎬 VIDEO DEMO SCRIPT

**Intro (10 detik)**
"Halo! Ini adalah NeuMart Sembako, toko sembako pintar dengan AI"

**Homepage Tour (20 detik)**
"Lihat, ada hero section dengan logo keren, dan 4 fitur AI utama"

**Product Browsing (30 detik)**
"Kita bisa filter kategori, search produk, dan langsung add to cart"

**Smart Recommendation (30 detik)**
"Saat saya add Beras, AI langsung rekomendasikan Gula dan Telur yang sering dibeli bersamaan"

**Recipe Generator (40 detik)**
"Fitur favorit: Klik 'Bingung Mau Masak Apa', AI kasih resep lengkap dari bahan di keranjang"

**Chatbot Demo (30 detik)**
"Dan yang terakhir, chatbot AI yang bisa jawab pertanyaan stok dan harga 24/7"

**Outro (10 detik)**
"Semua ini dibuat dengan TypeScript, Next.js, dan AI sederhana. Happy coding!"

**Total: ~2.5 menit**

---

## 📊 METRICS TO SHOWCASE

- ✅ 12 produk sembako
- ✅ 3 fitur AI terintegrasi
- ✅ 5 halaman utama
- ✅ 100% TypeScript
- ✅ Responsive design
- ✅ 0 API dependencies (AI lokal)

---

**Semoga sukses presentasi/demo! 🎉**
