import { useEffect, useState, useRef } from 'react'
import './Celebration.css'

/*
 * 🖼️ ADD YOUR COUPLE PHOTOS:
 * 
 * Place photos in /public/memories/ folder
 * e.g. /public/memories/photo1.jpg, /public/memories/photo2.jpg
 * 
 * Update the MEMORIES array below with your filenames and captions.
 */

const MEMORIES = [
  { src: '/memories/photo1.jpg', caption: 'Our first date' },
  { src: '/memories/photo2.jpg', caption: 'That perfect day' },
  { src: '/memories/photo3.jpg', caption: 'Us being us' },
  { src: '/memories/photo4.jpg', caption: 'My favorite moment' },
]

function Confetti() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#e91e63', '#f48fb1', '#ff6090', '#c2185b', '#fce4ec', '#ffab91', '#ff80ab', '#ea80fc', '#ff5252', '#ffd54f']
    const confettiPieces = []

    for (let i = 0; i < 150; i++) {
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: 8 + Math.random() * 8,
        h: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 3,
        speedY: 2 + Math.random() * 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 0.7 + Math.random() * 0.3,
      })
    }

    let animId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      confettiPieces.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY
        p.rotation += p.rotationSpeed
        p.opacity -= 0.001

        if (p.y > canvas.height) {
          p.y = -10
          p.x = Math.random() * canvas.width
          p.opacity = 0.7 + Math.random() * 0.3
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = Math.max(p.opacity, 0)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="celebration__confetti" />
}

export default function Celebration() {
  const [showContent, setShowContent] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState(0)

  useEffect(() => {
    setTimeout(() => setShowContent(true), 500)
  }, [])

  const nextPhoto = () => setCurrentPhoto(prev => (prev + 1) % MEMORIES.length)
  const prevPhoto = () => setCurrentPhoto(prev => (prev - 1 + MEMORIES.length) % MEMORIES.length)

  return (
    <div className="celebration">
      <Confetti />

      <div className={`celebration__content ${showContent ? 'celebration__content--visible' : ''}`}>
        <div className="celebration__header">
          <h1 className="celebration__title">Yaaaay!</h1>
          <p className="celebration__subtitle">I knew you'd say yes!</p>
        </div>

        <div className="celebration__message">
          <p>
            You just made me the happiest person in the world! 
            This Valentine's Day and every day after, I promise to love you, 
            make you laugh, and wake up and make you coffee.
          </p>
        </div>

        <div className="celebration__countdown">
          <p className="celebration__countdown-label">Happy Valentine's Day!</p>
          <p className="celebration__final">
            Here's to us, to love, and to all the beautiful moments yet to come.
          </p>
        </div>

        <button
          className="celebration__restart"
          onClick={() => window.location.reload()}
        >
          Read the letter again
        </button>
      </div>
    </div>
  )
}
