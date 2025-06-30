import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const Education = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, threshold: 0.2 })
  
  const education = [
    {
      id: 1,
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'Sanaka Educational Trust',
      duration: '2022 - 2026',
      location: 'Durgapur, Molandighi, West Bengal',
      description: 'Currently pursuing a comprehensive Computer Science degree with focus on software development, algorithms, and modern web technologies.'
    }
  ]

  return (
    <motion.section 
      ref={ref}
      className="mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-6 sm:mb-8 md:mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4 px-4"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : { scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            My <span className="text-orange-400">Education</span>
          </motion.h2>
          <div className='h-2 sm:h-4'></div>
        </motion.div>
        
        {/* Education Container */}
        <motion.div 
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-700/50 shadow-2xl w-full p-3 sm:p-4 md:p-6 mx-auto relative min-h-[200px] sm:min-h-[250px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ 
            scale: [1, 1.01, 1],
            boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.25)",
            transition: { duration: 0.3 }
          }}
        >
          {/* Glass grid pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-transparent opacity-20 rounded-xl sm:rounded-2xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="h-2 sm:h-4 md:h-8"></div>
            
            {/* Inner Content Box with proper padding */}
            <motion.div 
              className="flex justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {education.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="space-y-3 sm:space-y-4 md:space-y-6 w-full max-w-2xl"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                >

                  
                  {/* Header */}
                  <motion.div 
                    className="space-y-2 sm:space-y-3"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-center">
                      <motion.h4 
                        className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                      >
                        {item.degree}
                      </motion.h4>
                      <div className='h-4'></div>
                      <motion.p 
                        className="text-orange-400 text-sm sm:text-base font-semibold mt-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.1 }}
                      >
                        {item.institution}
                      </motion.p>
                    </div>
                  <div className='h-3'></div>

                    <motion.div 
                      className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-3 text-xs sm:text-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
                      <span className="text-gray-300 font-medium">{item.duration}</span>
                      <span className="text-gray-500 hidden sm:inline">•</span>
                      <span className="text-gray-400 text-center break-words">{item.location}</span>
                    </motion.div>
                  </motion.div>

                  <div className='h-3'></div>
                  {/* Description */}
                  <motion.p 
                    className="text-gray-300 leading-relaxed text-xs sm:text-sm text-center px-2 sm:px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                  >
                    {item.description}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Education