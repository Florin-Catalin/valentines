import { useState, useRef, useCallback, useEffect } from 'react'
import './ValentineQuestion.css'

const YES_MESSAGES = [
  "Yes!",
  "Of course!",
  "Absolutely!",
  "100% Yes!",
  "YESSS!",
  "YES YES YES!",
  "Click me already!",
  "I'm taking over!",
  "YES IS THE ONLY OPTION!",
]

export default function ValentineQuestion({ onYes }) {
  const [noCount, setNoCount] = useState(0)
  const [yesScale, setYesScale] = useState(1)
  const [showKiss, setShowKiss] = useState(false)
  const noButtonRef = useRef(null)

  const getNoText = () => {
    const texts = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Please?",
      "Don't do this",
      "I'll be sad",
      "Pretty please?",
      "Last chance!",
      "You're breaking my heart",
    ]
    return texts[Math.min(noCount, texts.length - 1)]
  }

  const moveNoButton = useCallback((mouseX, mouseY) => {
    if (!noButtonRef.current) return

    const btn = noButtonRef.current
    const parent = btn.parentElement
    const parentRect = parent.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()

    // Calculate center of button
    const btnCenterX = btnRect.left + btnRect.width / 2
    const btnCenterY = btnRect.top + btnRect.height / 2

    // Calculate distance from mouse/touch
    const deltaX = btnCenterX - mouseX
    const deltaY = btnCenterY - mouseY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    // If mouse is close, move button away
    if (distance < 150) {
      // Calculate escape direction (away from mouse)
      const angle = Math.atan2(deltaY, deltaX)
      const escapeDistance = 200 + Math.random() * 100
      
      let newX = btnRect.left - parentRect.left + Math.cos(angle) * escapeDistance
      let newY = btnRect.top - parentRect.top + Math.sin(angle) * escapeDistance

      // Allow button to go off-screen after a few attempts
      if (noCount > 4) {
        // Let it escape anywhere, even off-screen
        newX = Math.random() * window.innerWidth - parentRect.left
        newY = Math.random() * window.innerHeight - parentRect.top
      } else {
        // Keep it somewhat on screen initially
        const margin = 20
        newX = Math.max(margin, Math.min(newX, parentRect.width - btnRect.width - margin))
        newY = Math.max(margin, Math.min(newY, parentRect.height - btnRect.height - margin))
      }

      btn.style.position = 'absolute'
      btn.style.left = `${newX}px`
      btn.style.top = `${newY}px`
      btn.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'

      setNoCount(prev => prev + 1)
      setYesScale(prev => prev + 0.3) // Remove limit, keep growing!
    }
  }, [noCount])

  useEffect(() => {
    const handleMouseMove = (e) => {
      moveNoButton(e.clientX, e.clientY)
    }

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        moveNoButton(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [moveNoButton])

  const handleYes = () => {
    setShowKiss(true)
    setTimeout(() => onYes(), 3500)
  }

  return (
    <div className="valentine-q">
      {showKiss && (
        <div className="valentine-q__kiss-overlay">
          <img
            src="/kiss.jpeg"
            alt="Kiss"
            className="valentine-q__kiss-img"
          />
        </div>
      )}
      <div className={`valentine-q__card ${showKiss ? 'valentine-q__card--hidden' : ''}`}>
        <h2 className="valentine-q__title">
          Will you be my Valentine?
        </h2>

        {noCount > 0 && (
          <p className="valentine-q__plea">
            {noCount < 3
              ? "Come on, you know you want to say yes!"
              : noCount < 6
              ? "The 'No' button is running away from you!"
              : noCount < 10
              ? "It's escaping! Just click YES!"
              : "The 'No' button has left the building!"
            }
          </p>
        )}

        <div className="valentine-q__buttons">
          <button
            className="valentine-q__yes"
            onClick={handleYes}
            style={{ transform: `scale(${yesScale})` }}
          >
            {noCount === 0 ? "Yes!" : YES_MESSAGES[Math.min(noCount - 1, YES_MESSAGES.length - 1)]}
          </button>

          <button
            ref={noButtonRef}
            className="valentine-q__no"
            onMouseDown={(e) => {
              e.preventDefault()
              moveNoButton(e.clientX, e.clientY)
            }}
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            {getNoText()}
          </button>
        </div>
      </div>
    </div>
  )
}
