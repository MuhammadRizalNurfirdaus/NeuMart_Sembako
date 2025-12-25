'use client'

import { FaFacebook, FaInstagram, FaWhatsapp, FaTwitter, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-blue">NeuMart Sembako</h3>
            <p className="text-gray-300">
              Toko sembako pintar dengan teknologi AI untuk memudahkan belanja dan memasak Anda.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-primary-green">Beranda</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-primary-green">Produk</a></li>
              <li><a href="/ai-recipe" className="text-gray-300 hover:text-primary-green">Ide Resep</a></li>
              <li><a href="/chatbot" className="text-gray-300 hover:text-primary-green">Tanya Stok</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hubungi Kami</h3>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://www.instagram.com/crawasy_zall?igsh=MXZjMnRuYnJhczNxbg==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-2xl hover:text-pink-500 transition"
                title="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://www.facebook.com/rizal.nurfirdaus.7?mibextid=rS40aB7S9Ucbxw6v" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-2xl hover:text-primary-blue transition"
                title="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://twitter.com/NurfirdausRizal" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-2xl hover:text-blue-400 transition"
                title="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="mailto:muhammadrizalnurfirdaus@gmail.com" 
                className="text-2xl hover:text-red-400 transition"
                title="Email"
              >
                <FaEnvelope />
              </a>
              <a 
                href="https://wa.me/6283101461069" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-2xl hover:text-green-400 transition"
                title="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
            <p className="text-gray-300 mt-4">
              Email: muhammadrizalnurfirdaus@gmail.com<br />
              WhatsApp: +62 831-0146-1069
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 NeuMart Sembako. Dibuat dengan ❤️ dan AI.</p>
        </div>
      </div>
    </footer>
  )
}
