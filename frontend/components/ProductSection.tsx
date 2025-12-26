'use client'

import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { productsAPI } from '@/lib/api'

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  unit?: string
  image?: string
  description?: string
}

export default function ProductSection() {
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError('')
        const response = await productsAPI.getAll()
        
        if (response.success && response.products) {
          setProducts(response.products)
        } else {
          setError('Gagal memuat produk')
        }
      } catch (err: any) {
        console.error('Error fetching products:', err)
        setError(err.message || 'Gagal menghubungi server')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])
  
  const categories = ['Semua', ...new Set(products.map(p => p.category).filter(Boolean))]
  
  const filteredProducts = selectedCategory === 'Semua' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Produk Sembako Kami
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === category
                  ? 'bg-primary-blue text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-primary-blue"></div>
            <p className="mt-4 text-gray-600">Memuat produk...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg inline-block">
              <p className="font-semibold">❌ {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Muat Ulang
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                Tidak ada produk tersedia
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
