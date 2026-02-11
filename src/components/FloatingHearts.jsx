import { useEffect, useState } from 'react'
import './FloatingHearts.css'

const HEART_EMOJIS = ['❤️', '💕', '💖', '💗', '💘', '💝', '🌹', '✨']

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now()
      const heart = {
        id,
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
        left: Math.random() * 100,
        size: 16 + Math.random() * 24,
        duration: 4 + Math.random() * 6,
        delay: Math.random() * 2,
      }
      setHearts(prev => [...prev.slice(-20), heart])
    }, 600)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="floating-hearts">
      {hearts.map(h => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  )
}
