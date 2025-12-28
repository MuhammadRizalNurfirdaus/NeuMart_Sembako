# NeuMart Sembako - Full-Stack E-Commerce dengan AI 🛒🤖

![NeuMart Logo](https://img.shields.io/badge/NeuMart-Sembako-blue?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-Next.js%2014-black?style=for-the-badge&logo=next.js)
![Backend](https://img.shields.io/badge/Backend-Express.js-green?style=for-the-badge&logo=express)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue?style=for-the-badge&logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=for-the-badge&logo=typescript)
![AI](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge)

**Toko Sembako Pintar dengan 8 Fitur AI & Admin Dashboard** 🤖📊

> E-commerce platform lengkap dengan AI recommendation, recipe generator, chatbot, review system, payment gateway, maps integration, dan admin CRUD dashboard - All powered by Next.js 14, Express.js, PostgreSQL & OpenAI

---

## 🎉 UPDATE TERBARU - Desember 2025

### ✨ Perbaikan & Fitur Baru yang Sudah Ditambahkan:

#### � **Customer Account Management (BARU!)**
- ✅ **Complete Profile System** - Dashboard profil customer yang lengkap
- ✅ **Address Management** - Kelola alamat pengiriman dengan CRUD lengkap
  - Tambah, edit, hapus alamat
  - Set alamat default
  - Dropdown Provinsi & Kota Indonesia (34 provinsi, 500+ kota)
  - Auto-reset city saat ganti provinsi
  - Form validation lengkap
- ✅ **Payment Methods** - Kelola metode pembayaran
  - Support: Bank Transfer, E-Wallet, Credit Card, COD
  - Provider dropdown dinamis (BCA, Mandiri, GoPay, OVO, dll)
  - Set metode pembayaran default
  - Field otomatis disable untuk COD
- ✅ **Cloud Database Integration** - Data tersimpan permanent di PostgreSQL Cloud
  - Migration ke Aiven PostgreSQL
  - Triggers untuk auto-manage default address/payment
  - Soft delete untuk data integrity
  - Indexes untuk performa optimal
- ✅ **Order History** - Riwayat pesanan (UI ready, integrasi coming soon)
- ✅ **Wishlist** - Simpan produk favorit (UI ready, integrasi coming soon)
- ✅ **Reviews Management** - Kelola ulasan produk (UI ready, integrasi coming soon)
- ✅ **Preferences** - Pengaturan notifikasi dan bahasa (UI ready, integrasi coming soon)
- ✅ **Loading States** - UX yang baik dengan loading indicators
- ✅ **Error Handling** - Alert messages untuk user feedback
- 📖 Dokumentasi: `CUSTOMER_ACCOUNT_FEATURES.md`

#### �🗺️ **Maps Integration (100% GRATIS!)**
- ✅ **OpenStreetMap dengan Leaflet** - Ganti Google Maps dengan solusi gratis selamanya
- ✅ **Interactive Maps** - Peta interaktif dengan pin yang bisa di-drag
- ✅ **Location Search** - Cari alamat atau tempat dengan Nominatim
- ✅ **GPS Auto-Detect** - Deteksi lokasi pengguna otomatis
- ✅ **Reverse Geocoding** - Koordinat otomatis jadi alamat lengkap
- ✅ **No API Key Required** - Langsung jalan tanpa konfigurasi ribet
- ✅ **No Credit Card** - Tidak perlu bayar atau kartu kredit
- 📖 Dokumentasi: `MAPS_GUIDE.md`

#### 🍳 **AI Recipe Generator - Super Detail!**
- ✅ **Auto-Detect Ingredients** - Deteksi bahan dari keranjang DAN pesanan yang sudah diterima
- ✅ **Extremely Detailed Recipes** - Resep dengan 9-18 langkah detail (bukan 4 langkah singkat)
- ✅ **Precise Measurements** - Takaran pasti (200g, 250ml, 2 butir, dll)
- ✅ **Step-by-Step Instructions** - Instruksi lengkap dengan timing (30 detik, 2-3 menit)
- ✅ **Professional Tips** - 6-11 tips per resep dengan penjelasan ilmiah
- ✅ **Beginner-Friendly** - Cocok untuk yang belum pernah masak
- ✅ **Clickable Recipe Cards** - Klik card untuk lihat detail lengkap di modal
- ✅ **Rich Descriptions** - Setiap resep punya deskripsi menarik dan lengkap
- ✅ **Photo Display** - Foto bahan-bahan ditampilkan dengan proper URL handling

#### 🔐 **Unified Login System**
- ✅ **Single Login Page** - Admin dan customer login di satu halaman
- ✅ **Auto Role Detection** - Email `admin123@gmail.com` otomatis jadi admin, sisanya customer
- ✅ **No More Blank Login** - Fix admin login page yang tadinya blank
- ✅ **Seamless Experience** - User tidak perlu pilih role, sistem auto-detect

#### 📊 **Admin Dashboard Improvements**
- ✅ **Chart.js Fixed** - Perbaiki error "linear is not a registered scale"
- ✅ **Proper Component Registration** - Chart.js components registered dengan benar
- ✅ **Dynamic Imports** - Fix SSR issues dengan dynamic Chart.js loading
- ✅ **Beautiful Analytics** - Grafik penjualan, revenue, dan order trends

#### 🛒 **Enhanced Checkout**
- ✅ **Product Photos** - Ringkasan pesanan dengan foto produk yang benar
- ✅ **Proper Image URLs** - getImageUrl helper untuk local/external images
- ✅ **Maps Integration** - Pilih lokasi pengiriman di peta
- ✅ **GPS Coordinates** - Simpan latitude & longitude untuk akurasi tinggi
- ✅ **Better Layout** - Card layout lebih rapi dengan badge kuantitas

#### 🎨 **UI/UX Improvements**
- ✅ **Uniform Product Cards** - Semua card produk tinggi sejajar dengan flexbox
- ✅ **Object-Contain Images** - Foto produk tidak terpotong, tampil penuh
- ✅ **Better Icons** - Ganti FiChefHat dengan GiChefToque yang tersedia
- ✅ **Responsive Design** - Layout responsive di semua ukuran layar
- ✅ **Loading States** - Indicator loading untuk better UX

#### 🐛 **Bug Fixes**
- ✅ Fix Chart.js registration error di admin reports
- ✅ Fix blank admin login page
- ✅ Fix recipe icon not found error
- ✅ Fix product image display issues
- ✅ Fix card height inconsistencies
- ✅ Fix TypeScript interface errors

---

## 📁 Struktur Project

```
NeuMart Sembako/
│
├── 📂 frontend/              # Frontend Next.js
│   ├── app/                 # Pages (App Router)
│   │   ├── admin/          # Admin dashboard pages
│   │   ├── ai-recipe/      # AI Recipe Generator
│   │   ├── cart/           # Shopping cart
│   │   ├── chatbot/        # AI Chatbot
│   │   ├── checkout/       # Checkout page
│   │   ├── login/          # Login page
│   │   ├── products/       # Products catalog
│   │   └── register/       # Registration page
│   ├── components/          # React components
│   ├── lib/                 # Utilities & AI logic
│   │   ├── api.ts          # API client
│   │   ├── chatbotAI.ts    # Chatbot AI
│   │   ├── recipeAI.ts     # Recipe AI
│   │   └── firebase.ts     # Firebase config
│   ├── store/               # State management (Zustand)
│   │   ├── authStore.ts    # Auth state
│   │   └── cartStore.ts    # Cart state
│   ├── data/                # Product database
│   ├── public/              # Static assets & images
│   ├── package.json         # Frontend dependencies
│   └── tsconfig.json        # Frontend TS config
│
├── 📂 backend/               # Backend Express.js
│   ├── server/              # API server
│   │   ├── index.ts        # Main server
│   │   └── routes/         # API endpoints
│   │       ├── admin.ts       # Admin routes
│   │       ├── admin-crud.ts  # Admin CRUD operations
│   │       ├── ai.ts          # AI features
│   │       ├── auth.ts        # Authentication
│   │       ├── orders.ts      # Order management
│   │       ├── products.ts    # Product CRUD
│   │       └── reviews.ts     # Review system
│   ├── lib/                 # Backend logic
│   │   ├── db.ts           # PostgreSQL connection
│   │   ├── initDb.ts       # Database initialization
│   │   ├── upload.ts       # File upload handler
│   │   ├── chatbotAI.ts    # Chatbot logic
│   │   └── recipeAI.ts     # Recipe logic
│   ├── uploads/             # Uploaded images
│   ├── .env                 # Environment variables
│   ├── package.json         # Backend dependencies
│   └── tsconfig.json        # Backend TS config
│
├── 📄 ADMIN_CRUD_API.md      # Admin API documentation
├── 📄 DATABASE_SCHEMA.md     # Database schema
├── 📄 GOOGLE_AUTH_SETUP.md   # OAuth setup guide
├── 📄 ADMIN_PANEL_GUIDE.md   # Admin guide
└── package.json             # Root workspace config
```

---

## 🚀 Quick Start

### 🔑 Default Login Credentials

**Admin Account:**
```
Email: admin@neumart.com
Password: admin123
```

**Customer Account:**
```
Email: customer@example.com
Password: customer123
```

### 1️⃣ Install Dependencies
```bash
# Install semua dependencies (root, frontend, backend)
npm run install:all
```

### 2️⃣ Jalankan Development

**Opsi A: Jalankan Semua (Recommended)**
```bash
npm run dev:all
```

**Opsi B: Jalankan Terpisah**
```bash
# Terminal 1 - Frontend
npm run dev:frontend

# Terminal 2 - Backend
npm run dev:backend
```

### 3️⃣ Akses Aplikasi
- 🌐 **Frontend:** http://localhost:3000 (atau 3001 jika 3000 terpakai)
- 🔌 **Backend API:** http://localhost:3003/api
- 📊 **Admin Dashboard:** http://localhost:3000/admin

---

## 🛠️ Commands Lengkap

### Root Level
```bash
npm run dev:all          # Jalankan frontend + backend
npm run dev:frontend     # Frontend saja
npm run dev:backend      # Backend saja
npm run install:all      # Install semua dependencies
npm run build:all        # Build semua
```

### Frontend (cd frontend/)
```bash
npm run dev              # Development server
npm run build            # Production build
npm start                # Start production
npm run lint             # Lint check
```

### Backend (cd backend/)
```bash
npm run dev              # Development server
npm run build            # Compile TypeScript
npm start                # Start production
```

---

## 🎯 Fitur Utama

### ✨ 8 Fitur AI Terintegrasi
1. **Smart Recommendation** - Rekomendasi produk berdasarkan keranjang
2. **Recipe Generator** - AI yang kasih ide resep dari stok belanja
3. **Chatbot Assistant** - Tanya stok & harga via chat
4. **Learning System** - AI belajar dari interaksi pengguna
5. **Sentiment Analysis** - Analisis kepuasan dari review
6. **Auto Category Tagging** - Otomatis kategorisasi produk
7. **Stock Prediction** - Prediksi stok berdasarkan pattern
8. **Personalized Offers** - Penawaran khusus berbasis preferensi

### 🛍️ Sistem E-Commerce Lengkap
- 📦 **Product Management** - CRUD produk dengan upload gambar
- 🛒 **Shopping Cart** - Keranjang belanja dengan real-time update
- 💳 **Checkout System** - Order dengan multiple payment methods
- ⭐ **Review System** - Rating & review produk dengan foto
- 📊 **Admin Dashboard** - Manajemen pesanan, produk, dan pelanggan

### 📱 Pages
- `/` - Homepage dengan hero & fitur AI
- `/products` - Katalog produk lengkap dengan filter
- `/cart` - Keranjang + Smart Recommendation
- `/checkout` - Halaman checkout & pembayaran
- `/profile` - **[NEW!]** Profil & Account Management
- `/ai-recipe` - Recipe Generator AI
- `/chatbot` - AI Chatbot Assistant
- `/admin` - Admin Dashboard
- `/admin/products` - Manajemen Produk
- `/admin/orders` - Manajemen Pesanan
- `/admin/customers` - Manajemen Pelanggan
- `/admin/reports` - Laporan & Analytics

---

## 🔌 Backend API Endpoints

### Products
```
GET  /api/products              # Get all products
GET  /api/products/:id          # Get product by ID
GET  /api/products/category/:cat # Get by category
POST /api/products              # Create product (with image upload)
PUT  /api/products/:id          # Update product
DELETE /api/products/:id        # Delete product
```

### Orders
```
GET  /api/orders                # Get all orders
GET  /api/orders/:id            # Get order by ID
POST /api/orders                # Create new order
PUT  /api/orders/:id/status     # Update order status
DELETE /api/orders/:id          # Delete order
```

### Reviews
```
GET  /api/reviews/product/:id   # Get reviews by product
POST /api/reviews               # Create review (with photo upload)
PUT  /api/reviews/:id           # Update review
DELETE /api/reviews/:id         # Delete review
```

### Admin CRUD
```
# Users Management
GET  /api/admin/users           # Get all users
GET  /api/admin/users/:id       # Get user by ID
POST /api/admin/users           # Create user
PUT  /api/admin/users/:id       # Update user
DELETE /api/admin/users/:id     # Delete user

# Categories Management
GET  /api/admin/categories      # Get all categories (with product count)
GET  /api/admin/categories/:id  # Get category by ID
POST /api/admin/categories      # Create category
PUT  /api/admin/categories/:id  # Update category
DELETE /api/admin/categories/:id # Delete category

# Products Admin View
GET  /api/admin/products        # Get products with sales analytics

# Orders Management
GET  /api/admin/orders          # Get all orders (with filters)
GET  /api/admin/orders/:id      # Get order details
PUT  /api/admin/orders/:id/status # Update order status
DELETE /api/admin/orders/:id    # Delete order

# Dashboard Statistics
GET  /api/admin/dashboard/stats # Get dashboard statistics
```

### Customer Account Management (NEW!)
```
# Addresses
GET  /api/customer/addresses/:userId        # Get all addresses
POST /api/customer/addresses                # Create new address
PUT  /api/customer/addresses/:id            # Update address
DELETE /api/customer/addresses/:id          # Delete address (soft delete)
PUT  /api/customer/addresses/:id/set-default # Set default address

# Payment Methods
GET  /api/customer/payment-methods/:userId  # Get payment methods
POST /api/customer/payment-methods          # Create payment method
DELETE /api/customer/payment-methods/:id    # Delete payment method

# Wishlist (Coming Soon)
GET  /api/customer/wishlist/:userId         # Get wishlist
POST /api/customer/wishlist                 # Add to wishlist
DELETE /api/customer/wishlist/:userId/:productId # Remove from wishlist

# Preferences (Coming Soon)
GET  /api/customer/preferences/:userId      # Get preferences
PUT  /api/customer/preferences/:userId      # Update preferences
```

### AI Features
```
POST /api/ai/recipe             # Generate recipes from ingredients
POST /api/ai/chat               # Chatbot responses
POST /api/ai/recommendations    # Smart product recommendations
GET  /api/ai/logs               # Get AI interaction logs
POST /api/ai/learn              # Submit learning data
```

### Authentication
```
POST /api/auth/register         # Register new user
POST /api/auth/login            # Login user
POST /api/auth/google           # Google OAuth login
GET  /api/auth/me               # Get current user
```

### Health Check
```
GET  /api/health                # Check API status
GET  /api/db-test               # Test database connection
```

---

## 💻 Tech Stack

### Frontend
- ⚡ **Next.js 14** (App Router, React Server Components)
- 🎨 **Tailwind CSS** (Styling)
- 📦 **Zustand** (State management)
- 🔗 **Axios** (HTTP client)
- 🎭 **React Icons** (Lucide, Feather, Game Icons)
- 🗺️ **Leaflet** (OpenStreetMap integration - 100% FREE!)
- 📊 **Chart.js** (Analytics & Reports)
- 🔥 **Firebase** (Authentication & Storage)
- 📘 **TypeScript** (Type safety)

### Backend
- 🟢 **Express.js** (REST API)
- 🐘 **PostgreSQL** (Database - Aiven Cloud)
- 🔐 **bcrypt** (Password hashing)
- 📦 **Multer** (File uploads)
- 🔗 **CORS** (Cross-Origin)
- 🌍 **dotenv** (Environment vars)
- 📘 **TypeScript** (Type safety)
- 🔄 **ts-node-dev** (Hot reload)

### Database Schema
- **users** - User accounts (admin/customer)
- **categories** - Product categories
- **products** - Product catalog with images
- **orders** - Order management
- **order_items** - Order line items
- **reviews** - Product reviews with photos
- **ai_logs** - AI interaction tracking
- **related_products** - Product relationships
- **customer_addresses** - **[NEW!]** Customer shipping addresses
- **payment_methods** - **[NEW!]** Customer payment methods
- **wishlist** - **[NEW!]** Customer favorite products
- **customer_preferences** - **[NEW!]** Customer settings & preferences
- **shipping_rates** - **[NEW!]** Shipping calculation data
- **promotions** - **[NEW!]** Promo codes & offers
- **promo_usage** - **[NEW!]** Promo usage tracking

---

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=3003
NODE_ENV=development

# Database Configuration (Cloud PostgreSQL)
DATABASE_URL=postgresql://username:password@host:port/database
# ⚠️ IMPORTANT: Never commit your actual credentials to Git!
# ⚠️ Use environment-specific .env files and add to .gitignore

# OpenAI API (Optional - for enhanced AI features)
OPENAI_API_KEY=your_openai_api_key
# Get your key at: https://platform.openai.com/api-keys
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3003/api

# Firebase Configuration (Optional - for authentication)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# ⚠️ IMPORTANT: Keep Firebase config secure!
# ⚠️ Add .env.local to .gitignore
```

### 🔒 Security Best Practices
- ✅ Always use `.env` files for sensitive data
- ✅ Add `.env`, `.env.local` to `.gitignore`
- ✅ **Never commit API keys or database passwords to Git**
- ✅ Use environment variables in production deployments
- ✅ Rotate credentials regularly
- ✅ Use different credentials for dev/staging/production environments
- ✅ Review commit history before pushing to public repos

---

## �📞 Contact & Social Media

### Developer: Muhammad Rizal Nurfirdaus

- 📧 **Email:** [muhammadrizalnurfirdaus@gmail.com](mailto:muhammadrizalnurfirdaus@gmail.com)
- 📱 **WhatsApp:** [+62 831-0146-1069](https://wa.me/6283101461069)
- 📷 **Instagram:** [@crawasy_zall](https://www.instagram.com/crawasy_zall?igsh=MXZjMnRuYnJhczNxbg==)
- 👤 **Facebook:** [Rizal Nurfirdaus](https://www.facebook.com/rizal.nurfirdaus.7?mibextid=rS40aB7S9Ucbxw6v)
- 🐦 **Twitter:** [@NurfirdausRizal](https://twitter.com/NurfirdausRizal)

---

## �️ Database

**PostgreSQL Database** hosted on **Aiven Cloud**

### Tables:
- `users` - User accounts (admin/customer) with bcrypt password
- `categories` - Product categories
- `products` - Product catalog with images
- `orders` - Order management with status tracking
- `order_items` - Order line items (many-to-many)
- `reviews` - Product reviews with photos & ratings
- `ai_logs` - AI interaction tracking for learning
- `related_products` - Product relationship mapping

### Features:
- ✅ Auto-initialization on server start
- ✅ SSL connection to Aiven Cloud
- ✅ Seed data for testing
- ✅ Full CRUD operations
- ✅ Cascade delete on relationships
- ✅ Indexes for performance

---

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on hosting platform
2. Run `npm run build` to compile TypeScript
3. Run `npm start` to start production server
4. Ensure PostgreSQL database is accessible

### Frontend Deployment
1. Set `NEXT_PUBLIC_API_URL` to production backend URL
2. Run `npm run build` for production build
3. Deploy to Vercel/Netlify or run `npm start`

---

## �📚 Dokumentasi Lengkap

Lihat dokumentasi detail di root project:
- `README.md` - Main documentation (file ini)
- `CUSTOMER_ACCOUNT_FEATURES.md` - **[BARU!]** Customer account & profile system
- `MAPS_GUIDE.md` - **[BARU!]** Panduan Maps Integration (OpenStreetMap)
- `ADMIN_CRUD_API.md` - Admin CRUD API documentation
- `DATABASE_SCHEMA.md` - Database schema & migrations
- `GOOGLE_AUTH_SETUP.md` - Google OAuth setup guide
- `ADMIN_PANEL_GUIDE.md` - Admin panel user guide

Dokumentasi frontend:
- `frontend/README.md` - Frontend documentation
- `frontend/QUICK_START_ID.md` - Quick start guide
- `frontend/DOCS_AI_FEATURES.md` - AI features deep dive
- `frontend/DEMO_GUIDE.md` - Demo & testing
- `frontend/ROADMAP.md` - Future plans

---

## 🎉 Features Highlights

✅ **8 AI Features** - Smart recommendations, recipe generator, chatbot, sentiment analysis, auto-categorization, stock prediction, personalized offers, learning system  
✅ **Complete E-Commerce** - Products, cart, checkout, orders, reviews with photos  
✅ **Customer Account System** - **[NEW!]** Profile management, addresses, payment methods  
✅ **Admin Dashboard** - Full CRUD for users, categories, products, orders  
✅ **PostgreSQL Cloud** - Cloud-hosted database with SSL encryption  
✅ **Image Upload** - Multer integration for products & reviews  
✅ **Authentication** - bcrypt password hashing + Firebase OAuth  
✅ **Real-time Stats** - Dashboard analytics with revenue, orders, customers  
✅ **Review System** - Rating, comments, photos, sentiment analysis  
✅ **TypeScript** - 100% type-safe codebase  
✅ **Maps Integration** - OpenStreetMap with Leaflet (100% FREE!)  
✅ **Detailed AI Recipes** - 9-18 step recipes with precise measurements  
✅ **Unified Login** - Single login page with auto role detection  
✅ **Indonesia Locations** - Complete province & city dropdown (34 provinces, 500+ cities)  

---

## 🆕 What's New in Latest Update

### � Customer Account Management (December 2025)
- **Complete Profile System** - Dashboard profil lengkap dengan 7 sections
- **Address Management** - CRUD alamat dengan dropdown provinsi/kota Indonesia
- **Payment Methods** - Kelola metode pembayaran (Bank, E-Wallet, Credit Card, COD)
- **Cloud Database** - Migrasi ke PostgreSQL cloud untuk data persistence
- **Auto-Save** - Data tersimpan otomatis ke database
- **Loading States** - UX yang smooth dengan loading indicators

### �🗺️ Maps & Location Features
- **FREE Forever** - No API keys, no credit cards, no sign up
- **Interactive Maps** - Click, drag, search locations
- **GPS Support** - Auto-detect current location
- **Reverse Geocoding** - Coordinates → Full address

### 🍳 AI Recipe Enhancements
- **Super Detailed** - From 4 steps to 9-18 steps per recipe
- **Precise Measurements** - 200g, 250ml, 2 butir (not just "telur")
- **Professional Tips** - 6-11 tips with scientific explanations
- **Auto-Detect** - Ingredients from cart AND delivered orders
- **Rich UI** - Clickable cards, modal details, photos

### 🎨 UI/UX Improvements
- **Better Cards** - Uniform height, aligned buttons
- **Better Images** - Object-contain, no cropping
- **Better Icons** - All icons working properly
- **Better Layout** - Responsive, flexbox, modern design

### 🐛 Critical Fixes
- Chart.js registration errors → Fixed
- Admin login blank page → Fixed
- Product images not showing → Fixed
- Recipe instructions too short → Fixed (now 9-18 steps!)
- Card heights inconsistent → Fixed (all aligned now)  

---

## 🎉 Happy Coding!

Dibuat dengan ❤️ menggunakan Next.js 14, Express.js, PostgreSQL, TypeScript, Leaflet, dan OpenAI

**NeuMart Sembako - Toko Sembako Pintar dengan AI** 🛒🤖

---

### 📊 Project Stats
- **Lines of Code:** 15,000+
- **Components:** 25+
- **API Endpoints:** 50+
- **Database Tables:** 15 (8 core + 7 customer features)
- **AI Features:** 8
- **Admin CRUD Operations:** 20+
- **Maps Integration:** OpenStreetMap (FREE!)
- **Recipe Database:** 6+ detailed recipes (9-18 steps each)
- **Indonesia Locations:** 34 provinces, 500+ cities

**Version:** 3.0.0 | **Last Updated:** December 28, 2025

---

## 🎯 Known Issues & Future Improvements

### In Progress
- [ ] Payment gateway integration (Midtrans/Xendit)
- [ ] Email notifications for orders
- [ ] Advanced filtering & sorting
- [ ] Wishlist functionality (UI ready)
- [ ] Product comparison
- [ ] Order history with real data (UI ready)
- [ ] Review management (UI ready)

### Completed ✅
- [x] Customer account management system
- [x] Address management with Indonesia locations
- [x] Payment methods management
- [x] Cloud database migration (PostgreSQL)
- [x] Maps integration (OpenStreetMap with Leaflet)
- [x] Detailed AI recipes (9-18 steps with precise measurements)
- [x] Unified login system (auto role detection)
- [x] Chart.js registration fixes
- [x] Product card UI improvements
- [x] Image display fixes (getImageUrl helper)
- [x] Auto-detect ingredients from cart + delivered orders

---

## 💡 Tips for Developers

### For Frontend Development
```bash
cd frontend
npm run dev
```
Access at: http://localhost:3000

### For Backend Development
```bash
cd backend
npm run dev
```
Access at: http://localhost:3003

### For Testing Customer Profile
1. Login as customer (any email except admin123@gmail.com)
2. Click "Profil Saya" in navigation menu
3. Try adding addresses with province/city dropdown
4. Try adding payment methods (COD, Bank Transfer, E-Wallet, Credit Card)
5. Data will be saved to cloud database automatically!
6. Refresh page - data persists!

### For Testing Maps Feature
1. Go to checkout page (http://localhost:3000/checkout)
2. Click "Pilih di Maps" button
3. No API key needed - OpenStreetMap works out of the box!
4. Try: Click on map, search location, or use "Gunakan Lokasi Saya"

### For Testing AI Recipes
1. Add products to cart (beras, telur, gula, dll)
2. Go to `/ai-recipe`
3. See detailed recipes with 9-18 step instructions
4. Click recipe card to see full modal with tips

### Admin Login
```
Email: admin123@gmail.com
Password: admin123
```

### Customer Test Account
```
Any email except admin123@gmail.com
Password: your_password
```

---

## 🙏 Credits & Acknowledgments

### Technologies Used
- **Next.js** - The React Framework for the Web
- **OpenStreetMap** - Free, editable map of the world
- **Leaflet** - Leading open-source JavaScript library for mobile-friendly maps
- **Nominatim** - Free geocoding service from OpenStreetMap
- **PostgreSQL** - The World's Most Advanced Open Source Database
- **Express.js** - Fast, unopinionated, minimalist web framework
- **Chart.js** - Simple yet flexible JavaScript charting
- **Tailwind CSS** - Utility-first CSS framework

### Special Thanks
- OpenStreetMap contributors worldwide 🌍
- Leaflet.js community
- Next.js team at Vercel
- PostgreSQL developers
- All open-source maintainers and contributors

### Why We Love Open Source
This project heavily relies on FREE and OPEN SOURCE technologies:
- 🗺️ **OpenStreetMap** instead of Google Maps (save $$$)
- 📦 **PostgreSQL** instead of proprietary databases
- ⚡ **Next.js** open source framework
- 🎨 **Tailwind CSS** free styling
- 📊 **Chart.js** free charts

**No vendor lock-in. No hidden costs. Full transparency.** ✨

---

## 📞 Support & Contact

Butuh bantuan? Punya pertanyaan? Hubungi kami:

### Developer: Muhammad Rizal Nurfirdaus
- 📧 Email: muhammadrizalnurfirdaus@gmail.com
- 📱 WhatsApp: +62 831-0146-1069
- 📷 Instagram: @crawasy_zall
- 👤 Facebook: Rizal Nurfirdaus
- 🐦 Twitter: @NurfirdausRizal

### Dokumentasi & Resources
- 📖 Baca `MAPS_GUIDE.md` untuk panduan Maps
- 📖 Baca `ADMIN_CRUD_API.md` untuk dokumentasi API
- 📖 Baca `DATABASE_SCHEMA.md` untuk struktur database
- 🐛 Report bugs via GitHub Issues
- 💡 Feature requests welcome!

---

**⭐ Star this project if you find it helpful!**

Made with ❤️ in Indonesia 🇮🇩
