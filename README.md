# NeuMart Sembako - Full-Stack E-Commerce dengan AI 🛒🤖

![NeuMart Logo](https://img.shields.io/badge/NeuMart-Sembako-blue?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-Next.js%2014-black?style=for-the-badge&logo=next.js)
![Backend](https://img.shields.io/badge/Backend-Express.js-green?style=for-the-badge&logo=express)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue?style=for-the-badge&logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=for-the-badge&logo=typescript)
![AI](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge)

**Toko Sembako Pintar dengan 8 Fitur AI & Admin Dashboard** 🤖📊

> E-commerce platform lengkap dengan AI recommendation, recipe generator, chatbot, review system, payment gateway, dan admin CRUD dashboard - All powered by Next.js 14, Express.js, PostgreSQL & OpenAI

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
- 🎭 **Lucide React** (Modern icons)
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

---

## � Environment Variables

### Backend (.env)
```env
PORT=3003
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database

# OpenAI API (Optional)
OPENAI_API_KEY=your_openai_api_key
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3003/api

# Firebase Configuration (Optional)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

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
✅ **Admin Dashboard** - Full CRUD for users, categories, products, orders  
✅ **PostgreSQL Database** - Cloud-hosted on Aiven with SSL  
✅ **Image Upload** - Multer integration for products & reviews  
✅ **Authentication** - bcrypt password hashing + Firebase OAuth  
✅ **Real-time Stats** - Dashboard analytics with revenue, orders, customers  
✅ **Review System** - Rating, comments, photos, sentiment analysis  
✅ **TypeScript** - 100% type-safe codebase  

---

## 🎉 Happy Coding!

Dibuat dengan ❤️ menggunakan Next.js 14, Express.js, PostgreSQL, TypeScript, dan OpenAI

**NeuMart Sembako - Toko Sembako Pintar dengan AI** 🛒🤖

---

### 📊 Project Stats
- **Lines of Code:** 10,000+
- **Components:** 15+
- **API Endpoints:** 40+
- **Database Tables:** 8
- **AI Features:** 8
- **Admin CRUD Operations:** 20+

**Version:** 2.0.0 | **Last Updated:** December 25, 2025
