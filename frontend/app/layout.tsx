import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NeuMart Sembako - Toko Sembako Pintar dengan AI',
  description: 'Belanja sembako lebih mudah dengan rekomendasi AI dan ide resep',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
