'use client'

import { FiShoppingBag, FiZap } from 'react-icons/fi'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="gradient-bg text-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Belanja Sembako <br />
              <span className="text-yellow-300">Lebih Pintar</span>
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Dengan teknologi AI, kami bantu Anda belanja sembako lebih efisien 
              dan memberikan ide resep dari bahan yang Anda punya!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/products"
                className="bg-white text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
              >
                <FiShoppingBag />
                Mulai Belanja
              </Link>
              <Link 
                href="/ai-recipe"
                className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition flex items-center justify-center gap-2"
              >
                <FiZap />
                Coba Fitur AI
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-8 bg-white rounded-full opacity-30 animate-pulse delay-75"></div>
              <div className="absolute inset-16 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">🛒🧠</div>
                  <p className="text-primary-blue font-bold text-xl">AI Powered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
