'use client'

import Link from 'next/link'
import { FiShoppingCart, FiMenu, FiUser, FiLogOut, FiLogIn, FiSettings, FiPackage } from 'react-icons/fi'
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { handleSignOut } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { items } = useCartStore()
  const { user, isAuthenticated, logout } = useAuthStore()
  const router = useRouter()
  
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = async () => {
    try {
      await handleSignOut()
      logout()
      router.push('/')
      setIsUserMenuOpen(false)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              N
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-blue">NeuMart</h1>
              <p className="text-sm text-primary-green font-semibold">Sembako</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-blue transition">
              Beranda
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary-blue transition">
              Produk
            </Link>
            <Link href="/ai-recipe" className="text-gray-700 hover:text-primary-blue transition">
              Ide Resep AI
            </Link>
            <Link href="/chatbot" className="text-gray-700 hover:text-primary-blue transition">
              Tanya Stok
            </Link>
          </div>

          {/* Right Side: Cart + User */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <FiShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary-blue transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 hover:bg-gray-100 rounded-full p-1 transition"
                >
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || 'User'} 
                      className="w-8 h-8 rounded-full border-2 border-primary-blue"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center text-white font-bold">
                      {user.displayName?.[0] || user.email?.[0] || 'U'}
                    </div>
                  )}
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user.displayName?.split(' ')[0] || 'User'}
                  </span>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-800">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                      {user.role === 'admin' && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                          Administrator
                        </span>
                      )}
                    </div>
                    
                    {/* My Orders Link */}
                    <Link
                      href="/my-orders"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <FiPackage />
                      <span>Pesanan Saya</span>
                    </Link>
                    
                    {/* Admin Panel Button - Only show for admin users */}
                    {user.role === 'admin' && (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 border-t border-gray-200"
                      >
                        <FiSettings />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 border-t border-gray-200"
                    >
                      <FiLogOut />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:flex items-center space-x-2 bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                <FiLogIn />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FiMenu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Link href="/" className="block py-2 text-gray-700 hover:text-primary-blue">
              Beranda
            </Link>
            <Link href="/products" className="block py-2 text-gray-700 hover:text-primary-blue">
              Produk
            </Link>
            <Link href="/ai-recipe" className="block py-2 text-gray-700 hover:text-primary-blue">
              Ide Resep AI
            </Link>
            <Link href="/chatbot" className="block py-2 text-gray-700 hover:text-primary-blue">
              Tanya Stok
            </Link>
            
            {/* Mobile User Menu */}
            {isAuthenticated && user ? (
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="flex items-center space-x-3 py-2">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || 'User'} 
                      className="w-10 h-10 rounded-full border-2 border-primary-blue"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center text-white font-bold">
                      {user.displayName?.[0] || user.email?.[0] || 'U'}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {user.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-red-600 hover:text-red-700 flex items-center space-x-2"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block py-2 text-primary-blue hover:text-blue-600 font-semibold border-t border-gray-200 mt-2 pt-2"
              >
                <FiLogIn className="inline mr-2" />
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
