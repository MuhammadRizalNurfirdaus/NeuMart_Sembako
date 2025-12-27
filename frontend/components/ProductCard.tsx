'use client'

import { Product } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { FiShoppingCart, FiPackage } from 'react-icons/fi'
import { Star } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem)
  const [showNotification, setShowNotification] = useState(false)

  const handleAddToCart = () => {
    addItem(product)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  // Calculate price per unit (per kg, per liter, per butir, etc.)
  const calculatePricePerUnit = () => {
    if (!product.unit) return null
    
    // Extract number from unit (e.g., "5kg" -> 5, "10 butir" -> 10, "1L" -> 1)
    const match = product.unit.match(/(\d+(?:\.\d+)?)\s*(\w+)/)
    if (!match) return null
    
    const quantity = parseFloat(match[1])
    const unit = match[2]
    
    if (quantity <= 0) return null
    
    const pricePerUnit = product.price / quantity
    
    // Map unit to proper display
    const unitMap: { [key: string]: string } = {
      'kg': 'kg',
      'l': 'liter',
      'L': 'liter', 
      'liter': 'liter',
      'butir': 'butir',
      'pcs': 'pcs',
      'pack': 'pack',
      'gr': 'gram',
      'g': 'gram'
    }
    
    const displayUnit = unitMap[unit] || unit
    
    return {
      price: pricePerUnit,
      unit: displayUnit
    }
  }

  const pricePerUnit = calculatePricePerUnit()

  // Get proper image URL
  const getImageUrl = (image: string | undefined) => {
    if (!image) return '/placeholder-product.png' // Default placeholder
    if (image.startsWith('http')) return image // External URL (Unsplash, etc)
    return `http://localhost:3003/uploads/${image}` // Local uploaded file
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full">
      {showNotification && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm z-10 animate-bounce">
          ✓ Ditambahkan!
        </div>
      )}
      
      <Link href={`/products/${product.id}`}>
        <div className="relative h-48 bg-white flex items-center justify-center cursor-pointer overflow-hidden border-b border-gray-100">
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            className="h-full w-full object-contain p-2 group-hover:scale-105 transition-transform"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="40" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E📦%3C/text%3E%3C/svg%3E'
            }}
          />
          <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
            {product.category}
          </div>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer line-clamp-2 min-h-[56px]">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating Display */}
        {product.averageRating && product.reviewCount ? (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={`${
                    star <= Math.round(product.averageRating!)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              ({product.reviewCount})
            </span>
          </div>
        ) : null}
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[40px]">{product.description}</p>
        
        {/* Package Size Badge */}
        <div className="mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
            📦 Isi: {product.unit}
          </span>
        </div>
        
        <div className="space-y-2 mb-3">
          {/* Total Price */}
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase">Harga</p>
              <p className="text-2xl font-bold text-primary-blue">
                {formatPrice(product.price)}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <FiPackage />
              <span>Stok: {product.stock}</span>
            </div>
          </div>
          
          {/* Price per unit */}
          {pricePerUnit && (
            <div className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
              ≈ {formatPrice(pricePerUnit.price)} per {pricePerUnit.unit}
            </div>
          )}
        </div>

        <div className="mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary-blue text-white hover:bg-blue-600'
            }`}
          >
            <FiShoppingCart />
            {product.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
          </button>
        </div>
      </div>
    </div>
  )
}
