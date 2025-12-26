'use client'

import { useEffect, useState } from 'react'
import { Star, TrendingUp, MessageSquare, ThumbsUp, Package, Truck } from 'lucide-react'

interface Review {
  id: string
  orderId: string
  productId: number
  productName: string
  userId: string
  userName: string
  rating: number
  productQuality: number
  serviceRating: number
  deliveryRating: number
  comment: string
  createdAt: string
  status: string
}

interface Statistics {
  totalReviews: number
  overallRating: number
  productQuality: number
  serviceRating: number
  deliveryRating: number
  pendingReviews: number
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/reviews/all')
      const data = await response.json()

      if (data.success) {
        setReviews(data.reviews)
        setStatistics(data.statistics)
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (reviewId: string, status: string) => {
    try {
      const response = await fetch(`http://localhost:3003/api/reviews/${reviewId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      })

      const data = await response.json()

      if (data.success) {
        fetchReviews()
      }
    } catch (error) {
      console.error('Error updating review status:', error)
    }
  }

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus review ini?')) {
      return
    }

    try {
      const response = await fetch(`http://localhost:3003/api/reviews/${reviewId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        fetchReviews()
      }
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredReviews = filterStatus === 'all' 
    ? reviews 
    : reviews.filter(r => r.status === filterStatus)

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-500">Memuat data review...</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Review & Kepuasan Pelanggan</h1>
        <p className="text-gray-600">Kelola dan pantau feedback pelanggan</p>
      </div>

      {/* Statistics Cards */}
      {statistics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <MessageSquare className="text-blue-600" size={24} />
              <span className="text-2xl font-bold">{statistics.totalReviews}</span>
            </div>
            <p className="text-sm text-gray-600">Total Review</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <Star className="text-yellow-500" size={24} />
              <span className="text-2xl font-bold">{statistics.overallRating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-gray-600">Rating Keseluruhan</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <Package className="text-green-600" size={24} />
              <span className="text-2xl font-bold">{statistics.productQuality.toFixed(1)}</span>
            </div>
            <p className="text-sm text-gray-600">Kualitas Produk</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <ThumbsUp className="text-purple-600" size={24} />
              <span className="text-2xl font-bold">{statistics.serviceRating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-gray-600">Pelayanan</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <Truck className="text-orange-600" size={24} />
              <span className="text-2xl font-bold">{statistics.deliveryRating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-gray-600">Pengantaran</p>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded ${
              filterStatus === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Semua ({reviews.length})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded ${
              filterStatus === 'pending'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pending ({reviews.filter(r => r.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilterStatus('approved')}
            className={`px-4 py-2 rounded ${
              filterStatus === 'approved'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Disetujui ({reviews.filter(r => r.status === 'approved').length})
          </button>
          <button
            onClick={() => setFilterStatus('rejected')}
            className={`px-4 py-2 rounded ${
              filterStatus === 'rejected'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Ditolak ({reviews.filter(r => r.status === 'rejected').length})
          </button>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Pelanggan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Produk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ulasan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Tidak ada review
                  </td>
                </tr>
              ) : (
                filteredReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {review.userName}
                      </div>
                      <div className="text-sm text-gray-500">
                        Order: {review.orderId}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {review.productName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{review.rating}/5</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Produk: {review.productQuality}/5
                        </div>
                        <div className="text-xs text-gray-500">
                          Layanan: {review.serviceRating}/5
                        </div>
                        <div className="text-xs text-gray-500">
                          Antar: {review.deliveryRating}/5
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {review.comment || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(review.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        review.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : review.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {review.status === 'approved' && 'Disetujui'}
                        {review.status === 'pending' && 'Pending'}
                        {review.status === 'rejected' && 'Ditolak'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {review.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(review.id, 'approved')}
                              className="text-green-600 hover:text-green-800 text-sm font-medium"
                            >
                              Setujui
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(review.id, 'rejected')}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Tolak
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
