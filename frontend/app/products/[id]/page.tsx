'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import ReviewList from '@/components/ReviewList'
import { useCartStore } from '@/store/cartStore'
import { Star, ShoppingCart, Package } from 'lucide-react'
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
  averageRating?: number
  reviewCount?: number
  relatedProducts?: number[]
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = parseInt(params.id as string)
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description')

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const response = await productsAPI.getById(productId)
        if (response.success && response.product) {
          setProduct(response.product)
          
          // Fetch related products if available
          if (response.product.relatedProducts && response.product.relatedProducts.length > 0) {
            const allProductsResponse = await productsAPI.getAll()
            if (allProductsResponse.success) {
              const related = allProductsResponse.products.filter((p: Product) => 
                response.product.relatedProducts?.includes(p.id)
              )
              setRelatedProducts(related)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h1>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    alert(`${product.name} berhasil ditambahkan ke keranjang!`)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  // Calculate price per unit
  const calculatePricePerUnit = () => {
    if (!product?.unit) return null
    
    const match = product.unit.match(/(\d+(?:\.\d+)?)\s*(\w+)/)
    if (!match) return null
    
    const quantity = parseFloat(match[1])
    const unit = match[2]
    
    if (quantity <= 0) return null
    
    const pricePerUnit = product.price / quantity
    
    const unitMap: { [key: string]: string } = {
      'kg': 'kg',
      'l': 'liter',
      'L': 'liter', 
      'liter': 'liter',
      'butir': 'butir',
      'pcs': 'pcs',
      'pack': 'pack',
      'gr': 'gram',
      'g': 'gram'
    }
    
    const displayUnit = unitMap[unit] || unit
    
    return {
      price: pricePerUnit,
      unit: displayUnit
    }
  }

  const pricePerUnit = calculatePricePerUnit()

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-primary-blue"></div>
            <p className="mt-4 text-gray-600">Memuat produk...</p>
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
          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Product Image */}
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>

              {/* Product Info */}
              <div>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-3">
                  {product.category}
                </span>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                  {product.name}
                </h1>

                {/* Rating Display */}
                {product.averageRating && product.reviewCount ? (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={20}
                          className={`${
                            star <= Math.round(product.averageRating!)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.averageRating.toFixed(1)} ({product.reviewCount} review)
                    </span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mb-4">Belum ada review</p>
                )}

                {/* Package Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package size={20} className="text-blue-600" />
                    <span className="font-semibold text-gray-800">Informasi Kemasan</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    📦 {product.unit}
                  </p>
                  {pricePerUnit && (
                    <p className="text-sm text-gray-600 mt-1">
                      ≈ {formatCurrency(pricePerUnit.price)} per {pricePerUnit.unit}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Harga Total</p>
                  <span className="text-4xl font-bold text-green-600">
                    {formatCurrency(product.price)}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <Package size={20} className="text-gray-600" />
                  <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `Stok: ${product.stock}` : 'Stok Habis'}
                  </span>
                </div>

                <p className="text-gray-700 mb-6">{product.description}</p>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-gray-700 font-medium">Jumlah:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-2 hover:bg-gray-100"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={20} />
                  {product.stock > 0 ? 'Tambah ke Keranjang' : 'Stok Habis'}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-6 py-3 font-medium ${
                    activeTab === 'description'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Deskripsi
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-3 font-medium ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Review ({product.reviewCount || 0})
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'description' ? (
                  <div>
                    <h3 className="text-xl font-bold mb-3">Detail Produk</h3>
                    <p className="text-gray-700">{product.description}</p>
                    <div className="mt-4 space-y-2">
                      <p><span className="font-semibold">Kategori:</span> {product.category}</p>
                      <p><span className="font-semibold">Unit:</span> {product.unit}</p>
                      <p><span className="font-semibold">Stok Tersedia:</span> {product.stock}</p>
                    </div>
                  </div>
                ) : (
                  <ReviewList productId={product.id} />
                )}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Produk Terkait</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
