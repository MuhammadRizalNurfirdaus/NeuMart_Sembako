# 📚 PANDUAN LENGKAP FITUR AI

## 🎯 Overview

NeuMart Sembako menggunakan 3 fitur AI utama:
1. **Smart Recommendation** - Rekomendasi produk cerdas
2. **Recipe Generator** - Generator resep otomatis
3. **Chatbot Assistant** - Asisten customer service AI

---

## 1️⃣ SMART RECOMMENDATION SYSTEM

### Cara Kerja
Sistem ini menggunakan **Association Rule Algorithm** sederhana:

```typescript
// Logika:
1. Setiap produk memiliki array relatedProducts
2. Ketika user menambahkan produk A ke keranjang
3. Sistem mencari produk terkait dari A.relatedProducts
4. Filter produk yang sudah ada di keranjang
5. Tampilkan maksimal 4 rekomendasi
```

### Contoh Penggunaan
```
User adds: Beras Premium → System recommends: Gula, Telur, Garam
User adds: Minyak Goreng → System recommends: Beras, Kecap, Mie
```

### Cara Customize
Edit file `data/products.ts`:
```typescript
{
  id: 1,
  name: 'Beras Premium',
  relatedProducts: [3, 5, 7] // ID produk yang sering dibeli bersamaan
}
```

### Upgrade ke AI Real
Untuk membuat lebih canggih, gunakan:
- **Collaborative Filtering** - Analisis pola pembelian user
- **Content-Based Filtering** - Analisis karakteristik produk
- **Hybrid Approach** - Kombinasi keduanya

---

## 2️⃣ AI RECIPE GENERATOR

### Cara Kerja
Sistem ini menggunakan **Pattern Matching Algorithm**:

```typescript
// Logika:
1. Ambil semua produk di keranjang
2. Normalize nama produk (lowercase, remove extra words)
3. Cek kombinasi spesifik:
   - Beras + Telur → Nasi Goreng
   - Tepung + Telur → Pancake
   - Mie + Telur → Mie Goreng
4. Jika tidak ada match, return default recipes
```

### Database Resep
File: `lib/recipeAI.ts`

```typescript
export const recipeDatabase = {
  'beras-telur': [
    {
      name: 'Nasi Goreng Telur',
      ingredients: [...],
      instructions: [...],
      cookingTime: '15 menit',
      difficulty: 'Mudah'
    }
  ]
}
```

### Cara Menambah Resep Baru

1. Edit `lib/recipeAI.ts`
2. Tambah kombinasi baru:

```typescript
'tepung-gula-margarin': [
  {
    name: 'Kue Kering',
    ingredients: ['Tepung terigu', 'Gula pasir', 'Margarin', 'Telur'],
    instructions: [
      'Campur semua bahan',
      'Bentuk adonan',
      'Panggang 20 menit'
    ],
    cookingTime: '40 menit',
    difficulty: 'Sedang'
  }
]
```

3. Update fungsi matching di `generateRecipeFromCart()`

### Upgrade ke AI Real
Integrasi dengan **OpenAI API**:

```typescript
// Contoh (butuh API key):
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{
    role: "user",
    content: `Berikan 3 resep masakan dari bahan: ${ingredients.join(', ')}`
  }]
});
```

---

## 3️⃣ CHATBOT ASSISTANT

### Cara Kerja
Menggunakan **Keyword Detection & Pattern Matching**:

```typescript
// Logika:
1. Terima input dari user
2. Convert ke lowercase
3. Deteksi keyword:
   - 'stok' / 'ada' → Cek ketersediaan
   - 'harga' / 'berapa' → Info harga
   - 'murah' → Produk termurah
   - 'laris' → Produk terlaris
4. Deteksi nama produk dari database
5. Generate response sesuai query
```

### Kemampuan Chatbot

| Query User | Response AI |
|------------|-------------|
| "Apakah beras masih ada?" | Info stok beras + harga |
| "Berapa harga telur?" | Harga telur + info stok |
| "Produk apa yang paling murah?" | 3 produk termurah |
| "Tampilkan produk terlaris" | Produk dengan stok paling sedikit |

### Cara Menambah Fitur Baru

Edit `lib/chatbotAI.ts`:

```typescript
export function processChatMessage(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Tambah keyword baru
  if (lowerMessage.includes('promo') || lowerMessage.includes('diskon')) {
    return '🎉 Promo bulan ini: Beli 2 Gratis 1 untuk semua beras!'
  }
  
  // Deteksi produk spesifik
  const product = products.find(p => 
    lowerMessage.includes(p.name.toLowerCase())
  )
  
  if (product) {
    return `📦 ${product.name}: Rp ${product.price.toLocaleString()}`
  }
  
  return 'Default response...'
}
```

### Upgrade ke NLP Real

Gunakan library NLP:

**1. Natural Library (JavaScript)**
```bash
npm install natural
```

```typescript
import natural from 'natural'

const tokenizer = new natural.WordTokenizer()
const tokens = tokenizer.tokenize(userMessage)
// Analisis lebih dalam
```

**2. OpenAI API (Paling Powerful)**
```typescript
const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {role: "system", content: "Kamu adalah asisten toko sembako"},
    {role: "user", content: userMessage}
  ]
})
```

---

## 🚀 TIPS PENGEMBANGAN

### Level 1: Pemula
✅ Sudah selesai! Project ini sudah implement AI sederhana

### Level 2: Menengah
- [ ] Tambah database MySQL/PostgreSQL
- [ ] Simpan history chat
- [ ] User authentication
- [ ] Prediksi stok berdasarkan pola penjualan

### Level 3: Advanced
- [ ] Integrasi OpenAI GPT API
- [ ] Machine Learning untuk rekomendasi
- [ ] Computer Vision untuk scan produk
- [ ] Voice Assistant

---

## 📊 FLOW DIAGRAM

### Smart Recommendation Flow
```
User adds product → Get product.relatedProducts → 
Filter (not in cart) → Display recommendations
```

### Recipe Generator Flow
```
User clicks "Ide Resep" → Read cart items → 
Normalize product names → Match patterns → 
Display recipes with ingredients & steps
```

### Chatbot Flow
```
User types message → Detect keywords → 
Match with product database → 
Generate contextual response → Display to user
```

---

## 🎓 LEARNING RESOURCES

### Untuk Upgrade AI Ini:

1. **Association Rule Learning**
   - Apriori Algorithm
   - FP-Growth Algorithm

2. **Natural Language Processing**
   - Tokenization
   - Named Entity Recognition (NER)
   - Sentiment Analysis

3. **Recommendation Systems**
   - Collaborative Filtering
   - Content-Based Filtering
   - Matrix Factorization

4. **API Integration**
   - OpenAI GPT-4 API
   - Google Gemini API
   - Hugging Face Models

---

**Happy Learning! 🚀**
