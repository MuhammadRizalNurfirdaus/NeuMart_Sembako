# 🛒 NeuMart Sembako

**Toko Sembako Pintar dengan Teknologi AI**

NeuMart Sembako adalah aplikasi web e-commerce modern yang mengintegrasikan teknologi AI untuk memberikan pengalaman belanja sembako yang lebih pintar dan efisien.

![NeuMart Sembako](public/logo.png)

## 🚀 Fitur Utama

### 1. 🛍️ E-Commerce Lengkap
- Katalog produk sembako
- Keranjang belanja
- Filter dan pencarian produk
- Manajemen stok real-time

### 2. 🤖 Fitur AI

#### a. Smart Recommendation System
Sistem rekomendasi berbasis AI yang menyarankan produk terkait berdasarkan apa yang ada di keranjang belanja Anda.

**Cara Kerja:**
- Menganalisis produk di keranjang
- Memberikan rekomendasi produk yang sering dibeli bersamaan
- Membantu customer menemukan produk yang mungkin mereka butuhkan

#### b. AI Recipe Generator
Memberikan ide resep masakan berdasarkan produk yang Anda beli.

**Cara Kerja:**
- Membaca produk di keranjang belanja
- Menggunakan algoritma matching untuk menemukan resep yang cocok
- Menampilkan bahan, langkah memasak, dan estimasi waktu

#### c. Chatbot Customer Service
Asisten AI 24/7 untuk menjawab pertanyaan tentang stok dan harga.

**Kemampuan:**
- Cek ketersediaan stok produk
- Informasi harga produk
- Rekomendasi produk termurah/terlaris
- Daftar kategori produk

## 🛠️ Teknologi yang Digunakan

- **Framework:** Next.js 14 (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Icons:** React Icons

## 📦 Instalasi

### Prasyarat
- Node.js 18+ 
- npm atau yarn

### Langkah Instalasi

1. **Clone atau buka folder project**
   ```bash
   cd "NeuMart Sembako"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   ```

4. **Buka browser**
   ```
   http://localhost:3000
   ```

## 📁 Struktur Folder

```
NeuMart Sembako/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── products/          # Halaman produk
│   ├── cart/              # Halaman keranjang
│   ├── ai-recipe/         # AI Recipe Generator
│   ├── chatbot/           # AI Chatbot
│   └── globals.css        # Global styles
├── components/            # React Components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ProductCard.tsx
│   └── ...
├── data/                  # Data produk
│   └── products.ts
├── lib/                   # AI Logic
│   ├── recipeAI.ts       # Recipe Generator AI
│   └── chatbotAI.ts      # Chatbot AI
├── store/                 # State Management
│   └── cartStore.ts
└── public/                # Static assets
    └── logo.png
```

## 🎯 Cara Menggunakan Fitur AI

### 1. Smart Recommendation
1. Tambahkan produk ke keranjang
2. Buka halaman keranjang (`/cart`)
3. Lihat rekomendasi produk di bagian bawah

### 2. Recipe Generator
1. Tambahkan produk ke keranjang (misal: Beras, Telur, Minyak)
2. Klik "Bingung Mau Masak Apa?" atau buka `/ai-recipe`
3. AI akan memberikan ide resep berdasarkan bahan yang ada

### 3. Chatbot
1. Buka halaman Chatbot (`/chatbot`)
2. Tanyakan tentang stok atau harga
3. Contoh: "Apakah beras masih ada?" atau "Berapa harga telur?"

## 🧠 Logika AI (Untuk Pembelajaran)

### Smart Recommendation
```typescript
// Algoritma sederhana: Association Rule
// Setiap produk punya daftar relatedProducts
// Ketika produk A di keranjang, rekomendasikan produk terkaitnya
```

### Recipe Generator
```typescript
// Pattern Matching Algorithm
// Cek kombinasi produk di keranjang
// Match dengan database resep
// Return resep yang sesuai
```

### Chatbot
```typescript
// Natural Language Processing (Sederhana)
// Deteksi keyword dari input user
// Match dengan database produk
// Generate response yang relevan
```

## 🚀 Development

### Build untuk Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📝 Catatan untuk Pemula

### Cara Menambah Produk Baru
Edit file `data/products.ts`:
```typescript
{
  id: 13,
  name: 'Produk Baru',
  category: 'Kategori',
  price: 10000,
  stock: 50,
  unit: '1kg',
  image: '🎯',
  description: 'Deskripsi produk',
  relatedProducts: [1, 2, 3] // ID produk terkait
}
```

### Cara Menambah Resep Baru
Edit file `lib/recipeAI.ts` di `recipeDatabase`.

### Cara Upgrade Chatbot
Edit file `lib/chatbotAI.ts` di fungsi `processChatMessage`.

## 🎓 Belajar dari Project Ini

Project ini cocok untuk belajar:
- ✅ Next.js & TypeScript
- ✅ State Management dengan Zustand
- ✅ Tailwind CSS
- ✅ Implementasi AI sederhana (tanpa ML library)
- ✅ Pattern matching & algoritma rekomendasi
- ✅ Chatbot logic

## 🔮 Pengembangan Selanjutnya

Untuk meningkatkan kemampuan AI, Anda bisa:

1. **Integrasi dengan OpenAI API**
   - Recipe Generator yang lebih pintar
   - Chatbot yang lebih natural

2. **Machine Learning**
   - Prediksi stok menggunakan historical data
   - Personalisasi rekomendasi per user

3. **Database Real**
   - PostgreSQL / MongoDB
   - Simpan riwayat pembelian
   - Analytics dashboard

## 📄 License

MIT License - Bebas digunakan untuk belajar dan dikembangkan.

## 👨‍💻 Author

Dibuat dengan ❤️ untuk pembelajaran AI dan Web Development.

---

**Happy Coding! 🚀**

Jika ada pertanyaan, silakan buka issue atau hubungi developer.
