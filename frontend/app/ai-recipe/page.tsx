'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { generateRecipeFromCart } from '@/lib/recipeAI'
import { FiList, FiClock, FiTrendingUp, FiShoppingCart, FiPackage } from 'react-icons/fi'
import Link from 'next/link'
import axios from 'axios'
import { products as allProducts } from '@/data/products'

export default function AIRecipePage() {
  const { items } = useCartStore()
  const { user } = useAuthStore()
  const [recipes, setRecipes] = useState<any[]>([])
  const [purchasedItems, setPurchasedItems] = useState<any[]>([])
  const [allAvailableItems, setAllAvailableItems] = useState<any[]>([])
  const [showPurchased, setShowPurchased] = useState(true)
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null)

  // Fetch purchased items from delivered orders
  useEffect(() => {
    const fetchPurchasedItems = async () => {
      if (!user) return
      
      try {
        const response = await axios.get('http://localhost:5000/api/orders')
        if (response.data.success) {
          const userOrders = response.data.orders.filter(
            (order: any) => 
              order.user.uid === user.uid && 
              (order.orderStatus === 'Delivered' || order.orderStatus === 'Selesai')
          )
          
          // Extract unique items from delivered orders
          const itemsMap = new Map()
          userOrders.forEach((order: any) => {
            order.items.forEach((item: any) => {
              const product = allProducts.find(p => p.id === item.productId)
              if (product) {
                const existing = itemsMap.get(item.productId)
                if (existing) {
                  existing.quantity += item.quantity
                } else {
                  itemsMap.set(item.productId, {
                    product,
                    quantity: item.quantity
                  })
                }
              }
            })
          })
          
          setPurchasedItems(Array.from(itemsMap.values()))
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }
    
    fetchPurchasedItems()
  }, [user])

  // Combine cart items and purchased items
  useEffect(() => {
    const combined = [...items]
    
    // Add purchased items that are not in cart
    purchasedItems.forEach(purchased => {
      const existingInCart = items.find(i => i.product.id === purchased.product.id)
      if (!existingInCart) {
        combined.push(purchased)
      }
    })
    
    setAllAvailableItems(combined)
  }, [items, purchasedItems])

  // Generate recipes based on available items
  useEffect(() => {
    if (allAvailableItems.length > 0) {
      const productNames = allAvailableItems.map(item => item.product.name)
      const generatedRecipes = generateRecipeFromCart(productNames)
      setRecipes(generatedRecipes)
    }
  }, [allAvailableItems])

  // Get proper image URL
  const getImageUrl = (image: string | undefined) => {
    if (!image) return '/placeholder-product.png'
    if (image.startsWith('http')) return image
    return `http://localhost:3003/uploads/${image}`
  }

  if (allAvailableItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto px-4">
            <div className="text-8xl mb-6">🍳</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Fitur AI Recipe Generator
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Tambahkan produk ke keranjang atau mulai belanja, dan AI kami akan memberikan 
              ide resep masakan yang bisa Anda buat dari bahan yang tersedia!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products"
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
              >
                <FiShoppingCart />
                Mulai Belanja
              </Link>
              {user && (
                <Link 
                  href="/my-orders"
                  className="bg-white text-gray-700 border-2 border-gray-300 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
                >
                  <FiPackage />
                  Lihat Pesanan Saya
                </Link>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full mb-4">
              🤖 AI-Powered Recipe Generator
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Bingung Mau Masak Apa?
            </h1>
            <p className="text-xl text-gray-600">
              Berdasarkan {allAvailableItems.length} bahan yang Anda punya, inilah ide resep dari AI kami!
            </p>
          </div>

          {/* Toggle View */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-lg p-1 shadow-md inline-flex">
              <button
                onClick={() => setShowPurchased(false)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  !showPurchased 
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FiShoppingCart className="inline mr-2" />
                Di Keranjang ({items.length})
              </button>
              <button
                onClick={() => setShowPurchased(true)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  showPurchased 
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FiPackage className="inline mr-2" />
                Sudah Dibeli ({purchasedItems.length})
              </button>
            </div>
          </div>

          {/* Bahan yang Tersedia */}
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border-2 border-green-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              {showPurchased ? (
                <>
                  <FiPackage className="text-green-600" />
                  Bahan yang Sudah Dibeli
                </>
              ) : (
                <>
                  <FiShoppingCart className="text-green-600" />
                  Bahan di Keranjang
                </>
              )}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {(showPurchased ? purchasedItems : items).map(item => (
                <div 
                  key={item.product.id}
                  className="bg-gradient-to-br from-white to-green-50 border-2 border-green-200 rounded-xl p-3 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="relative mb-2 rounded-lg overflow-hidden aspect-square bg-white border border-gray-100">
                    <img 
                      src={getImageUrl(item.product.image)} 
                      alt={item.product.name}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="40" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E📦%3C/text%3E%3C/svg%3E'
                      }}
                    />
                    <div className="absolute top-1 right-1 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      x{item.quantity}
                    </div>
                  </div>
                  <p className="font-semibold text-sm text-gray-800 text-center line-clamp-2">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    {item.product.unit}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Auto AI Suggestion Info */}
            <div className="mt-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4 border-l-4 border-green-600">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🤖</div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">AI Otomatis Mendeteksi Bahan Anda!</p>
                  <p className="text-sm text-gray-600">
                    AI kami menganalisis {items.length} bahan di keranjang dan {purchasedItems.length} bahan 
                    yang sudah Anda beli (dari pesanan yang sudah diterima). Total {allAvailableItems.length} bahan 
                    tersedia untuk membuat resep!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resep-resep */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe, index) => (
              <div 
                key={index}
                onClick={() => setSelectedRecipe(recipe)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col h-full"
              >
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <FiList className="w-8 h-8" />
                    <h3 className="text-2xl font-bold">{recipe.name}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <FiClock />
                      <span>{recipe.cookingTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiTrendingUp />
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Deskripsi */}
                  {recipe.description && (
                    <div className="mb-4">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {recipe.description}
                      </p>
                    </div>
                  )}

                  {/* Bahan */}
                  <div className="mb-4 flex-1">
                    <h4 className="font-bold text-lg text-gray-800 mb-2">Bahan:</h4>
                    <ul className="space-y-1">
                      {recipe.ingredients.slice(0, 3).map((ingredient: string, i: number) => (
                        <li key={i} className="text-gray-700 flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sm">{ingredient}</span>
                        </li>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <li className="text-gray-500 text-sm italic">
                          +{recipe.ingredients.length - 3} bahan lainnya...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Button */}
                  <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-auto">
                    <FiList />
                    Lihat Cara Membuat
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Recipe Detail Modal */}
          {selectedRecipe && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedRecipe(null)}>
              <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-8 text-white sticky top-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-4">{selectedRecipe.name}</h2>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                          <FiClock />
                          <span>{selectedRecipe.cookingTime}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                          <FiTrendingUp />
                          <span>{selectedRecipe.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                          👥 {selectedRecipe.servings || '2-3 porsi'}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedRecipe(null)}
                      className="text-white hover:bg-white/20 rounded-full p-2 transition-all ml-4"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Bahan-bahan */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="text-3xl">🛒</span>
                      Bahan-bahan
                    </h3>
                    <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedRecipe.ingredients.map((ingredient: string, i: number) => (
                          <li key={i} className="text-gray-700 flex items-start gap-2">
                            <span className="text-green-500 text-xl">✓</span>
                            <span className="flex-1">{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Cara Membuat */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="text-3xl">👨‍🍳</span>
                      Cara Membuat
                    </h3>
                    <div className="space-y-4">
                      {selectedRecipe.instructions.map((step: string, i: number) => (
                        <div key={i} className="flex gap-4 bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                            {i + 1}
                          </div>
                          <p className="text-gray-700 flex-1 pt-2">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  {selectedRecipe.tips && (
                    <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="text-2xl">💡</span>
                        Tips & Trik
                      </h3>
                      <ul className="space-y-2">
                        {selectedRecipe.tips.map((tip: string, i: number) => (
                          <li key={i} className="text-gray-700 flex items-start gap-2">
                            <span className="text-yellow-500">★</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={() => setSelectedRecipe(null)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                    >
                      Tutup
                    </button>
                    <Link
                      href="/products"
                      className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all text-center"
                    >
                      Belanja Bahan
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 text-center bg-white rounded-lg p-8 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Butuh Bahan Tambahan?
            </h3>
            <p className="text-gray-600 mb-6">
              Lengkapi keranjang Anda untuk mendapatkan lebih banyak ide resep!
            </p>
            <Link 
              href="/products"
              className="bg-primary-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 inline-flex items-center gap-2"
            >
              <FiShoppingCart />
              Belanja Lagi
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
