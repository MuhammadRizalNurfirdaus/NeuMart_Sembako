# 🚀 CARA MENJALANKAN PROJECT

## Langkah 1: Install Dependencies
Buka terminal di folder project ini dan jalankan:

```bash
npm install
```

Tunggu hingga semua package terinstall (sekitar 2-5 menit tergantung koneksi internet).

## Langkah 2: Jalankan Development Server

```bash
npm run dev
```

## Langkah 3: Buka Browser

Buka browser dan akses:
```
http://localhost:3000
```

## 🎯 Halaman yang Tersedia

1. **Homepage** - http://localhost:3000
   - Tampilan utama dengan hero section
   - Preview fitur AI
   - Daftar produk

2. **Semua Produk** - http://localhost:3000/products
   - Katalog lengkap produk sembako
   - Filter kategori
   - Pencarian produk

3. **Keranjang Belanja** - http://localhost:3000/cart
   - Daftar produk yang ditambahkan
   - Rekomendasi AI produk terkait

4. **AI Recipe Generator** - http://localhost:3000/ai-recipe
   - Ide resep berdasarkan produk di keranjang
   - Bahan dan cara memasak

5. **Chatbot** - http://localhost:3000/chatbot
   - Tanya jawab tentang stok dan harga
   - Asisten AI 24/7

## 📝 Tips

### Jika ada error "Module not found":
```bash
npm install
```

### Jika port 3000 sudah digunakan:
```bash
npm run dev -- -p 3001
```
Lalu buka: http://localhost:3001

### Jika ingin build untuk production:
```bash
npm run build
npm start
```

## 🧪 Cara Test Fitur AI

### 1. Test Smart Recommendation:
- Tambahkan "Beras" ke keranjang
- Buka halaman cart
- Lihat rekomendasi: Gula, Telur, Garam (produk yang sering dibeli bersamaan)

### 2. Test Recipe Generator:
- Tambahkan: Beras, Telur, Minyak Goreng
- Klik "Bingung Mau Masak Apa?" atau buka /ai-recipe
- AI akan memberikan resep "Nasi Goreng"

### 3. Test Chatbot:
- Buka /chatbot
- Tanya: "Apakah beras masih ada?"
- AI akan jawab dengan info stok dan harga

## ❗ Troubleshooting

### Error: Cannot find module 'next'
**Solusi:** Jalankan `npm install`

### Error: Port 3000 already in use
**Solusi:** Gunakan port lain dengan `npm run dev -- -p 3001`

### Gambar tidak muncul
**Solusi:** Pastikan file logo.svg ada di folder public/

### Perubahan tidak terlihat
**Solusi:** 
1. Stop server (Ctrl+C)
2. Jalankan ulang `npm run dev`
3. Refresh browser dengan Ctrl+F5

## 📞 Butuh Bantuan?

Baca file README.md untuk dokumentasi lengkap.

---

**Selamat Mencoba! 🎉**
