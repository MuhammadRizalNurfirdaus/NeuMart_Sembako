import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'

const router = express.Router()

// Interface untuk User Login Data
interface LoginData {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  emailVerified: boolean
  loginAt: string
  role?: 'admin' | 'customer'
}

// Interface untuk Registered User (username/password)
interface RegisteredUser {
  id: string
  username: string
  email: string
  password: string
  phone: string
  displayName: string
  createdAt: string
  role: 'customer'
}

// Temporary in-memory storage (gunakan database di production)
const users: Map<string, LoginData> = new Map()
const registeredUsers: Map<string, RegisteredUser> = new Map()

// Counter untuk generate user ID
let userIdCounter = 1000

// POST - Login endpoint (simpan data user dari Google)
router.post('/login', (req: Request, res: Response) => {
  try {
    const loginData: LoginData = req.body

    // Validasi data
    if (!loginData.uid || !loginData.email) {
      return res.status(400).json({
        success: false,
        message: 'UID dan Email diperlukan'
      })
    }

    // Simpan atau update user data
    users.set(loginData.uid, {
      ...loginData,
      loginAt: new Date().toISOString()
    })

    console.log(`✅ User logged in: ${loginData.email} (${loginData.displayName})`)

    res.json({
      success: true,
      message: 'Login berhasil',
      user: {
        uid: loginData.uid,
        email: loginData.email,
        displayName: loginData.displayName,
        photoURL: loginData.photoURL
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Login gagal'
    })
  }
})

// GET - Get user by UID
router.get('/user/:uid', (req: Request, res: Response) => {
  try {
    const { uid } = req.params
    const user = users.get(uid)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      })
    }

    res.json({
      success: true,
      user
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data user'
    })
  }
})

// GET - Get all logged in users (untuk admin)
router.get('/users', (req: Request, res: Response) => {
  try {
    const allUsers = Array.from(users.values())
    
    res.json({
      success: true,
      count: allUsers.length,
      users: allUsers
    })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data users'
    })
  }
})

// POST - Register new user (username/password)
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password, phone } = req.body

    // Validasi input
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, dan password diperlukan'
      })
    }

    // Check if username already exists
    const existingUsername = Array.from(registeredUsers.values()).find(
      user => user.username === username
    )
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: 'Username sudah terdaftar'
      })
    }

    // Check if email already exists
    const existingEmail = Array.from(registeredUsers.values()).find(
      user => user.email === email
    )
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email sudah terdaftar'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const userId = `user-${userIdCounter++}`
    const newUser: RegisteredUser = {
      id: userId,
      username,
      email,
      password: hashedPassword,
      phone: phone || '',
      displayName: username,
      createdAt: new Date().toISOString(),
      role: 'customer'
    }

    // Save to storage
    registeredUsers.set(userId, newUser)

    console.log(`✅ New user registered: ${email} (${username})`)

    res.json({
      success: true,
      message: 'Registrasi berhasil',
      user: {
        id: userId,
        username,
        email,
        displayName: username
      }
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({
      success: false,
      message: 'Registrasi gagal'
    })
  }
})

// POST - Login with username/password
router.post('/login-credentials', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username dan password diperlukan'
      })
    }

    // Check if admin credentials (hardcoded admin)
    if (username === 'admin123' && password === 'admin123') {
      const adminUser = {
        uid: 'admin-001',
        email: 'admin123@gmail.com',
        displayName: 'Administrator',
        photoURL: null,
        emailVerified: true,
        role: 'admin' as const
      }

      console.log(`✅ Admin logged in: ${adminUser.email}`)

      return res.json({
        success: true,
        message: 'Login admin berhasil',
        user: adminUser
      })
    }

    // Find user by username (untuk customer)
    const user = Array.from(registeredUsers.values()).find(
      u => u.username === username
    )

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Username atau password salah'
      })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Username atau password salah'
      })
    }

    console.log(`✅ User logged in: ${user.email} (${user.username})`)

    res.json({
      success: true,
      message: 'Login berhasil',
      user: {
        uid: user.id,
        email: user.email,
        displayName: user.displayName,
        photoURL: null,
        emailVerified: true,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Login gagal'
    })
  }
})

// POST - Logout endpoint
router.post('/logout', (req: Request, res: Response) => {
  try {
    const { uid } = req.body

    if (!uid) {
      return res.status(400).json({
        success: false,
        message: 'UID diperlukan'
      })
    }

    // Hapus user dari memory (atau update last_logout di database)
    const user = users.get(uid)
    if (user) {
      console.log(`👋 User logged out: ${user.email}`)
    }

    res.json({
      success: true,
      message: 'Logout berhasil'
    })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({
      success: false,
      message: 'Logout gagal'
    })
  }
})

export default router
