'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { handleGoogleLogin } from '@/lib/firebase'
import { useAuthStore } from '@/store/authStore'
import { FaGoogle, FaShoppingBag } from 'react-icons/fa'
import axios from 'axios'

export default function LoginPage() {
  const router = useRouter()
  const { user, setUser, isAuthenticated } = useAuthStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on role
      if (user.role === 'admin') {
        router.push('/admin/dashboard')
      } else {
        router.push('/')
      }
    }
  }, [isAuthenticated, user, router])

  // Handle username/password login (untuk customer DAN admin)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
      const response = await axios.post(`${apiUrl}/auth/login-credentials`, {
        username,
        password
      })

      if (response.data.success) {
        // Save user to Zustand store
        setUser(response.data.user)
        
        // Redirect based on role
        if (response.data.user.role === 'admin') {
          router.push('/admin/dashboard')
        } else {
          router.push('/')
        }
      } else {
        setError(response.data.message || 'Username atau password salah')
      }
    } catch (err: any) {
      console.error('Login failed:', err)
      setError(err.response?.data?.message || 'Username atau password salah')
    } finally {
      setLoading(false)
    }
  }

  // Handle Google login
  const handleGoogleAuth = async () => {
    try {
      setGoogleLoading(true)
      setError(null)

      // Google Firebase Login
      const userData = await handleGoogleLogin()
      
      // Save user to Zustand store (customer role by default)
      setUser({ ...userData, role: 'customer' })

      // Send user data to backend API
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
        await axios.post(`${apiUrl}/auth/login`, {
          uid: userData.uid,
          email: userData.email,
          displayName: userData.displayName,
          photoURL: userData.photoURL,
          emailVerified: userData.emailVerified,
          role: 'customer',
          loginAt: new Date().toISOString()
        })
      } catch (apiError) {
        console.error('Failed to send user data to backend:', apiError)
      }

      // Redirect to home
      router.push('/')
    } catch (err: any) {
      console.error('Login failed:', err)
      setError(err.message || 'Login gagal. Silakan coba lagi.')
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-green-500 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <FaShoppingBag className="text-white text-4xl" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Selamat Datang!
          </h1>
          <p className="text-gray-600">
            Silakan login untuk melanjutkan
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Memproses...</span>
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">atau</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleAuth}
          disabled={googleLoading}
          className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-3 shadow-md disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {googleLoading ? (
            <>
              <div className="w-6 h-6 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              <span>Memproses...</span>
            </>
          ) : (
            <>
              <FaGoogle className="text-2xl text-red-500" />
              <span>Login dengan Google</span>
            </>
          )}
        </button>

        {/* Guest Button */}
        <button
          onClick={() => router.push('/')}
          className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-all duration-300"
        >
          Lanjut sebagai Tamu
        </button>

        {/* Register Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Belum punya akun?{' '}
          <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
            Daftar Sekarang
          </Link>
        </p>

        {/* Footer Info */}
        <p className="text-center text-gray-500 text-xs mt-4">
          Dengan login, Anda menyetujui{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Syarat & Ketentuan
          </a>{' '}
          kami
        </p>
      </div>
    </div>
  )
}
