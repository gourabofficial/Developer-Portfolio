import React from 'react'

const PageWrapper = ({ children }) => {
  return (
    <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
      {children}
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default PageWrapper
