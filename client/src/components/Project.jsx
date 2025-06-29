import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";

const Project = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold: 0.2 });
  const navigate = useNavigate();

  // Sample project data - you can replace this with actual data
  const projects = [
    {
      title: "E-Commerce Platform",
      desc: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard for complete store management.",
      img: "/assets/ecommerce.png",
      githubLink: "https://github.com/gourabofficial/ZIDIO-PROJECT",
      liveLink: "https://zidio-project-ivory.vercel.app/",
    },
    {
      title: "Learning Management System",
      desc: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features for enhanced productivity.",
      img: "/assets/learning.png",
      githubLink: "https://github.com/gourabofficial/Learning-Management-System",
      liveLink: "https://coursehub-ui.vercel.app/",
    },
    {
      title: "Password Generator",
      desc: "A secure password generator application with customizable options, strength indicators, and copy-to-clipboard functionality for enhanced security.",
      img: "/assets/password.png",
      githubLink: "https://github.com/gourabofficial/Overpower-React/tree/main/Password_Generator",
      liveLink: "https://password-genarator-react.vercel.app/",
    },
  ];

  const handleCardClick = (title) => {
    console.log(`Clicked on project: ${title}`);
    // Add navigation logic here
  };

  const handleViewAll = () => {
    navigate("/all-projects");
  };

  return (
    <motion.section
      ref={ref}
      className="mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="h-5"></div>
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
            My <span className="text-orange-400">Projects</span>
          </motion.h2>
          <div className="h-1 sm:h-3"></div>
        </motion.div>

        {/* Projects Content */}
        <motion.div
          className=""
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            className="flex items-center justify-end mb-8 "
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              onClick={handleViewAll}
              className="flex items-center justify-center w-full max-w-[90px] sm:max-w-[110px] lg:max-w-[90px] h-10 glass-button text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full text-white transition-colors bg-gray-800/50 backdrop-blur border border-gray-700/50 hover:bg-orange-500/10 hover:border-orange-500/30"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All
            </motion.button>
          </motion.div>
          <div className="h-4"></div>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            {projects.map((project, idx) => (
              <motion.div
                key={project.title + idx}
                initial={{ opacity: 0, x: -30 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                }
                transition={{ duration: 0.6, delay: 1.2 + idx * 0.2 }}
              >
                <ProjectCard
                  title={project.title}
                  desc={project.desc}
                  img={project.img}
                  githubLink={project.githubLink}
                  liveLink={project.liveLink}
                  index={idx}
                  onClick={() => handleCardClick(project.title)}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Project;
