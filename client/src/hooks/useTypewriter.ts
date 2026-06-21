import { useState, useEffect } from 'react'

interface TypewriterOptions {
  text: string
  speed?: number
  delay?: number
  loop?: boolean
}

export const useTypewriter = ({ text, speed = 50, delay = 0, loop = false }: TypewriterOptions) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex === 0 && delay > 0) {
      const delayTimer = setTimeout(() => {
        setCurrentIndex(1)
      }, delay)
      return () => clearTimeout(delayTimer)
    }

    if (currentIndex > 0 && currentIndex <= text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex))
        setCurrentIndex(currentIndex + 1)
      }, speed)

      return () => clearTimeout(timer)
    }

    if (currentIndex > text.length) {
      setIsComplete(true)
      if (loop) {
        setTimeout(() => {
          setCurrentIndex(0)
          setDisplayText('')
          setIsComplete(false)
        }, 2000)
      }
    }
  }, [currentIndex, text, speed, delay, loop])

  return { displayText, isComplete }
}

export default useTypewriter
