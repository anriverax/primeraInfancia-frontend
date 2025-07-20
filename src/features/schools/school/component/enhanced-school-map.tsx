"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import L from "leaflet"

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// Create a custom school icon using a school emoji or custom SVG
const createSchoolIcon = () => {
  return L.divIcon({
    html: `
      <div style="
        background-color: #3b82f6;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        font-size: 16px;
      ">
        🏫
      </div>
    `,
    className: "custom-school-marker",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  })
}

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
})
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
})
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
  ssr: false,
})
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
})

interface EnhancedSchoolMapProps {
  coordinates?: string
  schoolName?: string
  address?: string
  email?: string
  phoneNumber?: string
  sector?: string
}

export default function EnhancedSchoolMap({
  coordinates
}: EnhancedSchoolMapProps) {
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    setMapReady(true)
  }, [])

  // Parse coordinates string "14.06465,-89.58911" to [lat, lng]
  const parseCoordinates = (coordString?: string): [number, number] | null => {
    if (!coordString) return null

    try {
      const [lat, lng] = coordString.split(",").map((coord) => Number.parseFloat(coord.trim()))
      if (isNaN(lat) || isNaN(lng)) return null
      return [lat, lng]
    } catch (error) {
      console.error("Error parsing coordinates:", error)
      return null
    }
  }

  const parsedCoords = parseCoordinates(coordinates)

  if (!mapReady) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Cargando ubicación...</p>
        </div>
      </div>
    )
  }

  if (!parsedCoords) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="text-4xl mb-2">📍</div>
          <p className="text-gray-600 mb-2">Coordenadas no disponibles</p>
          <p className="text-sm text-gray-500">Coordenadas: {coordinates || "Not provided"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
      <MapContainer
        center={parsedCoords}
        zoom={16}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
      </MapContainer>
    </div>
  )
}
