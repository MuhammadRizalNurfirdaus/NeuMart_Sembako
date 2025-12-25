interface Recipe {
  name: string
  ingredients: string[]
  instructions: string[]
  cookingTime: string
  difficulty: string
}

// Database resep berdasarkan kombinasi produk
export const recipeDatabase: { [key: string]: Recipe[] } = {
  // Kombinasi Beras + Telur
  'beras-telur': [
    {
      name: 'Nasi Goreng Telur',
      ingredients: ['Beras (nasi putih)', 'Telur', 'Kecap manis', 'Garam', 'Minyak goreng'],
      instructions: [
        'Panaskan minyak, kocok telur dan orak-arik',
        'Masukkan nasi putih, aduk rata',
        'Tambahkan kecap manis dan garam',
        'Tumis hingga harum dan matang'
      ],
      cookingTime: '15 menit',
      difficulty: 'Mudah'
    }
  ],
  
  // Kombinasi Tepung + Telur
  'tepung-telur': [
    {
      name: 'Pancake Sederhana',
      ingredients: ['Tepung terigu', 'Telur', 'Gula pasir', 'Susu (opsional)', 'Margarin'],
      instructions: [
        'Campur tepung, telur, dan gula',
        'Aduk hingga rata, tambahkan sedikit air/susu',
        'Panaskan wajan dengan margarin',
        'Tuang adonan, masak hingga kedua sisi matang'
      ],
      cookingTime: '20 menit',
      difficulty: 'Mudah'
    }
  ],

  // Kombinasi Mie + Telur
  'mie-telur': [
    {
      name: 'Mie Goreng Telur',
      ingredients: ['Mie instan', 'Telur', 'Kecap manis', 'Minyak goreng'],
      instructions: [
        'Rebus mie hingga matang, tiriskan',
        'Goreng telur orak-arik',
        'Tumis mie dengan bumbu instan dan kecap',
        'Campur dengan telur, aduk rata'
      ],
      cookingTime: '10 menit',
      difficulty: 'Sangat Mudah'
    }
  ],

  // Default untuk produk apapun
  'default': [
    {
      name: 'Nasi Putih dengan Telur Ceplok',
      ingredients: ['Beras', 'Telur', 'Garam', 'Minyak goreng'],
      instructions: [
        'Masak nasi putih seperti biasa',
        'Panaskan minyak di wajan',
        'Ceplok telur, beri sedikit garam',
        'Sajikan nasi dengan telur ceplok'
      ],
      cookingTime: '30 menit',
      difficulty: 'Mudah'
    },
    {
      name: 'Nasi Goreng Spesial',
      ingredients: ['Beras (nasi putih)', 'Telur', 'Kecap manis', 'Garam', 'Minyak goreng'],
      instructions: [
        'Siapkan nasi putih yang sudah dingin',
        'Kocok telur dan orak-arik',
        'Masukkan nasi, beri kecap dan garam',
        'Aduk rata hingga harum'
      ],
      cookingTime: '15 menit',
      difficulty: 'Mudah'
    },
    {
      name: 'Telur Dadar Sederhana',
      ingredients: ['Telur', 'Garam', 'Minyak goreng'],
      instructions: [
        'Kocok telur dengan garam',
        'Panaskan minyak di wajan',
        'Tuang telur, masak hingga matang',
        'Angkat dan sajikan'
      ],
      cookingTime: '5 menit',
      difficulty: 'Sangat Mudah'
    }
  ]
}

// Fungsi AI untuk generate resep berdasarkan produk di keranjang
export function generateRecipeFromCart(productNames: string[]): Recipe[] {
  const normalizedNames = productNames.map(name => 
    name.toLowerCase()
      .replace('premium', '')
      .replace('ayam', '')
      .trim()
  )

  // Cek kombinasi spesifik
  if (normalizedNames.some(n => n.includes('beras') || n.includes('nasi')) && 
      normalizedNames.some(n => n.includes('telur'))) {
    return recipeDatabase['beras-telur']
  }

  if (normalizedNames.some(n => n.includes('tepung')) && 
      normalizedNames.some(n => n.includes('telur'))) {
    return recipeDatabase['tepung-telur']
  }

  if (normalizedNames.some(n => n.includes('mie')) && 
      normalizedNames.some(n => n.includes('telur'))) {
    return recipeDatabase['mie-telur']
  }

  // Return default recipes
  return recipeDatabase['default']
}
