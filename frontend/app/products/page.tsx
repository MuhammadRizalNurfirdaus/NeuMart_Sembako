'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiSearch, FiX } from 'react-icons/fi'
import { GiChefToque, GiCookingPot } from 'react-icons/gi'
import { productsAPI } from '@/lib/api'
import { useCartStore } from '@/store/cartStore'

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

export default function ProductsPage() {
  const router = useRouter()
  const { items } = useCartStore()
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showRecipeBanner, setShowRecipeBanner] = useState(false)

  // Show recipe banner if user has items
  useEffect(() => {
    if (items.length >= 3) {
      setShowRecipeBanner(true)
    }
  }, [items])
  
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
  
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (product.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Navbar />
      
      {/* AI Recipe Suggestion Banner */}
      {showRecipeBanner && (
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 text-white py-3 px-4 sticky top-16 z-40 shadow-lg">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🍳</div>
              <div>
                <p className="font-bold">Punya {items.length} bahan di keranjang!</p>
                <p className="text-xs text-green-50">
                  Lihat rekomendasi resep dari AI berdasarkan bahan yang Anda punya
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push('/ai-recipe')}
                className="bg-white text-green-600 px-4 py-2 rounded-lg font-bold hover:shadow-xl transition-all text-sm flex items-center gap-2"
              >
                <GiChefToque />
                Lihat Resep
              </button>
              <button
                onClick={() => setShowRecipeBanner(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              >
                <FiX />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Semua Produk Sembako
          </h1>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari produk sembako..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
            </div>
          </div>

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
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-primary-blue"></div>
              <p className="mt-4 text-gray-600 text-lg">Memuat produk...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-16">
              <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-6 rounded-lg inline-block">
                <p className="font-semibold text-lg">❌ {error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Muat Ulang
                </button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Produk tidak ditemukan</h3>
                  <p className="text-gray-600">Coba kata kunci lain atau pilih kategori berbeda</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  )

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Semua Produk Sembako
          </h1>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari produk sembako..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
            </div>
          </div>

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

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Produk tidak ditemukan</h3>
              <p className="text-gray-600">Coba kata kunci lain atau pilih kategori berbeda</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
