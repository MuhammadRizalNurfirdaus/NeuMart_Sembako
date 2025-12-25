'use client'

import { useEffect, useState } from 'react'
import { Star, User } from 'lucide-react'

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

interface ReviewStatistics {
  totalReviews: number
  averageRating: number
  ratingDistribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

interface ReviewListProps {
  productId: number
}

export default function ReviewList({ productId }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [statistics, setStatistics] = useState<ReviewStatistics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [productId])

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/reviews/product/${productId}`)
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getProgressPercentage = (count: number, total: number) => {
    return total > 0 ? (count / total) * 100 : 0
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Memuat review...</p>
      </div>
    )
  }

  if (!statistics || statistics.totalReviews === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Belum ada review untuk produk ini.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Statistics Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Rating & Review</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Average Rating */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-800">
                {statistics.averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={`${
                      star <= Math.round(statistics.averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {statistics.totalReviews} review
              </p>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm">{star}</span>
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all"
                    style={{
                      width: `${getProgressPercentage(
                        statistics.ratingDistribution[star as keyof typeof statistics.ratingDistribution],
                        statistics.totalReviews
                      )}%`
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">
                  {statistics.ratingDistribution[star as keyof typeof statistics.ratingDistribution]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Ulasan Pelanggan</h3>
        
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow p-6">
            {/* User Info */}
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-gray-200 rounded-full p-2">
                <User size={24} />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{review.userName}</div>
                <div className="text-sm text-gray-500">{formatDate(review.createdAt)}</div>
              </div>
            </div>

            {/* Ratings */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-32">Rating Keseluruhan:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={`${
                        star <= review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-32">Kualitas Produk:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={`${
                        star <= review.productQuality
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-32">Pelayanan:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={`${
                        star <= review.serviceRating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-32">Pengantaran:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={`${
                        star <= review.deliveryRating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Comment */}
            {review.comment && (
              <p className="text-gray-700 mt-3">{review.comment}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
