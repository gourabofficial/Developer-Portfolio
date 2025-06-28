import React from 'react'
import ProjectCard from './ProjectCard'

const Project = () => {
  // Sample project data - you can replace this with actual data
  const projects = [
    {
      title: "E-Commerce Platform",
      desc: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard",
      img: "/public/assets/ecommerce.png"
    },
    {
      title: "Learning Management System",
      desc: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features",
      img: "/public/assets/learning.png"
    },
    {
      title: "Password Generator",
      desc: "A responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics",
      img: "/public/assets/password.png"
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
    <div className="w-full max-w-5xl mb-16 relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-xl text-orange-400">Projects</h3>
        <button 
          onClick={handleViewAll}
          className="glass-button text-sm px-3 py-1 rounded-full text-white transition-colors bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-orange-500/10 hover:border-orange-500/30"
        >
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.title + idx}
            title={project.title}
            desc={project.desc}
            img={project.img}
            index={idx}
            onClick={() => handleCardClick(project.title)}
          />
        ))}
      </div>
    </div>
  )
}

export default Project