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
  const [permanentlySelected, setPermanentlySelected] = useState([]) // IDs that stay selected
  const [processing, setProcessing] = useState(new Set()) // IDs currently being processed
  const [availableIndex, setAvailableIndex] = useState(GRID_SIZE) // Next image to show

  const handleSelect = (image) => {
    // Prevent selecting if already processing or permanently selected
    if (processing.has(image.id) || permanentlySelected.includes(image.id)) return

    // Mark as processing immediately
    setProcessing(prev => new Set([...prev, image.id]))
    
    const newCount = selectedCount + 1
    setSelectedCount(newCount)
    
    // Selections 4-8: stay visible with green checkmark
    if (newCount > 3 && newCount < TOTAL_TO_SELECT) {
      setPermanentlySelected(prev => [...prev, image.id])
      // Remove from processing immediately since no animation needed
      setProcessing(prev => {
        const newSet = new Set(prev)
        newSet.delete(image.id)
        return newSet
      })
    }
    // Check if all images are selected
    else if (newCount === TOTAL_TO_SELECT) {
      // Add to permanent selection for final checkmark
      setPermanentlySelected(prev => [...prev, image.id])
      // Remove from processing
      setProcessing(prev => {
        const newSet = new Set(prev)
        newSet.delete(image.id)
        return newSet
      })
      // Victory!
      setTimeout(() => onVerified(), 1500)
    }
    // First 3 selections: fade out and replace
    else if (newCount <= 3) {
      // First 3 selections: fade out and replace
      // Increment availableIndex immediately to prevent duplicates
      const nextIndex = availableIndex
      setAvailableIndex(nextIndex + 1)
      
      setTimeout(() => {
        setDisplayedImages(prev => {
          const newDisplayed = [...prev]
          const index = newDisplayed.findIndex(img => img.id === image.id)
          
          if (index !== -1 && nextIndex < ALL_IMAGES.length) {
            // Replace with next image from the pool
            newDisplayed[index] = ALL_IMAGES[nextIndex]
          }
          
          return newDisplayed
        })
        // Remove from processing after animation
        setProcessing(prev => {
          const newSet = new Set(prev)
          newSet.delete(image.id)
          return newSet
        })
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
            const isProcessing = processing.has(image.id)
            const isPermanentlySelected = permanentlySelected.includes(image.id)
            
            return (
              <button
                key={image.id}
                className={`captcha__item ${
                  isProcessing ? 'captcha__item--correct captcha__item--fade-out' : ''
                } ${isPermanentlySelected ? 'captcha__item--correct' : ''}`}
                onClick={() => !isProcessing && !isPermanentlySelected ? handleSelect(image) : null}
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
                    <small>Add photo</small>
                  </div>
                </div>
                {(isProcessing || isPermanentlySelected) && (
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
