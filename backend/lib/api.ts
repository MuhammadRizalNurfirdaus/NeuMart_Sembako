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
  
  chat: async (message: string) => {
    const response = await api.post('/ai/chat', { message })
    return response.data
  },
  
  getRecommendations: async (productIds: number[]) => {
    const response = await api.post('/ai/recommendations', { productIds })
    return response.data
  }
}

export default api
