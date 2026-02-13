import { useState, useEffect, useRef } from 'react'
import ZoomMap from './ZoomMap'
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
    description: null,
    video: null,
    map: true,
    mapVideo: "/video/afro-house.mp4", // Plays fullscreen after map zoom
    mapVideoTitle: "Did I just meet my wife .. in 2024 ? Look at these moves",
    textBefore: true,
  },
  {
    id: 2,
    title: "The First Spark",
    description: "Look at you ... I was quite missing you back then, only to find you with a cat, then we went after cat food",
    video: "/video/cat-danceavenue.mp4",
    textBefore: true,
  },
  {
    id: 3,
    title: "Dancing Under the Sky",
    description: "So Andreea, what about a 3rd choreo",
    video: "/video/coregrafie-rooftop.mp4",
    textBefore: false, // Show text after video
  },
  {
    id: 4,
    title: "Late Night Moments",
    description: "I could have post the Piezisa dance but .. no",
    video: "/video/after-club.mp4",
    textBefore: true,
  },
  {
    id: 5,
    title: "maybe your person is just in front of your eyes",
    description: "At the pub, sharing stories and dreams. In those simple moments, I knew - this is where I belong, right here with you.",
    video: "/video/la-tevi-pub.mp4",
    textBefore: false,
  },
  {
    id: 6,
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
  const [mapVideoPlaying, setMapVideoPlaying] = useState(false) // fullscreen video after map
  const [mapFading, setMapFading] = useState(false) // fade out map before video
  const videoRef = useRef(null)
  const mapVideoRef = useRef(null)

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

  const handleMapZoomComplete = () => {
    // Fade out the map/title, then show fullscreen video
    setMapFading(true)
    setTimeout(() => {
      setMapVideoPlaying(true)
      // Play the video with sound
      setTimeout(() => {
        if (mapVideoRef.current) {
          mapVideoRef.current.play().catch(console.error)
        }
      }, 100)
    }, 800)
  }

  const handleMapVideoEnd = () => {
    setMapVideoPlaying(false)
    setMapFading(false)
    setCurrentChapter(prev => prev + 1)
  }

  const handleNext = () => {
    if (isLastChapter) {
      onFinished()
    } else {
      setCurrentChapter(prev => prev + 1)
    }
  }

  const canProceed = (!chapter.video || videoEnded) && !chapter.map

  return (
    <div className="love-story">
      <div className={`love-story__container ${mapFading ? 'love-story__container--fading' : ''}`}>
        
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
            {chapter.description && (
              <p className="love-story__description">{chapter.description}</p>
            )}
          </div>
        )}

        {/* Map for chapter 1 */}
        {chapter.map && showContent && !mapVideoPlaying && (
          <div className={`love-story__map-container ${showContent ? 'love-story__video-container--visible' : ''}`}>
            <ZoomMap onZoomComplete={handleMapZoomComplete} />
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

      {/* Fullscreen video after map zoom (afro-house) */}
      {mapVideoPlaying && chapter.mapVideo && (
        <div className="love-story__fullscreen-video">
          {chapter.mapVideoTitle && (
            <h2 className="love-story__fullscreen-title">{chapter.mapVideoTitle}</h2>
          )}
          <video
            ref={mapVideoRef}
            className="love-story__fullscreen-player"
            src={chapter.mapVideo}
            playsInline
            autoPlay
            onEnded={handleMapVideoEnd}
          />
        </div>
      )}
    </div>
  )
}
