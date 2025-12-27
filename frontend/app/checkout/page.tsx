'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FiCreditCard, FiMapPin, FiUser, FiPhone, FiCheck, FiMap } from 'react-icons/fi'
import axios from 'axios'
import dynamic from 'next/dynamic'

// Import Leaflet dinamically untuk avoid SSR issues
const MapComponent = dynamic(() => import('@/components/MapPicker'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 rounded-lg bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-3"></div>
        <p className="text-gray-600">Memuat peta...</p>
      </div>
    </div>
  )
})

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { user, isAuthenticated } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showMap, setShowMap] = useState(false)

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'COD',
    notes: '',
    latitude: '',
    longitude: ''
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  // Get proper image URL
  const getImageUrl = (image: string | undefined) => {
    if (!image) return '/placeholder-product.png'
    if (image.startsWith('http')) return image
    return `http://localhost:3003/uploads/${image}`
  }

  // Handle location update from map
  const handleLocationUpdate = (lat: number, lng: number, address: string) => {
    setFormData(prev => ({
      ...prev,
      latitude: lat.toString(),
      longitude: lng.toString(),
      address: address || prev.address
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderData = {
        user: {
          uid: user?.uid || 'guest',
          name: formData.name,
          phone: formData.phone
        },
        items: items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          subtotal: item.product.price * item.quantity
        })),
        totalPrice: getTotalPrice(),
        paymentMethod: formData.paymentMethod,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          latitude: formData.latitude,
          longitude: formData.longitude
        },
        notes: formData.notes,
        createdAt: new Date().toISOString()
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api'
      const response = await axios.post(`${apiUrl}/orders/create`, orderData)

      if (response.data.success) {
        setSuccess(true)
        clearCart()
        
        // Redirect after 3 seconds
        setTimeout(() => {
          router.push('/')
        }, 3000)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Gagal memproses pesanan. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  // Redirect if cart is empty
  if (items.length === 0 && !success) {
    router.push('/cart')
    return null
  }

  // Success screen
  if (success) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
          <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="text-green-600 text-4xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Pesanan Berhasil!</h1>
            <p className="text-gray-600 mb-6">
              Terima kasih telah berbelanja di NeuMart Sembako. 
              Pesanan Anda sedang diproses.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 font-semibold">Total Pembayaran</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {formatPrice(getTotalPrice())}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Anda akan dialihkan ke halaman utama dalam beberapa detik...
            </p>
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
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Info */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FiUser className="text-blue-600 text-xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Informasi Pribadi</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Nomor Telepon *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="08xxxxxxxxxx"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FiMapPin className="text-green-600 text-xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Alamat Pengiriman</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-gray-700 font-semibold">
                          Alamat Lengkap *
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowMap(!showMap)}
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-semibold"
                        >
                          <FiMap />
                          {showMap ? 'Tutup Maps' : 'Pilih di Maps'}
                        </button>
                      </div>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder="Jl. Contoh No. 123, RT/RW 01/02"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {formData.latitude && formData.longitude && (
                        <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                          <FiCheck className="text-sm" />
                          Koordinat: {parseFloat(formData.latitude).toFixed(6)}, {parseFloat(formData.longitude).toFixed(6)}
                        </p>
                      )}
                    </div>
                    
                    {/* OpenStreetMap (100% GRATIS) */}
                    {showMap && (
                      <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                        <div className="bg-green-50 border border-green-300 rounded-lg p-3 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">✅</span>
                            <p className="text-sm text-green-700">
                              <strong>100% GRATIS!</strong> Menggunakan OpenStreetMap - Tidak perlu API key, tidak perlu bayar, tidak perlu sign up!
                            </p>
                          </div>
                        </div>
                        <MapComponent
                          onLocationUpdate={handleLocationUpdate}
                          initialLat={formData.latitude ? parseFloat(formData.latitude) : -6.2088}
                          initialLng={formData.longitude ? parseFloat(formData.longitude) : 106.8456}
                        />
                        <p className="text-xs text-gray-600 mt-2">
                          💡 Klik pada peta untuk menentukan lokasi pengiriman yang tepat. Gunakan tombol "Lokasi Saya" untuk deteksi otomatis.
                        </p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Kota *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Kode Pos *
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                          placeholder="12345"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FiCreditCard className="text-purple-600 text-xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Metode Pembayaran</h2>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={formData.paymentMethod === 'COD'}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-600"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">Cash on Delivery (COD)</p>
                        <p className="text-sm text-gray-600">Bayar saat barang diterima</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Transfer"
                        checked={formData.paymentMethod === 'Transfer'}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-600"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">Transfer Bank</p>
                        <p className="text-sm text-gray-600">BCA, Mandiri, BNI</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="E-Wallet"
                        checked={formData.paymentMethod === 'E-Wallet'}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-600"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">E-Wallet</p>
                        <p className="text-sm text-gray-600">GoPay, OVO, Dana</p>
                      </div>
                    </label>
                  </div>

                  <div className="mt-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Catatan (Opsional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Catatan untuk penjual..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Ringkasan Pesanan</h2>

                  <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                    {items.map(item => (
                      <div key={item.product.id} className="flex gap-3 pb-3 border-b border-gray-200 hover:bg-gray-50 p-2 rounded-lg transition">
                        <div className="relative w-20 h-20 bg-white border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={getImageUrl(item.product.image)} 
                            alt={item.product.name}
                            className="w-full h-full object-contain p-1"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="40" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E📦%3C/text%3E%3C/svg%3E'
                            }}
                          />
                          <div className="absolute top-1 right-1 bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">{item.product.name}</p>
                          <p className="text-xs text-gray-500 mb-1">{item.product.unit}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-600">{item.quantity} x {formatPrice(item.product.price)}</p>
                            <p className="text-sm font-bold text-blue-600">{formatPrice(item.product.price * item.quantity)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Ongkir</span>
                      <span className="text-green-600 font-semibold">GRATIS</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
                      <span>Total</span>
                      <span className="text-blue-600">{formatPrice(getTotalPrice())}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-bold transition disabled:opacity-50"
                  >
                    {loading ? 'Memproses...' : 'Buat Pesanan'}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Dengan membuat pesanan, Anda menyetujui syarat dan ketentuan kami
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}
