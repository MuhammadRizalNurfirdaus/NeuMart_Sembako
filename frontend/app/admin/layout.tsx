'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import Chatbot from '@/components/Chatbot'
import Link from 'next/link'
import { 
  FiHome, 
  FiPackage, 
  FiShoppingCart, 
  FiUsers, 
  FiBarChart2, 
  FiLogOut,
  FiMenu,
  FiX,
  FiSettings,
  FiExternalLink,
  FiStar
} from 'react-icons/fi'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAdmin, logout } = useAuthStore()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Protect admin routes
  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login')
    }
  }, [isAdmin, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: FiHome },
    { name: 'Produk', href: '/admin/products', icon: FiPackage },
    { name: 'Pesanan', href: '/admin/orders', icon: FiShoppingCart },
    { name: 'Pelanggan', href: '/admin/customers', icon: FiUsers },
    { name: 'Review', href: '/admin/reviews', icon: FiStar },
    { name: 'Laporan', href: '/admin/reports', icon: FiBarChart2 },
    { name: 'Pengaturan', href: '/admin/settings', icon: FiSettings },
  ]

  if (!isAdmin) {
    return null // or loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="px-4 h-16 flex items-center justify-between">
          {/* Left: Menu Toggle + Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:block p-2 hover:bg-gray-100 rounded-lg"
            >
              <FiMenu className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center text-white font-bold">
                N
              </div>
              <div className="hidden md:block">
                <h1 className="text-lg font-bold text-gray-800">NeuMart Admin</h1>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            </Link>
          </div>

          {/* Right: User Info */}
          <div className="flex items-center space-x-4">
            {/* Back to Store Button */}
            <Link
              href="/"
              className="hidden md:flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
            >
              <FiExternalLink className="w-4 h-4" />
              <span className="text-sm font-medium">Kembali ke Toko</span>
            </Link>
            
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">{user?.displayName}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              <FiLogOut />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar - Desktop */}
      <aside
        className={`fixed left-0 top-16 bottom-0 bg-gray-800 text-white transition-all duration-300 hidden md:block ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            )
          })}
        </div>
      </aside>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-gray-800 text-white z-40">
          <div className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-64' : 'md:ml-20'
        }`}
      >
        <div className="p-6">
          {children}
        </div>
      </main>

      {/* Admin Chatbot */}
      <Chatbot type="admin" />
    </div>
  )
}
