'use client'

import { useCartStore } from '@/store/cartStore'
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import RecommendationSection from '@/components/RecommendationSection'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-4">🛒</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Keranjang Kosong</h2>
            <p className="text-gray-600 mb-6">Yuk mulai belanja sembako!</p>
            <Link 
              href="/products"
              className="bg-primary-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 inline-block"
            >
              Lihat Produk
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
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Keranjang Belanja</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div key={item.product.id} className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">{item.product.name}</h3>
                      <p className="text-gray-600">{item.product.category} - {item.product.unit}</p>
                      <p className="text-2xl font-bold text-primary-blue mt-2">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        <FiMinus />
                      </button>
                      <span className="text-xl font-bold w-12 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-primary-blue text-white hover:bg-blue-600 flex items-center justify-center"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <FiTrash2 size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-md sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Ringkasan Belanja</h2>
                
                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={item.product.id} className="flex justify-between text-gray-600">
                      <span>{item.product.name} x{item.quantity}</span>
                      <span>{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-primary-blue">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>

                <Link
                  href="/ai-recipe"
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition mb-3 flex items-center justify-center gap-2"
                >
                  🍳 Bingung Mau Masak Apa?
                </Link>

                <Link
                  href="/checkout"
                  className="w-full bg-primary-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition mb-3 flex items-center justify-center gap-2"
                >
                  <FiShoppingBag />
                  Checkout
                </Link>

                <button 
                  onClick={clearCart}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Kosongkan Keranjang
                </button>
              </div>
            </div>
          </div>

          {/* AI Recommendation */}
          <RecommendationSection />
        </div>
      </div>
      <Footer />
    </>
  )
}
