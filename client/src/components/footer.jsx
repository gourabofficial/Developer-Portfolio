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
      <div className="relative bg-black/80 backdrop-blur-lg border-t border-white/20 min-h-[80px] flex items-center justify-center">
        {/* Enhanced glassmorphism overlay with better contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-blue-600/20"></div>

        <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 flex items-center justify-center min-h-[0px]">
          <div className="flex flex-col items-center justify-center w-full gap-4">
            {/* Left Section - Copyright */}
            <motion.div 
              className="text-center w-full"
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
          </div>
        </div>
        {/* Subtle animated pattern */}
        
      </div>
    </motion.footer>
  )
}

export default Footer