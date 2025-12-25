'use client'

import { useState } from 'react'
import { FiSearch, FiMail, FiCalendar } from 'react-icons/fi'

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
  joinDate: string
  lastOrder: string
}

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: 'Budi Santoso',
    email: 'budi@gmail.com',
    phone: '+62 812-3456-7890',
    totalOrders: 15,
    totalSpent: 1250000,
    joinDate: '2025-01-15',
    lastOrder: '2025-12-24'
  },
  {
    id: 2,
    name: 'Siti Aminah',
    email: 'siti@gmail.com',
    phone: '+62 813-9876-5432',
    totalOrders: 8,
    totalSpent: 650000,
    joinDate: '2025-03-20',
    lastOrder: '2025-12-23'
  },
  {
    id: 3,
    name: 'Ahmad Rizki',
    email: 'ahmad@gmail.com',
    phone: '+62 821-1234-5678',
    totalOrders: 12,
    totalSpent: 980000,
    joinDate: '2025-02-10',
    lastOrder: '2025-12-22'
  },
  {
    id: 4,
    name: 'Dewi Lestari',
    email: 'dewi@gmail.com',
    phone: '+62 856-7890-1234',
    totalOrders: 20,
    totalSpent: 1850000,
    joinDate: '2024-12-05',
    lastOrder: '2025-12-24'
  }
]

export default function AdminCustomersPage() {
  const [customers] = useState<Customer[]>(mockCustomers)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  )

  const stats = {
    total: customers.length,
    active: customers.filter(c => {
      const lastOrder = new Date(c.lastOrder)
      const daysSince = (Date.now() - lastOrder.getTime()) / (1000 * 60 * 60 * 24)
      return daysSince <= 30
    }).length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgOrderValue: customers.reduce((sum, c) => sum + c.totalSpent, 0) / 
                    customers.reduce((sum, c) => sum + c.totalOrders, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Data Pelanggan</h1>
        <p className="text-gray-600 mt-1">Kelola informasi pelanggan Anda</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-medium">Total Pelanggan</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</h3>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-medium">Aktif (30 Hari)</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">{stats.active}</h3>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-2">
            Rp {stats.totalRevenue.toLocaleString('id-ID')}
          </h3>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm font-medium">Avg Order Value</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-2">
            Rp {Math.round(stats.avgOrderValue).toLocaleString('id-ID')}
          </h3>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari pelanggan..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Pelanggan</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Kontak</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Total Order</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Total Belanja</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Bergabung</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Order Terakhir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{customer.name}</p>
                        <p className="text-sm text-gray-500">ID: {customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <FiMail className="w-4 h-4" />
                        <span>{customer.email}</span>
                      </div>
                      <p className="text-sm text-gray-500">{customer.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-bold text-blue-600">
                      {customer.totalOrders}
                    </span>
                    <p className="text-xs text-gray-500">pesanan</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-bold text-green-600">
                      Rp {customer.totalSpent.toLocaleString('id-ID')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FiCalendar className="w-4 h-4" />
                      <span>{new Date(customer.joinDate).toLocaleDateString('id-ID')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {new Date(customer.lastOrder).toLocaleDateString('id-ID')}
                    </span>
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
