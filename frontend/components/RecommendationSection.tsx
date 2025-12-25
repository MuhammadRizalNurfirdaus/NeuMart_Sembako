'use client'

import { useCartStore } from '@/store/cartStore'
import { products, Product } from '@/data/products'
import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'

export default function RecommendationSection() {
  const { items } = useCartStore()
  const [recommendations, setRecommendations] = useState<Product[]>([])

  useEffect(() => {
    if (items.length === 0) {
      setRecommendations([])
      return
    }

    // AI Logic: Ambil produk yang sering dibeli bersamaan
    const relatedIds = new Set<number>()
    
    items.forEach(item => {
      if (item.product.relatedProducts) {
        item.product.relatedProducts.forEach(id => {
          // Jangan rekomendasikan produk yang sudah ada di keranjang
          const alreadyInCart = items.some(cartItem => cartItem.product.id === id)
          if (!alreadyInCart) {
            relatedIds.add(id)
          }
        })
      }
    })

    const recommendedProducts = Array.from(relatedIds)
      .map(id => products.find(p => p.id === id))
      .filter((p): p is Product => p !== undefined)
      .slice(0, 4) // Ambil maksimal 4 rekomendasi

    setRecommendations(recommendedProducts)
  }, [items])

  if (recommendations.length === 0) return null

  return (
    <div className="mt-12">
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-bold mb-2">🤖 Rekomendasi AI untuk Anda</h2>
        <p>Berdasarkan belanjaan Anda, produk ini sering dibeli bersamaan:</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
