'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCartStore } from '@/store/cartStore'
import { generateRecipeFromCart } from '@/lib/recipeAI'
import { FiList, FiClock, FiTrendingUp, FiShoppingCart } from 'react-icons/fi'
import Link from 'next/link'

export default function AIRecipePage() {
  const { items } = useCartStore()
  const [recipes, setRecipes] = useState<any[]>([])

  useEffect(() => {
    if (items.length > 0) {
      const productNames = items.map(item => item.product.name)
      const generatedRecipes = generateRecipeFromCart(productNames)
      setRecipes(generatedRecipes)
    }
  }, [items])

  if (items.length === 0) {
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
              Tambahkan produk ke keranjang terlebih dahulu, dan AI kami akan memberikan 
              ide resep masakan yang bisa Anda buat!
            </p>
            <Link 
              href="/products"
              className="bg-primary-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 inline-flex items-center gap-2"
            >
              <FiShoppingCart />
              Mulai Belanja
            </Link>
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
              Berdasarkan {items.length} produk di keranjang Anda, inilah ide resep dari AI kami!
            </p>
          </div>

          {/* Produk di Keranjang */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FiShoppingCart className="text-primary-blue" />
              Bahan yang Tersedia
            </h2>
            <div className="flex flex-wrap gap-3">
              {items.map(item => (
                <div 
                  key={item.product.id}
                  className="bg-gradient-to-r from-blue-100 to-green-100 px-4 py-2 rounded-full flex items-center gap-2"
                >
                  <span className="text-2xl">{item.product.image}</span>
                  <span className="font-semibold">{item.product.name}</span>
                  <span className="text-sm text-gray-600">x{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resep-resep */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
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

                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-bold text-lg text-gray-800 mb-2">Bahan:</h4>
                    <ul className="space-y-1">
                      {recipe.ingredients.map((ingredient: string, i: number) => (
                        <li key={i} className="text-gray-700 flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-2">Cara Membuat:</h4>
                    <ol className="space-y-2">
                      {recipe.instructions.map((step: string, i: number) => (
                        <li key={i} className="text-gray-700 flex gap-3">
                          <span className="font-bold text-primary-blue">{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
