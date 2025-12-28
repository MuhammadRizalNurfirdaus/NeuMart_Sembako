'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { customerAPI } from '@/lib/api'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const menuItems = [
    { id: 'overview', icon: '👤', label: 'Profil Saya', color: 'blue' },
    { id: 'addresses', icon: '📍', label: 'Alamat Saya', color: 'green' },
    { id: 'orders', icon: '📦', label: 'Pesanan Saya', color: 'purple' },
    { id: 'payments', icon: '💳', label: 'Metode Pembayaran', color: 'orange' },
    { id: 'wishlist', icon: '❤️', label: 'Wishlist', color: 'red' },
    { id: 'reviews', icon: '⭐', label: 'Ulasan Saya', color: 'yellow' },
    { id: 'preferences', icon: '⚙️', label: 'Pengaturan', color: 'gray' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header with AI Assistant */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl border-4 border-white/30">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    '👤'
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    Selamat Datang, {user?.displayName || user?.email?.split('@')[0]}! 👋
                  </h1>
                  <p className="text-blue-100">Kelola akun dan belanja Anda dengan mudah</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-center">
                  <div className="text-3xl mb-2">🤖</div>
                  <p className="text-sm font-semibold">AI Assistant</p>
                  <p className="text-xs text-blue-100">Siap Membantu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Menu */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Menu</h2>
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all flex items-center space-x-3 ${
                        activeTab === item.id
                          ? `bg-${item.color}-100 text-${item.color}-700 shadow-md scale-105`
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              {activeTab === 'overview' && <ProfileOverview user={user} />}
              {activeTab === 'addresses' && <AddressManagement user={user} />}
              {activeTab === 'orders' && <OrderHistory user={user} />}
              {activeTab === 'payments' && <PaymentMethods user={user} />}
              {activeTab === 'wishlist' && <Wishlist user={user} />}
              {activeTab === 'reviews' && <MyReviews user={user} />}
              {activeTab === 'preferences' && <Preferences user={user} />}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// Component: Profile Overview
function ProfileOverview({ user }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Informasi Profil</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 font-medium">Nama Lengkap</label>
              <p className="text-lg text-gray-800 font-semibold">{user?.displayName || '-'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600 font-medium">Email</label>
              <p className="text-lg text-gray-800 font-semibold">{user?.email}</p>
            </div>
          </div>
          
          <div className="border-t pt-4 mt-6">
            <h3 className="font-semibold text-gray-700 mb-3">Status Akun</h3>
            <div className="flex items-center space-x-2">
              {user?.emailVerified ? (
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium flex items-center">
                  ✅ Email Terverifikasi
                </span>
              ) : (
                <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">
                  ⚠️ Email Belum Terverifikasi
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-4xl mb-2">📦</div>
          <p className="text-2xl font-bold">0</p>
          <p className="text-blue-100 text-sm">Total Pesanan</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-4xl mb-2">⭐</div>
          <p className="text-2xl font-bold">0</p>
          <p className="text-green-100 text-sm">Ulasan Diberikan</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-4xl mb-2">❤️</div>
          <p className="text-2xl font-bold">0</p>
          <p className="text-purple-100 text-sm">Item Wishlist</p>
        </div>
      </div>

      {/* AI Assistant Card */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-6">
        <div className="flex items-start space-x-4">
          <div className="text-5xl">🤖</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">AI Assistant Siap Membantu!</h3>
            <p className="text-gray-600 mb-4">
              Butuh bantuan? Tanyakan tentang promo, gratis ongkir, cara belanja, atau apapun ke chatbot AI kami!
            </p>
            <button 
              onClick={() => window.location.href = '/chatbot'}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
            >
              💬 Chat Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component: Address Management
function AddressManagement({ user }: any) {
  const [addresses, setAddresses] = useState<any[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)

  // Load addresses from database
  useEffect(() => {
    if (user?.uid) {
      loadAddresses()
    }
  }, [user?.uid])

  const loadAddresses = async () => {
    try {
      setLoading(true)
      const data = await customerAPI.getAddresses(user.uid)
      setAddresses(data)
    } catch (error) {
      console.error('Error loading addresses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddAddress = async (newAddress: any) => {
    try {
      setLoading(true)
      const addressData = {
        ...newAddress,
        userId: user?.uid
      }
      await customerAPI.addAddress(addressData)
      await loadAddresses() // Reload from database
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding address:', error)
      alert('Gagal menambah alamat. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAddress = async (id: number) => {
    if (confirm('Yakin ingin menghapus alamat ini?')) {
      try {
        setLoading(true)
        await customerAPI.deleteAddress(id)
        await loadAddresses() // Reload from database
      } catch (error) {
        console.error('Error deleting address:', error)
        alert('Gagal menghapus alamat. Silakan coba lagi.')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSetDefaultAddress = async (id: number) => {
    try {
      setLoading(true)
      await customerAPI.setDefaultAddress(id, user.uid)
      await loadAddresses() // Reload from database
    } catch (error) {
      console.error('Error setting default address:', error)
      alert('Gagal mengatur alamat utama. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Alamat Saya</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ➕ Tambah Alamat
        </button>
      </div>

      {showAddForm && (
        <AddressForm 
          onClose={() => setShowAddForm(false)}
          onSave={handleAddAddress}
        />
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-500">Memuat data...</p>
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📍</div>
          <p className="text-gray-500 text-lg">Belum ada alamat tersimpan</p>
          <p className="text-gray-400 text-sm mt-2">Tambahkan alamat untuk checkout lebih cepat!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <AddressCard 
              key={address.id} 
              address={address}
              onDelete={handleDeleteAddress}
              onSetDefault={handleSetDefaultAddress}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Data Provinsi dan Kota Indonesia
const indonesiaLocations = {
  'DKI Jakarta': ['Jakarta Pusat', 'Jakarta Utara', 'Jakarta Barat', 'Jakarta Selatan', 'Jakarta Timur', 'Kepulauan Seribu'],
  'Jawa Barat': ['Bandung', 'Bekasi', 'Bogor', 'Cirebon', 'Depok', 'Sukabumi', 'Tasikmalaya', 'Cimahi', 'Banjar', 'Garut', 'Indramayu', 'Karawang', 'Kuningan', 'Majalengka', 'Purwakarta', 'Subang', 'Sumedang'],
  'Jawa Tengah': ['Semarang', 'Surakarta', 'Magelang', 'Pekalongan', 'Salatiga', 'Tegal', 'Banyumas', 'Batang', 'Blora', 'Boyolali', 'Brebes', 'Cilacap', 'Demak', 'Grobogan', 'Jepara', 'Karanganyar', 'Kebumen', 'Kendal', 'Klaten', 'Kudus', 'Pati', 'Pemalang', 'Purbalingga', 'Purworejo', 'Rembang', 'Sragen', 'Sukoharjo', 'Temanggung', 'Wonogiri', 'Wonosobo'],
  'DI Yogyakarta': ['Yogyakarta', 'Bantul', 'Gunungkidul', 'Kulon Progo', 'Sleman'],
  'Jawa Timur': ['Surabaya', 'Malang', 'Kediri', 'Madiun', 'Mojokerto', 'Pasuruan', 'Probolinggo', 'Blitar', 'Batu', 'Banyuwangi', 'Bojonegoro', 'Bondowoso', 'Gresik', 'Jember', 'Jombang', 'Lamongan', 'Lumajang', 'Magetan', 'Nganjuk', 'Ngawi', 'Pacitan', 'Pamekasan', 'Ponorogo', 'Sampang', 'Sidoarjo', 'Situbondo', 'Sumenep', 'Trenggalek', 'Tuban', 'Tulungagung'],
  'Banten': ['Tangerang', 'Tangerang Selatan', 'Serang', 'Cilegon', 'Lebak', 'Pandeglang'],
  'Bali': ['Denpasar', 'Badung', 'Bangli', 'Buleleng', 'Gianyar', 'Jembrana', 'Karangasem', 'Klungkung', 'Tabanan'],
  'Sumatera Utara': ['Medan', 'Binjai', 'Pematangsiantar', 'Tebing Tinggi', 'Tanjungbalai', 'Padangsidimpuan', 'Sibolga', 'Gunung Sitoli', 'Asahan', 'Batubara', 'Dairi', 'Deli Serdang', 'Humbang Hasundutan', 'Karo', 'Labuhanbatu', 'Langkat', 'Mandailing Natal', 'Nias', 'Pakpak Bharat', 'Samosir', 'Serdang Bedagai', 'Simalungun', 'Tapanuli Selatan', 'Tapanuli Tengah', 'Tapanuli Utara', 'Toba Samosir'],
  'Sumatera Barat': ['Padang', 'Bukittinggi', 'Padang Panjang', 'Payakumbuh', 'Sawahlunto', 'Solok', 'Pariaman', 'Agam', 'Dharmasraya', 'Kepulauan Mentawai', 'Lima Puluh Kota', 'Padang Pariaman', 'Pasaman', 'Pesisir Selatan', 'Sijunjung', 'Tanah Datar'],
  'Sumatera Selatan': ['Palembang', 'Lubuklinggau', 'Pagar Alam', 'Prabumulih', 'Banyuasin', 'Empat Lawang', 'Lahat', 'Muara Enim', 'Musi Banyuasin', 'Musi Rawas', 'Ogan Ilir', 'Ogan Komering Ilir', 'Ogan Komering Ulu'],
  'Riau': ['Pekanbaru', 'Dumai', 'Bengkalis', 'Indragiri Hilir', 'Indragiri Hulu', 'Kampar', 'Kepulauan Meranti', 'Kuantan Singingi', 'Pelalawan', 'Rokan Hilir', 'Rokan Hulu', 'Siak'],
  'Lampung': ['Bandar Lampung', 'Metro', 'Lampung Barat', 'Lampung Selatan', 'Lampung Tengah', 'Lampung Timur', 'Lampung Utara', 'Pesawaran', 'Pringsewu', 'Tanggamus', 'Tulang Bawang', 'Way Kanan'],
  'Kalimantan Barat': ['Pontianak', 'Singkawang', 'Bengkayang', 'Kapuas Hulu', 'Kayong Utara', 'Ketapang', 'Kubu Raya', 'Landak', 'Melawi', 'Sambas', 'Sanggau', 'Sekadau', 'Sintang'],
  'Kalimantan Tengah': ['Palangka Raya', 'Barito Selatan', 'Barito Timur', 'Barito Utara', 'Gunung Mas', 'Kapuas', 'Katingan', 'Kotawaringin Barat', 'Kotawaringin Timur', 'Lamandau', 'Murung Raya', 'Pulang Pisau', 'Seruyan', 'Sukamara'],
  'Kalimantan Selatan': ['Banjarmasin', 'Banjarbaru', 'Balangan', 'Banjar', 'Barito Kuala', 'Hulu Sungai Selatan', 'Hulu Sungai Tengah', 'Hulu Sungai Utara', 'Kotabaru', 'Tabalong', 'Tanah Bumbu', 'Tanah Laut', 'Tapin'],
  'Kalimantan Timur': ['Balikpapan', 'Bontang', 'Samarinda', 'Berau', 'Kutai Barat', 'Kutai Kartanegara', 'Kutai Timur', 'Mahakam Ulu', 'Paser', 'Penajam Paser Utara'],
  'Sulawesi Utara': ['Manado', 'Bitung', 'Kotamobagu', 'Tomohon', 'Bolaang Mongondow', 'Kepulauan Sangihe', 'Kepulauan Siau Tagulandang Biaro', 'Kepulauan Talaud', 'Minahasa', 'Minahasa Selatan', 'Minahasa Tenggara', 'Minahasa Utara'],
  'Sulawesi Tengah': ['Palu', 'Banggai', 'Banggai Kepulauan', 'Buol', 'Donggala', 'Morowali', 'Parigi Moutong', 'Poso', 'Sigi', 'Tojo Una-Una', 'Toli-Toli'],
  'Sulawesi Selatan': ['Makassar', 'Palopo', 'Parepare', 'Bantaeng', 'Barru', 'Bone', 'Bulukumba', 'Enrekang', 'Gowa', 'Jeneponto', 'Kepulauan Selayar', 'Luwu', 'Luwu Timur', 'Luwu Utara', 'Maros', 'Pangkajene dan Kepulauan', 'Pinrang', 'Sidenreng Rappang', 'Sinjai', 'Soppeng', 'Takalar', 'Tana Toraja', 'Toraja Utara', 'Wajo'],
  'Sulawesi Tenggara': ['Kendari', 'Bau-Bau', 'Bombana', 'Buton', 'Kolaka', 'Konawe', 'Muna', 'Wakatobi'],
  'Maluku': ['Ambon', 'Tual', 'Buru', 'Kepulauan Aru', 'Maluku Barat Daya', 'Maluku Tengah', 'Maluku Tenggara', 'Maluku Tenggara Barat', 'Seram Bagian Barat', 'Seram Bagian Timur'],
  'Papua': ['Jayapura', 'Asmat', 'Biak Numfor', 'Boven Digoel', 'Deiyai', 'Dogiyai', 'Intan Jaya', 'Jayawijaya', 'Keerom', 'Kepulauan Yapen', 'Lanny Jaya', 'Mamberamo Raya', 'Mamberamo Tengah', 'Mappi', 'Merauke', 'Mimika', 'Nabire', 'Nduga', 'Paniai', 'Pegunungan Bintang', 'Puncak', 'Puncak Jaya', 'Sarmi', 'Supiori', 'Tolikara', 'Waropen', 'Yahukimo', 'Yalimo']
}

// Component: Add Address Form
function AddressForm({ onClose, onSave }: { onClose: () => void, onSave: (address: any) => void }) {
  const [formData, setFormData] = useState({
    label: 'Rumah',
    recipientName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    province: '',
    postalCode: '',
    isDefault: false
  })

  // Daftar kota berdasarkan provinsi yang dipilih
  const availableCities = formData.province ? indonesiaLocations[formData.province as keyof typeof indonesiaLocations] || [] : []

  const handleProvinceChange = (province: string) => {
    setFormData({ ...formData, province, city: '' }) // Reset city saat provinsi berubah
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simpan alamat ke state parent
    onSave(formData)
    // TODO: Nanti bisa ditambahkan API call
    // await customerAPI.addAddress(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-blue-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Tambah Alamat Baru</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Label Alamat</label>
          <select
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Rumah">🏠 Rumah</option>
            <option value="Kantor">🏢 Kantor</option>
            <option value="Kos">🏘️ Kos</option>
            <option value="Apartemen">🏬 Apartemen</option>
            <option value="Toko">🏪 Toko</option>
            <option value="Lainnya">📍 Lainnya</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nama Penerima</label>
          <input
            type="text"
            required
            value={formData.recipientName}
            onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nama lengkap penerima"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="08xxxxxxxxxx"
          pattern="[0-9]{10,13}"
        />
        <p className="text-xs text-gray-500 mt-1">Contoh: 081234567890</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
        <textarea
          required
          value={formData.addressLine1}
          onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          placeholder="Jalan, nomor rumah, RT/RW, Kelurahan, Kecamatan"
        />
        <p className="text-xs text-gray-500 mt-1">Contoh: Jl. Merdeka No. 123, RT 01/RW 05, Kelurahan Sukamaju</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Provinsi <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={formData.province}
            onChange={(e) => handleProvinceChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">🔍 Pilih Provinsi</option>
            {Object.keys(indonesiaLocations).sort().map((province) => (
              <option key={province} value={province}>
                📍 {province}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Cari dengan scroll atau ketik</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kota/Kabupaten <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${
              !formData.province ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!formData.province}
          >
            <option value="">
              {formData.province ? '🔍 Pilih Kota/Kabupaten' : '⚠️ Pilih provinsi terlebih dahulu'}
            </option>
            {availableCities.sort().map((city) => (
              <option key={city} value={city}>
                🏙️ {city}
              </option>
            ))}
          </select>
          {formData.province && (
            <p className="text-xs text-gray-500 mt-1">
              {availableCities.length} kota tersedia
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kode Pos <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Contoh: 12345"
            pattern="[0-9]{5}"
            maxLength={5}
          />
          <p className="text-xs text-gray-500 mt-1">5 digit angka</p>
        </div>
      </div>

      <div className="mb-6">
        <label className="flex items-center space-x-3 cursor-pointer group bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all">
          <input
            type="checkbox"
            checked={formData.isDefault}
            onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
          <div className="flex-1">
            <span className="text-gray-800 font-semibold group-hover:text-blue-600 transition-colors">
              Jadikan alamat utama
            </span>
            <p className="text-xs text-gray-500 mt-1">
              Alamat utama akan otomatis dipilih saat checkout
            </p>
          </div>
        </label>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-2">
          <span className="text-xl">💡</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-yellow-800 mb-1">Tips Pengisian Alamat:</p>
            <ul className="text-xs text-yellow-700 space-y-1">
              <li>• Pastikan nomor telepon aktif untuk konfirmasi pengiriman</li>
              <li>• Tulis alamat selengkap mungkin (RT/RW, Kelurahan, Kecamatan)</li>
              <li>• Provinsi & kota bisa dicari dengan mengetik di dropdown</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
        >
          💾 Simpan Alamat
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all"
        >
          ✖️ Batal
        </button>
      </div>
    </form>
  )
}

// Component: Address Card
function AddressCard({ address, onDelete, onSetDefault }: { address: any, onDelete: (id: number) => void, onSetDefault: (id: number) => void }) {
  return (
    <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-all bg-gradient-to-r from-white to-gray-50">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
            {address.label}
          </span>
          {address.isDefault && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              ✓ Utama
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          {!address.isDefault && (
            <button 
              onClick={() => onSetDefault(address.id)}
              className="text-green-600 hover:text-green-800 font-medium text-sm hover:underline"
            >
              Jadikan Utama
            </button>
          )}
          <button 
            onClick={() => onDelete(address.id)}
            className="text-red-600 hover:text-red-800 font-medium text-sm hover:underline"
          >
            Hapus
          </button>
        </div>
      </div>
      <p className="font-bold text-gray-800 text-lg">{address.recipientName}</p>
      <p className="text-gray-600 flex items-center mt-1">
        <span className="mr-2">📱</span>
        {address.phone}
      </p>
      <p className="text-gray-700 mt-3 leading-relaxed">{address.addressLine1}</p>
      <p className="text-gray-600 mt-1 flex items-center">
        <span className="mr-2">📍</span>
        {address.city}, {address.province} {address.postalCode}
      </p>
    </div>
  )
}

// Component: Order History
function OrderHistory({ user }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Pesanan Saya</h2>
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📦</div>
        <p className="text-gray-500 text-lg">Belum ada pesanan</p>
        <p className="text-gray-400 text-sm mt-2">Mulai belanja sekarang!</p>
        <button
          onClick={() => window.location.href = '/products'}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all"
        >
          🛍️ Belanja Sekarang
        </button>
      </div>
    </div>
  )
}

// Component: Payment Methods
function PaymentMethods({ user }: any) {
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)

  // Load payment methods from database
  useEffect(() => {
    if (user?.uid) {
      loadPaymentMethods()
    }
  }, [user?.uid])

  const loadPaymentMethods = async () => {
    try {
      setLoading(true)
      const data = await customerAPI.getPaymentMethods(user.uid)
      setPaymentMethods(data)
    } catch (error) {
      console.error('Error loading payment methods:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPaymentMethod = async (newMethod: any) => {
    try {
      setLoading(true)
      const methodData = {
        ...newMethod,
        userId: user?.uid
      }
      await customerAPI.addPaymentMethod(methodData)
      await loadPaymentMethods() // Reload from database
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding payment method:', error)
      alert('Gagal menambah metode pembayaran. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePaymentMethod = async (id: number) => {
    if (confirm('Yakin ingin menghapus metode pembayaran ini?')) {
      try {
        setLoading(true)
        await customerAPI.deletePaymentMethod(id)
        await loadPaymentMethods() // Reload from database
      } catch (error) {
        console.error('Error deleting payment method:', error)
        alert('Gagal menghapus metode pembayaran. Silakan coba lagi.')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSetDefaultPaymentMethod = async (id: number) => {
    try {
      setLoading(true)
      // Update via backend - assuming similar pattern to addresses
      const updatedMethods = paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
      setPaymentMethods(updatedMethods)
      // Note: You may need to add setDefaultPaymentMethod to customerAPI
    } catch (error) {
      console.error('Error setting default payment method:', error)
      alert('Gagal mengatur metode pembayaran utama. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Metode Pembayaran</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ➕ Tambah Metode
        </button>
      </div>

      {showAddForm && (
        <PaymentMethodForm 
          onClose={() => setShowAddForm(false)}
          onSave={handleAddPaymentMethod}
        />
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-500">Memuat data...</p>
        </div>
      ) : paymentMethods.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💳</div>
          <p className="text-gray-500 text-lg">Belum ada metode pembayaran tersimpan</p>
          <p className="text-gray-400 text-sm mt-2">Tambahkan untuk checkout lebih cepat!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <PaymentMethodCard 
              key={method.id} 
              method={method}
              onDelete={handleDeletePaymentMethod}
              onSetDefault={handleSetDefaultPaymentMethod}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Component: Payment Method Form
function PaymentMethodForm({ onClose, onSave }: { onClose: () => void, onSave: (method: any) => void }) {
  const [formData, setFormData] = useState({
    methodType: 'bank_transfer',
    provider: '',
    accountNumber: '',
    accountName: '',
    isDefault: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.methodType !== 'cod') {
      if (!formData.provider || !formData.accountNumber || !formData.accountName) {
        alert('Mohon lengkapi semua field!')
        return
      }
    }
    
    onSave(formData)
    setFormData({
      methodType: 'bank_transfer',
      provider: '',
      accountNumber: '',
      accountName: '',
      isDefault: false
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-orange-50 rounded-xl p-6 mb-6 border-2 border-orange-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Tambah Metode Pembayaran</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipe</label>
          <select
            value={formData.methodType}
            onChange={(e) => setFormData({ ...formData, methodType: e.target.value, provider: '' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="bank_transfer">🏦 Transfer Bank</option>
            <option value="e_wallet">💰 E-Wallet</option>
            <option value="credit_card">💳 Kartu Kredit</option>
            <option value="cod">💵 COD (Cash on Delivery)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
          <select
            value={formData.provider}
            onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            disabled={formData.methodType === 'cod'}
          >
            <option value="">
              {formData.methodType === 'cod' ? 'Tidak perlu provider' : 'Pilih Provider'}
            </option>
            {formData.methodType === 'bank_transfer' && (
              <>
                <option value="BCA">BCA</option>
                <option value="Mandiri">Mandiri</option>
                <option value="BNI">BNI</option>
                <option value="BRI">BRI</option>
                <option value="CIMB Niaga">CIMB Niaga</option>
                <option value="Permata">Permata</option>
                <option value="BSI">BSI</option>
              </>
            )}
            {formData.methodType === 'e_wallet' && (
              <>
                <option value="GoPay">GoPay</option>
                <option value="OVO">OVO</option>
                <option value="Dana">Dana</option>
                <option value="ShopeePay">ShopeePay</option>
                <option value="LinkAja">LinkAja</option>
              </>
            )}
            {formData.methodType === 'credit_card' && (
              <>
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="JCB">JCB</option>
                <option value="American Express">American Express</option>
              </>
            )}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {formData.methodType === 'cod' ? 'Catatan (Opsional)' : 'Nomor Rekening/Akun'}
          </label>
          <input
            type="text"
            value={formData.accountNumber}
            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder={formData.methodType === 'cod' ? 'Catatan tambahan' : '123456789'}
            disabled={formData.methodType === 'cod'}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {formData.methodType === 'cod' ? 'Nama Penerima' : 'Nama Pemilik'}
          </label>
          <input
            type="text"
            value={formData.accountName}
            onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder={formData.methodType === 'cod' ? 'Nama penerima pesanan' : 'Nama sesuai rekening'}
          />
        </div>
      </div>

      {formData.methodType === 'cod' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-2">
            <span className="text-xl">ℹ️</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-800 mb-1">Info COD:</p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Bayar saat barang diterima</li>
                <li>• Siapkan uang pas untuk mempermudah transaksi</li>
                <li>• Pastikan ada yang menerima pesanan di alamat tujuan</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isDefault}
            onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
            className="w-5 h-5 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
          />
          <span className="text-gray-700 font-medium">Jadikan metode utama</span>
        </label>
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
        >
          💾 Simpan
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all"
        >
          Batal
        </button>
      </div>
    </form>
  )
}

// Component: Payment Method Card
function PaymentMethodCard({ method, onDelete, onSetDefault }: { 
  method: any, 
  onDelete: (id: number) => void, 
  onSetDefault: (id: number) => void 
}) {
  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'bank_transfer': return '🏦'
      case 'e_wallet': return '💰'
      case 'credit_card': return '💳'
      case 'cod': return '💵'
      default: return '💳'
    }
  }

  const getMethodLabel = (type: string) => {
    switch (type) {
      case 'bank_transfer': return 'Transfer Bank'
      case 'e_wallet': return 'E-Wallet'
      case 'credit_card': return 'Kartu Kredit'
      case 'cod': return 'COD (Cash on Delivery)'
      default: return 'Metode Pembayaran'
    }
  }

  return (
    <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-orange-400 transition-all bg-gradient-to-r from-white to-orange-50">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getMethodIcon(method.methodType)}</span>
          <div>
            <p className="font-bold text-gray-800">{getMethodLabel(method.methodType)}</p>
            {method.methodType !== 'cod' && (
              <p className="text-sm text-gray-600">{method.provider}</p>
            )}
          </div>
          {method.isDefault && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              ✓ Utama
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          {!method.isDefault && (
            <button 
              onClick={() => onSetDefault(method.id)}
              className="text-green-600 hover:text-green-800 font-medium text-sm hover:underline"
            >
              Jadikan Utama
            </button>
          )}
          <button 
            onClick={() => onDelete(method.id)}
            className="text-red-600 hover:text-red-800 font-medium text-sm hover:underline"
          >
            Hapus
          </button>
        </div>
      </div>
      {method.methodType !== 'cod' && (
        <>
          <p className="text-gray-700 mt-2">
            <span className="text-gray-500">Nomor Rekening/Akun:</span> {method.accountNumber}
          </p>
          <p className="text-gray-700">
            <span className="text-gray-500">Atas Nama:</span> {method.accountName}
          </p>
        </>
      )}
      {method.methodType === 'cod' && (
        <p className="text-gray-600 text-sm mt-2">💡 Bayar saat barang diterima</p>
      )}
    </div>
  )
}

// Component: Wishlist
function Wishlist({ user }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Wishlist Saya</h2>
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❤️</div>
        <p className="text-gray-500 text-lg">Wishlist masih kosong</p>
        <p className="text-gray-400 text-sm mt-2">Simpan produk favorit Anda di sini!</p>
      </div>
    </div>
  )
}

// Component: My Reviews
function MyReviews({ user }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Ulasan Saya</h2>
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⭐</div>
        <p className="text-gray-500 text-lg">Belum ada ulasan</p>
        <p className="text-gray-400 text-sm mt-2">Berikan ulasan setelah berbelanja!</p>
      </div>
    </div>
  )
}

// Component: Preferences
function Preferences({ user }: any) {
  const [preferences, setPreferences] = useState({
    notificationEmail: true,
    notificationPromo: true,
    notificationOrder: true,
    language: 'id'
  })

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Pengaturan</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-gray-700 mb-4">Notifikasi</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <span className="text-gray-700">Notifikasi Email</span>
              <input
                type="checkbox"
                checked={preferences.notificationEmail}
                onChange={(e) => setPreferences({ ...preferences, notificationEmail: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded"
              />
            </label>
            <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <span className="text-gray-700">Notifikasi Promo</span>
              <input
                type="checkbox"
                checked={preferences.notificationPromo}
                onChange={(e) => setPreferences({ ...preferences, notificationPromo: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded"
              />
            </label>
            <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <span className="text-gray-700">Notifikasi Pesanan</span>
              <input
                type="checkbox"
                checked={preferences.notificationOrder}
                onChange={(e) => setPreferences({ ...preferences, notificationOrder: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded"
              />
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-700 mb-4">Bahasa</h3>
          <select
            value={preferences.language}
            onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
          </select>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold transition-all">
          💾 Simpan Pengaturan
        </button>
      </div>
    </div>
  )
}
