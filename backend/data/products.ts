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
  // BERAS
  {
    id: 1,
    name: 'Beras Premium 5kg',
    category: 'Beras',
    price: 85000,
    stock: 50,
    unit: '5kg',
    image: '🌾',
    description: 'Beras pulen berkualitas tinggi',
    relatedProducts: [3, 5, 7]
  },
  {
    id: 13,
    name: 'Beras Pandan Wangi 5kg',
    category: 'Beras',
    price: 95000,
    stock: 40,
    unit: '5kg',
    image: '🌾',
    description: 'Beras pandan wangi harum dan pulen',
    relatedProducts: [1, 5]
  },
  // MINYAK
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
    id: 14,
    name: 'Minyak Goreng Premium 1L',
    category: 'Minyak',
    price: 18000,
    stock: 80,
    unit: '1L',
    image: '🛢️',
    description: 'Minyak goreng premium untuk masakan lezat',
    relatedProducts: [2, 5]
  },
  // GULA & GARAM
  {
    id: 3,
    name: 'Gula Pasir',
    category: 'Gula & Garam',
    price: 15000,
    stock: 80,
    unit: '1kg',
    image: '🧂',
    description: 'Gula pasir murni',
    relatedProducts: [1, 4, 8]
  },
  {
    id: 7,
    name: 'Garam Dapur',
    category: 'Gula & Garam',
    price: 3000,
    stock: 120,
    unit: '500g',
    image: '🧂',
    description: 'Garam beryodium',
    relatedProducts: [1, 2, 6]
  },
  {
    id: 15,
    name: 'Gula Merah 500g',
    category: 'Gula & Garam',
    price: 14000,
    stock: 50,
    unit: '500g',
    image: '🍯',
    description: 'Gula merah asli untuk kue dan minuman tradisional',
    relatedProducts: [3, 11]
  },
  // TEPUNG
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
    id: 16,
    name: 'Tepung Beras 500g',
    category: 'Tepung',
    price: 11000,
    stock: 50,
    unit: '500g',
    image: '🌾',
    description: 'Tepung beras untuk kue tradisional',
    relatedProducts: [4, 3]
  },
  {
    id: 17,
    name: 'Tepung Maizena 400g',
    category: 'Tepung',
    price: 10000,
    stock: 45,
    unit: '400g',
    image: '🌽',
    description: 'Tepung maizena untuk pengental masakan',
    relatedProducts: [4, 5]
  },
  // TELUR
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
    id: 18,
    name: 'Telur Ayam Kampung',
    category: 'Telur',
    price: 38000,
    stock: 20,
    unit: '10 butir',
    image: '🥚',
    description: 'Telur ayam kampung organik lebih sehat',
    relatedProducts: [5, 1]
  },
  // BUMBU
  {
    id: 6,
    name: 'Kecap Manis',
    category: 'Bumbu Dapur',
    price: 8000,
    stock: 70,
    unit: '600ml',
    image: '🍶',
    description: 'Kecap manis premium',
    relatedProducts: [2, 7, 9]
  },
  {
    id: 19,
    name: 'Saos Tomat 340ml',
    category: 'Bumbu Dapur',
    price: 11000,
    stock: 70,
    unit: '340ml',
    image: '🍅',
    description: 'Saos tomat untuk pelengkap makanan',
    relatedProducts: [6, 20]
  },
  {
    id: 20,
    name: 'Saos Sambal 335ml',
    category: 'Bumbu Dapur',
    price: 11500,
    stock: 65,
    unit: '335ml',
    image: '🌶️',
    description: 'Saos sambal pedas untuk teman makan',
    relatedProducts: [6, 19]
  },
  // SUSU & DAIRY
  {
    id: 8,
    name: 'Susu Kental Manis',
    category: 'Susu & Dairy',
    price: 11000,
    stock: 55,
    unit: '370g',
    image: '🥛',
    description: 'Susu kental manis enak',
    relatedProducts: [3, 4]
  },
  {
    id: 21,
    name: 'Susu UHT 1L',
    category: 'Susu & Dairy',
    price: 18500,
    stock: 40,
    unit: '1L',
    image: '🥛',
    description: 'Susu UHT full cream segar',
    relatedProducts: [8, 11]
  },
  {
    id: 22,
    name: 'Keju Cheddar 180g',
    category: 'Susu & Dairy',
    price: 32000,
    stock: 30,
    unit: '180g',
    image: '🧀',
    description: 'Keju cheddar untuk sandwich dan masakan',
    relatedProducts: [4, 21]
  },
  {
    id: 23,
    name: 'Mentega 200g',
    category: 'Susu & Dairy',
    price: 17500,
    stock: 50,
    unit: '200g',
    image: '🧈',
    description: 'Mentega untuk roti dan kue',
    relatedProducts: [4, 22]
  },
  // MIE INSTAN
  {
    id: 9,
    name: 'Mie Instan',
    category: 'Mie Instan',
    price: 2500,
    stock: 200,
    unit: 'pack',
    image: '🍜',
    description: 'Mie instan rasa ayam',
    relatedProducts: [2, 5, 6]
  },
  {
    id: 24,
    name: 'Mie Goreng Pedas',
    category: 'Mie Instan',
    price: 3100,
    stock: 180,
    unit: 'pack',
    image: '🍜',
    description: 'Mie instan goreng rasa pedas',
    relatedProducts: [9, 20]
  },
  {
    id: 25,
    name: 'Mie Kuah Soto',
    category: 'Mie Instan',
    price: 3100,
    stock: 160,
    unit: 'pack',
    image: '🍜',
    description: 'Mie kuah rasa soto',
    relatedProducts: [9, 5]
  },
  // MINUMAN
  {
    id: 10,
    name: 'Margarin',
    category: 'Minuman',
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
  },
  {
    id: 26,
    name: 'Sirup Cocopandan 460ml',
    category: 'Minuman',
    price: 14000,
    stock: 50,
    unit: '460ml',
    image: '🥤',
    description: 'Sirup rasa cocopandan untuk minuman segar',
    relatedProducts: [12, 3]
  },
  {
    id: 27,
    name: 'Air Mineral 600ml',
    category: 'Minuman',
    price: 3500,
    stock: 200,
    unit: '600ml',
    image: '💧',
    description: 'Air mineral dalam kemasan',
    relatedProducts: []
  },
  // SNACK & KUE
  {
    id: 28,
    name: 'Biskuit Kelapa 300g',
    category: 'Snack & Kue',
    price: 11000,
    stock: 70,
    unit: '300g',
    image: '🍪',
    description: 'Biskuit kelapa renyah dan lezat',
    relatedProducts: [12, 11]
  },
  {
    id: 29,
    name: 'Wafer Cokelat 130g',
    category: 'Snack & Kue',
    price: 7500,
    stock: 90,
    unit: '130g',
    image: '🍫',
    description: 'Wafer cokelat renyah',
    relatedProducts: [28, 8]
  },
  {
    id: 30,
    name: 'Keripik Kentang 68g',
    category: 'Snack & Kue',
    price: 10000,
    stock: 100,
    unit: '68g',
    image: '🥔',
    description: 'Keripik kentang berbagai rasa',
    relatedProducts: [29, 27]
  },
  // SABUN & DETERGEN
  {
    id: 31,
    name: 'Sabun Mandi 85g',
    category: 'Sabun & Detergen',
    price: 4500,
    stock: 120,
    unit: '85g',
    image: '🧼',
    description: 'Sabun mandi anti kuman',
    relatedProducts: [32, 33]
  },
  {
    id: 32,
    name: 'Detergen 800g',
    category: 'Sabun & Detergen',
    price: 21000,
    stock: 60,
    unit: '800g',
    image: '🧺',
    description: 'Detergen bubuk untuk mencuci pakaian',
    relatedProducts: [31, 33]
  },
  {
    id: 33,
    name: 'Sabun Cuci Piring 800ml',
    category: 'Sabun & Detergen',
    price: 15500,
    stock: 70,
    unit: '800ml',
    image: '🍋',
    description: 'Sabun cuci piring jeruk nipis',
    relatedProducts: [31, 32]
  },
  // PERAWATAN PRIBADI
  {
    id: 34,
    name: 'Shampo 170ml',
    category: 'Perawatan Pribadi',
    price: 19000,
    stock: 50,
    unit: '170ml',
    image: '🧴',
    description: 'Shampo untuk rambut sehat berkilau',
    relatedProducts: [35, 36]
  },
  {
    id: 35,
    name: 'Pasta Gigi 190g',
    category: 'Perawatan Pribadi',
    price: 12500,
    stock: 80,
    unit: '190g',
    image: '🦷',
    description: 'Pasta gigi untuk gigi sehat',
    relatedProducts: [36, 34]
  },
  {
    id: 36,
    name: 'Sikat Gigi',
    category: 'Perawatan Pribadi',
    price: 7000,
    stock: 100,
    unit: 'pcs',
    image: '🪥',
    description: 'Sikat gigi dengan bulu lembut',
    relatedProducts: [35]
  },
  // MAKANAN KALENG
  {
    id: 37,
    name: 'Sarden 155g',
    category: 'Makanan Kaleng',
    price: 13500,
    stock: 60,
    unit: '155g',
    image: '🥫',
    description: 'Sarden dalam saus tomat',
    relatedProducts: [38, 1]
  },
  {
    id: 38,
    name: 'Kornet 198g',
    category: 'Makanan Kaleng',
    price: 21000,
    stock: 50,
    unit: '198g',
    image: '🥫',
    description: 'Kornet sapi untuk lauk praktis',
    relatedProducts: [37, 1]
  }
]
