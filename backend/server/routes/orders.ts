import express, { Request, Response } from 'express'

const router = express.Router()

// Mock storage for orders
interface Order {
  id: string
  user: {
    uid: string
    name: string
    phone: string
  }
  items: Array<{
    productId: number
    productName: string
    quantity: number
    price: number
    subtotal: number
    reviewed?: boolean // Track if item has been reviewed
  }>
  totalPrice: number
  paymentMethod: string
  paymentStatus: string
  orderStatus: string
  shippingAddress: {
    address: string
    city: string
    postalCode: string
  }
  notes: string
  createdAt: string
  deliveredAt?: string // Track when order was delivered
  canReview?: boolean // Flag to show if customer can review
}

const orders: Map<string, Order> = new Map()

// POST - Create new order
router.post('/create', (req: Request, res: Response) => {
  try {
    const orderData = req.body

    // Generate order ID
    const orderId = `ORD-${Date.now()}`

    // Create order object
    const newOrder: Order = {
      id: orderId,
      user: orderData.user,
      items: orderData.items,
      totalPrice: orderData.totalPrice,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'COD' ? 'Pending' : 'Waiting Payment',
      orderStatus: 'Pending',
      shippingAddress: orderData.shippingAddress,
      notes: orderData.notes || '',
      createdAt: orderData.createdAt
    }

    // Save order
    orders.set(orderId, newOrder)

    console.log(`✅ New order created: ${orderId} - ${orderData.user.name} - Rp ${orderData.totalPrice}`)

    res.json({
      success: true,
      message: 'Pesanan berhasil dibuat',
      order: {
        id: orderId,
        totalPrice: orderData.totalPrice,
        paymentMethod: orderData.paymentMethod,
        paymentStatus: newOrder.paymentStatus,
        orderStatus: newOrder.orderStatus
      }
    })
  } catch (error) {
    console.error('Create order error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal membuat pesanan'
    })
  }
})

// GET - Get order by ID
router.get('/:orderId', (req: Request, res: Response) => {
  try {
    const { orderId } = req.params
    const order = orders.get(orderId)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pesanan tidak ditemukan'
      })
    }

    res.json({
      success: true,
      order
    })
  } catch (error) {
    console.error('Get order error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data pesanan'
    })
  }
})

// GET - Get all orders (for admin)
router.get('/', (req: Request, res: Response) => {
  try {
    const allOrders = Array.from(orders.values())
    
    res.json({
      success: true,
      count: allOrders.length,
      orders: allOrders
    })
  } catch (error) {
    console.error('Get orders error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data pesanan'
    })
  }
})

// PUT - Update order status
router.put('/:orderId/status', (req: Request, res: Response) => {
  try {
    const { orderId } = req.params
    const { orderStatus, paymentStatus } = req.body

    const order = orders.get(orderId)
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pesanan tidak ditemukan'
      })
    }

    if (orderStatus) {
      order.orderStatus = orderStatus
      
      // If order is delivered, mark as can review and set deliveredAt timestamp
      if (orderStatus === 'Delivered' || orderStatus === 'Selesai') {
        order.deliveredAt = new Date().toISOString()
        order.canReview = true
      }
    }
    
    if (paymentStatus) {
      order.paymentStatus = paymentStatus
    }

    orders.set(orderId, order)

    res.json({
      success: true,
      message: 'Status pesanan berhasil diupdate',
      order
    })
  } catch (error) {
    console.error('Update order status error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal mengupdate status pesanan'
    })
  }
})

// POST - Mark item as reviewed
router.post('/:orderId/item/:productId/review', (req: Request, res: Response) => {
  try {
    const { orderId, productId } = req.params

    const order = orders.get(orderId)
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pesanan tidak ditemukan'
      })
    }

    const item = order.items.find(i => i.productId === parseInt(productId))
    if (item) {
      item.reviewed = true
      orders.set(orderId, order)
    }

    res.json({
      success: true,
      message: 'Item ditandai sebagai sudah direview'
    })
  } catch (error) {
    console.error('Mark reviewed error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal menandai item sebagai direview'
    })
  }
})

export default router
