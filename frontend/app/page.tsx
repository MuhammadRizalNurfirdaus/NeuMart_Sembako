'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import ProductSection from '@/components/ProductSection'
import AIFeatures from '@/components/AIFeatures'
import Chatbot from '@/components/Chatbot'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <AIFeatures />
      <ProductSection />
      <Footer />
      <Chatbot type="customer" />
    </main>
  )
}
