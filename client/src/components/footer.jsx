import React, { useRef } from 'react'
import { FaGithub, FaLinkedin, FaHeart, FaArrowUp, FaReact, FaJs } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { SiTailwindcss } from 'react-icons/si'
import { motion, useInView } from 'framer-motion'

const Footer = ({ year = 2025 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, threshold: 0.2 })



  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/gourabganguly',
      icon: FaGithub
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/gourabganguly',
      icon: FaLinkedin
    },
    {
      name: 'X (Twitter)',
      url: 'https://twitter.com/gourabganguly',
      icon: FaXTwitter
    }
  ]

  const techStack = [
    {
      name: 'React JS',
      icon: FaReact,
      color: 'text-blue-400'
    },
    {
      name: 'JavaScript',
      icon: FaJs,
      color: 'text-yellow-400'
    },
    {
      name: 'Tailwind CSS',
      icon: SiTailwindcss,
      color: 'text-cyan-400'
    }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.footer 
      ref={ref}
      className="mt-auto relative z-50 w-full"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      data-scroll
      data-scroll-speed="0.1"
    >
      {/* Improved glass background with better visibility */}
      <div className="relative bg-black/80 backdrop-blur-lg border-t border-white/20 min-h-[80px]">
        {/* Enhanced glassmorphism overlay with better contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-blue-600/20"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
            {/* Left Section - Copyright */}
            <motion.div 
              className="text-center  lg:flex-1 lg:pl-8"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-white text-sm font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-relaxed">
                Copyright © {year}{' '}
                <span className="text-orange-400 font-bold tracking-wider drop-shadow-[0_1px_4px_rgba(251,146,60,0.5)]">
                  Gourab Ganguly
                </span>
              </p>
              <p className="text-gray-400 text-xs mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                Full Stack Developer • Crafting Digital Experiences
              </p>
            </motion.div>

            {/* Center Section - Tech Stack */}
            <motion.div 
              className="flex flex-col  items-center gap-2 lg:flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-gray-400 text-xs font-medium">Built with</p>
              <div className="flex items-center gap-3">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className="relative group flex "
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="relative bg-black/50 backdrop-blur-md border border-gray-700/40 p-3 rounded-lg hover:border-gray-500/60 transition-all duration-300 min-h-[40px] min-w-[40px] flex items-center justify-center">
                      <tech.icon className={`w-6 h-6 ${tech.color} drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]`} />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {tech.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Section - Social Links */}
            
            
          </div>

          {/* Bottom Section - Additional Text */}
          <motion.div 
            className="mt-6 pt-4 border-t border-white/10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-gray-400 text-xs flex items-center justify-center gap-1 mb-2">
              
            </p>
           
          </motion.div>
        </div>

        {/* Subtle animated pattern */}
        
      </div>
    </motion.footer>
  )
}

export default Footer