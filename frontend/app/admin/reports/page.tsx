'use client'

import { useState } from 'react'
import { FiDownload, FiCalendar, FiDollarSign, FiTrendingUp } from 'react-icons/fi'
import { Line, Bar } from 'react-chartjs-2'

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState('30days')

  const codRevenue = 8950000
  const onlineRevenue = 6800000
  const totalRevenue = codRevenue + onlineRevenue

  // Revenue by date
  const revenueByDateData = {
    labels: ['1 Dec', '5 Dec', '10 Dec', '15 Dec', '20 Dec', '24 Dec'],
    datasets: [
      {
        label: 'COD',
        data: [250000, 380000, 420000, 510000, 480000, 550000],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2
      },
      {
        label: 'Online Transfer',
        data: [180000, 220000, 290000, 350000, 380000, 420000],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
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
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return 'Rp ' + value.toLocaleString('id-ID')
          }
        }
      }
    }
  }

  const exportReport = (format: 'excel' | 'pdf') => {
    alert(`Exporting report as ${format.toUpperCase()}...\n\nFitur ini akan mendownload laporan keuangan lengkap!`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Laporan Keuangan</h1>
          <p className="text-gray-600 mt-1">Analisis pendapatan & metode pembayaran</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button
            onClick={() => exportReport('excel')}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            <FiDownload />
            <span>Export Excel</span>
          </button>
          <button
            onClick={() => exportReport('pdf')}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            <FiDownload />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center space-x-4">
          <FiCalendar className="text-gray-500" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="7days">7 Hari Terakhir</option>
            <option value="30days">30 Hari Terakhir</option>
            <option value="3months">3 Bulan Terakhir</option>
            <option value="1year">1 Tahun Terakhir</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <p className="text-blue-100">Pendapatan COD</p>
            <FiDollarSign className="text-3xl text-blue-200" />
          </div>
          <h3 className="text-3xl font-bold mb-2">Rp {codRevenue.toLocaleString('id-ID')}</h3>
          <div className="flex items-center text-blue-100 text-sm">
            <FiTrendingUp className="mr-1" />
            <span>60% dari total pendapatan</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <p className="text-green-100">Pendapatan Online</p>
            <FiDollarSign className="text-3xl text-green-200" />
          </div>
          <h3 className="text-3xl font-bold mb-2">Rp {onlineRevenue.toLocaleString('id-ID')}</h3>
          <div className="flex items-center text-green-100 text-sm">
            <FiTrendingUp className="mr-1" />
            <span>40% dari total pendapatan</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <p className="text-purple-100">Total Pendapatan</p>
            <FiDollarSign className="text-3xl text-purple-200" />
          </div>
          <h3 className="text-3xl font-bold mb-2">Rp {totalRevenue.toLocaleString('id-ID')}</h3>
          <div className="flex items-center text-purple-100 text-sm">
            <FiTrendingUp className="mr-1" />
            <span>+12.5% dari bulan lalu</span>
          </div>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Perbandingan Pendapatan COD vs Online Transfer
        </h2>
        <div className="h-80">
          <Bar data={revenueByDateData} options={chartOptions} />
        </div>
      </div>

      {/* Detailed Breakdown Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Rincian Transaksi</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Total Transaksi</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">COD</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Online</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { date: '24 Des 2025', count: 42, cod: 550000, online: 420000 },
                { date: '23 Des 2025', count: 38, cod: 480000, online: 380000 },
                { date: '22 Des 2025', count: 35, cod: 510000, online: 350000 },
                { date: '21 Des 2025', count: 40, cod: 420000, online: 290000 },
                { date: '20 Des 2025', count: 32, cod: 380000, online: 220000 },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800 font-medium">{row.date}</td>
                  <td className="px-6 py-4 text-gray-600">{row.count} transaksi</td>
                  <td className="px-6 py-4 text-blue-600 font-semibold">
                    Rp {row.cod.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-green-600 font-semibold">
                    Rp {row.online.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-bold">
                    Rp {(row.cod + row.online).toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t-2 border-gray-300">
              <tr>
                <td className="px-6 py-4 font-bold text-gray-800" colSpan={2}>TOTAL</td>
                <td className="px-6 py-4 font-bold text-blue-700">
                  Rp {codRevenue.toLocaleString('id-ID')}
                </td>
                <td className="px-6 py-4 font-bold text-green-700">
                  Rp {onlineRevenue.toLocaleString('id-ID')}
                </td>
                <td className="px-6 py-4 font-bold text-gray-900 text-lg">
                  Rp {totalRevenue.toLocaleString('id-ID')}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* AI Analytics Insights */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-md p-6 text-white">
        <h2 className="text-xl font-bold mb-4">📊 AI Analytics & Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm font-semibold mb-2">💡 Rekomendasi Strategi</p>
            <p className="text-sm">
              Promosikan Transfer Online dengan diskon 5% untuk meningkatkan profit margin. 
              COD memiliki biaya operasional lebih tinggi.
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm font-semibold mb-2">📈 Prediksi Trend</p>
            <p className="text-sm">
              Berdasarkan data 30 hari, pendapatan akan mencapai <strong>Rp 18.5 juta</strong> bulan depan 
              (+15% growth).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
