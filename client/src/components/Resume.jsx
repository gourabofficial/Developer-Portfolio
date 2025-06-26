import React from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, Eye, Share } from 'lucide-react'

const Resume = () => {
  return (
    <motion.section 
      className="py-8 sm:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            My <span className="text-orange-400">Resume</span>
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        {/* Resume Content */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl p-8 sm:p-12"
            whileHover={{ 
              scale: 1.02,
              borderColor: "rgba(251, 146, 60, 0.3)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Icon Animation */}
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div 
                className="relative"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-20 h-24 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg flex items-center justify-center border border-orange-500/30">
                  <FileText className="w-10 h-10 text-orange-400" />
                </div>
                
                {/* Floating decorative elements */}
                <motion.div 
                  className="absolute -top-2 -right-2 w-4 h-4 bg-orange-400/30 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: 0.5
                  }}
                ></motion.div>
                <motion.div 
                  className="absolute -bottom-1 -left-3 w-3 h-3 bg-orange-300/40 rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity,
                    delay: 1
                  }}
                ></motion.div>
              </motion.div>
            </motion.div>

            <motion.h3 
              className="text-xl sm:text-2xl font-semibold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              Professional Resume
            </motion.h3>
            
            <motion.p 
              className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              My comprehensive resume showcasing my skills, experience, education, and achievements. 
              Updated regularly to reflect my latest accomplishments and professional growth.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <motion.button 
                className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg shadow-orange-500/25 text-sm sm:text-base min-w-[180px] justify-center"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(251, 146, 60, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Download className="w-5 h-5" />
                </motion.div>
                Download Resume
              </motion.button>

              <motion.button 
                className="group inline-flex items-center gap-3 px-6 py-3 bg-gray-700/50 border border-gray-600/50 text-white font-semibold rounded-lg hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 text-sm sm:text-base min-w-[180px] justify-center"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(251, 146, 60, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Eye className="w-5 h-5" />
                </motion.div>
                Preview Resume
              </motion.button>
            </motion.div>

            {/* Resume Features */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <motion.div 
                className="bg-gray-700/30 border border-gray-600/30 rounded-lg p-4 text-center"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(251, 146, 60, 0.4)"
                }}
                transition={{ duration: 0.2 }}
              >
                <FileText className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <span className="text-sm text-gray-300">Professional Format</span>
              </motion.div>
              
              <motion.div 
                className="bg-gray-700/30 border border-gray-600/30 rounded-lg p-4 text-center"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(251, 146, 60, 0.4)"
                }}
                transition={{ duration: 0.2 }}
              >
                <Share className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <span className="text-sm text-gray-300">Easy to Share</span>
              </motion.div>
            </motion.div>

            {/* Resume Status */}
            <motion.div 
              className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              <motion.div 
                className="flex items-center justify-center gap-2 text-green-400 text-sm"
                animate={{ 
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Last updated: December 2024
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Resume