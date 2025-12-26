'use client'

import { useState } from 'react'
import { FaKey, FaCreditCard, FaBell, FaDatabase, FaSave, FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa'
import axios from 'axios'

export default function AdminSettingsPage() {
  // Password settings
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Payment settings
  const [paymentMethods, setPaymentMethods] = useState({
    cod: { enabled: true, name: 'Cash on Delivery (COD)' },
    bankTransfer: { 
      enabled: true, 
      name: 'Transfer Bank',
      banks: [
        { name: 'BCA', accountNumber: '1234567890', accountName: 'NeuMart Sembako' },
        { name: 'Mandiri', accountNumber: '0987654321', accountName: 'NeuMart Sembako' },
        { name: 'BNI', accountNumber: '5555666677', accountName: 'NeuMart Sembako' }
      ]
    },
    eWallet: { 
      enabled: true, 
      name: 'E-Wallet',
      wallets: [
        { name: 'GoPay', number: '081234567890' },
        { name: 'OVO', number: '081234567890' },
        { name: 'Dana', number: '081234567890' }
      ]
    }
  })
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentMessage, setPaymentMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Notification settings
  const [notifications, setNotifications] = useState({
    newOrder: true,
    lowStock: true,
    payment: true,
    dailyReport: false,
    weeklyReport: true,
    email: 'admin123@gmail.com',
    phone: '+62 831-0146-1069'
  })
  const [notificationLoading, setNotificationLoading] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Backup settings
  const [backupLoading, setBackupLoading] = useState(false)
  const [restoreLoading, setRestoreLoading] = useState(false)
  const [backupMessage, setBackupMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordLoading(true)
    setPasswordMessage(null)

    // Validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Password baru dan konfirmasi tidak cocok!' })
      setPasswordLoading(false)
      return
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password baru minimal 6 karakter!' })
      setPasswordLoading(false)
      return
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api'
      const response = await axios.post(`${apiUrl}/admin/change-password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })

      if (response.data.success) {
        setPasswordMessage({ type: 'success', text: 'Password berhasil diubah!' })
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      }
    } catch (error: any) {
      setPasswordMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Gagal mengubah password' 
      })
    } finally {
      setPasswordLoading(false)
    }
  }

  // Handle payment settings save
  const handlePaymentSave = async () => {
    setPaymentLoading(true)
    setPaymentMessage(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api'
      await axios.post(`${apiUrl}/admin/payment-settings`, paymentMethods)
      setPaymentMessage({ type: 'success', text: 'Pengaturan metode pembayaran berhasil disimpan!' })
    } catch (error) {
      setPaymentMessage({ type: 'error', text: 'Gagal menyimpan pengaturan pembayaran' })
    } finally {
      setPaymentLoading(false)
    }
  }

  // Handle notification settings save
  const handleNotificationSave = async () => {
    setNotificationLoading(true)
    setNotificationMessage(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api'
      await axios.post(`${apiUrl}/admin/notification-settings`, notifications)
      setNotificationMessage({ type: 'success', text: 'Pengaturan notifikasi berhasil disimpan!' })
    } catch (error) {
      setNotificationMessage({ type: 'error', text: 'Gagal menyimpan pengaturan notifikasi' })
    } finally {
      setNotificationLoading(false)
    }
  }

  // Handle database backup
  const handleBackup = async () => {
    setBackupLoading(true)
    setBackupMessage(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api'
      const response = await axios.get(`${apiUrl}/admin/backup`, {
        responseType: 'blob'
      })

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `neumart_backup_${new Date().toISOString().split('T')[0]}.json`)
      document.body.appendChild(link)
      link.click()
      link.remove()

      setBackupMessage({ type: 'success', text: 'Backup berhasil diunduh!' })
    } catch (error) {
      setBackupMessage({ type: 'error', text: 'Gagal membuat backup database' })
    } finally {
      setBackupLoading(false)
    }
  }

  // Handle database restore
  const handleRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setRestoreLoading(true)
    setBackupMessage(null)

    try {
      const formData = new FormData()
      formData.append('backup', file)

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api'
      await axios.post(`${apiUrl}/admin/restore`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      setBackupMessage({ type: 'success', text: 'Database berhasil di-restore!' })
    } catch (error) {
      setBackupMessage({ type: 'error', text: 'Gagal restore database' })
    } finally {
      setRestoreLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Pengaturan</h1>
        <p className="text-gray-600 mt-1">Konfigurasi sistem admin</p>
      </div>

      {/* 1. Change Password */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <FaKey className="text-red-600 text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Ubah Password Admin</h2>
            <p className="text-sm text-gray-600">Perbarui password untuk keamanan akun</p>
          </div>
        </div>

        {passwordMessage && (
          <div className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
            passwordMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {passwordMessage.type === 'success' ? <FaCheck /> : <FaTimes />}
            {passwordMessage.text}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password Saat Ini
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                placeholder="Masukkan password saat ini"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password Baru
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                placeholder="Minimal 6 karakter"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Konfirmasi Password Baru
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                placeholder="Ulangi password baru"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={passwordLoading}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
          >
            <FaSave />
            {passwordLoading ? 'Menyimpan...' : 'Ubah Password'}
          </button>
        </form>
      </div>

      {/* 2. Payment Methods */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <FaCreditCard className="text-blue-600 text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Metode Pembayaran</h2>
            <p className="text-sm text-gray-600">Konfigurasi metode pembayaran yang tersedia</p>
          </div>
        </div>

        {paymentMessage && (
          <div className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
            paymentMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {paymentMessage.type === 'success' ? <FaCheck /> : <FaTimes />}
            {paymentMessage.text}
          </div>
        )}

        <div className="space-y-4">
          {/* COD */}
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <h3 className="font-semibold text-gray-800">Cash on Delivery (COD)</h3>
                <p className="text-sm text-gray-600">Pembayaran saat barang diterima</p>
              </div>
              <input
                type="checkbox"
                checked={paymentMethods.cod.enabled}
                onChange={(e) => setPaymentMethods({
                  ...paymentMethods,
                  cod: { ...paymentMethods.cod, enabled: e.target.checked }
                })}
                className="w-5 h-5 text-blue-600"
              />
            </label>
          </div>

          {/* Bank Transfer */}
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="flex items-center justify-between cursor-pointer mb-4">
              <div>
                <h3 className="font-semibold text-gray-800">Transfer Bank</h3>
                <p className="text-sm text-gray-600">Pembayaran via transfer bank</p>
              </div>
              <input
                type="checkbox"
                checked={paymentMethods.bankTransfer.enabled}
                onChange={(e) => setPaymentMethods({
                  ...paymentMethods,
                  bankTransfer: { ...paymentMethods.bankTransfer, enabled: e.target.checked }
                })}
                className="w-5 h-5 text-blue-600"
              />
            </label>
            {paymentMethods.bankTransfer.enabled && (
              <div className="space-y-2 pl-4 border-l-2 border-blue-200">
                {paymentMethods.bankTransfer.banks.map((bank, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-semibold">{bank.name}:</span> {bank.accountNumber} - {bank.accountName}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* E-Wallet */}
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="flex items-center justify-between cursor-pointer mb-4">
              <div>
                <h3 className="font-semibold text-gray-800">E-Wallet</h3>
                <p className="text-sm text-gray-600">GoPay, OVO, Dana, dll</p>
              </div>
              <input
                type="checkbox"
                checked={paymentMethods.eWallet.enabled}
                onChange={(e) => setPaymentMethods({
                  ...paymentMethods,
                  eWallet: { ...paymentMethods.eWallet, enabled: e.target.checked }
                })}
                className="w-5 h-5 text-blue-600"
              />
            </label>
            {paymentMethods.eWallet.enabled && (
              <div className="space-y-2 pl-4 border-l-2 border-blue-200">
                {paymentMethods.eWallet.wallets.map((wallet, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-semibold">{wallet.name}:</span> {wallet.number}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handlePaymentSave}
          disabled={paymentLoading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
        >
          <FaSave />
          {paymentLoading ? 'Menyimpan...' : 'Simpan Pengaturan Pembayaran'}
        </button>
      </div>

      {/* 3. Notifications */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <FaBell className="text-green-600 text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Notifikasi</h2>
            <p className="text-sm text-gray-600">Atur notifikasi yang ingin diterima</p>
          </div>
        </div>

        {notificationMessage && (
          <div className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
            notificationMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {notificationMessage.type === 'success' ? <FaCheck /> : <FaTimes />}
            {notificationMessage.text}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <h3 className="font-semibold text-gray-800">Pesanan Baru</h3>
              <p className="text-sm text-gray-600">Notifikasi saat ada pesanan baru</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.newOrder}
              onChange={(e) => setNotifications({ ...notifications, newOrder: e.target.checked })}
              className="w-5 h-5 text-green-600"
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <h3 className="font-semibold text-gray-800">Stok Rendah</h3>
              <p className="text-sm text-gray-600">Peringatan saat stok produk menipis</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.lowStock}
              onChange={(e) => setNotifications({ ...notifications, lowStock: e.target.checked })}
              className="w-5 h-5 text-green-600"
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <h3 className="font-semibold text-gray-800">Pembayaran</h3>
              <p className="text-sm text-gray-600">Notifikasi saat ada pembayaran masuk</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.payment}
              onChange={(e) => setNotifications({ ...notifications, payment: e.target.checked })}
              className="w-5 h-5 text-green-600"
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <h3 className="font-semibold text-gray-800">Laporan Harian</h3>
              <p className="text-sm text-gray-600">Ringkasan penjualan setiap hari</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.dailyReport}
              onChange={(e) => setNotifications({ ...notifications, dailyReport: e.target.checked })}
              className="w-5 h-5 text-green-600"
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <h3 className="font-semibold text-gray-800">Laporan Mingguan</h3>
              <p className="text-sm text-gray-600">Ringkasan penjualan setiap minggu</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.weeklyReport}
              onChange={(e) => setNotifications({ ...notifications, weeklyReport: e.target.checked })}
              className="w-5 h-5 text-green-600"
            />
          </div>

          {/* Contact Info */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Notifikasi
              </label>
              <input
                type="email"
                value={notifications.email}
                onChange={(e) => setNotifications({ ...notifications, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                WhatsApp / Telepon
              </label>
              <input
                type="tel"
                value={notifications.phone}
                onChange={(e) => setNotifications({ ...notifications, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleNotificationSave}
          disabled={notificationLoading}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
        >
          <FaSave />
          {notificationLoading ? 'Menyimpan...' : 'Simpan Pengaturan Notifikasi'}
        </button>
      </div>

      {/* 4. Database Backup & Restore */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <FaDatabase className="text-purple-600 text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Backup & Restore Database</h2>
            <p className="text-sm text-gray-600">Cadangkan dan pulihkan data sistem</p>
          </div>
        </div>

        {backupMessage && (
          <div className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
            backupMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {backupMessage.type === 'success' ? <FaCheck /> : <FaTimes />}
            {backupMessage.text}
          </div>
        )}

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Backup Database</h3>
            <p className="text-sm text-gray-600 mb-4">
              Download semua data sistem dalam format JSON
            </p>
            <button
              onClick={handleBackup}
              disabled={backupLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              <FaDatabase />
              {backupLoading ? 'Membuat Backup...' : 'Download Backup'}
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Restore Database</h3>
            <p className="text-sm text-gray-600 mb-4">
              ⚠️ <strong>Perhatian:</strong> Restore akan mengganti semua data yang ada!
            </p>
            <input
              type="file"
              accept=".json"
              onChange={handleRestore}
              disabled={restoreLoading}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-3 file:px-6
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-600 file:text-white
                hover:file:bg-purple-700
                file:cursor-pointer cursor-pointer
                disabled:opacity-50"
            />
            {restoreLoading && (
              <p className="text-sm text-purple-600 mt-2">Restoring database...</p>
            )}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <div className="flex items-start gap-3">
          <div className="text-blue-500 text-xl mt-0.5">ℹ️</div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-1">Tips Keamanan:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Ubah password secara berkala (minimal setiap 3 bulan)</li>
              <li>• Gunakan password yang kuat (kombinasi huruf, angka, simbol)</li>
              <li>• Backup database minimal seminggu sekali</li>
              <li>• Simpan file backup di tempat yang aman</li>
              <li>• Aktifkan notifikasi penting untuk monitoring real-time</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

