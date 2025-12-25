# 🚀 CARA MENJALANKAN FULL-STACK PROJECT

## ✅ PROJECT SUDAH DIPERBAIKI!

Website NeuMart Sembako sekarang memiliki **Frontend (Next.js) + Backend (Express.js)**

---

## 📦 INSTALL DEPENDENCIES BARU

Pertama, install semua dependencies yang diperlukan:

```bash
cd "NeuMart Sembako"
npm install
```

---

## 🎯 CARA MENJALANKAN

### Option 1: Jalankan Frontend & Backend Sekaligus (RECOMMENDED)

```bash
npm run dev:all
```

Ini akan menjalankan:
- ✅ **Frontend** di http://localhost:3000
- ✅ **Backend API** di http://localhost:3001

### Option 2: Jalankan Terpisah

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run dev:server
```

---

## 🌐 AKSES APLIKASI

### Frontend (Next.js)
```
http://localhost:3000
```

### Backend API (Express.js)
```
http://localhost:3001/api
```

### API Endpoints:

**Health Check:**
```
GET http://localhost:3001/api/health
```

**Products:**
```
GET http://localhost:3001/api/products
GET http://localhost:3001/api/products/:id
GET http://localhost:3001/api/products/category/:category
```

**AI Features:**
```
POST http://localhost:3001/api/ai/recipe
POST http://localhost:3001/api/ai/chat
POST http://localhost:3001/api/ai/recommendations
```

---

## 🏗️ ARSITEKTUR PROJECT

### Frontend (Next.js 14)
```
app/              → Pages (React Server Components)
components/       → UI Components
store/           → State Management (Zustand)
lib/api.ts       → API Service Layer
```

### Backend (Express.js + TypeScript)
```
server/
├── index.ts              → Main server
├── routes/
│   ├── products.ts      → Product endpoints
│   └── ai.ts            → AI endpoints
└── tsconfig.json        → TypeScript config
```

### Shared Logic
```
lib/              → AI algorithms (shared)
data/            → Product database (shared)
```

---

## 🧪 TEST API dengan CURL

### Get All Products
```bash
curl http://localhost:3001/api/products
```

### AI Recipe Generator
```bash
curl -X POST http://localhost:3001/api/ai/recipe \
  -H "Content-Type: application/json" \
  -d '{"productNames": ["Beras Premium", "Telur Ayam"]}'
```

### Chatbot
```bash
curl -X POST http://localhost:3001/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Apakah beras masih ada?"}'
```

### Smart Recommendation
```bash
curl -X POST http://localhost:3001/api/ai/recommendations \
  -H "Content-Type: application/json" \
  -d '{"productIds": [1, 2]}'
```

---

## 📝 ENVIRONMENT VARIABLES

Buat file `.env.local` di root folder:

```env
# Backend Server
PORT=3001
NODE_ENV=development

# API URLs
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

## 🔧 TROUBLESHOOTING

### Error: Port already in use
```bash
# Kill process di port 3000
sudo kill -9 $(lsof -t -i:3000)

# Kill process di port 3001
sudo kill -9 $(lsof -t -i:3001)
```

### Error: Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors di server/
```bash
npm install --save-dev @types/express @types/cors @types/node
```

---

## 🚀 BUILD FOR PRODUCTION

### Build Frontend & Backend
```bash
npm run build
```

### Run Production
```bash
# Start Next.js
npm start

# Start Backend (di terminal lain)
npm run start:server
```

---

## 📊 TECH STACK LENGKAP

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State:** Zustand
- **HTTP Client:** Axios
- **Icons:** React Icons

### Backend
- **Framework:** Express.js
- **Language:** TypeScript
- **Runtime:** Node.js
- **CORS:** Enabled
- **Dev Tool:** ts-node-dev

### Shared
- **AI Logic:** Custom algorithms (Pattern Matching, Keyword Detection)
- **Data:** In-memory (products.ts)

---

## 🎯 NEXT STEPS

### Level 1: Test Full Stack
- [x] Frontend berjalan di :3000
- [x] Backend berjalan di :3001
- [ ] Test API endpoints
- [ ] Test AI features via API

### Level 2: Add Database
- [ ] Setup PostgreSQL / MongoDB
- [ ] Create models
- [ ] Update API to use DB
- [ ] Add authentication

### Level 3: Deploy
- [ ] Frontend → Vercel
- [ ] Backend → Railway / Render
- [ ] Environment variables
- [ ] Production testing

---

## 📚 FILE BARU YANG DITAMBAHKAN

```
server/
├── index.ts              ← Backend server main
├── routes/
│   ├── products.ts      ← Product API endpoints
│   └── ai.ts            ← AI API endpoints
└── tsconfig.json        ← Server TypeScript config

lib/
└── api.ts               ← API service untuk frontend

Updated:
├── package.json         ← Added backend scripts & deps
├── .env.example         ← Added API URL config
```

---

## 🎉 SELAMAT!

Project Anda sekarang **FULL-STACK**:
- ✅ Frontend: Next.js + TypeScript
- ✅ Backend: Express.js + TypeScript
- ✅ API: RESTful endpoints
- ✅ AI: 3 fitur terintegrasi

**Jalankan dengan:**
```bash
npm run dev:all
```

**Happy Coding! 🚀**
