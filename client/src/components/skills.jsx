import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, threshold: 0.2 })
  const getIconUrl = (skill) => {
    const skillName = skill.toLowerCase().replace(/\s+/g, "");
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skillName}/${skillName}-original.svg`;
  };

  const skills = [
    { name: 'JavaScript', color: 'bg-yellow-600/20 border-yellow-600/30' },
    { name: 'React', color: 'bg-blue-600/20 border-blue-600/30' },
    { name: 'MongoDB', color: 'bg-green-600/20 border-green-600/30' },
    { name: 'NextJS', color: 'bg-gray-600/20 border-gray-600/30' },
    { name: 'Express', color: 'bg-gray-700/20 border-gray-700/30' },
    { name: 'TailwindCSS', color: 'bg-cyan-600/20 border-cyan-600/30' },
    { name: 'TypeScript', color: 'bg-blue-700/20 border-blue-700/30' },
    { name: 'PostgreSQL', color: 'bg-blue-800/20 border-blue-800/30' },
    { name: 'MySQL', color: 'bg-blue-600/20 border-blue-600/30' },
    { name: 'Git', color: 'bg-red-600/20 border-red-600/30' },
    { name: 'NodeJS', color: 'bg-green-700/20 border-green-700/30' },
    { name: 'Docker', color: 'bg-blue-600/20 border-blue-600/30' },
    { name: 'Java', color: 'bg-orange-700/20 border-orange-700/30' },
    { name: 'C', color: 'bg-blue-700/20 border-blue-700/30' },
    { name: 'Linux', color: 'bg-yellow-600/20 border-yellow-600/30' },
    { name: 'Python', color: 'bg-blue-500/20 border-blue-500/30' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

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
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : { scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            My <span className="text-orange-400">Skills</span>
          </motion.h2>
          <div className='h-8'></div>
        </motion.div>
        
        {/* Skills Container */}
        <motion.div 
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl max-w-lg w-full min-h-[450px] p-6 mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
        >
          <div className="h-8"></div>
          
          {/* Skills Grid */}
          <motion.div 
            className="grid grid-cols-4 gap-4 justify-items-center items-start max-w-md mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {skills.map((skill, index) => {
              return (  
                <motion.div
                  key={skill.name}
                  className={`
                    flex flex-col items-center justify-center gap-1 rounded-lg border
                    ${skill.color} text-gray-300
                    backdrop-blur-sm min-h-[70px] min-w-[70px] p-2 group cursor-pointer
                  `}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                    borderColor: "rgba(251, 146, 60, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.img 
                    src={getIconUrl(skill.name)}
                    alt={skill.name}
                    className="w-7 h-7"
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.2
                    }}
                    transition={{ duration: 0.6 }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <motion.span 
                    className="font-medium text-[10px] text-center leading-tight text-gray-300"
                    whileHover={{ color: "#ffffff" }}
                  >
                    {skill.name}
                  </motion.span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Skills