'use client'

import { useState, useEffect } from 'react'
import { FiSearch, FiCheck, FiX, FiClock, FiPackage, FiEdit2 } from 'react-icons/fi'
import axios from 'axios'

interface Order {
  id: number
  customerName: string
  email: string
  items: string[]
  total: number
  paymentMethod: 'COD' | 'Transfer'
  paymentStatus: 'Pending' | 'Paid' | 'Failed'
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  date: string
}

const mockOrders: Order[] = [
  {
    id: 1001,
    customerName: 'Budi Santoso',
    email: 'budi@gmail.com',
    items: ['Beras Premium 5kg', 'Minyak Goreng 2L'],
    total: 135000,
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    orderStatus: 'Processing',
    date: '2025-12-24'
  },
  {
    id: 1002,
    customerName: 'Siti Aminah',
    email: 'siti@gmail.com',
    items: ['Telur Ayam 1kg', 'Gula Pasir 1kg'],
    total: 51000,
    paymentMethod: 'Transfer',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    date: '2025-12-23'
  },
  {
    id: 1003,
    customerName: 'Ahmad Rizki',
    email: 'ahmad@gmail.com',
    items: ['Mie Instan 5 pack', 'Kecap Manis', 'Saus Sambal'],
    total: 45000,
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    orderStatus: 'Shipped',
    date: '2025-12-24'
  }
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null)
  const [updating, setUpdating] = useState(false)

  // Fetch orders from backend
  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders')
      if (response.data.success && response.data.orders) {
        // Map backend orders to frontend format
        const formattedOrders = response.data.orders.map((order: any) => ({
          id: parseInt(order.id.replace('ORD-', '')),
          customerName: order.user.name,
          email: order.user.phone,
          items: order.items.map((item: any) => item.productName),
          total: order.totalPrice,
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          orderStatus: order.orderStatus,
          date: new Date(order.createdAt).toISOString().split('T')[0],
          orderId: order.id // Keep original order ID for updates
        }))
        setOrders(formattedOrders)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      // Keep using mock data if backend fails
    }
  }

  const handleStatusChange = async (order: Order, newStatus: string) => {
    setUpdating(true)
    try {
      const orderId = (order as any).orderId || `ORD-${order.id}`
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, {
        orderStatus: newStatus
      })

      if (response.data.success) {
        // Update local state
        setOrders(orders.map(o => 
          o.id === order.id 
            ? { ...o, orderStatus: newStatus as any }
            : o
        ))
        setEditingOrderId(null)
        
        // Show success notification
        alert('Status pesanan berhasil diubah!')
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Gagal mengubah status pesanan')
    } finally {
      setUpdating(false)
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        order.id.toString().includes(searchTerm)
    const matchStatus = filterStatus === 'all' || order.orderStatus === filterStatus
    return matchSearch && matchStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800'
      case 'Shipped': return 'bg-blue-100 text-blue-800'
      case 'Processing': return 'bg-yellow-100 text-yellow-800'
      case 'Cancelled': return 'bg-red-100 text-red-800'
      case 'Paid': return 'bg-green-100 text-green-800'
      case 'Failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <FiCheck className="w-4 h-4" />
      case 'Processing': return <FiClock className="w-4 h-4" />
      case 'Shipped': return <FiPackage className="w-4 h-4" />
      case 'Cancelled': return <FiX className="w-4 h-4" />
      default: return null
    }
  }

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.orderStatus === 'Pending').length,
    processing: orders.filter(o => o.orderStatus === 'Processing').length,
    shipped: orders.filter(o => o.orderStatus === 'Shipped').length,
    delivered: orders.filter(o => o.orderStatus === 'Delivered').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Manajemen Pesanan</h1>
        <p className="text-gray-600 mt-1">Kelola semua pesanan pelanggan</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-600 text-sm">Total</p>
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow-md p-4 border border-yellow-200">
          <p className="text-yellow-800 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
        </div>
        <div className="bg-blue-50 rounded-lg shadow-md p-4 border border-blue-200">
          <p className="text-blue-800 text-sm">Processing</p>
          <p className="text-2xl font-bold text-blue-900">{stats.processing}</p>
        </div>
        <div className="bg-purple-50 rounded-lg shadow-md p-4 border border-purple-200">
          <p className="text-purple-800 text-sm">Shipped</p>
          <p className="text-2xl font-bold text-purple-900">{stats.shipped}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow-md p-4 border border-green-200">
          <p className="text-green-800 text-sm">Delivered</p>
          <p className="text-2xl font-bold text-green-900">{stats.delivered}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari pesanan..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">Semua Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Pelanggan</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Items</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Total</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Pembayaran</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-semibold text-gray-800">
                      #{order.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <div key={idx}>• {item}</div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="text-gray-400">+{order.items.length - 2} lainnya</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-800">
                      Rp {order.total.toLocaleString('id-ID')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                      <p className="text-xs text-gray-500">{order.paymentMethod}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {editingOrderId === order.id ? (
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleStatusChange(order, e.target.value)}
                        disabled={updating}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-semibold"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)}`}>
                        {getStatusIcon(order.orderStatus)}
                        <span>{order.orderStatus}</span>
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(order.date).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setEditingOrderId(editingOrderId === order.id ? null : order.id)}
                      className="inline-flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      disabled={updating}
                    >
                      <FiEdit2 className="w-4 h-4" />
                      <span>{editingOrderId === order.id ? 'Batal' : 'Ubah Status'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
