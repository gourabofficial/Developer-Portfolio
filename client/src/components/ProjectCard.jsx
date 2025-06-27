import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Code } from 'lucide-react'

const ProjectCard = ({ title, desc, img, tech, github, live, index, isInView, onClick }) => {
  return (
    <motion.div
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        borderColor: "rgba(251, 146, 60, 0.3)",
        boxShadow: "0 25px 50px -12px rgba(251, 146, 60, 0.15)"
      }}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { 
              opacity: 1,
              scale: 1
            } : {}}
            transition={{ 
              duration: 0.6, 
              delay: 1.5 + index * 0.1
            }}
          >
            <Code className="w-12 h-12 text-gray-500" />
          </motion.div>
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500/80 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="w-4 h-4" />
          </motion.a>
          <motion.a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500/80 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      {/* Project Content */}        <motion.div 
        className="p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
      >
        <motion.h4 
          className="text-lg font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors duration-200"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
        >
          {title}
        </motion.h4>
        <motion.p 
          className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
        >
          {desc}
        </motion.p>
        
        {/* Tech Stack */}
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.7 + index * 0.1 }}
        >
          {tech.map((techItem, techIdx) => (
            <motion.span
              key={techIdx}
              className="px-3 py-1 bg-orange-500/10 text-orange-300 text-xs rounded-full border border-orange-500/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ 
                duration: 0.3, 
                delay: 1.8 + index * 0.1 + techIdx * 0.05,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(251, 146, 60, 0.3)",
                borderColor: "rgba(251, 146, 60, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {techItem}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 via-orange-400/0 to-orange-500/0 group-hover:from-orange-500/20 group-hover:via-orange-400/10 group-hover:to-orange-500/20 pointer-events-none transition-all duration-500" />
      
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400/30 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.3, scale: 1 } : {}}
        transition={{ 
          duration: 0.5, 
          delay: 2.0 + index * 0.1
        }}
      />
      <motion.div 
        className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-300/40 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.4, scale: 1 } : {}}
        transition={{ 
          duration: 0.5, 
          delay: 2.2 + index * 0.1
        }}
      />
    </motion.div>
  );
};

export default ProjectCard
