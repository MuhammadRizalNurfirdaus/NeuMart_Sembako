'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

interface ReviewFormProps {
  orderId: string
  productId: number
  productName: string
  userId: string
  userName: string
  onSubmit: () => void
  onCancel: () => void
}

export default function ReviewForm({
  orderId,
  productId,
  productName,
  userId,
  userName,
  onSubmit,
  onCancel
}: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [productQuality, setProductQuality] = useState(0)
  const [serviceRating, setServiceRating] = useState(0)
  const [deliveryRating, setDeliveryRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rating === 0) {
      alert('Mohon berikan rating untuk produk')
      return
    }

    setIsSubmitting(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api'
      const response = await fetch(`${apiUrl}/reviews/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          productId,
          productName,
          userId,
          userName,
          rating,
          productQuality: productQuality || rating,
          serviceRating: serviceRating || 5,
          deliveryRating: deliveryRating || 5,
          comment
        })
      })

      const data = await response.json()

      if (data.success) {
        alert('Review berhasil dikirim!')
        onSubmit()
      } else {
        alert('Gagal mengirim review: ' + data.message)
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Terjadi kesalahan saat mengirim review')
    } finally {
      setIsSubmitting(false)
    }
  }

  const StarRating = ({ 
    value, 
    onChange, 
    hover, 
    onHover 
  }: { 
    value: number
    onChange: (rating: number) => void
    hover?: number
    onHover?: (rating: number) => void
  }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => onHover && onHover(star)}
            onMouseLeave={() => onHover && onHover(0)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              size={28}
              className={`${
                star <= (hover || value)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Berikan Review</h2>
      <p className="text-gray-600 mb-6">Produk: <span className="font-semibold">{productName}</span></p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Overall Rating */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Rating Keseluruhan <span className="text-red-500">*</span>
          </label>
          <StarRating
            value={rating}
            onChange={setRating}
            hover={hoverRating}
            onHover={setHoverRating}
          />
          {rating > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {rating === 5 && 'Sangat Puas'}
              {rating === 4 && 'Puas'}
              {rating === 3 && 'Cukup'}
              {rating === 2 && 'Kurang Puas'}
              {rating === 1 && 'Tidak Puas'}
            </p>
          )}
        </div>

        {/* Product Quality */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Kualitas Produk
          </label>
          <StarRating
            value={productQuality}
            onChange={setProductQuality}
          />
        </div>

        {/* Service Rating */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Pelayanan
          </label>
          <StarRating
            value={serviceRating}
            onChange={setServiceRating}
          />
        </div>

        {/* Delivery Rating */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Pengantaran
          </label>
          <StarRating
            value={deliveryRating}
            onChange={setDeliveryRating}
          />
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Ulasan (Opsional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ceritakan pengalaman Anda dengan produk ini..."
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Review'}
          </button>
        </div>
      </form>
    </div>
  )
}
