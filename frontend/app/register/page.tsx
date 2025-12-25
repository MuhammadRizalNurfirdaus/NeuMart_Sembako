'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak sama')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter')
      setLoading(false)
      return
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
      const response = await axios.post(`${apiUrl}/auth/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      })

      if (response.data.success) {
        setSuccess(true)
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        setError(response.data.message || 'Registrasi gagal')
      }
    } catch (err: any) {
      console.error('Registration failed:', err)
      setError(err.response?.data?.message || 'Registrasi gagal. Email atau username mungkin sudah terdaftar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 via-green-600 to-blue-500 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Daftar Akun Baru
          </h1>
          <p className="text-gray-600">
            Bergabung dengan NeuMart Sembako
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm font-medium">
              ✅ Registrasi berhasil! Anda akan dialihkan ke halaman login...
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username unik Anda"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
              Nomor Telepon
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimal 6 karakter"
                required
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
              Konfirmasi Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Ulangi password"
                required
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Mendaftar...</span>
              </div>
            ) : (
              'Daftar Sekarang'
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-green-600 hover:text-green-700 font-semibold hover:underline">
            Login di sini
          </Link>
        </p>

        {/* Terms */}
        <p className="text-center text-gray-500 text-xs mt-4">
          Dengan mendaftar, Anda menyetujui{' '}
          <a href="#" className="text-green-600 hover:underline">
            Syarat & Ketentuan
          </a>{' '}
          dan{' '}
          <a href="#" className="text-green-600 hover:underline">
            Kebijakan Privasi
          </a>{' '}
          kami
        </p>
      </div>
    </div>
  )
}
