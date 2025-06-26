import React, { useRef } from 'react'
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa'
import { motion, useInView } from 'framer-motion'

const Contect = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, threshold: 0.2 })
  
  const socialLinks = {
    github: 'https://github.com/gourabofficial',
    linkedin: 'https://www.linkedin.com/in/gourab-ganguly/',
    twitter: 'https://x.com/ExplorerGourab',
    
  }

  const email = 'gourabofficial702@gmail.com'
  const location = 'Durgapur, West Bengal, India'

  // Custom X Logo component
  const XLogo = ({ className }) => (
    <svg 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )

  return (
    <motion.section 
      ref={ref}
      className="py-4"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="w-full">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2 
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : { scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Let's <span className="text-orange-400">Connect</span>
          </motion.h2>
          <div className='h-3 sm:h-6'></div>
        </motion.div>

        {/* Contact Container - Glass Card Style */}
        <motion.div 
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl w-full p-4 sm:p-6 relative min-h-[280px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        >
          {/* Glass grid pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-transparent opacity-20 rounded-2xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="h-4 sm:h-6"></div>
            
            
            {/* Social Icons */}
            <motion.div 
              className="flex gap-2 sm:gap-3 text-lg sm:text-xl mb-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700/50 backdrop-blur-sm border border-gray-600/30 hover:border-orange-400/50 hover:bg-orange-400/10 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-300"
                  aria-label="Github"
                >
                  <FaGithub className="text-gray-300 hover:text-white transition-colors text-sm sm:text-lg" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700/50 backdrop-blur-sm border border-gray-600/30 hover:border-orange-400/50 hover:bg-orange-400/10 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-300"
                  aria-label="Linkedin"
                >
                  <FaLinkedin className="text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-lg" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700/50 backdrop-blur-sm border border-gray-600/30 hover:border-orange-400/50 hover:bg-orange-400/10 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-300"
                  aria-label="X (formerly Twitter)"
                >
                  <XLogo className="text-gray-300 hover:text-white transition-colors w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              )}
              {socialLinks.website && (
                <a
                  href={socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700/50 backdrop-blur-sm border border-gray-600/30 hover:border-orange-400/50 hover:bg-orange-400/10 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-300"
                  aria-label="Website"
                >
                  <FaGlobe className="text-gray-300 hover:text-white transition-colors text-sm sm:text-lg" />
                </a>
              )}
            </motion.div>

            <div className='h-3 sm:h-4'></div>
            {/* Contact Information */}
            <motion.div 
              className='flex flex-col items-center justify-center space-y-3 sm:space-y-4'
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <div className="space-y-6 sm:space-y-8 mt-4 sm:mt-6 text-gray-300">
              {/* Email Card */}
              <motion.div 
                className="p-2 sm:p-3 hover:border-orange-400/50 transition-colors group"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.div 
                    className="w-2 h-2 bg-orange-400 rounded-full group-hover:scale-125 transition-transform"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                  <div className="flex-1">
                    <div className="text-xs text-orange-400 font-medium uppercase tracking-wider mb-1">Email</div>
                    <a 
                      href={`mailto:${email}`}
                      className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm break-all"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </motion.div>
              
              <div className='h-1 sm:h-2'></div>
              {/* Address Card */}
              <motion.div 
                className="p-2 sm:p-3 hover:border-orange-400/50 transition-colors group"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.div 
                    className="w-2 h-2 bg-orange-400 rounded-full group-hover:scale-125 transition-transform"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  ></motion.div>
                  <div className="flex-1">
                    <div className="text-xs text-orange-400 font-medium uppercase tracking-wider mb-1">Address</div>
                    <div className="text-gray-300 text-xs sm:text-sm">{location}</div>
                  </div>
                </div>
              </motion.div>
            </div>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Contect