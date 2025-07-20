"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import L from "leaflet"
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

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// Create a custom school icon
const schoolIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],            
  shadowSize: [41, 41],
})



interface SchoolMapProps {
  coordinates?: string
}

export default function SchoolMap({ coordinates }: SchoolMapProps) {
  const [mapReady, setMapReady] = useState(false)
//AddMemo
  useEffect(() => {
    setMapReady(true)
  }, [])

  // Parse coordinates string "14.06465,-89.58911" to [lat, lng]
  const parseCoordinates = (coordString?: string): [number, number] | null => { //Hacer usecallBack
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
        <p className="text-gray-600">Cargando ubicación...</p>
      </div>
    )
  }

  if (!parsedCoords) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Coordenadas no disponibles</p>
          <p className="text-sm text-gray-500">Coordenadas: {coordinates || "Not provided"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-300">
      <MapContainer center={parsedCoords} zoom={15} style={{ height: "100%", width: "100%" }} className="z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={parsedCoords} icon={schoolIcon}>
          {/*<Popup maxWidth={300} className="custom-popup">
            <div className="p-3 min-w-[250px]">
               <h3 className="font-bold text-lg mb-2 text-gray-800">{schoolName || "School Location"}</h3>
              {address && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-600 mb-1">Address:</p>
                  <p className="text-sm text-gray-700">{address}</p>
                </div>
              )} 
              <div className="border-t pt-2">
                <p className="text-xs text-gray-500 font-medium">
                  Coordenadas: {parsedCoords[0].toFixed(5)}, {parsedCoords[1].toFixed(5)}
                </p>
              </div>
            </div>
          </Popup>*/}
        </Marker>
      </MapContainer>
    </div>
  )
}
