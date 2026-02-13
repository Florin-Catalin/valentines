import { useRef, useEffect, useState } from 'react'
import './Video.css'

export default function Video({ onFinished }) {
  const videoRef = useRef(null)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(console.error) // Auto-play
      video.addEventListener('ended', onFinished)
      // Show text immediately when video appears
      setShowText(true)
      return () => video.removeEventListener('ended', onFinished)
    }
  }, [onFinished])

  return (
    <div className="video video--fade-in">
      {showText && (
        <div className="video__text-overlay">
          <p className="video__text video__text--line1">
            One day you walked into my life, ...
          </p>
          <p className="video__text video__text--line2">
            and now I can't imagine it without you.
          </p>
        </div>
      )}
      <video
        ref={videoRef}
        src="/video/walked_into_my_life.mp4"
        muted // No sound
        autoPlay
        playsInline
        className="video__player"
      />
    </div>
  )
}