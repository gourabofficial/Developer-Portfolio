import { useEffect, useRef } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import { setLocomotiveInstance } from './useScrollTo'

const useLocomotiveScroll = (start = true) => {
  const scrollRef = useRef(null)
  const locomotiveScrollRef = useRef(null)

  useEffect(() => {
    if (!start || !scrollRef.current) return

    // Import locomotive-scroll CSS
    import('locomotive-scroll/dist/locomotive-scroll.css')

    const initLocomotive = () => {
      // Detect if it's a mobile device
      const isMobile = window.innerWidth <= 768
      const isTouch = 'ontouchstart' in window

      locomotiveScrollRef.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: !isMobile, // Disable smooth scroll on mobile for better performance
        multiplier: isMobile ? 1 : 1.2,
        lerp: isMobile ? 0.25 : 0.08,
        class: 'is-revealed',
        scrollbarClass: 'c-scrollbar',
        scrollingClass: 'has-scroll-scrolling',
        draggingClass: 'has-scroll-dragging',
        smoothClass: 'has-scroll-smooth',
        initClass: 'has-scroll-init',
        getSpeed: true,
        getDirection: true,
        scrollFromAnywhere: false,
        inertia: isMobile ? 0.3 : 0.8,
        firefoxMultiplier: 50,
        touchMultiplier: isMobile ? 4 : 2.5,
        tablet: {
          smooth: false,
          getSpeed: true,
          getDirection: true,
          multiplier: 1,
          breakpoint: 1024
        },
        smartphone: {
          smooth: false,
          getSpeed: true,
          getDirection: true,
          multiplier: 1,
          breakpoint: 768
        }
      })

      // Set the instance for global access
      setLocomotiveInstance(locomotiveScrollRef.current)
      
      // Make locomotive scroll instance available globally for navbar
      window.locomotiveScroll = locomotiveScrollRef.current

      // Force initial update to trigger animations
      setTimeout(() => {
        if (locomotiveScrollRef.current) {
          locomotiveScrollRef.current.update()
        }
      }, 100)

      // Update locomotive scroll on window resize
      const handleResize = () => {
        if (locomotiveScrollRef.current) {
          locomotiveScrollRef.current.update()
        }
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }

    const timer = setTimeout(initLocomotive, 100)

    return () => {
      clearTimeout(timer)
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy()
        locomotiveScrollRef.current = null
        setLocomotiveInstance(null)
        window.locomotiveScroll = null
      }
    }
  }, [start])

  const update = () => {
    if (locomotiveScrollRef.current) {
      locomotiveScrollRef.current.update()
    }
  }

  const scrollTo = (target, options = {}) => {
    if (locomotiveScrollRef.current) {
      locomotiveScrollRef.current.scrollTo(target, options)
    }
  }

  const start_ = () => {
    if (locomotiveScrollRef.current) {
      locomotiveScrollRef.current.start()
    }
  }

  const stop = () => {
    if (locomotiveScrollRef.current) {
      locomotiveScrollRef.current.stop()
    }
  }

  return {
    scrollRef,
    locomotive: locomotiveScrollRef.current,
    update,
    scrollTo,
    start: start_,
    stop
  }
}

export default useLocomotiveScroll
