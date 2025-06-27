import React, { forwardRef } from 'react'
import useLocomotiveScroll from '../hooks/useLocomotiveScroll'

const ScrollContainer = forwardRef(({ children, className = '', ...props }, ref) => {
  const { scrollRef } = useLocomotiveScroll(true)

  return (
    <div
      ref={scrollRef}
      className={`scroll-container ${className}`}
      data-scroll-container
      {...props}
    >
      {children}
    </div>
  )
})

ScrollContainer.displayName = 'ScrollContainer'

export default ScrollContainer
