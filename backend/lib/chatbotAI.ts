import { products } from '../data/products'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

// Data promo dan ongkir (bisa dipindah ke database)
const promoData = [
  { code: 'WELCOME10', desc: 'Diskon 10% pembelian pertama (min 50rb)', discount: '10%' },
  { code: 'GRATIS100K', desc: 'Gratis ongkir min belanja 100rb', discount: 'Free Shipping' },
  { code: 'HEMAT20K', desc: 'Potongan 20rb min belanja 150rb', discount: 'Rp 20.000' }
]

const shippingInfo = {
  freeShipping: 'Gratis ongkir untuk belanja minimal Rp 100.000',
  rates: 'Ongkir Jakarta Rp 10rb, Bandung/Surabaya Rp 15rb, luar Jawa Rp 25-30rb',
  estimate: 'Estimasi pengiriman 1-5 hari kerja tergantung lokasi'
}

// Fungsi AI Chatbot untuk menjawab pertanyaan tentang stok dan harga
export function processChatMessage(message: string, context?: { userId?: string, orderHistory?: any[] }): string {
  const lowerMessage = message.toLowerCase()

  // Deteksi produk yang ditanyakan
  const mentionedProduct = products.find(p => 
    lowerMessage.includes(p.name.toLowerCase()) ||
    lowerMessage.includes(p.category.toLowerCase())
  )

  // ========== GRATIS ONGKIR & SHIPPING ==========
  if (lowerMessage.includes('gratis ongkir') || lowerMessage.includes('ongkir gratis') || 
      lowerMessage.includes('free shipping') || lowerMessage.includes('biaya kirim gratis')) {
    return `🚚 **Info Gratis Ongkir:**

${shippingInfo.freeShipping}

💡 **Tips:**
• Kumpulkan belanja hingga Rp 100.000 untuk gratis ongkir
• Atau gunakan kode promo: **GRATIS100K**

Estimasi pengiriman: ${shippingInfo.estimate}

Mau tau produk apa aja yang bisa dikumpulkan? Tanya saya!`
  }

  if (lowerMessage.includes('ongkir') || lowerMessage.includes('ongkos kirim') || 
      lowerMessage.includes('biaya kirim') || lowerMessage.includes('shipping')) {
    return `📦 **Informasi Pengiriman:**

${shippingInfo.rates}

✨ ${shippingInfo.freeShipping}

⏱️ ${shippingInfo.estimate}

Mau tahu total ongkir ke kotamu? Sebutkan kota tujuan ya!`
  }

  // ========== PROMO & DISKON ==========
  if (lowerMessage.includes('promo') || lowerMessage.includes('diskon') || 
      lowerMessage.includes('voucher') || lowerMessage.includes('kode')) {
    return `🎉 **Promo Aktif Sekarang:**

${promoData.map((p, i) => `${i + 1}. **${p.code}** - ${p.desc}`).join('\n')}

💰 Gunakan kode promo saat checkout untuk dapat diskon!

Mau rekomendasi produk untuk manfaatin promo? Tanya aja!`
  }

  // ========== TRACKING ORDER ==========
  if (lowerMessage.includes('lacak') || lowerMessage.includes('tracking') || 
      lowerMessage.includes('pesanan saya') || lowerMessage.includes('order saya') ||
      lowerMessage.includes('status pesanan')) {
    if (context?.orderHistory && context.orderHistory.length > 0) {
      const latestOrder = context.orderHistory[0]
      return `📦 **Status Pesanan Terakhir:**

Order #${latestOrder.id}
Status: ${latestOrder.status}
Total: Rp ${latestOrder.total?.toLocaleString('id-ID')}

Untuk tracking lengkap, kunjungi halaman "Pesanan Saya" di profil Anda!`
    }
    return `📦 Untuk melacak pesanan, silakan masuk ke akun Anda dan kunjungi halaman **"Pesanan Saya"** 

Di sana Anda bisa lihat:
✅ Status pesanan real-time
✅ Nomor resi pengiriman  
✅ Estimasi waktu tiba

Butuh bantuan lain?`
  }

  // ========== CARA BELANJA ==========
  if (lowerMessage.includes('cara belanja') || lowerMessage.includes('cara order') || 
      lowerMessage.includes('cara beli') || lowerMessage.includes('gimana belanja')) {
    return `🛒 **Cara Belanja di NeuMart:**

1️⃣ Pilih produk yang Anda inginkan
2️⃣ Tambahkan ke keranjang
3️⃣ Klik ikon keranjang di pojok kanan atas
4️⃣ Klik "Checkout" 
5️⃣ Isi alamat pengiriman (atau gunakan alamat tersimpan)
6️⃣ Pilih metode pembayaran
7️⃣ Gunakan kode promo jika ada
8️⃣ Konfirmasi pesanan

✨ **Tips:** Simpan alamat di profil agar checkout lebih cepat!

Ada yang mau ditanyakan?`
  }

  // ========== PEMBAYARAN ==========
  if (lowerMessage.includes('pembayaran') || lowerMessage.includes('bayar') || 
      lowerMessage.includes('payment') || lowerMessage.includes('transfer')) {
    return `💳 **Metode Pembayaran Tersedia:**

🏦 **Transfer Bank:**
• BCA, Mandiri, BNI, BRI

💰 **E-Wallet:**
• GoPay, OVO, Dana, ShopeePay

💳 **Kartu Kredit/Debit**

✨ **Tips:** Simpan metode pembayaran favorit di profil untuk checkout lebih cepat!

Semua pembayaran aman & terenkripsi 🔒`
  }

  // ========== ALAMAT & PROFIL ==========
  if (lowerMessage.includes('alamat') || lowerMessage.includes('ganti alamat') ||
      lowerMessage.includes('ubah alamat')) {
    return `📍 **Kelola Alamat Pengiriman:**

Kunjungi halaman **Profil Saya** untuk:
✅ Tambah alamat baru
✅ Atur alamat default
✅ Edit/hapus alamat lama

💡 **Tips:** Simpan beberapa alamat (Rumah, Kantor, Kos) agar checkout lebih praktis!

Mau bantuan dengan produk atau promo?`
  }

  // ========== REKOMENDASI CERDAS ==========
  if (lowerMessage.includes('rekomendasi') || lowerMessage.includes('sarankan') ||
      lowerMessage.includes('usul')) {
    const budget = lowerMessage.match(/\d+/)?.[0]
    if (budget) {
      const budgetNum = parseInt(budget) * 1000
      const suitable = products.filter(p => p.price <= budgetNum && p.stock > 0)
        .sort((a, b) => b.price - a.price)
        .slice(0, 3)
      
      if (suitable.length > 0) {
        return `💡 **Rekomendasi untuk budget Rp ${budgetNum.toLocaleString('id-ID')}:**

${suitable.map(p => `✨ ${p.name}\n   Harga: Rp ${p.price.toLocaleString('id-ID')}\n   Stok: ${p.stock} ${p.unit}`).join('\n\n')}

Tambah ${budgetNum >= 100000 ? '✅ GRATIS ONGKIR!' : `Rp ${(100000 - budgetNum).toLocaleString('id-ID')} lagi untuk gratis ongkir!`}`
      }
    }
    return `💡 **Rekomendasi Belanja Hemat:**

Untuk gratis ongkir, coba kombinasi:
${products.slice(0, 3).map(p => `• ${p.name} - Rp ${p.price.toLocaleString('id-ID')}`).join('\n')}

Atau sebutkan budget Anda, misal: "Rekomendasi budget 50rb"`
  }

  // ========== PERTANYAAN STOK ==========
  if (lowerMessage.includes('stok') || lowerMessage.includes('ada') || lowerMessage.includes('tersedia')) {
    if (mentionedProduct) {
      if (mentionedProduct.stock > 0) {
        const almostFree = 100000 - mentionedProduct.price
        return `✅ ${mentionedProduct.name} masih tersedia! 

📦 Stok: ${mentionedProduct.stock} ${mentionedProduct.unit}
💰 Harga: Rp ${mentionedProduct.price.toLocaleString('id-ID')}

${mentionedProduct.price >= 100000 ? '🎉 GRATIS ONGKIR!' : `💡 Tambah Rp ${almostFree.toLocaleString('id-ID')} lagi untuk gratis ongkir!`}`
      } else {
        return `❌ Maaf, ${mentionedProduct.name} sedang habis. 

📬 Mau diinfokan saat stok kembali? Tambahkan ke **Wishlist** Anda!

Atau lihat produk serupa? Tanya saja!`
      }
    }
    return '🤔 Produk apa yang ingin Anda tanyakan? Sebutkan nama produknya ya!'
  }

  // ========== PERTANYAAN HARGA ==========
  if (lowerMessage.includes('harga') || lowerMessage.includes('berapa')) {
    if (mentionedProduct) {
      return `💰 **${mentionedProduct.name}**

Harga: Rp ${mentionedProduct.price.toLocaleString('id-ID')} per ${mentionedProduct.unit}
Stok: ${mentionedProduct.stock > 0 ? `${mentionedProduct.stock} tersedia ✅` : 'Habis ❌'}

${mentionedProduct.stock > 0 && mentionedProduct.price >= 100000 ? '🎉 Gratis ongkir untuk produk ini!' : ''}

Mau langsung pesan? Tambahkan ke keranjang!`
    }
    return '🤔 Produk apa yang ingin Anda tanyakan harganya?'
  }

  // ========== KATEGORI ==========
  if (lowerMessage.includes('kategori') || lowerMessage.includes('jenis')) {
    const categories = [...new Set(products.map(p => p.category))]
    return `📦 **Kategori Produk Kami:**

${categories.map(c => `• ${c}`).join('\n')}

Mau lihat produk di kategori tertentu? Sebutkan kategorinya!`
  }

  // ========== PRODUK TERMURAH ==========
  if (lowerMessage.includes('murah') || lowerMessage.includes('termurah')) {
    const cheapest = [...products].sort((a, b) => a.price - b.price).slice(0, 3)
    return `💸 **Produk Termurah Kami:**

${cheapest.map((p, i) => `${i + 1}. ${p.name}\n   Rp ${p.price.toLocaleString('id-ID')} (Stok: ${p.stock})`).join('\n\n')}

💡 Kumpulkan hingga 100rb untuk gratis ongkir!`
  }

  // ========== PRODUK TERLARIS ==========
  if (lowerMessage.includes('laris') || lowerMessage.includes('populer') || lowerMessage.includes('terlaris')) {
    const popular = [...products].sort((a, b) => a.stock - b.stock).slice(0, 3)
    return `🔥 **Produk Paling Laris (Hampir Habis!):**

${popular.map((p, i) => `${i + 1}. ${p.name}\n   Sisa ${p.stock} stok! Rp ${p.price.toLocaleString('id-ID')}`).join('\n\n')}

⚡ Buruan pesan sebelum kehabisan!`
  }

  // ========== SEMUA PRODUK ==========
  if (lowerMessage.includes('semua produk') || lowerMessage.includes('daftar produk')) {
    return `📋 **Daftar Produk Kami:**

${products.slice(0, 5).map(p => 
  `• ${p.name} (${p.category})\n  Rp ${p.price.toLocaleString('id-ID')} - Stok: ${p.stock}`
).join('\n\n')}

... dan masih banyak lagi!

Cari produk tertentu? Sebutkan namanya!`
  }

  // ========== GREETING ==========
  if (lowerMessage.includes('halo') || lowerMessage.includes('hai') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
    return `👋 **Halo! Selamat datang di NeuMart Sembako!**

Saya asisten AI yang siap membantu Anda 24/7 🤖

**Saya bisa bantu:**
✅ Info stok & harga produk
✅ Promo & gratis ongkir  
✅ Tracking pesanan
✅ Rekomendasi belanja
✅ Cara order & pembayaran

**Promo Spesial Hari Ini:**
🎉 ${promoData[0].code} - ${promoData[0].desc}

Ada yang bisa saya bantu?`
  }

  // ========== TERIMA KASIH ==========
  if (lowerMessage.includes('terima kasih') || lowerMessage.includes('thanks') || lowerMessage.includes('makasih')) {
    return `😊 Sama-sama! Senang bisa membantu! 

Jangan lupa:
🎁 Gunakan promo **${promoData[0].code}** 
🚚 Belanja min 100rb gratis ongkir

Kapan-kapan belanja lagi ya! 🛒✨`
  }

  // ========== DEFAULT RESPONSE ==========
  return `🤖 **Asisten AI NeuMart Sembako**

Saya bisa membantu Anda dengan:

🛍️ **Produk:**
• Cek stok & harga
• Rekomendasi produk
• Daftar kategori

🎁 **Promo & Gratis Ongkir:**
• Info promo terbaru
• Syarat gratis ongkir

📦 **Pesanan:**
• Cara belanja
• Tracking pesanan  
• Metode pembayaran

💡 **Contoh:**
"Berapa harga beras?"
"Info gratis ongkir"
"Promo apa aja?"
"Rekomendasi budget 50rb"

Ada yang bisa saya bantu? 😊`
}
