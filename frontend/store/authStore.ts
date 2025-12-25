import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  emailVerified: boolean
  role?: 'admin' | 'customer' // Add role field
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  setUser: (user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
      }),
      logout: () => set({ user: null, isAuthenticated: false, isAdmin: false })
    }),
    {
      name: 'auth-storage' // name of item in localStorage
    }
  )
)
