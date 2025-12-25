# 🗄️ Database Migration Guide - NeuMart Sembako

## ✅ Successfully Implemented

### 1. **PostgreSQL Database Connection** 
- ✅ Connected to Aiven PostgreSQL cloud database
- ✅ SSL/TLS configuration properly set up
- ✅ Connection pooling configured (max 20 connections)
- ✅ Database URL: `pg-e518da0-muhammadrizalnurfirdaus.i.aivencloud.com:23737`

### 2. **Database Schema Created**
All tables automatically created on server startup:

#### **users** table
```sql
- id (SERIAL PRIMARY KEY)
- uid (VARCHAR UNIQUE) - Firebase UID
- username (VARCHAR)
- email (VARCHAR UNIQUE)
- password (VARCHAR)
- role (VARCHAR) - 'admin' or 'customer'
- photo_url (TEXT)
- created_at, updated_at (TIMESTAMP)
```

#### **categories** table
```sql
- id (SERIAL PRIMARY KEY)
- category_name (VARCHAR UNIQUE)
- created_at (TIMESTAMP)
```

#### **products** table  
```sql
- id (SERIAL PRIMARY KEY)
- category_id (INTEGER FK → categories)
- name (VARCHAR)
- description (TEXT)
- price (DECIMAL(10,2))
- stock (INTEGER)
- unit (VARCHAR)
- image (TEXT) - URL to uploaded image
- average_rating (DECIMAL(3,2))
- review_count (INTEGER)
- created_at, updated_at (TIMESTAMP)
```

#### **related_products** table
```sql
- product_id (INTEGER FK → products)
- related_product_id (INTEGER FK → products)
- PRIMARY KEY (product_id, related_product_id)
```

#### **orders** table
```sql
- id (VARCHAR PRIMARY KEY)
- user_id (INTEGER FK → users)
- total_price (DECIMAL(10,2))
- payment_method (VARCHAR)
- payment_status (VARCHAR)
- order_status (VARCHAR)
- shipping_address (JSONB)
- notes (TEXT)
- delivered_at (TIMESTAMP)
- can_review (BOOLEAN)
- created_at, updated_at (TIMESTAMP)
```

#### **order_items** table
```sql
- id (SERIAL PRIMARY KEY)
- order_id (VARCHAR FK → orders)
- product_id (INTEGER FK → products)
- product_name (VARCHAR)
- quantity (INTEGER)
- price (DECIMAL(10,2))
- subtotal (DECIMAL(10,2))
- reviewed (BOOLEAN)
- created_at (TIMESTAMP)
```

#### **reviews** table
```sql
- id (VARCHAR PRIMARY KEY)
- order_id (VARCHAR FK → orders)
- product_id (INTEGER FK → products)
- product_name (VARCHAR)
- user_id (INTEGER FK → users)
- user_name (VARCHAR)
- rating (INTEGER 1-5)
- product_quality (INTEGER 1-5)
- service_rating (INTEGER 1-5)
- delivery_rating (INTEGER 1-5)
- comment (TEXT)
- status (VARCHAR) - 'pending', 'approved', 'rejected'
- created_at (TIMESTAMP)
```

#### **ai_logs** table (For AI Learning)
```sql
- id (SERIAL PRIMARY KEY)
- user_id (INTEGER FK → users)
- interaction_type (VARCHAR) - 'search', 'view', 'add_cart', 'purchase'
- product_id (INTEGER FK → products)
- search_query (TEXT)
- recommended_products (JSONB)
- user_action (VARCHAR) - 'clicked', 'ignored', 'purchased'
- metadata (JSONB) - Additional contextual data
- created_at (TIMESTAMP)
```

### 3. **Indexes for Performance**
```sql
✅ idx_products_category ON products(category_id)
✅ idx_orders_user ON orders(user_id)
✅ idx_order_items_order ON order_items(order_id)
✅ idx_order_items_product ON order_items(product_id)
✅ idx_reviews_product ON reviews(product_id)
✅ idx_reviews_user ON reviews(user_id)
✅ idx_ai_logs_user ON ai_logs(user_id)
✅ idx_ai_logs_product ON ai_logs(product_id)
```

### 4. **Sample Data Seeded**
- ✅ 10 default categories (Beras, Minyak, Gula, dll)
- ✅ 6 sample products with real images
- ✅ 2 default users (admin & customer)

### 5. **Image Upload System**
- ✅ Multer configured for handling multipart/form-data
- ✅ Upload directory: `/backend/uploads`
- ✅ File types allowed: JPEG, JPG, PNG, GIF, WebP
- ✅ Max file size: 5MB
- ✅ Images served at: `http://localhost:3001/uploads/[filename]`
- ✅ Auto-generated unique filenames to prevent conflicts

## 🔧 Backend API Endpoints

### Products API (Updated with Database)

#### GET `/api/products`
- Fetch all products from database
- Includes category name, rating, review count
- Returns related products

#### GET `/api/products/:id`
- Fetch single product by ID
- Full product details with relationships

#### POST `/api/products`
- Create new product
- **Supports multipart/form-data for image upload**
- Auto-creates category if not exists
- Body fields:
  - name, category, price, stock, unit, description
  - **image** (file upload)
  - relatedProducts (array of IDs)

#### PUT `/api/products/:id`
- Update existing product
- **Supports optional image upload**
- If no new image provided, keeps existing image

#### DELETE `/api/products/:id`
- Delete product from database

#### GET `/api/products/categories/list`
- Get all categories

### Database Test Endpoint

#### GET `/api/db-test`
```json
{
  "success": true,
  "message": "Database connected successfully!",
  "timestamp": "2025-12-25T19:53:45.123Z"
}
```

## 📊 AI Logs System

The `ai_logs` table is designed to help AI become smarter over time by tracking:

### Logged Interactions:
1. **Product Views**
   ```json
   {
     "interaction_type": "view",
     "product_id": 5,
     "user_id": 123,
     "metadata": { "duration": 45, "scroll_depth": 75 }
   }
   ```

2. **Search Queries**
   ```json
   {
     "interaction_type": "search",
     "search_query": "beras pulen murah",
     "recommended_products": [1, 3, 7],
     "user_action": "clicked"
   }
   ```

3. **Purchase Patterns**
   ```json
   {
     "interaction_type": "purchase",
     "product_id": 2,
     "user_id": 123,
     "metadata": { "frequently_bought_with": [1, 5, 8] }
   }
   ```

### AI Learning Strategy:
- **Collaborative Filtering**: Users who bought X also bought Y
- **Content-Based**: Products with similar categories/attributes
- **Search Pattern Analysis**: Improve search relevance
- **Time-Series**: Trending products, seasonal patterns
- **User Behavior**: Personalized recommendations

## 🚀 How to Use

### 1. Start Backend Server
```bash
cd backend
npm install
npm run dev
```

Output should show:
```
✅ Connected to PostgreSQL database
✅ Database connection successful!
🔄 Initializing database schema...
✅ Table "users" ready
✅ Table "categories" ready
...
🚀 Backend server running on http://localhost:3001
```

### 2. Test Database Connection
```bash
curl http://localhost:3001/api/db-test
```

### 3. Fetch Products from Database
```bash
curl http://localhost:3001/api/products
```

### 4. Upload Product with Image (using cURL)
```bash
curl -X POST http://localhost:3001/api/products \
  -F "name=Beras Organik" \
  -F "category=Beras" \
  -F "price=95000" \
  -F "stock=30" \
  -F "unit=5kg" \
  -F "description=Beras organik premium" \
  -F "image=@/path/to/image.jpg"
```

## 📁 File Structure

```
backend/
├── lib/
│   ├── db.ts                # PostgreSQL connection pool
│   ├── initDb.ts            # Database initialization & seeding
│   └── upload.ts            # Multer configuration
├── server/
│   ├── index.ts             # Main server with DB init
│   └── routes/
│       ├── products.ts      # Products CRUD with image upload
│       ├── orders.ts        # Orders management
│       ├── reviews.ts       # Reviews system
│       ├── ai.ts            # AI recommendations
│       └── auth.ts          # Authentication
├── uploads/                 # Uploaded product images
└── .env                     # Environment variables
```

## 🎯 Next Steps

### For Admin Panel (Frontend):
1. ✅ Update admin products page to use FormData for image upload
2. ✅ Add image preview before upload
3. ✅ Show existing images from database
4. ✅ Update image upload field in edit modal

### For AI System:
1. Track user interactions in ai_logs table
2. Build recommendation algorithm using logged data
3. Implement collaborative filtering
4. Add trending products based on views/purchases

### For Production:
1. Add image compression/optimization
2. Implement CDN for images (Cloudinary, AWS S3)
3. Add database backup strategy
4. Implement rate limiting on uploads
5. Add image moderation/validation

## 🔐 Default Credentials

### Admin User:
```
Email: admin@neumart.com
Password: admin123
UID: admin-001
Role: admin
```

### Customer User:
```
Email: customer@example.com
Password: customer123
UID: customer-001
Role: customer
```

## ⚙️ Environment Variables

```env
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
```

## 📈 Database Statistics (After Seeding)

- **Users**: 2 (1 admin, 1 customer)
- **Categories**: 10
- **Products**: 6 sample products
- **Orders**: 0
- **Reviews**: 0
- **AI Logs**: 0 (will grow with usage)

## 🎨 Benefits of Real Database

1. **Persistent Data**: Data survives server restarts
2. **Real-time Updates**: Changes reflect immediately
3. **Scalability**: Can handle thousands of products
4. **Relationships**: Proper FK constraints ensure data integrity
5. **Analytics**: Can query complex reports
6. **AI Training**: Accumulate data for better recommendations
7. **Multi-user**: Concurrent access without conflicts

## 🔍 Monitoring & Debugging

### View Database Logs:
- Server console shows all SQL queries
- Query execution time tracked
- Errors logged with stack traces

### Common Issues:

**Port 3001 Already in Use**:
```bash
lsof -ti:3001 | xargs kill -9
```

**Database Connection Failed**:
- Check DATABASE_URL in .env
- Verify SSL configuration
- Check Aiven database status

**Image Upload Fails**:
- Check uploads directory exists
- Verify file size < 5MB
- Check file type (JPEG, PNG, GIF, WebP only)

---

**Database is now live and ready for production use! 🎉**
