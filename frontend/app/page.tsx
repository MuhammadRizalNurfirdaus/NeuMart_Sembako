'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import ProductSection from '@/components/ProductSection'
import AIFeatures from '@/components/AIFeatures'
import Chatbot from '@/components/Chatbot'
import { useCartStore } from '@/store/cartStore'
import { FiX } from 'react-icons/fi'
import { GiChefToque } from 'react-icons/gi'

export default function Home() {
  const router = useRouter()
  const { items } = useCartStore()
  const [showRecipeBanner, setShowRecipeBanner] = useState(false)

  useEffect(() => {
    // Show banner if user has 3 or more items in cart
    if (items.length >= 3) {
      setShowRecipeBanner(true)
    }
  }, [items])

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* AI Recipe Suggestion Banner */}
      {showRecipeBanner && (
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 text-white py-4 px-4 relative animate-pulse">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🤖👨‍🍳</div>
              <div>
                <p className="font-bold text-lg">Sudah Punya {items.length} Bahan!</p>
                <p className="text-sm text-green-50">
                  AI kami bisa memberikan rekomendasi resep masakan dari bahan yang Anda punya!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/ai-recipe')}
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:shadow-xl transition-all flex items-center gap-2"
              >
                <GiChefToque className="text-xl" />
                Lihat Resep AI
              </button>
              <button
                onClick={() => setShowRecipeBanner(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              >
                <FiX className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Hero />
      <AIFeatures />
      <ProductSection />
      <Footer />
      <Chatbot type="customer" />
    </main>
  )
}
