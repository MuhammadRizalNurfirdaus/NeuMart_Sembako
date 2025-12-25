'use client'

import { useState, useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FiSend, FiMessageCircle } from 'react-icons/fi'
import { processChatMessage } from '@/lib/chatbotAI'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 Halo! Saya asisten AI NeuMart Sembako. Tanyakan apa saja tentang produk, stok, atau harga!',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = processChatMessage(input)
      const assistantMessage: Message = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickQuestions = [
    'Apakah beras masih ada?',
    'Berapa harga telur?',
    'Produk apa yang paling murah?',
    'Tampilkan produk terlaris'
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full mb-4">
              🤖 AI Chatbot Assistant
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Tanya Stok & Harga
            </h1>
            <p className="text-gray-600">
              Asisten AI 24/7 siap membantu Anda
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Messages Area */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${
                    msg.role === 'user' 
                      ? 'bg-primary-blue text-white' 
                      : 'bg-gray-100 text-gray-800'
                  } rounded-lg p-4 shadow-md`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <FiMessageCircle className="w-4 h-4" />
                        <span className="font-semibold text-sm">NeuMart AI</span>
                      </div>
                    )}
                    <p className="whitespace-pre-line">{msg.content}</p>
                    <p className={`text-xs mt-2 ${
                      msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp.toLocaleTimeString('id-ID', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4 shadow-md">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span className="text-gray-600 text-sm">AI sedang mengetik...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="px-6 pb-4">
                <p className="text-sm text-gray-600 mb-2">Pertanyaan cepat:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(q)}
                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t p-4 bg-gray-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tanyakan tentang stok, harga, atau produk..."
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-primary-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <FiSend />
                  Kirim
                </button>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-lg text-gray-800 mb-3">
              💡 Tips Bertanya ke AI:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ "Apakah [nama produk] masih ada?"</li>
              <li>✓ "Berapa harga [nama produk]?"</li>
              <li>✓ "Produk apa yang paling murah?"</li>
              <li>✓ "Tampilkan semua produk"</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
