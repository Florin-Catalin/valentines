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
      <h1 className="landing__title">You've Received a Love Letter</h1>
      <p className="landing__subtitle">Someone special has something to tell you...</p>
      <button className="landing__btn" onClick={handleClick}>
        Open It
      </button>
    </div>
  )
}
