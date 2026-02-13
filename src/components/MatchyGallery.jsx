import { useState, useEffect } from 'react'
import './MatchyGallery.css'

const US_PHOTOS = [
  { src: '/us/SKBjSack.jpeg', alt: 'Us 1' },
  { src: '/us/VlyyREr5.jpeg', alt: 'Us 2' },
  { src: '/us/ixVioHqa.jpeg', alt: 'Us 3' },
]

export default function MatchyGallery({ onFinished }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showTitle, setShowTitle] = useState(false)
  const [showPhotos, setShowPhotos] = useState(false)
  const [visiblePhotos, setVisiblePhotos] = useState([])
  const [allRevealed, setAllRevealed] = useState(false)

  useEffect(() => {
    // Show title first
    setTimeout(() => setShowTitle(true), 300)
    // Then reveal photos one by one
    setTimeout(() => setShowPhotos(true), 1200)

    US_PHOTOS.forEach((_, i) => {
      setTimeout(() => {
        setVisiblePhotos(prev => [...prev, i])
        if (i === US_PHOTOS.length - 1) {
          setTimeout(() => setAllRevealed(true), 800)
        }
      }, 1800 + i * 800)
    })
  }, [])

  const handleContinue = () => {
    onFinished()
  }

  return (
    <div className="matchy">
      <div className="matchy__container">
        <h2 className={`matchy__title ${showTitle ? 'matchy__title--visible' : ''}`}>
          just look at us, being cool and matchy
        </h2>

        <div className={`matchy__gallery ${showPhotos ? 'matchy__gallery--visible' : ''}`}>
          {US_PHOTOS.map((photo, i) => (
            <div
              key={i}
              className={`matchy__photo-wrapper ${
                visiblePhotos.includes(i) ? 'matchy__photo-wrapper--visible' : ''
              }`}
              style={{
                '--delay': `${i * 0.1}s`,
                '--rotation': `${(i - 1) * 5}deg`,
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="matchy__photo"
              />
            </div>
          ))}
        </div>

        {allRevealed && (
          <button className="matchy__button" onClick={handleContinue}>
            Continue →
          </button>
        )}
      </div>
    </div>
  )
}
