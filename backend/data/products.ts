export interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  unit: string
  image: string
  description: string
  relatedProducts?: number[] // IDs produk yang sering dibeli bersamaan
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Beras Premium',
    category: 'Beras',
    price: 85000,
    stock: 50,
    unit: '5kg',
    image: '🌾',
    description: 'Beras pulen berkualitas tinggi',
    relatedProducts: [3, 5, 7]
  },
  {
    id: 2,
    name: 'Minyak Goreng',
    category: 'Minyak',
    price: 25000,
    stock: 100,
    unit: '2L',
    image: '🛢️',
    description: 'Minyak goreng bersih dan sehat',
    relatedProducts: [1, 6, 9]
  },
  {
    id: 3,
    name: 'Gula Pasir',
    category: 'Gula',
    price: 15000,
    stock: 80,
    unit: '1kg',
    image: '🧂',
    description: 'Gula pasir murni',
    relatedProducts: [1, 4, 8]
  },
  {
    id: 4,
    name: 'Tepung Terigu',
    category: 'Tepung',
    price: 12000,
    stock: 60,
    unit: '1kg',
    image: '🌾',
    description: 'Tepung terigu serbaguna',
    relatedProducts: [3, 10]
  },
  {
    id: 5,
    name: 'Telur Ayam',
    category: 'Telur',
    price: 30000,
    stock: 40,
    unit: '1kg',
    image: '🥚',
    description: 'Telur ayam segar',
    relatedProducts: [1, 2, 9]
  },
  {
    id: 6,
    name: 'Kecap Manis',
    category: 'Bumbu',
    price: 8000,
    stock: 70,
    unit: '600ml',
    image: '🍶',
    description: 'Kecap manis premium',
    relatedProducts: [2, 7, 9]
  },
  {
    id: 7,
    name: 'Garam Dapur',
    category: 'Bumbu',
    price: 3000,
    stock: 120,
    unit: '500g',
    image: '🧂',
    description: 'Garam beryodium',
    relatedProducts: [1, 2, 6]
  },
  {
    id: 8,
    name: 'Susu Kental Manis',
    category: 'Susu',
    price: 11000,
    stock: 55,
    unit: '370g',
    image: '🥛',
    description: 'Susu kental manis enak',
    relatedProducts: [3, 4]
  },
  {
    id: 9,
    name: 'Mie Instan',
    category: 'Mie',
    price: 2500,
    stock: 200,
    unit: 'pack',
    image: '🍜',
    description: 'Mie instan rasa ayam',
    relatedProducts: [2, 5, 6]
  },
  {
    id: 10,
    name: 'Margarin',
    category: 'Dairy',
    price: 9000,
    stock: 45,
    unit: '200g',
    image: '🧈',
    description: 'Margarin untuk memasak dan roti',
    relatedProducts: [4, 8]
  },
  {
    id: 11,
    name: 'Kopi Bubuk',
    category: 'Minuman',
    price: 18000,
    stock: 35,
    unit: '200g',
    image: '☕',
    description: 'Kopi bubuk asli',
    relatedProducts: [3, 8]
  },
  {
    id: 12,
    name: 'Teh Celup',
    category: 'Minuman',
    price: 7000,
    stock: 90,
    unit: '25 bags',
    image: '🍵',
    description: 'Teh celup wangi',
    relatedProducts: [3]
  }
]
