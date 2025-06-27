import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ProjectCard from './ProjectCard'

const Project = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })
  // Sample project data - you can replace this with actual data
  const projects = [
    {
      title: "E-Commerce Platform",
      desc: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
      img: "/api/placeholder/400/250",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/username/ecommerce",
      live: "https://ecommerce-demo.com"
    },
    {
      title: "Task Management App",
      desc: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      img: "/api/placeholder/400/250",
      tech: ["Next.js", "Socket.io", "PostgreSQL", "Tailwind"],
      github: "https://github.com/username/taskmanager",
      live: "https://taskmanager-demo.com"
    },
    {
      title: "Weather Dashboard",
      desc: "A responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
      img: "/api/placeholder/400/250",
      tech: ["Vue.js", "OpenWeather API", "Chart.js", "CSS3"],
      github: "https://github.com/username/weather",
      live: "https://weather-demo.com"
    }
  ];

  const handleCardClick = (title) => {
    console.log(`Clicked on project: ${title}`);
    // Add navigation logic here
  };

  const handleViewAll = () => {
    console.log("View all projects clicked");
    // Add navigation to projects page
  };

  return (
    <motion.section 
      ref={ref}
      className="mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-6 sm:mb-8 md:mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4 px-4"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            My <span className="text-orange-400">Projects</span>
          </motion.h2>
          <div className='h-2 sm:h-4'></div>
        </motion.div>
        
        {/* Projects Container */}
        <motion.div 
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-700/50 shadow-2xl w-full p-3 sm:p-4 md:p-6 mx-auto relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
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
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="w-full max-w-4xl">
                {/* View All Button */}
                <div className="flex justify-center mb-6">
                  <motion.button
                    onClick={handleViewAll}
                    className="group inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white text-sm rounded-full hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    View All
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>
                </div>
                
                {/* Projects Grid */}
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  {projects.map((project, idx) => (
                    <ProjectCard
                      key={project.title + idx}
                      title={project.title}
                      desc={project.desc}
                      img={project.img}
                      tech={project.tech}
                      github={project.github}
                      live={project.live}
                      index={idx}
                      isInView={isInView}
                      onClick={() => handleCardClick(project.title)}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Project