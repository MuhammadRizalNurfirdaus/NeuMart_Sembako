# 📋 Admin CRUD API Documentation - NeuMart Sembako

## 🔐 Admin Full CRUD Operations

Dokumentasi lengkap untuk semua operasi CRUD yang dapat dilakukan oleh admin.

---

## 👥 USERS Management

### Get All Users
```http
GET /api/admin/users
```

**Response:**
```json
{
  "success": true,
  "users": [
    {
      "id": 1,
      "uid": "admin-001",
      "username": "Admin NeuMart",
      "email": "admin@neumart.com",
      "role": "admin",
      "photo_url": null,
      "created_at": "2025-12-25T05:53:37.791Z",
      "updated_at": "2025-12-25T05:53:37.791Z"
    }
  ]
}
```

### Get User by ID
```http
GET /api/admin/users/:id
```

### Create New User
```http
POST /api/admin/users
Content-Type: application/json

{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "customer"  // or "admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": 3,
    "uid": "user-1735125928910",
    "username": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "created_at": "2025-12-25T13:25:28.910Z"
  }
}
```

### Update User
```http
PUT /api/admin/users/:id
Content-Type: application/json

{
  "username": "John Doe Updated",
  "email": "john.updated@example.com",
  "role": "admin",
  "password": "newPassword123"  // Optional
}
```

### Delete User
```http
DELETE /api/admin/users/:id
```

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## 📂 CATEGORIES Management

### Get All Categories
```http
GET /api/admin/categories
```

**Response:**
```json
{
  "success": true,
  "categories": [
    {
      "id": 1,
      "category_name": "Beras",
      "created_at": "2025-12-25T05:53:37.720Z",
      "product_count": "5"
    }
  ]
}
```

### Get Category by ID
```http
GET /api/admin/categories/:id
```

### Create New Category
```http
POST /api/admin/categories
Content-Type: application/json

{
  "category_name": "Minuman"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Category created successfully",
  "category": {
    "id": 181,
    "category_name": "Minuman",
    "created_at": "2025-12-25T06:25:28.910Z"
  }
}
```

### Update Category
```http
PUT /api/admin/categories/:id
Content-Type: application/json

{
  "category_name": "Minuman Segar"
}
```

### Delete Category
```http
DELETE /api/admin/categories/:id
```

**Note:** Cannot delete category if it has products. Must move/delete products first.

**Response:**
```json
{
  "success": false,
  "message": "Cannot delete category with existing products"
}
```

---

## 📦 PRODUCTS Management

### Get All Products (Admin View)
```http
GET /api/admin/products
```

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "id": 1,
      "name": "Beras Premium",
      "category": "Beras",
      "category_id": 1,
      "price": 85000,
      "stock": 50,
      "unit": "5kg",
      "image": "image-url.jpg",
      "description": "Beras pulen berkualitas tinggi",
      "averageRating": 4.5,
      "reviewCount": 10,
      "totalSold": 25,
      "createdAt": "2025-12-25T05:53:38.644Z",
      "updatedAt": "2025-12-25T05:53:38.644Z"
    }
  ]
}
```

**Features:**
- ✅ Shows total sold count
- ✅ Shows category name
- ✅ Ordered by newest first
- ✅ Full product details

### Create, Update, Delete Products
See `/api/products` endpoints (already implemented in `products.ts`)

---

## 🛒 ORDERS Management

### Get All Orders
```http
GET /api/admin/orders
GET /api/admin/orders?status=pending
GET /api/admin/orders?payment_status=paid
```

**Response:**
```json
{
  "success": true,
  "orders": [
    {
      "id": "ORD-123456789",
      "userId": 2,
      "username": "Customer Demo",
      "email": "customer@example.com",
      "totalPrice": 150000,
      "paymentMethod": "cod",
      "paymentStatus": "pending",
      "orderStatus": "pending",
      "shippingAddress": {
        "street": "Jl. Merdeka No. 123",
        "city": "Jakarta",
        "postal": "12345"
      },
      "notes": "Antar pagi ya",
      "items": [
        {
          "id": 1,
          "product_id": 5,
          "product_name": "Beras Premium",
          "quantity": 2,
          "price": 75000,
          "subtotal": 150000
        }
      ],
      "deliveredAt": null,
      "canReview": false,
      "createdAt": "2025-12-25T10:30:00.000Z",
      "updatedAt": "2025-12-25T10:30:00.000Z"
    }
  ]
}
```

### Get Order by ID
```http
GET /api/admin/orders/:id
```

### Update Order Status
```http
PUT /api/admin/orders/:id/status
Content-Type: application/json

{
  "order_status": "delivered",  // pending, processing, shipped, delivered, cancelled
  "payment_status": "paid"       // pending, paid, failed
}
```

**Special Behavior:**
- ✅ When `order_status = "delivered"`:
  - Automatically sets `delivered_at = NOW()`
  - Sets `can_review = TRUE`
  - Allows customers to submit reviews

**Response:**
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "order": { ... }
}
```

### Delete Order (Use with Caution)
```http
DELETE /api/admin/orders/:id
```

**Warning:** This permanently deletes the order and all its items.

---

## 📊 DASHBOARD Statistics

### Get Dashboard Stats
```http
GET /api/admin/dashboard/stats
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalRevenue": 15750000,
    "totalOrders": 248,
    "totalProducts": 156,
    "totalCustomers": 89,
    "pendingOrders": 12,
    "lowStockProducts": 5
  }
}
```

**Metrics Included:**
- ✅ `totalRevenue` - Sum of all paid orders
- ✅ `totalOrders` - Total number of orders
- ✅ `totalProducts` - Products in catalog
- ✅ `totalCustomers` - Users with role='customer'
- ✅ `pendingOrders` - Orders with status='pending'
- ✅ `lowStockProducts` - Products with stock < 10

---

## 🗄️ Database Tables Schema

### users
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  uid VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  role VARCHAR(50) DEFAULT 'customer',  -- 'admin' or 'customer'
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### categories
```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### products
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  unit VARCHAR(50),
  image TEXT,
  average_rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### orders
```sql
CREATE TABLE orders (
  id VARCHAR(255) PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total_price DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pending',
  order_status VARCHAR(50) DEFAULT 'pending',
  shipping_address JSONB,
  notes TEXT,
  delivered_at TIMESTAMP,
  can_review BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔑 Admin Permissions

### What Admin Can Do:

#### ✅ Users Management:
- Create new users (admin/customer)
- View all users
- Update user details
- Delete users
- Change user roles

#### ✅ Categories Management:
- Create categories
- View all categories with product counts
- Update category names
- Delete empty categories

#### ✅ Products Management:
- Create products with images
- View all products with sales data
- Update product details & images
- Delete products
- Track total sold

#### ✅ Orders Management:
- View all orders with filters
- View order details & items
- Update order status
- Update payment status
- Delete orders (admin only)
- Enable customer reviews when delivered

#### ✅ Analytics:
- View dashboard statistics
- Monitor revenue
- Track customer count
- Check pending orders
- Alert low stock items

---

## 🧪 Testing Examples

### cURL Commands:

```bash
# Get all users
curl http://localhost:3001/api/admin/users

# Create new category
curl -X POST http://localhost:3001/api/admin/categories \
  -H "Content-Type: application/json" \
  -d '{"category_name":"Minuman"}'

# Update order status to delivered
curl -X PUT http://localhost:3001/api/admin/orders/ORD-123/status \
  -H "Content-Type: application/json" \
  -d '{"order_status":"delivered","payment_status":"paid"}'

# Get dashboard stats
curl http://localhost:3001/api/admin/dashboard/stats

# Get orders with filter
curl "http://localhost:3001/api/admin/orders?status=pending"

# Delete user
curl -X DELETE http://localhost:3001/api/admin/users/5
```

---

## 🔒 Security Notes

1. **Password Hashing**: All passwords are hashed using bcrypt (10 rounds)
2. **Role-Based Access**: Endpoints should be protected with authentication middleware
3. **Soft Delete**: Consider implementing soft delete for audit trails
4. **Audit Logs**: Track admin actions for compliance
5. **Rate Limiting**: Implement rate limiting to prevent abuse

---

## 📝 Response Formats

### Success Response:
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Error description"
}
```

### Validation Error:
```json
{
  "success": false,
  "message": "Field is required",
  "field": "email"
}
```

---

## 🚀 Implementation Status

### ✅ Completed:
- [x] Users CRUD (Create, Read, Update, Delete)
- [x] Categories CRUD with product count
- [x] Products admin view with sales tracking
- [x] Orders CRUD with filters
- [x] Order status management
- [x] Dashboard statistics
- [x] Password hashing
- [x] Database integration
- [x] Error handling

### 🔄 To Be Added:
- [ ] Authentication middleware
- [ ] Role-based authorization
- [ ] Admin action logging
- [ ] Bulk operations
- [ ] CSV export
- [ ] Advanced filters & search
- [ ] Pagination

---

**Admin CRUD System Ready! 🎉**

*All 4 main tables (users, categories, products, orders) fully support CRUD operations for admin*
