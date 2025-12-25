# 🌟 Sistem Review & Kepuasan Pelanggan - NeuMart Sembako

## 📋 Daftar Fitur

### 1. **Review Produk** ⭐
- Customer dapat memberikan rating 1-5 bintang untuk produk yang sudah dibeli
- Rating terpisah untuk:
  - **Kualitas Produk**: Rating khusus untuk kualitas barang
  - **Pelayanan**: Rating untuk pelayanan toko
  - **Pengantaran**: Rating untuk kecepatan dan kualitas pengiriman
- Komentar/ulasan tertulis (opsional)
- Tampilan rating di halaman produk

### 2. **Halaman Pesanan Customer** 📦
- Akses melalui menu user → "Pesanan Saya"
- Melihat semua pesanan yang pernah dibuat
- Status pesanan (Pending, Processing, Delivered, dll)
- Tombol "Beri Review" muncul setelah pesanan selesai
- Indikator produk yang sudah direview

### 3. **Admin Panel - Review Management** 🛠️
- Dashboard statistik lengkap:
  - Total review
  - Rating keseluruhan
  - Rating kualitas produk
  - Rating pelayanan
  - Rating pengantaran
- Filter review berdasarkan status (All, Pending, Approved, Rejected)
- Moderasi review (approve/reject)
- Hapus review yang tidak sesuai
- Tabel detail semua review dengan informasi lengkap

### 4. **Display Review di Produk** 📊
- Tampilan rating rata-rata dengan bintang
- Jumlah total review
- Distribusi rating (5 bintang, 4 bintang, dst)
- List review dengan detail lengkap
- Progress bar untuk setiap rating

## 🗂️ Struktur File

### Backend
```
backend/server/routes/
├── reviews.ts          # API routes untuk review system
└── orders.ts           # Updated dengan review tracking
```

### Frontend
```
frontend/
├── app/
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx       # Detail produk dengan review
│   ├── my-orders/
│   │   └── page.tsx           # Halaman pesanan customer
│   └── admin/
│       └── reviews/
│           └── page.tsx       # Admin review management
│
├── components/
│   ├── ReviewForm.tsx         # Form submit review
│   ├── ReviewList.tsx         # Display list review
│   ├── ProductCard.tsx        # Updated dengan rating
│   └── Navbar.tsx             # Updated dengan link pesanan
│
└── data/
    └── products.ts            # Updated interface dengan rating
```

## 🔌 API Endpoints

### Review APIs

#### 1. Create Review
```
POST /api/reviews/create
Body: {
  orderId: string
  productId: number
  productName: string
  userId: string
  userName: string
  rating: number (1-5)
  productQuality: number (1-5)
  serviceRating: number (1-5)
  deliveryRating: number (1-5)
  comment: string
}
```

#### 2. Get Reviews by Product
```
GET /api/reviews/product/:productId
Response: {
  success: true,
  reviews: Review[],
  statistics: {
    totalReviews: number,
    averageRating: number,
    ratingDistribution: {
      5: number,
      4: number,
      3: number,
      2: number,
      1: number
    }
  }
}
```

#### 3. Get Reviews by User
```
GET /api/reviews/user/:userId
Response: {
  success: true,
  reviews: Review[]
}
```

#### 4. Get All Reviews (Admin)
```
GET /api/reviews/all
Response: {
  success: true,
  reviews: Review[],
  statistics: {
    totalReviews: number,
    overallRating: number,
    productQuality: number,
    serviceRating: number,
    deliveryRating: number,
    pendingReviews: number
  }
}
```

#### 5. Update Review Status
```
PUT /api/reviews/:reviewId/status
Body: {
  status: 'pending' | 'approved' | 'rejected'
}
```

#### 6. Delete Review
```
DELETE /api/reviews/:reviewId
```

### Order APIs (Updated)

#### 1. Update Order Status
```
PUT /api/orders/:orderId/status
Body: {
  orderStatus: string,
  paymentStatus: string
}
Note: Ketika orderStatus = 'Delivered', otomatis set canReview = true
```

#### 2. Mark Item as Reviewed
```
POST /api/orders/:orderId/item/:productId/review
```

## 📱 User Flow

### Customer Flow - Submit Review

1. **Login** ke akun
2. Klik **User Menu** (pojok kanan atas)
3. Pilih **"Pesanan Saya"**
4. Lihat pesanan dengan status **"Delivered"** atau **"Selesai"**
5. Klik tombol **"Beri Review"** pada produk yang ingin direview
6. Isi form review:
   - Rating Keseluruhan (wajib) ⭐
   - Kualitas Produk (opsional)
   - Pelayanan (opsional)
   - Pengantaran (opsional)
   - Ulasan tertulis (opsional)
7. Klik **"Kirim Review"**
8. Review berhasil terkirim dan produk ditandai sebagai "Sudah direview" ✅

### Customer Flow - View Reviews

1. Buka halaman **"Produk"**
2. Klik pada **card produk** untuk melihat detail
3. Scroll ke bawah atau klik tab **"Review"**
4. Lihat:
   - Rating rata-rata produk
   - Distribusi rating (berapa orang kasih 5 bintang, 4 bintang, dst)
   - Detail review dari customer lain

### Admin Flow - Manage Reviews

1. Login sebagai **Admin**
2. Masuk ke **Admin Panel**
3. Klik menu **"Review"** di sidebar
4. Lihat **dashboard statistik**:
   - Total review
   - Rating keseluruhan
   - Rating per kategori (Produk, Layanan, Pengantaran)
5. **Filter review** berdasarkan status
6. **Moderasi review** (approve/reject) jika diperlukan
7. **Hapus review** yang tidak sesuai

## 💡 Fitur Unggulan

### 1. Multi-Aspect Rating
Tidak hanya rating produk, tapi juga rating untuk:
- ⭐ Kualitas Produk
- 👍 Pelayanan Toko
- 🚚 Kecepatan Pengantaran

### 2. Smart Review Trigger
- Review button hanya muncul setelah pesanan **delivered**
- Mencegah review palsu dari pesanan yang belum selesai
- Tracking otomatis untuk produk yang sudah direview

### 3. Comprehensive Analytics
Admin mendapat insight lengkap:
- Overall satisfaction score
- Breakdown rating per aspek
- Trend kepuasan pelanggan

### 4. User-Friendly Interface
- Star rating interaktif dengan hover effect
- Color-coded status (green=approved, yellow=pending, red=rejected)
- Responsive design untuk mobile dan desktop

## 🎯 Best Practices

### Untuk Customer:
1. **Jujur dalam memberikan review** - bantu customer lain dengan review yang akurat
2. **Berikan detail** - ulasan tertulis sangat membantu customer lain
3. **Review setiap produk** - dapatkan insight lengkap dari pembelian Anda

### Untuk Admin:
1. **Monitor review secara rutin** - respon cepat terhadap feedback
2. **Moderate dengan bijak** - hanya reject review yang benar-benar tidak sesuai
3. **Analisis trend rating** - gunakan data untuk improve layanan
4. **Follow up review negatif** - hubungi customer jika ada komplain

## 🚀 Quick Start

### Jalankan Backend
```bash
cd backend
npm install
npm run dev
```

### Jalankan Frontend
```bash
cd frontend
npm install
npm run dev
```

### Test Review System

1. **Create Test Order** (sebagai customer)
2. **Update Order Status** ke "Delivered" (sebagai admin)
3. **Buka "Pesanan Saya"** (sebagai customer)
4. **Submit Review** untuk produk
5. **Check Admin Panel** untuk melihat review masuk
6. **View Product Page** untuk melihat review ditampilkan

## 📊 Database Schema

### Review Interface
```typescript
interface Review {
  id: string                    // REV-{timestamp}
  orderId: string              // Order yang direview
  productId: number            // ID produk
  productName: string          // Nama produk
  userId: string               // ID customer
  userName: string             // Nama customer
  rating: number               // Overall rating (1-5)
  productQuality: number       // Rating kualitas (1-5)
  serviceRating: number        // Rating pelayanan (1-5)
  deliveryRating: number       // Rating pengantaran (1-5)
  comment: string              // Ulasan tertulis
  images?: string[]            // Foto (future feature)
  createdAt: string            // Timestamp
  status: 'pending' | 'approved' | 'rejected'
}
```

### Order Interface (Updated)
```typescript
interface Order {
  // ... existing fields
  items: Array<{
    // ... existing fields
    reviewed?: boolean         // Track review status
  }>
  deliveredAt?: string         // Delivery timestamp
  canReview?: boolean          // Review eligibility
}
```

### Product Interface (Updated)
```typescript
interface Product {
  // ... existing fields
  averageRating?: number       // Calculated average
  reviewCount?: number         // Total reviews
}
```

## 🎨 UI Components

### ReviewForm
- Interactive star rating dengan hover effect
- Separate ratings untuk produk, layanan, dan pengantaran
- Textarea untuk komentar detail
- Validation untuk required fields

### ReviewList
- Summary statistics di atas
- Rating distribution dengan progress bars
- Individual review cards dengan:
  - User info dan tanggal
  - Multi-aspect ratings
  - Comment text

### Admin Reviews Page
- Statistics cards (5 metrics)
- Filter tabs (All, Pending, Approved, Rejected)
- Sortable data table
- Inline actions (Approve, Reject, Delete)

## 🔒 Security Notes

- Review hanya bisa dibuat untuk pesanan yang sudah delivered
- User hanya bisa review produk yang benar-benar dibeli
- Admin bisa moderate review yang tidak sesuai
- Validation di backend untuk rating range (1-5)

## 📈 Future Enhancements

1. **Image Upload** - customer bisa upload foto produk
2. **Review Reply** - admin/seller bisa reply review
3. **Helpful Vote** - customer lain bisa vote review yang helpful
4. **Verified Purchase Badge** - badge untuk review dari verified purchase
5. **Review Incentive** - poin/diskon untuk customer yang review
6. **Email Notification** - reminder untuk review setelah delivery
7. **Review Analytics Dashboard** - grafik trend rating per waktu

## 📞 Support

Jika ada pertanyaan atau issue:
1. Check dokumentasi ini terlebih dahulu
2. Test di development environment
3. Check browser console untuk error messages
4. Verify backend API response

---

**Dibuat dengan ❤️ untuk meningkatkan kepuasan pelanggan NeuMart Sembako**
