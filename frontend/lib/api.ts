import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Products API
export const productsAPI = {
  getAll: async () => {
    const response = await api.get('/products')
    return response.data
  },
  
  getById: async (id: number) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },
  
  getByCategory: async (category: string) => {
    const response = await api.get(`/products/category/${category}`)
    return response.data
  }
}

// AI API
export const aiAPI = {
  generateRecipe: async (productNames: string[]) => {
    const response = await api.post('/ai/recipe', { productNames })
    return response.data
  },
  
  chat: async (message: string, context?: any) => {
    const response = await api.post('/ai/chat', { message, context })
    return response.data
  },
  
  getRecommendations: async (productIds: number[]) => {
    const response = await api.post('/ai/recommendations', { productIds })
    return response.data
  }
}

// Customer Account API
export const customerAPI = {
  // Addresses
  getAddresses: async (userId: string) => {
    const response = await api.get(`/customer/addresses/${userId}`)
    return response.data
  },
  
  addAddress: async (addressData: any) => {
    const response = await api.post('/customer/addresses', addressData)
    return response.data
  },
  
  updateAddress: async (id: number, addressData: any) => {
    const response = await api.put(`/customer/addresses/${id}`, addressData)
    return response.data
  },
  
  deleteAddress: async (id: number) => {
    const response = await api.delete(`/customer/addresses/${id}`)
    return response.data
  },
  
  setDefaultAddress: async (id: number, userId: string) => {
    const response = await api.put(`/customer/addresses/${id}/set-default`, { userId })
    return response.data
  },
  
  // Payment Methods
  getPaymentMethods: async (userId: string) => {
    const response = await api.get(`/customer/payment-methods/${userId}`)
    return response.data
  },
  
  addPaymentMethod: async (paymentData: any) => {
    const response = await api.post('/customer/payment-methods', paymentData)
    return response.data
  },
  
  deletePaymentMethod: async (id: number) => {
    const response = await api.delete(`/customer/payment-methods/${id}`)
    return response.data
  },
  
  // Wishlist
  getWishlist: async (userId: string) => {
    const response = await api.get(`/customer/wishlist/${userId}`)
    return response.data
  },
  
  addToWishlist: async (userId: string, productId: number) => {
    const response = await api.post('/customer/wishlist', { userId, productId })
    return response.data
  },
  
  removeFromWishlist: async (userId: string, productId: number) => {
    const response = await api.delete(`/customer/wishlist/${userId}/${productId}`)
    return response.data
  },
  
  // Preferences
  getPreferences: async (userId: string) => {
    const response = await api.get(`/customer/preferences/${userId}`)
    return response.data
  },
  
  updatePreferences: async (userId: string, preferences: any) => {
    const response = await api.put(`/customer/preferences/${userId}`, preferences)
    return response.data
  }
}

// Shipping & Promo API
export const shippingAPI = {
  calculateShipping: async (city: string, totalAmount: number) => {
    const response = await api.post('/customer/shipping/calculate', { city, totalAmount })
    return response.data
  },
  
  getActivePromotions: async () => {
    const response = await api.get('/customer/promotions/active')
    return response.data
  },
  
  validatePromoCode: async (code: string, userId: string, totalAmount: number) => {
    const response = await api.post('/customer/promotions/validate', { code, userId, totalAmount })
    return response.data
  }
}

export default api

