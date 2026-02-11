import { useState, useEffect } from 'react'
import './LoveLetter.css'

/*
 * ✏️ CUSTOMIZE YOUR LOVE LETTER:
 * 
 * Edit the text below to write your own message!
 * You can also change the name at the top.
 */

const LETTER_CONTENT = {
  to: "My Dearest",
  paragraphs: [
    "From the moment I met you, everything changed. The world became more colorful, the days brighter, and my heart found its rhythm in your smile.",
    "Every moment with you feels like a beautiful dream I never want to wake up from. Your laugh is my favorite sound, your eyes are my favorite sight, and your happiness is my greatest wish.",
    "You make the ordinary extraordinary. A simple walk becomes an adventure, a quiet evening becomes a treasure, and every day becomes a gift because I get to share it with you.",
    "I love the way you scrunch your nose when you laugh. I love how passionate you get about the things you care about. I love every little thing that makes you, you.",
    "Thank you for being my best friend, my confidant, my home. Thank you for loving me in all the ways I never knew I needed.",
  ],
  closing: "Forever & Always Yours",
  signature: "With all my love 💕",
}

export default function LoveLetter({ onFinished }) {
  const [isOpen, setIsOpen] = useState(false)
  const [visibleParagraphs, setVisibleParagraphs] = useState(0)
  const [showClosing, setShowClosing] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    // Open the envelope after a moment
    const openTimer = setTimeout(() => setIsOpen(true), 800)
    return () => clearTimeout(openTimer)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    // Reveal paragraphs one by one
    const timers = LETTER_CONTENT.paragraphs.map((_, i) =>
      setTimeout(() => setVisibleParagraphs(i + 1), 1000 + i * 1200)
    )

    const closingTimer = setTimeout(
      () => setShowClosing(true),
      1000 + LETTER_CONTENT.paragraphs.length * 1200
    )

    const btnTimer = setTimeout(
      () => setShowButton(true),
      1800 + LETTER_CONTENT.paragraphs.length * 1200
    )

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(closingTimer)
      clearTimeout(btnTimer)
    }
  }, [isOpen])

  return (
    <div className="love-letter">
      <div className={`love-letter__envelope ${isOpen ? 'love-letter__envelope--open' : ''}`}>
        {!isOpen && (
          <div className="love-letter__envelope-front">
            <div className="love-letter__seal">💌</div>
            <p className="love-letter__opening-text">Opening your letter...</p>
          </div>
        )}

        {isOpen && (
          <div className="love-letter__paper">
            <div className="love-letter__paper-texture" />

            <div className="love-letter__content">
              <p className="love-letter__to">{LETTER_CONTENT.to},</p>

              {LETTER_CONTENT.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className={`love-letter__paragraph ${
                    i < visibleParagraphs ? 'love-letter__paragraph--visible' : ''
                  }`}
                >
                  {para}
                </p>
              ))}

              {showClosing && (
                <div className="love-letter__closing">
                  <p className="love-letter__closing-text">{LETTER_CONTENT.closing},</p>
                  <p className="love-letter__signature">{LETTER_CONTENT.signature}</p>
                </div>
              )}
            </div>

            {showButton && (
              <button className="love-letter__continue" onClick={onFinished}>
                Continue → One More Thing...
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
