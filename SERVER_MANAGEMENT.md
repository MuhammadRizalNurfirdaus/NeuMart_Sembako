# 🚀 NeuMart Sembako - Server Management Guide

## Quick Commands

### 📁 Location
```bash
cd /home/rizal/MyProject/NeuMart_Sembako
```

### ⚡ Using Server Manager (Recommended)

```bash
# Start servers
./server-manager.sh start

# Stop servers
./server-manager.sh stop

# Restart servers
./server-manager.sh restart

# Check status
./server-manager.sh status

# View logs
./server-manager.sh logs
```

---

## 🌐 Access URLs

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Main website |
| **Admin Panel** | http://localhost:3000/admin | Admin dashboard |
| **Backend API** | http://localhost:3003/api | REST API |
| **Health Check** | http://localhost:3003/api/health | Server status |
| **Images** | http://localhost:3003/uploads/ | Product images |

---

## 📋 Server Information

### Backend (Port 3003)
- **Technology**: Express.js + TypeScript
- **Command**: `npm run dev` (in backend/)
- **Entry**: backend/server/index.ts
- **Database**: PostgreSQL (Aiven Cloud)
- **Logs**: /tmp/neumart-dev.log

### Frontend (Port 3000)
- **Technology**: Next.js 14.2.35
- **Command**: `npm run dev` (in frontend/)
- **Entry**: frontend/app/page.tsx
- **Logs**: /tmp/neumart-dev.log

---

## 🛠️ Manual Commands (If Needed)

### Start Both Servers
```bash
npm run dev:all
```

### Start Separately
```bash
# Backend only
cd backend && npm run dev

# Frontend only
cd frontend && npm run dev
```

### Fix Port Conflicts
```bash
# Kill all processes
pkill -f "npm run dev:all"
pkill -f "ts-node-dev"
pkill -f "next dev"

# Force kill ports
lsof -ti:3003 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null
```

### Check Running Processes
```bash
# Check port 3003 (Backend)
lsof -i:3003

# Check port 3000 (Frontend)
lsof -i:3000

# Check all node processes
ps aux | grep node
```

---

## 🔍 Troubleshooting

### "Error: listen EADDRINUSE: address already in use"

**Solution 1**: Use server manager
```bash
./server-manager.sh restart
```

**Solution 2**: Manual cleanup
```bash
# Stop all servers
pkill -f "npm run dev:all"
lsof -ti:3003 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null

# Wait 2 seconds
sleep 2

# Start again
npm run dev:all
```

### Check Server Logs
```bash
# Real-time logs
tail -f /tmp/neumart-dev.log

# Last 50 lines
tail -50 /tmp/neumart-dev.log

# Search for errors
grep -i error /tmp/neumart-dev.log
```

### Database Connection Issues
```bash
# Test backend connection
curl http://localhost:3003/api/health

# Test product endpoint
curl http://localhost:3003/api/products
```

### Frontend Not Loading
```bash
# Check if frontend is running
curl http://localhost:3000

# Check environment variables
cat frontend/.env.local
# Should show: NEXT_PUBLIC_API_URL=http://localhost:3003/api
```

---

## 📦 Database Info

**Connection**: Aiven Cloud PostgreSQL
**Database**: db_neumart_sembako
**Tables**: users, categories, products, orders, reviews, ai_logs
**Total Products**: 13
**Categories**: 7

---

## 🎯 Common Tasks

### View All Products
```bash
# From terminal
curl http://localhost:3003/api/products | jq

# From browser
# Open http://localhost:3000/products
```

### Upload Product Images
1. Open http://localhost:3000/admin
2. Login as admin
3. Go to Products section
4. Click Edit on any product
5. Upload image

### Add New Products
Use admin panel or create SQL script in `backend/`:
```typescript
// Example: backend/add-products.ts
import pool from './lib/db';

async function addProducts() {
  const result = await pool.query(`
    INSERT INTO products (name, category, cost_price, sell_price, stock, unit)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
  `, ['Product Name', 'Category', 10000, 12000, 100, '1 pcs']);
  
  console.log('Product added:', result.rows[0]);
}
```

---

## 🔄 Development Workflow

### Standard Start
```bash
# 1. Navigate to project
cd /home/rizal/MyProject/NeuMart_Sembako

# 2. Check status
./server-manager.sh status

# 3. Start servers
./server-manager.sh start

# 4. Open browser
# Frontend: http://localhost:3000
# Admin: http://localhost:3000/admin
```

### End of Day
```bash
# Stop servers
./server-manager.sh stop

# Or let them run in background (nohup)
# They will persist even if terminal closes
```

---

## ⚠️ Important Notes

1. **Port Configuration**:
   - Backend MUST be on port 3003
   - Frontend MUST be on port 3000
   - Don't change these without updating .env files

2. **Environment Files**:
   - `backend/.env` - Database connection
   - `frontend/.env.local` - API URL

3. **Process Management**:
   - Servers run via nohup (background)
   - Won't stop if terminal closes
   - Use server-manager.sh to control them

4. **Image Handling**:
   - Upload via admin panel
   - Stored in `backend/uploads/`
   - Database stores filename only (not full URL)

5. **Database**:
   - Hosted on Aiven Cloud
   - Auto-initializes on backend start
   - Connection pooling enabled

---

## 📝 Cheat Sheet

```bash
# Quick start
./server-manager.sh start

# Quick stop
./server-manager.sh stop

# See what's running
./server-manager.sh status

# Watch logs
./server-manager.sh logs

# Emergency reset
./server-manager.sh restart
```

---

**Last Updated**: After adding garam products & fixing EADDRINUSE issues  
**Total Products**: 13 products across 7 categories  
**Status**: ✅ All systems operational
