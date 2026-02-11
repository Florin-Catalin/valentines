import { useState, useEffect, useRef } from 'react'
import './LoveLetter.css'

/*
 * ✏️ CUSTOMIZE YOUR LOVE STORY:
 * 
 * Edit the chapters below to tell your own story!
 * Each chapter can have a video, title, and description.
 */

const STORY_CHAPTERS = [
  {
    id: 1,
    title: "Where It All Began",
    description: "We were just friends... Dance partners moving to the same rhythm, not knowing our hearts were already choreographing something beautiful.",
    video: "/video/cat-danceavenue.mp4",
    textBefore: true, // Show text before video
  },
  {
    id: 2,
    title: "Dancing Under the Sky",
    description: "That rooftop choreography... The city below us, the sky above, and in that moment I realized - every step with you felt like home.",
    video: "/video/coregrafie-rooftop.mp4",
    textBefore: false, // Show text after video
  },
  {
    id: 3,
    title: "Our Story",
    description: "From dance partners to life partners. Every twirl, every step, every beat led us here. And this is just the beginning of our forever dance together.",
    video: null, // Text-only chapter
    textBefore: true,
  },
]

export default function LoveLetter({ onFinished }) {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const videoRef = useRef(null)

  const chapter = STORY_CHAPTERS[currentChapter]
  const isLastChapter = currentChapter === STORY_CHAPTERS.length - 1

  useEffect(() => {
    // Reset states when chapter changes
    setShowContent(false)
    setVideoEnded(false)
    
    // Show content after a moment
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [currentChapter])

  const handleVideoEnd = () => {
    setVideoEnded(true)
  }

  const handleNext = () => {
    if (isLastChapter) {
      onFinished()
    } else {
      setCurrentChapter(prev => prev + 1)
    }
  }

  const canProceed = !chapter.video || videoEnded

  return (
    <div className="love-story">
      <div className="love-story__container">
        
        {/* Chapter indicator */}
        <div className="love-story__progress">
          {STORY_CHAPTERS.map((_, idx) => (
            <div
              key={idx}
              className={`love-story__progress-dot ${
                idx === currentChapter ? 'love-story__progress-dot--active' : ''
              } ${idx < currentChapter ? 'love-story__progress-dot--completed' : ''}`}
            />
          ))}
        </div>

        {/* Text before video */}
        {chapter.textBefore && (
          <div className={`love-story__text ${showContent ? 'love-story__text--visible' : ''}`}>
            <h2 className="love-story__title">{chapter.title}</h2>
            <p className="love-story__description">{chapter.description}</p>
          </div>
        )}

        {/* Video */}
        {chapter.video && (
          <div className={`love-story__video-container ${showContent ? 'love-story__video-container--visible' : ''}`}>
            <video
              ref={videoRef}
              className="love-story__video"
              src={chapter.video}
              controls
              playsInline
              onEnded={handleVideoEnd}
            />
            {!videoEnded && (
              <p className="love-story__video-hint">Watch to continue...</p>
            )}
          </div>
        )}

        {/* Text after video */}
        {!chapter.textBefore && chapter.video && videoEnded && (
          <div className="love-story__text love-story__text--visible">
            <h2 className="love-story__title">{chapter.title}</h2>
            <p className="love-story__description">{chapter.description}</p>
          </div>
        )}

        {/* Navigation button */}
        {canProceed && showContent && (
          <button
            className="love-story__button"
            onClick={handleNext}
          >
            {isLastChapter ? "Continue → What's Your Answer?" : "Next Chapter →"}
          </button>
        )}
      </div>
    </div>
  )
}
