import { useState } from 'react'
import './Captcha.css'

/*
 * 🖼️ HOW TO ADD YOUR PHOTOS:
 * 
 * 1. Place image files in /public/captcha/ folder
 *    e.g. /public/captcha/girl1.jpg, /public/captcha/girl2.jpg, etc.
 * 
 * 2. Update the IMAGES array below with the correct filenames
 *    Set isCorrect: true on the photo(s) of YOUR special person
 * 
 * You can use .jpg, .png, .webp - whatever you like!
 */

const IMAGES = [
  { id: 1, src: '/captcha/girl1.jpg', alt: 'Photo 1', isCorrect: false },
  { id: 2, src: '/captcha/girl2.jpg', alt: 'Photo 2', isCorrect: false },
  { id: 3, src: '/captcha/girl3.jpg', alt: 'Photo 3', isCorrect: true },  // ← This is her!
  { id: 4, src: '/captcha/girl4.jpg', alt: 'Photo 4', isCorrect: false },
  { id: 5, src: '/captcha/girl5.jpg', alt: 'Photo 5', isCorrect: false },
  { id: 6, src: '/captcha/girl6.jpg', alt: 'Photo 6', isCorrect: false },
]

export default function Captcha({ onVerified }) {
  const [selected, setSelected] = useState(null)
  const [status, setStatus] = useState('idle') // idle | wrong | correct
  const [shakeId, setShakeId] = useState(null)
  const [attempts, setAttempts] = useState(0)

  const handleSelect = (image) => {
    setSelected(image.id)

    if (image.isCorrect) {
      setStatus('correct')
      setTimeout(() => onVerified(), 1500)
    } else {
      setStatus('wrong')
      setShakeId(image.id)
      setAttempts(prev => prev + 1)
      setTimeout(() => {
        setShakeId(null)
        setSelected(null)
        setStatus('idle')
      }, 1200)
    }
  }

  const getWrongMessage = () => {
    const messages = [
      "Hmm... look more carefully 👀",
      "That's not her! Try again 💫",
      "Nope! You know who she is 😏",
      "Keep looking, she's right there! 🔍",
      "Your heart knows the answer 💕",
    ]
    return messages[attempts % messages.length]
  }

  return (
    <div className="captcha">
      <div className="captcha__card">
        <div className="captcha__header">
          <div className="captcha__icon">🤖</div>
          <h2 className="captcha__title">Security Verification</h2>
          <p className="captcha__subtitle">
            Prove you're not a robot
          </p>
        </div>

        <div className="captcha__challenge">
          <div className="captcha__challenge-bar">
            <span className="captcha__challenge-icon">🔒</span>
            <span>Select the <strong>most beautiful girl</strong></span>
          </div>
        </div>

        <div className="captcha__grid">
          {IMAGES.map(image => (
            <button
              key={image.id}
              className={`captcha__item ${
                selected === image.id ? 
                  (status === 'correct' ? 'captcha__item--correct' : 'captcha__item--selected') 
                  : ''
              } ${shakeId === image.id ? 'captcha__item--shake' : ''}`}
              onClick={() => status === 'idle' ? handleSelect(image) : null}
              disabled={status === 'correct'}
            >
              <div className="captcha__img-wrapper">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  onError={(e) => {
                    // Placeholder if image not yet added
                    e.target.style.display = 'none'
                    e.target.parentElement.classList.add('captcha__placeholder')
                  }}
                />
                <div className="captcha__placeholder-text">
                  📷<br/>
                  <small>Add photo</small>
                </div>
              </div>
              {selected === image.id && status === 'correct' && (
                <div className="captcha__checkmark">✓</div>
              )}
            </button>
          ))}
        </div>

        <div className="captcha__status">
          {status === 'wrong' && (
            <p className="captcha__message captcha__message--wrong">
              {getWrongMessage()}
            </p>
          )}
          {status === 'correct' && (
            <p className="captcha__message captcha__message--correct">
              Obviously! She's the most beautiful 💖
            </p>
          )}
          {status === 'idle' && attempts === 0 && (
            <p className="captcha__message captcha__message--hint">
              Choose wisely... 🤔
            </p>
          )}
        </div>

        <div className="captcha__footer">
          <span className="captcha__logo">💘</span>
          <span className="captcha__brand">luvCAPTCHA</span>
          <span className="captcha__privacy">Privacy · Terms</span>
        </div>
      </div>
    </div>
  )
}
