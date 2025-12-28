import express, { Request, Response } from 'express'
import { pool } from '../../lib/db'

const router = express.Router()

// ====================================
// CUSTOMER ADDRESSES ENDPOINTS
// ====================================

// GET - Semua alamat customer
router.get('/addresses/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await pool.query(
      'SELECT * FROM customer_addresses WHERE user_id = $1 AND is_active = TRUE ORDER BY is_default DESC, created_at DESC',
      [userId]
    )
    
    res.json(result.rows)
  } catch (error) {
    console.error('Get addresses error:', error)
    res.status(500).json({ success: false, message: 'Gagal mengambil data alamat' })
  }
})

// POST - Tambah alamat baru
router.post('/addresses', async (req: Request, res: Response) => {
  try {
    const {
      userId,
      label,
      recipientName,
      phone,
      addressLine1,
      addressLine2,
      city,
      province,
      postalCode,
      latitude,
      longitude,
      isDefault
    } = req.body

    // Validasi
    if (!userId || !label || !recipientName || !phone || !addressLine1 || !city || !province) {
      return res.status(400).json({
        success: false,
        message: 'Data alamat tidak lengkap'
      })
    }

    // Insert ke database
    const result = await pool.query(
      `INSERT INTO customer_addresses 
        (user_id, label, recipient_name, phone, address_line1, address_line2, city, province, postal_code, latitude, longitude, is_default)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [userId, label, recipientName, phone, addressLine1, addressLine2, city, province, postalCode, latitude, longitude, isDefault]
    )

    res.json({
      success: true,
      message: 'Alamat berhasil ditambahkan',
      address: result.rows[0]
    })
  } catch (error) {
    console.error('Add address error:', error)
    res.status(500).json({ success: false, message: 'Gagal menambahkan alamat' })
  }
})

// PUT - Update alamat
router.put('/addresses/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const {
      label,
      recipientName,
      phone,
      addressLine1,
      addressLine2,
      city,
      province,
      postalCode,
      latitude,
      longitude
    } = req.body

    const result = await pool.query(
      `UPDATE customer_addresses 
       SET label = $1, recipient_name = $2, phone = $3, address_line1 = $4, address_line2 = $5,
           city = $6, province = $7, postal_code = $8, latitude = $9, longitude = $10, updated_at = NOW()
       WHERE id = $11
       RETURNING *`,
      [label, recipientName, phone, addressLine1, addressLine2, city, province, postalCode, latitude, longitude, id]
    )
    
    res.json({
      success: true,
      message: 'Alamat berhasil diupdate',
      address: result.rows[0]
    })
  } catch (error) {
    console.error('Update address error:', error)
    res.status(500).json({ success: false, message: 'Gagal mengupdate alamat' })
  }
})

// DELETE - Hapus alamat (soft delete)
router.delete('/addresses/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await pool.query(
      'UPDATE customer_addresses SET is_active = FALSE, updated_at = NOW() WHERE id = $1',
      [id]
    )

    res.json({
      success: true,
      message: 'Alamat berhasil dihapus'
    })
  } catch (error) {
    console.error('Delete address error:', error)
    res.status(500).json({ success: false, message: 'Gagal menghapus alamat' })
  }
})

// PUT - Set default address
router.put('/addresses/:id/set-default', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { userId } = req.body

    // Update address to set as default (trigger akan handle reset default yang lain)
    await pool.query(
      'UPDATE customer_addresses SET is_default = TRUE, updated_at = NOW() WHERE id = $1 AND user_id = $2',
      [id, userId]
    )
    
    res.json({
      success: true,
      message: 'Alamat default berhasil diubah'
    })
  } catch (error) {
    console.error('Set default address error:', error)
    res.status(500).json({ success: false, message: 'Gagal mengubah alamat default' })
  }
})

// ====================================
// PAYMENT METHODS ENDPOINTS
// ====================================

// GET - Semua metode pembayaran customer
router.get('/payment-methods/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await pool.query(
      'SELECT * FROM payment_methods WHERE user_id = $1 AND is_active = TRUE ORDER BY is_default DESC, created_at DESC',
      [userId]
    )
    
    res.json(result.rows)
  } catch (error) {
    console.error('Get payment methods error:', error)
    res.status(500).json({ success: false, message: 'Gagal mengambil data metode pembayaran' })
  }
})

// POST - Tambah metode pembayaran
router.post('/payment-methods', async (req: Request, res: Response) => {
  try {
    const {
      userId,
      methodType,
      provider,
      accountNumber,
      accountName,
      cardNumber,
      isDefault
    } = req.body

    if (!userId || !methodType) {
      return res.status(400).json({
        success: false,
        message: 'Data metode pembayaran tidak lengkap'
      })
    }

    const result = await pool.query(
      `INSERT INTO payment_methods 
        (user_id, method_type, provider, account_number, account_name, card_number, is_default)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [userId, methodType, provider, accountNumber, accountName, cardNumber, isDefault]
    )

    res.json({
      success: true,
      message: 'Metode pembayaran berhasil ditambahkan',
      paymentMethod: result.rows[0]
    })
  } catch (error) {
    console.error('Add payment method error:', error)
    res.status(500).json({ success: false, message: 'Gagal menambahkan metode pembayaran' })
  }
})

// DELETE - Hapus metode pembayaran
router.delete('/payment-methods/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await pool.query(
      'UPDATE payment_methods SET is_active = FALSE, updated_at = NOW() WHERE id = $1',
      [id]
    )

    res.json({
      success: true,
      message: 'Metode pembayaran berhasil dihapus'
    })
  } catch (error) {
    console.error('Delete payment method error:', error)
    res.status(500).json({ success: false, message: 'Gagal menghapus metode pembayaran' })
  }
})

// ====================================
// WISHLIST ENDPOINTS
// ====================================

// GET - Wishlist customer
router.get('/wishlist/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    res.json({
      success: true,
      wishlist: []
    })
  } catch (error) {
    console.error('Get wishlist error:', error)
    res.status(500).json({ success: false, message: 'Gagal mengambil wishlist' })
  }
})

// POST - Tambah ke wishlist
router.post('/wishlist', async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: 'User ID dan Product ID diperlukan'
      })
    }

    res.json({
      success: true,
      message: 'Produk ditambahkan ke wishlist'
    })
  } catch (error) {
    console.error('Add to wishlist error:', error)
    res.status(500).json({ success: false, message: 'Gagal menambahkan ke wishlist' })
  }
})

// DELETE - Hapus dari wishlist
router.delete('/wishlist/:userId/:productId', async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.params

    res.json({
      success: true,
      message: 'Produk dihapus dari wishlist'
    })
  } catch (error) {
    console.error('Remove from wishlist error:', error)
    res.status(500).json({ success: false, message: 'Gagal menghapus dari wishlist' })
  }
})

// ====================================
// CUSTOMER PREFERENCES ENDPOINTS
// ====================================

// GET - Preferensi customer
router.get('/preferences/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    res.json({
      success: true,
      preferences: {
        preferredCategories: [],
        notificationEmail: true,
        notificationPromo: true,
        notificationOrder: true,
        language: 'id'
      }
    })
  } catch (error) {
    console.error('Get preferences error:', error)
    res.status(500).json({ success: false, message: 'Gagal mengambil preferensi' })
  }
})

// PUT - Update preferensi
router.put('/preferences/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const preferences = req.body

    res.json({
      success: true,
      message: 'Preferensi berhasil diupdate',
      preferences
    })
  } catch (error) {
    console.error('Update preferences error:', error)
    res.status(500).json({ success: false, message: 'Gagal mengupdate preferensi' })
  }
})

// ====================================
// SHIPPING & PROMO ENDPOINTS
// ====================================

// GET - Cek ongkir
router.post('/shipping/calculate', async (req: Request, res: Response) => {
  try {
    const { city, totalAmount } = req.body

    // Mock data - replace with actual database query
    const mockShippingRates: any = {
      'Jakarta': { rate: 10000, freeMin: 100000, days: '1-2 hari' },
      'Bandung': { rate: 15000, freeMin: 150000, days: '2-3 hari' },
      'Surabaya': { rate: 15000, freeMin: 150000, days: '2-3 hari' }
    }

    const shipping = mockShippingRates[city] || { rate: 20000, freeMin: 200000, days: '3-5 hari' }
    const isFree = totalAmount >= shipping.freeMin

    res.json({
      success: true,
      shippingCost: isFree ? 0 : shipping.rate,
      estimatedDays: shipping.days,
      isFreeShipping: isFree,
      freeShippingMin: shipping.freeMin
    })
  } catch (error) {
    console.error('Calculate shipping error:', error)
    res.status(500).json({ success: false, message: 'Gagal menghitung ongkir' })
  }
})

// GET - Semua promo aktif
router.get('/promotions/active', async (req: Request, res: Response) => {
  try {
    // Mock data
    const promotions = [
      {
        id: 1,
        code: 'WELCOME10',
        name: 'Selamat Datang',
        description: 'Diskon 10% untuk pembelian pertama',
        discountType: 'percentage',
        discountValue: 10,
        minPurchase: 50000
      },
      {
        id: 2,
        code: 'GRATIS100K',
        name: 'Gratis Ongkir',
        description: 'Gratis ongkir min belanja 100rb',
        discountType: 'free_shipping',
        discountValue: 0,
        minPurchase: 100000
      }
    ]

    res.json({
      success: true,
      promotions
    })
  } catch (error) {
    console.error('Get promotions error:', error)
    res.status(500).json({ success: false, message: 'Gagal mengambil promo' })
  }
})

// POST - Validasi kode promo
router.post('/promotions/validate', async (req: Request, res: Response) => {
  try {
    const { code, userId, totalAmount } = req.body

    // Mock validation
    if (code === 'WELCOME10') {
      res.json({
        success: true,
        valid: true,
        promotion: {
          code: 'WELCOME10',
          discountType: 'percentage',
          discountValue: 10,
          discountAmount: totalAmount * 0.1
        }
      })
    } else {
      res.json({
        success: false,
        valid: false,
        message: 'Kode promo tidak valid'
      })
    }
  } catch (error) {
    console.error('Validate promo error:', error)
    res.status(500).json({ success: false, message: 'Gagal validasi promo' })
  }
})

export default router
