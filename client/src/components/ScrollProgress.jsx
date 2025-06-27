import React, { useState, useEffect } from 'react'

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.querySelector('[data-scroll-container]')
      if (scrollContainer) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = (scrollTop / scrollHeight) * 100
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Listen for locomotive scroll updates
    const locomotiveScrollUpdate = () => {
      setTimeout(handleScroll, 100)
    }

    window.addEventListener('resize', locomotiveScrollUpdate)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', locomotiveScrollUpdate)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
      <div 
        className="h-full bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}

export default ScrollProgress
