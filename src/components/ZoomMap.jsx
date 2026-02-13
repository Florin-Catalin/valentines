import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import './ZoomMap.css'

// Chic Dance Academy, Cluj-Napoca coordinates
const TARGET_LAT = 46.7712
const TARGET_LNG = 23.5898

// Zoom levels for the animation
const ZOOM_START = 3
const ZOOM_END = 18

export default function ZoomMap({ onZoomComplete }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const [showPin, setShowPin] = useState(false)

  useEffect(() => {
    // Dynamically import leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      if (mapInstanceRef.current) return // Already initialized

      const map = L.map(mapRef.current, {
        center: [TARGET_LAT, TARGET_LNG],
        zoom: ZOOM_START,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        keyboard: false,
      })

      // Google Satellite layer
      L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
      }).addTo(map)

      mapInstanceRef.current = map

      // Animate zoom - fast!
      let currentZoom = ZOOM_START
      const zoomStep = () => {
        if (currentZoom < ZOOM_END) {
          currentZoom += 1.5
          map.flyTo([TARGET_LAT, TARGET_LNG], Math.min(currentZoom, ZOOM_END), {
            duration: 0.25,
            easeLinearity: 0.7,
          })
          setTimeout(zoomStep, 280)
        } else {
          // Show pin when zoom is complete
          setShowPin(true)
          
          // Add a marker
          const icon = L.divIcon({
            className: 'zoom-map__marker',
            html: '<div class="zoom-map__pin">📍</div>',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
          })
          L.marker([TARGET_LAT, TARGET_LNG], { icon }).addTo(map)

          // Notify parent that zoom is done
          if (onZoomComplete) {
            setTimeout(() => onZoomComplete(), 1200)
          }
        }
      }

      // Start zoom animation after a brief delay
      setTimeout(zoomStep, 500)
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div className="zoom-map">
      <div ref={mapRef} className="zoom-map__container" />
      {showPin && (
        <div className="zoom-map__label">
          <span>📍 Chic Dance Academy, Cluj-Napoca</span>
        </div>
      )}
    </div>
  )
}
