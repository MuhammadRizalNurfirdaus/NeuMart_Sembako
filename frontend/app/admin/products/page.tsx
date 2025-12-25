'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiImage } from 'react-icons/fi'

const API_URL = 'http://localhost:3001/api'

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  unit: string
  image: string
  description: string
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    unit: 'kg',
    description: ''
  })
  const [loading, setLoading] = useState(false)

  const categories = ['Beras', 'Minyak', 'Gula & Garam', 'Telur', 'Mie Instan', 'Bumbu Dapur', 'Snack', 'Minuman']

  // Fetch products from backend
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`)
      // Backend returns { success, products } format
      const productsData = response.data.products || response.data
      const productsArray = Array.isArray(productsData) ? productsData : []
      setProducts(productsArray)
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([]) // Set empty array on error
      alert('Gagal memuat data produk')
    }
  }

  const filteredProducts = Array.isArray(products) 
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const handleAdd = () => {
    setEditingProduct(null)
    setImageFile(null)
    setImagePreview('')
    setFormData({
      name: '',
      category: '',
      price: 0,
      stock: 0,
      unit: 'kg',
      description: ''
    })
    setIsModalOpen(true)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setImageFile(null)
    setImagePreview(product.image ? `${API_URL.replace('/api', '')}/uploads/${product.image}` : '')
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      unit: product.unit,
      description: product.description
    })
    setIsModalOpen(true)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB')
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return
    
    try {
      await axios.delete(`${API_URL}/products/${id}`)
      setProducts(products.filter(p => p.id !== id))
      alert('Produk berhasil dihapus!')
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Gagal menghapus produk')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('category', formData.category)
      formDataToSend.append('price', formData.price.toString())
      formDataToSend.append('stock', formData.stock.toString())
      formDataToSend.append('unit', formData.unit)
      formDataToSend.append('description', formData.description)
      
      if (imageFile) {
        formDataToSend.append('image', imageFile)
      }

      if (editingProduct) {
        // Update existing product
        await axios.put(`${API_URL}/products/${editingProduct.id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        alert('Produk berhasil diupdate!')
      } else {
        // Add new product
        await axios.post(`${API_URL}/products`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        alert('Produk berhasil ditambahkan!')
      }
      
      fetchProducts()
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Gagal menyimpan produk')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Produk</h1>
          <p className="text-gray-600 mt-1">Kelola stok sembako Anda</p>
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 md:mt-0 flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition shadow-md"
        >
          <FiPlus />
          <span>Tambah Produk</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari produk..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Produk</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Kategori</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Harga</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Stok</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {product.image ? (
                        <img 
                          src={`${API_URL.replace('/api', '')}/uploads/${product.image}`} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <FiImage className="text-gray-400 text-2xl" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-800">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    Rp {product.price.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                      {product.stock} {product.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingProduct ? 'Edit Produk' : 'Tambah Produk'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Pilih Kategori</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stok
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                      required
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <select
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="kg">kg</option>
                      <option value="liter">liter</option>
                      <option value="pcs">pcs</option>
                      <option value="pack">pack</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Foto Produk
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  {imagePreview && (
                    <div className="relative w-32 h-32">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover rounded-lg border-2 border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null)
                          setImagePreview('')
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Menyimpan...' : (editingProduct ? 'Update' : 'Tambah')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
