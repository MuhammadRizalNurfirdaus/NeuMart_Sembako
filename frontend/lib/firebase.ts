import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  Auth,
  User
} from 'firebase/auth'

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase (avoid multiple initializations)
let app: FirebaseApp
if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0]
}

// Initialize Firebase Auth
export const auth: Auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// Configure Google Provider
googleProvider.setCustomParameters({
  prompt: 'select_account' // Always show account selection
})

// Fungsi untuk Google Login
export const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user
    
    // Return user data
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
  } catch (error: any) {
    console.error('Google Login Error:', error.message)
    throw new Error(error.message || 'Login failed')
  }
}

// Fungsi untuk Logout
export const handleSignOut = async () => {
  try {
    await firebaseSignOut(auth)
    return true
  } catch (error: any) {
    console.error('Logout Error:', error.message)
    throw new Error(error.message || 'Logout failed')
  }
}

// Fungsi untuk get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser
}

export default app
