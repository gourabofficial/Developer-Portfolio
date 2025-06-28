import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WorkExperience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, threshold: 0.2 })
  
  const experiences = [
    {
      id: 1,
      position: 'Full Stack Developer',
      company: 'Zidio Development PVT LTD',
      duration: 'March 2025 - June 2025',
      location: 'Remote',
      description: 'Developed and maintained full-stack T-Shirt Selling Web applications using modern technologies and frameworks.',
      technologies: ['MERN Stack',],
      current: false
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
            Work <span className="text-orange-400">Experience</span>
          </motion.h2>
          <div className='h-2 sm:h-4'></div>
        </motion.div>

        {/* Experience Container */}
        <motion.div 
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-700/50 shadow-2xl w-full p-3 sm:p-4 md:p-6 mx-auto relative min-h-[200px] sm:min-h-[250px] flex justify-center items-center"
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
              className=""
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
            {experiences.map((item, index) => (
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
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 1.0 }}
                    >
                      {item.position}
                    </motion.h4>
                    <motion.div 
                      className="flex items-center justify-center gap-2 sm:gap-3 mt-1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                    >
                      <motion.img 
                        src="/public/assets/logo.jpg" 
                        alt="Zidio Development Logo" 
                        className="w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover border border-orange-400/30"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        whileHover={{ 
                          scale: 1.1,
                          borderColor: "rgba(251, 146, 60, 0.6)"
                        }}
                      />
                      <motion.p 
                        className="text-orange-400 text-sm sm:text-base font-semibold"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.3 }}
                      >
                        {item.company}
                      </motion.p>
                    </motion.div>
                  </div>
                        <div className='h-4 '></div>
                  <motion.div 
                    className="flex flex-wrap  justify-center items-center gap-1  sm:gap-2 md:gap-3 text-xs sm:text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    <span className="text-gray-300 font-medium">{item.duration}</span>
                    <span className="text-gray-500 hidden sm:inline">•</span>
                    <span className="text-gray-400">{item.location}</span>
                    {item.current && (
                      <>
                        <span className="text-gray-500 hidden sm:inline">•</span>
                        <motion.span 
                          className="inline-flex items-center px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold"
                          animate={{ 
                            scale: [1, 1.05, 1],
                            opacity: [0.8, 1, 0.8]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          Current
                        </motion.span>
                      </>
                    )}
                  </motion.div>
                </motion.div>

                {/* Description */}
                <motion.p 
                  className="text-gray-300 leading-relaxed text-xs sm:text-sm text-center px-2 sm:px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                >
                  {item.description}
                </motion.p>

                {/* Technologies */}
                {item.technologies && (
                  <motion.div 
                    className="space-y-2 sm:space-y-3"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                  >
                    <h5 className="text-orange-400 font-semibold text-xs sm:text-sm text-center">Technologies Used</h5>
                     <div className='h-2'></div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                     
                      {item.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 bg-orange-500/15 text-orange-300 rounded-lg text-xs font-medium border border-orange-500/20"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: 1.5 + techIndex * 0.1,
                            ease: "easeOut"
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "rgba(251, 146, 60, 0.3)",
                            borderColor: "rgba(251, 146, 60, 0.5)"
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default WorkExperience