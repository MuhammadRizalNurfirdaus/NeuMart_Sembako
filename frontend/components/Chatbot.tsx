'use client'

import { useState, useRef, useEffect } from 'react'
import { FaComments, FaTimes, FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa'
import axios from 'axios'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface ChatbotProps {
  type?: 'customer' | 'admin'
}

export default function Chatbot({ type = 'customer' }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: type === 'admin' 
        ? 'Halo Admin! 👋 Saya asisten AI NeuMart. Ada yang bisa saya bantu hari ini?'
        : 'Halo! 👋 Selamat datang di NeuMart Sembako. Ada yang bisa saya bantu?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Quick replies based on type
  const quickReplies = type === 'admin' 
    ? [
        'Statistik penjualan hari ini',
        'Produk stok rendah',
        'Pesanan pending',
        'Laporan keuangan',
        'Bantuan sistem'
      ]
    : [
        'Rekomendasi produk',
        'Cara berbelanja',
        'Metode pembayaran',
        'Promo hari ini',
        'Lacak pesanan'
      ]

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputMessage.trim()
    if (!messageText) return

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
        const response = await axios.post(`${apiUrl}/ai/chat`, {
          message: messageText,
          type,
          history: messages.slice(-5) // Send last 5 messages for context
        })

        const botMessage: Message = {
          id: Date.now() + 1,
          text: response.data.reply || getDefaultResponse(messageText, type),
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      } catch (error) {
        // Fallback response
        const botMessage: Message = {
          id: Date.now() + 1,
          text: getDefaultResponse(messageText, type),
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      } finally {
        setIsTyping(false)
      }
    }, 1000)
  }

  const getDefaultResponse = (message: string, userType: string): string => {
    const lowerMessage = message.toLowerCase()

    if (userType === 'admin') {
      if (lowerMessage.includes('statistik') || lowerMessage.includes('penjualan')) {
        return '📊 Berdasarkan data hari ini:\n\n• Total Pendapatan: Rp 1.250.000\n• Jumlah Pesanan: 15 order\n• Metode Pembayaran Terfavorit: COD (60%)\n• Produk Terlaris: Beras Premium 5kg\n\nAda yang ingin ditanyakan lebih lanjut?'
      }
      if (lowerMessage.includes('stok') || lowerMessage.includes('produk')) {
        return '⚠️ Produk dengan stok rendah (<10):\n\n• Minyak Goreng 2L - Stok: 5\n• Gula Pasir 1kg - Stok: 8\n• Telur Ayam 1kg - Stok: 6\n\nSilakan lakukan restock segera!'
      }
      if (lowerMessage.includes('pesanan') || lowerMessage.includes('order')) {
        return '📦 Pesanan yang memerlukan perhatian:\n\n• 3 Pesanan Pending\n• 5 Pesanan Processing\n• 2 Pesanan Siap Kirim\n\nCek halaman Pesanan untuk detail lengkap.'
      }
      if (lowerMessage.includes('laporan') || lowerMessage.includes('keuangan')) {
        return '💰 Ringkasan Keuangan Bulan Ini:\n\n• Total Pendapatan: Rp 15.750.000\n• Pendapatan COD: Rp 8.950.000 (60%)\n• Pendapatan Online: Rp 6.800.000 (40%)\n• Pertumbuhan: +12.5%\n\nDownload laporan lengkap di halaman Reports.'
      }
      return '🤖 Saya siap membantu dengan:\n\n• Statistik penjualan\n• Monitoring stok\n• Manajemen pesanan\n• Analisis keuangan\n• Panduan sistem\n\nApa yang ingin Anda ketahui?'
    } else {
      // Customer responses
      if (lowerMessage.includes('rekomendasi') || lowerMessage.includes('produk')) {
        return '🛒 Rekomendasi produk untuk Anda:\n\n• Beras Premium 5kg - Rp 75.000\n• Minyak Goreng 2L - Rp 32.000\n• Telur Ayam 1kg - Rp 28.000\n\nLihat produk lengkap di katalog kami!'
      }
      if (lowerMessage.includes('cara') || lowerMessage.includes('belanja')) {
        return '📝 Cara berbelanja di NeuMart:\n\n1️⃣ Pilih produk yang diinginkan\n2️⃣ Masukkan ke keranjang\n3️⃣ Checkout dan pilih metode pembayaran\n4️⃣ Konfirmasi pesanan\n5️⃣ Tunggu pesanan diantar!\n\nMudah bukan? 😊'
      }
      if (lowerMessage.includes('bayar') || lowerMessage.includes('pembayaran')) {
        return '💳 Metode pembayaran tersedia:\n\n• COD (Bayar di Tempat)\n• Transfer Bank (BCA, Mandiri, BNI)\n• E-Wallet (GoPay, OVO, Dana)\n\nPilih yang paling nyaman untuk Anda!'
      }
      if (lowerMessage.includes('promo') || lowerMessage.includes('diskon')) {
        return '🎉 Promo Hari Ini:\n\n• Beras Premium - Diskon 10%\n• Paket Sembako Hemat - Rp 150.000\n• Gratis Ongkir min. belanja Rp 100.000\n\nBuruan sebelum kehabisan!'
      }
      if (lowerMessage.includes('lacak') || lowerMessage.includes('pesanan')) {
        return '📍 Untuk melacak pesanan:\n\n1. Login ke akun Anda\n2. Klik menu "Pesanan Saya"\n3. Lihat status pesanan real-time\n\nPerlu bantuan lain?'
      }
      return '🤖 Saya di sini untuk membantu!\n\nSilakan pilih topik:\n• Rekomendasi produk\n• Cara berbelanja\n• Metode pembayaran\n• Promo terkini\n• Lacak pesanan\n\nAda yang bisa saya bantu?'
    }
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`${
            type === 'admin' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
          } text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2`}
        >
          <FaComments className="text-2xl" />
          <span className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col">
          {/* Header */}
          <div className={`${
            type === 'admin' ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-gradient-to-r from-blue-600 to-blue-700'
          } text-white p-4 rounded-t-2xl flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <FaRobot className={`${type === 'admin' ? 'text-red-600' : 'text-blue-600'} text-xl`} />
              </div>
              <div>
                <h3 className="font-bold">NeuMart AI Assistant</h3>
                <p className="text-xs opacity-90">
                  {type === 'admin' ? 'Admin Support' : 'Customer Support'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-2 transition"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? `${type === 'admin' ? 'bg-red-600' : 'bg-blue-600'} text-white`
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === 'bot' && (
                      <FaRobot className={`${type === 'admin' ? 'text-red-600' : 'text-blue-600'} mt-1 flex-shrink-0`} />
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <FaUser className="text-white mt-1 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-2">
                  <FaRobot className={`${type === 'admin' ? 'text-red-600' : 'text-blue-600'}`} />
                  <div className="flex gap-1">
                    <div className={`w-2 h-2 ${type === 'admin' ? 'bg-red-600' : 'bg-blue-600'} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
                    <div className={`w-2 h-2 ${type === 'admin' ? 'bg-red-600' : 'bg-blue-600'} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
                    <div className={`w-2 h-2 ${type === 'admin' ? 'bg-red-600' : 'bg-blue-600'} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 bg-white border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Quick replies:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.slice(0, 3).map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className={`text-xs px-3 py-1 rounded-full border ${
                      type === 'admin'
                        ? 'border-red-600 text-red-600 hover:bg-red-50'
                        : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                    } transition`}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ketik pesan..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className={`${
                  type === 'admin' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                } text-white rounded-full p-3 disabled:opacity-50 disabled:cursor-not-allowed transition`}
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
