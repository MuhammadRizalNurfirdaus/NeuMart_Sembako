'use client'

import { FiCpu, FiMessageCircle, FiTrendingUp, FiList } from 'react-icons/fi'

export default function AIFeatures() {
  const features = [
    {
      icon: <FiTrendingUp className="w-12 h-12" />,
      title: 'Smart Recommendation',
      description: 'Rekomendasi produk terkait berdasarkan belanjaan Anda',
      color: 'bg-blue-500'
    },
    {
      icon: <FiList className="w-12 h-12" />,
      title: 'AI Recipe Generator',
      description: 'Ide masakan otomatis dari bahan yang Anda beli',
      color: 'bg-green-500'
    },
    {
      icon: <FiMessageCircle className="w-12 h-12" />,
      title: 'Chatbot Assistant',
      description: 'Tanya stok dan harga produk 24/7',
      color: 'bg-purple-500'
    },
    {
      icon: <FiCpu className="w-12 h-12" />,
      title: 'Prediksi Stok',
      description: 'Pengingat otomatis saat produk hampir habis',
      color: 'bg-orange-500'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Fitur AI yang Membantu Anda
          </h2>
          <p className="text-gray-600 text-lg">
            Teknologi AI untuk pengalaman belanja yang lebih baik
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`${feature.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
