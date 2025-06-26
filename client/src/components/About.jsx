import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code, Database, Globe, Smartphone, Server, Palette } from 'lucide-react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, threshold: 0.2 })
  
  const skills = [
    { icon: Code, name: "Frontend Development", color: "text-blue-400" },
    { icon: Server, name: "Backend Development", color: "text-green-400" },
    { icon: Database, name: "Database Management", color: "text-purple-400" },
    { icon: Globe, name: "Web Technologies", color: "text-orange-400" },
    { icon: Smartphone, name: "Responsive Design", color: "text-pink-400" },
    { icon: Palette, name: "UI/UX Design", color: "text-cyan-400" }
  ]

  return (
    <motion.section 
      ref={ref}
      className="py-8 sm:py-12"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : { scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            About <span className="text-orange-400">Me</span>
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image */}
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full max-w-md mx-auto lg:mx-0 h-80 sm:h-96 bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-2xl border border-orange-500/20 overflow-hidden">
                <motion.img
                  src="/assets/IMG_20230619_115914.jpg"
                  alt="About Gourab"
                  className="w-full h-full object-cover object-center rounded-2xl"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </div>
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            className="order-1 lg:order-2 text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.h3 
              className="text-xl sm:text-2xl font-semibold text-orange-300 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Passionate Full Stack Developer
            </motion.h3>
            
            <motion.div 
              className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <p>
                I'm a dedicated full-stack developer with a passion for creating innovative 
                digital solutions. My journey in web development started with curiosity and 
                has evolved into a deep commitment to crafting exceptional user experiences.
              </p>
              <p>
                With expertise in modern technologies and frameworks, I specialize in building 
                scalable, responsive applications that solve real-world problems. I believe in 
                writing clean, maintainable code and staying updated with the latest industry trends.
              </p>
            </motion.div>

            {/* Skills Grid */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3 sm:p-4 text-center group hover:border-orange-500/30 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "rgba(251, 146, 60, 0.3)",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <skill.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${skill.color} mx-auto mb-2`} />
                  </motion.div>
                  <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default About