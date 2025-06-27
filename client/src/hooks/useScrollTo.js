import { useEffect, useRef } from 'react'

let locomotiveScrollInstance = null

export const useScrollTo = () => {
  const scrollTo = (target, options = {}) => {
    if (locomotiveScrollInstance) {
      locomotiveScrollInstance.scrollTo(target, {
        duration: 1200,
        easing: [0.25, 0.0, 0.35, 1.0],
        ...options
      })
    } else {
      // Fallback to native smooth scroll
      const element = typeof target === 'string' ? document.querySelector(target) : target
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }

  return { scrollTo }
}

export const setLocomotiveInstance = (instance) => {
  locomotiveScrollInstance = instance
}

export const getLocomotiveInstance = () => {
  return locomotiveScrollInstance
}
