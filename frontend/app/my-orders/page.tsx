'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import ReviewForm from '@/components/ReviewForm'
import { Package, Star, CheckCircle } from 'lucide-react'

interface OrderItem {
  productId: number
  productName: string
  quantity: number
  price: number
  subtotal: number
  reviewed?: boolean
}

interface Order {
  id: string
  user_id: number
  items: OrderItem[]
  totalPrice: number
  orderStatus: string
  paymentStatus: string
  createdAt: string
  deliveredAt?: string
  canReview?: boolean
}

export default function MyOrdersPage() {
  const { user } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState<{
    orderId: string
    productId: number
    productName: string
  } | null>(null)

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/orders')
      const data = await response.json()

      if (data.success) {
        // Orders from backend already filtered by user
        setOrders(data.orders)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReviewClick = (orderId: string, productId: number, productName: string) => {
    setSelectedItem({ orderId, productId, productName })
    setShowReviewForm(true)
  }

  const handleReviewSubmit = async () => {
    if (selectedItem) {
      // Mark item as reviewed
      await fetch(
        `http://localhost:3001/api/orders/${selectedItem.orderId}/item/${selectedItem.productId}/review`,
        { method: 'POST' }
      )
      
      setShowReviewForm(false)
      setSelectedItem(null)
      fetchOrders()
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <p className="text-gray-500">Memuat pesanan...</p>
        </div>
      </div>
    )
  }

  if (showReviewForm && selectedItem) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <ReviewForm
            orderId={selectedItem.orderId}
            productId={selectedItem.productId}
            productName={selectedItem.productName}
            userId={user?.uid || ''}
            userName={user?.displayName || 'Anonymous'}
            onSubmit={handleReviewSubmit}
            onCancel={() => {
              setShowReviewForm(false)
              setSelectedItem(null)
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Pesanan Saya</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Anda belum memiliki pesanan</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                      <p className="text-sm text-gray-600">
                        Tanggal: {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.orderStatus === 'Delivered' || order.orderStatus === 'Selesai'
                          ? 'bg-green-100 text-green-800'
                          : order.orderStatus === 'Processing' || order.orderStatus === 'Diproses'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.productId} className="flex justify-between items-center border-b pb-4 last:border-b-0">
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.productName}</h3>
                          <p className="text-sm text-gray-600">
                            {item.quantity} x {formatCurrency(item.price)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(item.subtotal)}</p>
                          
                          {/* Review Button or Status */}
                          {order.canReview && (
                            <div className="mt-2">
                              {item.reviewed ? (
                                <div className="flex items-center gap-1 text-green-600 text-sm">
                                  <CheckCircle size={16} />
                                  <span>Sudah direview</span>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleReviewClick(order.id, item.productId, item.productName)}
                                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                  <Star size={16} />
                                  <span>Beri Review</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Total */}
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">Total</span>
                      <span className="font-bold text-xl text-green-600">
                        {formatCurrency(order.totalPrice)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      Pembayaran: {order.paymentStatus}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
