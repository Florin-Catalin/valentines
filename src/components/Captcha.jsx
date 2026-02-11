import { useState } from 'react'
import './Captcha.css'

/*
 * 🖼️ MULTI-SELECT CAPTCHA:
 * 
 * All photos are of YOUR special person!
 * She must select all of them - each one disappears and gets replaced
 * by another photo of her until she's selected all 9!
 */

// ALL photos are of her!
const ALL_IMAGES = [
  { id: 1, src: '/captcha/photo1.jpg', alt: 'Photo 1' },
  { id: 2, src: '/captcha/photo2.jpg', alt: 'Photo 2' },
  { id: 3, src: '/captcha/photo3.jpg', alt: 'Photo 3' },
  { id: 4, src: '/captcha/photo4.jpg', alt: 'Photo 4' },
  { id: 5, src: '/captcha/photo5.jpg', alt: 'Photo 5' },
  { id: 6, src: '/captcha/photo6.jpg', alt: 'Photo 6' },
  { id: 7, src: '/captcha/photo7.jpg', alt: 'Photo 7' },
  { id: 8, src: '/captcha/photo8.jpg', alt: 'Photo 8' },
  { id: 9, src: '/captcha/photo9.jpg', alt: 'Photo 9' },
]

const GRID_SIZE = 6 // Show 6 images at a time
const TOTAL_TO_SELECT = ALL_IMAGES.length // Must select all of them!

export default function Captcha({ onVerified }) {
  const [selectedCount, setSelectedCount] = useState(0) // Total number selected
  const [displayedImages, setDisplayedImages] = useState(() => {
    // Initially show first 6 images
    return ALL_IMAGES.slice(0, GRID_SIZE)
  })
  const [justSelectedId, setJustSelectedId] = useState(null) // For animation
  const [availableIndex, setAvailableIndex] = useState(GRID_SIZE) // Next image to show

  const handleSelect = (image) => {
    if (justSelectedId === image.id) return // Already being animated

    // Mark as selected for animation
    setJustSelectedId(image.id)
    const newCount = selectedCount + 1
    setSelectedCount(newCount)
    
    // Check if all images are selected
    if (newCount === TOTAL_TO_SELECT) {
      // Victory!
      setTimeout(() => onVerified(), 1500)
    } else {
      // Replace this image with next available one after animation
      setTimeout(() => {
        setDisplayedImages(prev => {
          const newDisplayed = [...prev]
          const index = newDisplayed.findIndex(img => img.id === image.id)
          
          if (index !== -1 && availableIndex < ALL_IMAGES.length) {
            // Replace with next image from the pool
            newDisplayed[index] = ALL_IMAGES[availableIndex]
            setAvailableIndex(availableIndex + 1)
          }
          
          return newDisplayed
        })
        setJustSelectedId(null)
      }, 600)
    }
  }

  const getStatusMessage = () => {
    if (selectedCount === 0) {
      return "Select all photos of the most beautiful girl"
    } else if (selectedCount === TOTAL_TO_SELECT) {
      return "Perfect! You found them all!"
    } else {
      return `Found ${selectedCount}/${TOTAL_TO_SELECT}! Keep going...`
    }
  }

  const isComplete = selectedCount === TOTAL_TO_SELECT

  return (
    <div className="captcha">
      <div className="captcha__card">
        <div className="captcha__header">
          <h2 className="captcha__title">Security Verification</h2>
          <p className="captcha__subtitle">
            Prove you're not a robot
          </p>
        </div>

        <div className="captcha__challenge">
          <div className="captcha__challenge-bar">
            <span>Select <strong>all photos</strong> of the most beautiful girl</span>
          </div>
        </div>

        <div className="captcha__grid">
          {displayedImages.map(image => {
            const isSelected = justSelectedId === image.id
            
            return (
              <button
                key={image.id}
                className={`captcha__item ${
                  isSelected ? 'captcha__item--correct captcha__item--fade-out' : ''
                }`}
                onClick={() => !isSelected ? handleSelect(image) : null}
                disabled={isComplete}
              >
                <div className="captcha__img-wrapper">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.classList.add('captcha__placeholder')
                    }}
                  />
                  <div className="captcha__placeholder-text">
                    📷<br/>
                    <small>Add photo</small>
                  </div>
                </div>
                {isSelected && (
                  <div className="captcha__checkmark">✓</div>
                )}
              </button>
            )
          })}
        </div>

        <div className="captcha__status">
          <p className={`captcha__message ${
            isComplete ? 'captcha__message--correct' : 'captcha__message--hint'
          }`}>
            {getStatusMessage()}
          </p>
        </div>

        <div className="captcha__footer">
          <span className="captcha__brand">luvCAPTCHA</span>
          <span className="captcha__privacy">Privacy · Terms</span>
        </div>
      </div>
    </div>
  )
}
