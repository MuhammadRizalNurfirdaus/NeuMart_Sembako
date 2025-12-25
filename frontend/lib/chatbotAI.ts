import { products } from '@/data/products'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

// Fungsi AI Chatbot untuk menjawab pertanyaan tentang stok dan harga
export function processChatMessage(message: string): string {
  const lowerMessage = message.toLowerCase()

  // Deteksi produk yang ditanyakan
  const mentionedProduct = products.find(p => 
    lowerMessage.includes(p.name.toLowerCase()) ||
    lowerMessage.includes(p.category.toLowerCase())
  )

  // Pertanyaan tentang stok
  if (lowerMessage.includes('stok') || lowerMessage.includes('ada') || lowerMessage.includes('tersedia')) {
    if (mentionedProduct) {
      if (mentionedProduct.stock > 0) {
        return `✅ ${mentionedProduct.name} masih tersedia! Stok kami: ${mentionedProduct.stock} ${mentionedProduct.unit}. Harga: Rp ${mentionedProduct.price.toLocaleString('id-ID')}`
      } else {
        return `❌ Maaf, ${mentionedProduct.name} sedang habis. Kami akan segera restok!`
      }
    }
    return '🤔 Produk apa yang ingin Anda tanyakan? Sebutkan nama produknya ya!'
  }

  // Pertanyaan tentang harga
  if (lowerMessage.includes('harga') || lowerMessage.includes('berapa')) {
    if (mentionedProduct) {
      return `💰 Harga ${mentionedProduct.name} (${mentionedProduct.unit}): Rp ${mentionedProduct.price.toLocaleString('id-ID')}\n\nStok tersedia: ${mentionedProduct.stock}`
    }
    return '🤔 Produk apa yang ingin Anda tanyakan harganya?'
  }

  // Pertanyaan tentang kategori
  if (lowerMessage.includes('kategori') || lowerMessage.includes('jenis')) {
    const categories = [...new Set(products.map(p => p.category))]
    return `📦 Kami memiliki kategori produk:\n${categories.map(c => `• ${c}`).join('\n')}`
  }

  // Rekomendasi produk termurah
  if (lowerMessage.includes('murah') || lowerMessage.includes('termurah')) {
    const cheapest = [...products].sort((a, b) => a.price - b.price).slice(0, 3)
    return `💸 Produk termurah kami:\n${cheapest.map(p => 
      `• ${p.name}: Rp ${p.price.toLocaleString('id-ID')}`
    ).join('\n')}`
  }

  // Produk terlaris (berdasarkan stok tersisa)
  if (lowerMessage.includes('laris') || lowerMessage.includes('populer') || lowerMessage.includes('terlaris')) {
    const popular = [...products].sort((a, b) => a.stock - b.stock).slice(0, 3)
    return `🔥 Produk paling laris (hampir habis!):\n${popular.map(p => 
      `• ${p.name} - Sisa ${p.stock} stok!`
    ).join('\n')}`
  }

  // Tampilkan semua produk
  if (lowerMessage.includes('semua produk') || lowerMessage.includes('daftar produk')) {
    return `📋 Berikut daftar produk kami:\n${products.map(p => 
      `• ${p.name} (${p.category}) - Rp ${p.price.toLocaleString('id-ID')}`
    ).join('\n')}`
  }

  // Greeting
  if (lowerMessage.includes('halo') || lowerMessage.includes('hai') || lowerMessage.includes('hi')) {
    return '👋 Halo! Selamat datang di NeuMart Sembako. Saya asisten AI siap membantu Anda. Tanyakan tentang stok, harga, atau produk kami!'
  }

  if (lowerMessage.includes('terima kasih') || lowerMessage.includes('thanks')) {
    return '😊 Sama-sama! Senang bisa membantu. Ada yang bisa saya bantu lagi?'
  }

  // Default response
  return `🤖 Saya asisten AI NeuMart Sembako. Saya bisa membantu Anda dengan:
  
• Cek stok produk
• Info harga produk  
• Daftar kategori produk
• Rekomendasi produk

Contoh: "Apakah beras masih ada?" atau "Berapa harga telur?"`
}
