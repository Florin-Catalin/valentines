import { useState, useRef, useCallback } from 'react'
import './ValentineQuestion.css'

const YES_MESSAGES = [
  "Yes! 💖",
  "Of course! 🥰",
  "Absolutely! 💕",
  "100% Yes! 💗",
  "YESSS! 🎉",
]

export default function ValentineQuestion({ onYes }) {
  const [noCount, setNoCount] = useState(0)
  const [yesScale, setYesScale] = useState(1)
  const noButtonRef = useRef(null)

  const getNoText = () => {
    const texts = [
      "No 😢",
      "Are you sure? 🥺",
      "Really sure? 😭",
      "Think again! 💔",
      "Please? 🥹",
      "Don't do this 😿",
      "I'll be sad 😞",
      "Pretty please? 🌹",
      "Last chance! 💘",
      "You're breaking my heart 💔",
    ]
    return texts[Math.min(noCount, texts.length - 1)]
  }

  const moveNoButton = useCallback(() => {
    if (!noButtonRef.current) return

    const btn = noButtonRef.current
    const parent = btn.parentElement
    const parentRect = parent.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()

    const maxX = parentRect.width - btnRect.width - 20
    const maxY = parentRect.height - btnRect.height - 20

    const newX = Math.random() * maxX
    const newY = Math.random() * maxY

    btn.style.position = 'absolute'
    btn.style.left = `${newX}px`
    btn.style.top = `${newY}px`
    btn.style.transition = 'all 0.3s ease'

    setNoCount(prev => prev + 1)
    setYesScale(prev => Math.min(prev + 0.15, 2.2))
  }, [])

  const handleYes = () => {
    onYes()
  }

  return (
    <div className="valentine-q">
      <div className="valentine-q__card">
        <div className="valentine-q__emoji">
          {noCount === 0 ? '🥰' : noCount < 3 ? '🥺' : noCount < 6 ? '😢' : '😭'}
        </div>

        <h2 className="valentine-q__title">
          Will you be my Valentine?
        </h2>

        {noCount > 0 && (
          <p className="valentine-q__plea">
            {noCount < 3
              ? "Come on, you know you want to say yes! 💕"
              : noCount < 6
              ? "The 'No' button is getting scared of you..."
              : "The 'No' button can't run forever! 😏"
            }
          </p>
        )}

        <div className="valentine-q__buttons">
          <button
            className="valentine-q__yes"
            onClick={handleYes}
            style={{ transform: `scale(${yesScale})` }}
          >
            {noCount === 0 ? "Yes! 💖" : YES_MESSAGES[Math.min(noCount - 1, YES_MESSAGES.length - 1)]}
          </button>

          <button
            ref={noButtonRef}
            className="valentine-q__no"
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={moveNoButton}
          >
            {getNoText()}
          </button>
        </div>
      </div>
    </div>
  )
}
