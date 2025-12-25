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

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {showNotification && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm z-10 animate-bounce">
          ✓ Ditambahkan!
        </div>
      )}
      
      <Link href={`/products/${product.id}`}>
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center cursor-pointer">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform"
          />
          <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
            {product.category}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer">
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
        
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl font-bold text-primary-blue">
              {formatPrice(product.price)}
            </p>
            <p className="text-sm text-gray-500">per {product.unit}</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <FiPackage />
            <span>Stok: {product.stock}</span>
          </div>
        </div>

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
  )
}
