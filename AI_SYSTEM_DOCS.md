# 🤖 AI Learning System - NeuMart Sembako

## Overview
Sistem AI pembelajaran yang canggih untuk memberikan rekomendasi produk yang dipersonalisasi berdasarkan perilaku pengguna.

## 🚀 Fitur AI yang Telah Diterapkan

### 1. **Personalized Recommendations** (Rekomendasi Terpersonalisasi)
Algoritma machine learning yang menganalisis:
- ✅ Kategori produk favorit pengguna (40% bobot)
- ✅ Produk populer dalam kategori tersebut (30% bobot)
- ✅ Produk trending secara keseluruhan (20% bobot)
- ✅ Produk baru (10% bobot)

**Endpoint:** `GET /api/ai/recommendations/:userId?limit=6`

```json
{
  "success": true,
  "recommendations": [
    {
      "id": 1,
      "name": "Beras Premium",
      "category": "Beras",
      "price": 85000,
      "score": 75.5
    }
  ]
}
```

### 2. **Trending Products** (Produk Trending)
Mendeteksi produk yang sedang populer berdasarkan:
- Jumlah view dalam 7 hari terakhir
- Aktivitas add to cart
- Rating produk

**Endpoint:** `GET /api/ai/trending?limit=6`

### 3. **Frequently Bought Together** (Sering Dibeli Bersama)
Menganalisis pola pembelian untuk menemukan produk yang sering dibeli bersamaan.

**Endpoint:** `GET /api/ai/frequently-bought/:productId`

### 4. **Smart Search Suggestions** (Saran Pencarian Cerdas)
Memberikan saran pencarian berdasarkan:
- Riwayat pencarian pengguna
- Pencarian populer dari pengguna lain

**Endpoint:** `GET /api/ai/search-suggestions/:userId?q=query`

### 5. **User Preferences Analysis** (Analisis Preferensi)
Mengidentifikasi kategori favorit pengguna berdasarkan:
- View history
- Cart additions
- Purchase history (30 hari terakhir)

**Endpoint:** `GET /api/ai/preferences/:userId`

### 6. **Purchase Pattern Analysis** (Analisis Pola Pembelian)
Menganalisis kebiasaan belanja pengguna:
- Rata-rata nilai order
- Total transaksi
- Produk unik yang dibeli
- Distribusi pembelian per kategori

**Endpoint:** `GET /api/ai/purchase-patterns/:userId`

### 7. **Replenishment Reminders** (Pengingat Stok Ulang)
AI memprediksi kapan pengguna perlu membeli produk lagi berdasarkan:
- Frekuensi pembelian historis
- Rata-rata jarak waktu antar pembelian
- Produk yang dibeli secara rutin

**Endpoint:** `GET /api/ai/replenishment/:userId`

### 8. **AI Interaction Logging** (Pencatatan Interaksi)
Mencatat semua interaksi pengguna untuk pembelajaran:
- `search` - Pencarian produk
- `view` - Melihat detail produk
- `cart` - Menambah ke keranjang
- `purchase` - Pembelian
- `review` - Review produk
- `click` - Klik pada rekomendasi

**Endpoint:** `POST /api/ai/log`

```json
{
  "userId": 1,
  "eventType": "view",
  "productId": 5,
  "metadata": {
    "source": "recommendation",
    "timestamp": "2025-12-25T20:15:00Z"
  }
}
```

## 📊 Database Schema - ai_logs

```sql
CREATE TABLE ai_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  event_type VARCHAR(50) NOT NULL,  -- search, view, cart, purchase, review, click
  product_id INTEGER REFERENCES products(id),
  metadata JSONB,  -- Informasi tambahan (query, source, dll)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes untuk performa optimal
CREATE INDEX idx_ai_logs_user ON ai_logs(user_id);
CREATE INDEX idx_ai_logs_product ON ai_logs(product_id);
CREATE INDEX idx_ai_logs_event ON ai_logs(event_type);
CREATE INDEX idx_ai_logs_created ON ai_logs(created_at);
```

## 🧠 Cara Kerja AI Learning System

### 1. Data Collection (Pengumpulan Data)
Setiap interaksi pengguna dicatat:
```typescript
await AILearningSystem.logInteraction({
  userId: 1,
  eventType: 'view',
  productId: 5,
  metadata: { source: 'search' }
})
```

### 2. Pattern Recognition (Pengenalan Pola)
AI menganalisis:
- Produk apa yang sering dilihat bersama
- Kategori apa yang disukai pengguna
- Waktu pembelian rutin

### 3. Prediction & Recommendation (Prediksi & Rekomendasi)
Berdasarkan pola, AI memberikan:
- Rekomendasi produk yang relevan
- Prediksi kebutuhan stok ulang
- Saran produk pelengkap

## 🔧 Implementasi di Frontend

### Contoh: Log View Product
```typescript
// Di halaman detail produk
useEffect(() => {
  if (user && productId) {
    axios.post('/api/ai/log', {
      userId: user.id,
      eventType: 'view',
      productId: productId,
      metadata: { source: 'product-page' }
    })
  }
}, [productId, user])
```

### Contoh: Tampilkan Rekomendasi
```typescript
const [recommendations, setRecommendations] = useState([])

useEffect(() => {
  if (user) {
    axios.get(`/api/ai/recommendations/${user.id}?limit=6`)
      .then(res => setRecommendations(res.data.recommendations))
  }
}, [user])
```

### Contoh: Frequently Bought Together
```typescript
const [relatedProducts, setRelatedProducts] = useState([])

useEffect(() => {
  axios.get(`/api/ai/frequently-bought/${productId}`)
    .then(res => setRelatedProducts(res.data.products))
}, [productId])
```

## 📈 Peningkatan Kecerdasan AI

### Machine Learning Features:
1. **Collaborative Filtering** - Rekomendasi berdasarkan pengguna serupa
2. **Content-Based Filtering** - Rekomendasi berdasarkan karakteristik produk
3. **Hybrid Approach** - Kombinasi kedua metode di atas
4. **Time-Weighted Scoring** - Interaksi terbaru lebih berbobot
5. **Seasonal Pattern Detection** - Deteksi pola musiman pembelian

### Advanced Analytics:
1. **Customer Segmentation** - Pengelompokan pelanggan berdasarkan perilaku
2. **Churn Prediction** - Prediksi pelanggan yang akan berhenti berbelanja
3. **Lifetime Value Prediction** - Prediksi nilai pelanggan jangka panjang
4. **Dynamic Pricing Suggestions** - Saran harga dinamis berdasarkan permintaan

## 🎯 Metrics & KPIs

AI system melacak:
- **Click-Through Rate (CTR)** - Persentase klik pada rekomendasi
- **Conversion Rate** - Persentase rekomendasi yang menghasilkan pembelian
- **Average Order Value (AOV)** - Nilai rata-rata transaksi
- **Customer Retention** - Tingkat pelanggan yang kembali
- **Recommendation Accuracy** - Akurasi prediksi AI

## 🔐 Privacy & Security

- ✅ Data pengguna di-anonymize untuk analisis
- ✅ Compliance dengan GDPR untuk data privacy
- ✅ Enkripsi data sensitif
- ✅ User control untuk opt-out dari tracking

## 🚀 Future Enhancements

1. **Voice Search AI** - Pencarian dengan suara
2. **Image Recognition** - Upload foto produk untuk pencarian
3. **Chatbot Integration** - AI chatbot untuk customer service
4. **Price Prediction** - Prediksi harga optimal
5. **Inventory Forecasting** - Prediksi kebutuhan stok
6. **Fraud Detection** - Deteksi transaksi mencurigakan

## 📝 Testing AI Endpoints

```bash
# Test Trending Products
curl http://localhost:3001/api/ai/trending?limit=5

# Test Recommendations
curl http://localhost:3001/api/ai/recommendations/1?limit=6

# Test Frequently Bought Together
curl http://localhost:3001/api/ai/frequently-bought/5

# Test User Preferences
curl http://localhost:3001/api/ai/preferences/1

# Test Purchase Patterns
curl http://localhost:3001/api/ai/purchase-patterns/1

# Test Replenishment Reminders
curl http://localhost:3001/api/ai/replenishment/1

# Test Search Suggestions
curl "http://localhost:3001/api/ai/search-suggestions/1?q=beras"

# Log Interaction
curl -X POST http://localhost:3001/api/ai/log \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"eventType":"view","productId":5}'
```

## 💡 Best Practices

1. **Log semua interaksi** - Semakin banyak data, semakin akurat AI
2. **Gunakan metadata** - Simpan konteks tambahan untuk analisis mendalam
3. **Monitor performance** - Track CTR dan conversion rate
4. **A/B Testing** - Test berbagai algoritma rekomendasi
5. **Regular model updates** - Update model AI secara berkala

---

**Developed with ❤️ for NeuMart Sembako**
*Powered by PostgreSQL, Node.js, and Advanced AI Algorithms*
