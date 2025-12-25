import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { products } from '../../data/products'

const router = express.Router()

// Mock data storage (gunakan database di production)
interface Stats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalCustomers: number
  codOrders: number
  onlineOrders: number
  revenueGrowth: number
}

const stats: Stats = {
  totalRevenue: 15750000,
  totalOrders: 248,
  totalProducts: products.length,
  totalCustomers: 156,
  codOrders: 148,
  onlineOrders: 100,
  revenueGrowth: 12.5
}

// Mock admin password storage (in production, use database)
let adminPassword = 'admin123' // Default password

// GET - Admin Stats untuk Dashboard
router.get('/stats', (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      stats: {
        ...stats,
        totalProducts: products.length
      }
    })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil statistik'
    })
  }
})

// GET - Revenue Report
router.get('/reports/revenue', (req: Request, res: Response) => {
  try {
    const { period = '30days' } = req.query

    const report = {
      period,
      totalRevenue: stats.totalRevenue,
      codRevenue: 8950000,
      onlineRevenue: 6800000,
      growthRate: stats.revenueGrowth,
      dailyBreakdown: [
        { date: '2025-12-24', cod: 550000, online: 420000, total: 970000 },
        { date: '2025-12-23', cod: 480000, online: 380000, total: 860000 },
        { date: '2025-12-22', cod: 510000, online: 350000, total: 860000 },
      ]
    }

    res.json({
      success: true,
      report
    })
  } catch (error) {
    console.error('Get revenue report error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil laporan pendapatan'
    })
  }
})

// POST - Add Product (CRUD)
router.post('/products', (req: Request, res: Response) => {
  try {
    const newProduct = req.body
    
    // Validasi
    if (!newProduct.name || !newProduct.price) {
      return res.status(400).json({
        success: false,
        message: 'Nama dan harga produk wajib diisi'
      })
    }

    console.log('✅ Product added:', newProduct.name)

    res.json({
      success: true,
      message: 'Produk berhasil ditambahkan',
      product: newProduct
    })
  } catch (error) {
    console.error('Add product error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal menambahkan produk'
    })
  }
})

// PUT - Update Product
router.put('/products/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updatedData = req.body

    console.log(`✅ Product ${id} updated:`, updatedData.name)

    res.json({
      success: true,
      message: 'Produk berhasil diupdate',
      product: updatedData
    })
  } catch (error) {
    console.error('Update product error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal mengupdate produk'
    })
  }
})

// DELETE - Delete Product
router.delete('/products/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params

    console.log(`🗑️  Product ${id} deleted`)

    res.json({
      success: true,
      message: 'Produk berhasil dihapus'
    })
  } catch (error) {
    console.error('Delete product error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus produk'
    })
  }
})

// POST - Change Admin Password
router.post('/change-password', async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body

    // Validate current password
    if (currentPassword !== adminPassword) {
      return res.status(401).json({
        success: false,
        message: 'Password saat ini salah'
      })
    }

    // Update password
    adminPassword = newPassword

    console.log('✅ Admin password changed successfully')

    res.json({
      success: true,
      message: 'Password berhasil diubah'
    })
  } catch (error) {
    console.error('Change password error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal mengubah password'
    })
  }
})

// POST - Save Payment Settings
router.post('/payment-settings', (req: Request, res: Response) => {
  try {
    const paymentSettings = req.body

    console.log('✅ Payment settings saved:', paymentSettings)

    res.json({
      success: true,
      message: 'Pengaturan pembayaran berhasil disimpan'
    })
  } catch (error) {
    console.error('Save payment settings error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal menyimpan pengaturan pembayaran'
    })
  }
})

// POST - Save Notification Settings
router.post('/notification-settings', (req: Request, res: Response) => {
  try {
    const notificationSettings = req.body

    console.log('✅ Notification settings saved:', notificationSettings)

    res.json({
      success: true,
      message: 'Pengaturan notifikasi berhasil disimpan'
    })
  } catch (error) {
    console.error('Save notification settings error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal menyimpan pengaturan notifikasi'
    })
  }
})

// GET - Backup Database
router.get('/backup', (req: Request, res: Response) => {
  try {
    // Create backup data
    const backupData = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      data: {
        products: products,
        stats: stats,
        settings: {
          adminPassword,
          paymentMethods: ['COD', 'Bank Transfer', 'E-Wallet'],
          notifications: true
        }
      }
    }

    console.log('✅ Database backup created')

    res.json(backupData)
  } catch (error) {
    console.error('Backup error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal membuat backup'
    })
  }
})

// POST - Restore Database
router.post('/restore', (req: Request, res: Response) => {
  try {
    const backupData = req.body

    console.log('✅ Database restored from backup:', backupData.timestamp)

    res.json({
      success: true,
      message: 'Database berhasil di-restore'
    })
  } catch (error) {
    console.error('Restore error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal restore database'
    })
  }
})

export default router
