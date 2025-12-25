'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { 
  FiDollarSign, 
  FiShoppingCart, 
  FiPackage, 
  FiUsers,
  FiTrendingUp,
  FiTrendingDown
} from 'react-icons/fi'

// Dynamically import charts with no SSR
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading chart...</div>
})
const Pie = dynamic(() => import('react-chartjs-2').then((mod) => mod.Pie), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading chart...</div>
})
const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading chart...</div>
})

interface Stats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalCustomers: number
  codOrders: number
  onlineOrders: number
  revenueGrowth: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    codOrders: 0,
    onlineOrders: 0,
    revenueGrowth: 0
  })
  const [loading, setLoading] = useState(true)
  const [chartsReady, setChartsReady] = useState(false)

  // Register Chart.js components on client side only
  useEffect(() => {
    const registerCharts = async () => {
      const { Chart: ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } = await import('chart.js')
      
      ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        ArcElement,
        Title,
        Tooltip,
        Legend,
        Filler
      )
      
      setChartsReady(true)
    }
    
    registerCharts()
  }, [])

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
      const response = await axios.get(`${apiUrl}/admin/stats`)
      setStats(response.data.stats)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
      // Use mock data for demo
      setStats({
        totalRevenue: 15750000,
        totalOrders: 248,
        totalProducts: 12,
        totalCustomers: 156,
        codOrders: 148,
        onlineOrders: 100,
        revenueGrowth: 12.5
      })
    } finally {
      setLoading(false)
    }
  }

  // Revenue Trend Data (30 days)
  const revenueTrendData = {
    labels: ['1', '5', '10', '15', '20', '25', '30'],
    datasets: [
      {
        label: 'Pendapatan (Rp)',
        data: [450000, 520000, 680000, 720000, 650000, 780000, 850000],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  // Payment Method Pie Chart
  const paymentMethodData = {
    labels: ['COD', 'Transfer Online'],
    datasets: [
      {
        data: [stats.codOrders, stats.onlineOrders],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)'
        ],
        borderWidth: 2
      }
    ]
  }

  // Top Products Bar Chart
  const topProductsData = {
    labels: ['Beras Premium', 'Minyak Goreng', 'Gula Pasir', 'Telur Ayam', 'Mie Instan'],
    datasets: [
      {
        label: 'Terjual (pcs)',
        data: [120, 95, 88, 76, 65],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Selamat datang di NeuMart Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Pendapatan</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                Rp {stats.totalRevenue.toLocaleString('id-ID')}
              </h3>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <FiTrendingUp className="mr-1" />
                <span>+{stats.revenueGrowth}% dari bulan lalu</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FiDollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Pesanan</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {stats.totalOrders}
              </h3>
              <p className="text-gray-500 text-sm mt-2">Bulan ini</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FiShoppingCart className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Produk</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {stats.totalProducts}
              </h3>
              <p className="text-gray-500 text-sm mt-2">Aktif di katalog</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FiPackage className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Pelanggan</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {stats.totalCustomers}
              </h3>
              <p className="text-gray-500 text-sm mt-2">Pengguna terdaftar</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <FiUsers className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      {chartsReady && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Trend */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Tren Pendapatan (30 Hari)</h2>
              <div className="h-64">
                <Line data={revenueTrendData} options={chartOptions} />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Metode Pembayaran</h2>
              <div className="h-64">
                <Pie data={paymentMethodData} options={chartOptions} />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">COD:</span>
                  <span className="font-semibold">{stats.codOrders} pesanan</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Online:</span>
                  <span className="font-semibold">{stats.onlineOrders} pesanan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Top 5 Produk Terlaris</h2>
            <div className="h-64">
              <Bar data={topProductsData} options={chartOptions} />
            </div>
          </div>
        </>
      )}
      
      {!chartsReady && (
        <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-md">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat grafik...</p>
          </div>
        </div>
      )}

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl shadow-md p-6 text-white">
        <h2 className="text-xl font-bold mb-4">🤖 AI Insights & Rekomendasi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm font-semibold mb-2">⚠️ Peringatan Stok</p>
            <p className="text-sm">Beras Premium tinggal 5 pcs. Berdasarkan tren mingguan, stok akan habis dalam <strong>2 hari</strong>. Segera restock!</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm font-semibold mb-2">📈 Prediksi Permintaan</p>
            <p className="text-sm">Minyak Goreng diprediksi akan naik <strong>25%</strong> minggu depan. Pertimbangkan untuk menambah stok.</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm font-semibold mb-2">💡 Rekomendasi Bundling</p>
            <p className="text-sm">70% pelanggan yang beli Beras juga beli Minyak. Buat paket bundling untuk meningkatkan penjualan!</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm font-semibold mb-2">🎯 Target Marketing</p>
            <p className="text-sm">Pelanggan di area Jakarta Selatan paling aktif jam 10-12 siang. Jadwalkan promo di waktu tersebut.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
