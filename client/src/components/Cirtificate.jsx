import React from 'react'
import { motion } from 'framer-motion'
import { Award, Trophy, BookOpen } from 'lucide-react'

const Cirtificate = () => {
  return (
    <motion.section 
      className="py-8 sm:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            My <span className="text-orange-400">Certificates</span>
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        {/* Certificates Message */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl p-8 sm:p-12 max-w-2xl mx-auto"
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
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-orange-400" />
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
              Certificates & Achievements
            </motion.h3>
            
            <motion.p 
              className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              This section will showcase my professional certifications, online course completions, 
              and technical achievements. As I continue to expand my skillset and earn new credentials, 
              they will be displayed here with verification links and detailed information.
            </motion.p>

            {/* Feature Preview Cards */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <motion.div 
                className="bg-gray-700/30 border border-gray-600/30 rounded-lg p-4 text-center"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(251, 146, 60, 0.4)"
                }}
                transition={{ duration: 0.2 }}
              >
                <Trophy className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <span className="text-sm text-gray-300">Professional Certifications</span>
              </motion.div>
              
              <motion.div 
                className="bg-gray-700/30 border border-gray-600/30 rounded-lg p-4 text-center"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(251, 146, 60, 0.4)"
                }}
                transition={{ duration: 0.2 }}
              >
                <BookOpen className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <span className="text-sm text-gray-300">Online Courses</span>
              </motion.div>

              <motion.div 
                className="bg-gray-700/30 border border-gray-600/30 rounded-lg p-4 text-center"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(251, 146, 60, 0.4)"
                }}
                transition={{ duration: 0.2 }}
              >
                <Award className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <span className="text-sm text-gray-300">Technical Achievements</span>
              </motion.div>
            </motion.div>

            {/* Call to Action */}
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <motion.button 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg shadow-orange-500/25 text-sm"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(251, 146, 60, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Award className="w-4 h-4" />
                View All Certifications
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Cirtificate