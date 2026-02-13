import { useState } from 'react'
import FloatingHearts from './components/FloatingHearts'
import Landing from './components/Landing'
import Captcha from './components/Captcha'
import Video from './components/Video'
import LoveLetter from './components/LoveLetter'
import ValentineQuestion from './components/ValentineQuestion'
import Celebration from './components/Celebration'
import './App.css'

/*
 * App Flow:
 * 1. Landing      → "You've received a love letter"
 * 2. Captcha      → "Select the most beautiful girl"
 * 3. Love Letter  → Animated letter that reveals paragraph by paragraph
 * 4. Valentine Q  → "Will you be my Valentine?" (No button runs away!)
 * 5. Celebration  → Confetti + memories carousel + sweet message
 */

const STAGES = {
  LANDING: 'landing',
  CAPTCHA: 'captcha',
  VIDEO: 'video',
  LETTER: 'letter',
  QUESTION: 'question',
  CELEBRATION: 'celebration',
}

function App() {
  const [stage, setStage] = useState(STAGES.LANDING)

  return (
    <div className="app">
      <FloatingHearts />

      {stage === STAGES.LANDING && (
        <Landing onStart={() => setStage(STAGES.CAPTCHA)} />
      )}

      {stage === STAGES.CAPTCHA && (
        <Captcha onVerified={() => setStage(STAGES.VIDEO)} />
      )}

      {stage === STAGES.VIDEO && (
        <Video onFinished={() => setStage(STAGES.LETTER)} />
      )}

      {stage === STAGES.LETTER && (
        <LoveLetter onFinished={() => setStage(STAGES.QUESTION)} />
      )}

      {stage === STAGES.QUESTION && (
        <ValentineQuestion onYes={() => setStage(STAGES.CELEBRATION)} />
      )}

      {stage === STAGES.CELEBRATION && (
        <Celebration />
      )}
    </div>
  )
}

export default App
