import { useState } from 'react'
import './Landing.css'

export default function Landing({ onStart }) {
  const [animating, setAnimating] = useState(false)

  const handleClick = () => {
    setAnimating(true)
    setTimeout(() => onStart(), 800)
  }

  return (
    <div className={`landing ${animating ? 'landing--exit' : ''}`}>
      <div className="landing__envelope">
        <div className="landing__envelope-icon">💌</div>
      </div>
      <h1 className="landing__title">You've Received a Love Letter</h1>
      <p className="landing__subtitle">Someone special has something to tell you...</p>
      <button className="landing__btn" onClick={handleClick}>
        <span className="landing__btn-icon">💝</span>
        Open It
      </button>
      <div className="landing__sparkles">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="landing__sparkle" style={{
            '--delay': `${i * 0.3}s`,
            '--x': `${Math.random() * 200 - 100}px`,
            '--y': `${Math.random() * 200 - 100}px`,
          }}>✨</span>
        ))}
      </div>
    </div>
  )
}
