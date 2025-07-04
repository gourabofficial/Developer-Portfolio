import React from 'react'

const ProjectCard = ({ title, desc, img, githubLink, liveLink, index, onClick }) => {
  const getPointerHighlightProps = (idx) => {
    if (idx % 3 === 0) {
      return {
        backgroundColor: "bg-orange-500/20",
        borderColor: "border-orange-400",
        textColor: "text-orange-400"
        
      };
    } else if (idx % 3 === 1) {
      return {
        backgroundColor: "bg-cyan-500/20",
        borderColor: "border-cyan-400",
        textColor: "text-cyan-400"
      };
    } else {
      return {
        backgroundColor: "bg-purple-500/20",
        borderColor: "border-purple-400",
        textColor: "text-purple-400"
      };
    }
  };

  const highlightProps = getPointerHighlightProps(index);

  return (
    <div
      className="glass-card rounded-xl p-2 flex flex-col h-52 w-full max-w-xs sm:max-w-sm md:max-w-full transition cursor-pointer relative overflow-hidden bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/60 hover:bg-gray-800/40"
      onClick={onClick}
    >
      <div className="glass-grid-pattern opacity-10 absolute inset-0 bg-gradient-to-br from-gray-600/10 to-transparent pointer-events-none" />
      
      {/* Thumbnail Section */}
      <div className="rounded-lg overflow-hidden w-full mb-2 bg-gray-900 flex items-center justify-center relative z-10 h-20 group">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        
        {/* Mobile: Always visible icons, Desktop: Hover overlay */}
        <div className="absolute inset-0 bg-black/70 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {/* GitHub Icon */}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-2 hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          )}
          
          {/* Live Link Icon */}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-2 hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
      
      <div className='h-2'></div>
      {/* Content Section */}
      <div className="relative z-10 flex-1 flex flex-col gap-2">
        {/* Title Section */}
        <div className="mb-1 text-center w-full flex justify-center">
          <h4 className="font-semibold text-white w-full max-w-[180px] sm:max-w-[220px] mx-auto">
            <div className={`inline-block w-full px-3 py-1 rounded-md border ${highlightProps.backgroundColor} ${highlightProps.borderColor}`}>
              <span className={`relative z-10 text-xs font-medium break-words ${highlightProps.textColor}`}>{title}</span>
            </div>
          </h4>
        </div>
        
        {/* Description Section */}
        <div className="flex-1 text-center px-1">
          <p className="text-gray-300 text-xs leading-relaxed line-clamp-4">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard
