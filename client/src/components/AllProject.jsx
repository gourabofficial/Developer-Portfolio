import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";

const AllProject = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold: 0.2 });
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Extended project data - you can add more projects here
  const allProjects = [
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
    {
      title: "Own Extension",
      desc: "I made my own extension for chrome and firefox, which allows users to customize their browsing experience with various features.",
      img: "/assets/extention.png", // You can add an extension.png image
      githubLink: "https://github.com/gourabofficial/Own-Extensions",
      liveLink: "https://github.com/gourabofficial/Own-Extensions",
    },
    {
      title: "Grocery_Store",
      desc: "This project is a grocery store application that allows users to browse products, add them to their cart, and manage their orders efficiently.",
      img: "/assets/grocery.png", 
      githubLink: "https://github.com/gourabofficial/Grocery_Store",
      liveLink: "https://grocery-store-azure.vercel.app/",
    },
    {
      title: "Currency Converter Dashboard",
      desc: "Currency Converter Dashboard is a web application that allows users to convert currencies in real-time, providing up-to-date exchange rates and a user-friendly interface.",
      img: "/assets/currencyconverter.jpg", // You can add a social-dashboard.png image
      githubLink: "https://github.com/gourabofficial/Currency_Converter",
      liveLink: "https://gourabofficial.github.io/Currency_Converter/",
    },
  ];

  const handleCardClick = (title) => {
    console.log(`Clicked on project: ${title}`);
    // Add individual project navigation logic here
  };

  const handleBackToHome = () => {
    // Scroll to top before navigating
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate("/");
  };

  return (
    <section className="py-16" data-scroll data-scroll-class="slideInUp" data-scroll-speed="0.1">
      <div className="w-full flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-8"></div>
            {/* Header Section */}
            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: -30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-4"
                initial={{ scale: 0.9 }}
                animate={isInView ? { scale: 1 } : { scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                All <span className="text-orange-400">Projects</span>
              </motion.h1>
              
            </motion.div>

            <div className="h-6"></div>
            {/* Back to Home Button */}
            <motion.div
              className="flex items-start justify-start mb-8"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.button
                onClick={handleBackToHome}
                className="flex justify-center items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-white transition-all duration-300 bg-gray-800/50 backdrop-blur border border-gray-700/50 hover:bg-orange-500/10 hover:border-orange-500/30 hover:text-orange-400 w-[140px] h-10 "
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg  
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="text-sm ">Back to Home</span>
              </motion.button>
            </motion.div>

            <div className="h-6"></div>
            {/* Projects Grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {allProjects.map((project, idx) => (
                <motion.div
                  key={project.title + idx}
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.6, delay: 0.8 + idx * 0.1 }}
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

            <div className="h-6"></div>
            {/* Footer Section */}
            <motion.div
              className="text-center mt-12 sm:mt-16"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <p className="text-gray-400 text-sm sm:leading-relaxed">
                More projects coming soon...
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AllProject;
