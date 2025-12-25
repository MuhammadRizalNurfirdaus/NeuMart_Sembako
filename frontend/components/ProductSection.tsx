'use client'

import { products } from '@/data/products'
import { useState } from 'react'
import ProductCard from './ProductCard'

export default function ProductSection() {
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  
  const categories = ['Semua', ...new Set(products.map(p => p.category))]
  
  const filteredProducts = selectedCategory === 'Semua' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Produk Sembako Kami
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === category
                  ? 'bg-primary-blue text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
