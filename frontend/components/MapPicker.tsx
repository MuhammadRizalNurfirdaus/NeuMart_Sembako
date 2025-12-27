'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { FiMapPin } from 'react-icons/fi'

// Fix Leaflet default icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface MapPickerProps {
  onLocationUpdate: (lat: number, lng: number, address: string) => void
  initialLat?: number
  initialLng?: number
}

export default function MapPicker({ onLocationUpdate, initialLat = -6.2088, initialLng = 106.8456 }: MapPickerProps) {
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    if (!mapContainerRef.current) return

    // Initialize map
    const map = L.map(mapContainerRef.current).setView([initialLat, initialLng], 15)
    
    // Add OpenStreetMap tiles (100% GRATIS!)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    // Add draggable marker
    const marker = L.marker([initialLat, initialLng], {
      draggable: true,
    }).addTo(map)

    // Custom icon
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: '<div style="background-color: #EF4444; width: 40px; height: 40px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><div style="transform: rotate(45deg); color: white; font-size: 20px;">📍</div></div>',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    })
    
    marker.setIcon(customIcon)

    // Update location on marker drag
    marker.on('dragend', async () => {
      const position = marker.getLatLng()
      const address = await reverseGeocode(position.lat, position.lng)
      onLocationUpdate(position.lat, position.lng, address)
    })

    // Update location on map click
    map.on('click', async (e) => {
      marker.setLatLng(e.latlng)
      const address = await reverseGeocode(e.latlng.lat, e.latlng.lng)
      onLocationUpdate(e.latlng.lat, e.latlng.lng, address)
    })

    mapRef.current = map
    markerRef.current = marker

    // Get initial address
    reverseGeocode(initialLat, initialLng).then(address => {
      onLocationUpdate(initialLat, initialLng, address)
    })

    // Cleanup
    return () => {
      map.remove()
    }
  }, [])

  // Reverse geocoding using Nominatim (OpenStreetMap's free geocoding service)
  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      )
      const data = await response.json()
      return data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`
    } catch (error) {
      console.error('Reverse geocoding error:', error)
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`
    }
  }

  // Search location using Nominatim
  const handleSearch = async () => {
    if (!searchQuery.trim() || !mapRef.current || !markerRef.current) return

    setSearching(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      )
      const data = await response.json()
      
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0]
        const latNum = parseFloat(lat)
        const lngNum = parseFloat(lon)
        
        mapRef.current.setView([latNum, lngNum], 17)
        markerRef.current.setLatLng([latNum, lngNum])
        onLocationUpdate(latNum, lngNum, display_name)
      } else {
        alert('Lokasi tidak ditemukan. Coba kata kunci lain.')
      }
    } catch (error) {
      console.error('Search error:', error)
      alert('Gagal mencari lokasi. Silakan coba lagi.')
    } finally {
      setSearching(false)
    }
  }

  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation tidak didukung oleh browser Anda.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        
        if (mapRef.current && markerRef.current) {
          mapRef.current.setView([lat, lng], 17)
          markerRef.current.setLatLng([lat, lng])
          const address = await reverseGeocode(lat, lng)
          onLocationUpdate(lat, lng, address)
        }
      },
      (error) => {
        console.error('Geolocation error:', error)
        alert('Gagal mendapatkan lokasi Anda. Pastikan Anda mengizinkan akses lokasi.')
      }
    )
  }

  return (
    <div className="space-y-3">
      {/* Search box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Cari alamat atau tempat (Jakarta, Bandung, dll)..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={searching}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold"
        >
          {searching ? 'Cari...' : 'Cari'}
        </button>
      </div>

      {/* Current location button */}
      <button
        type="button"
        onClick={getCurrentLocation}
        className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center justify-center gap-2"
      >
        <FiMapPin />
        Gunakan Lokasi Saya
      </button>

      {/* Map container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-96 rounded-lg border-2 border-gray-300 shadow-inner"
      />

      <style jsx global>{`
        .leaflet-container {
          height: 100%;
          width: 100%;
          border-radius: 0.5rem;
        }
        .custom-marker {
          background: transparent;
          border: none;
        }
      `}</style>
    </div>
  )
}
