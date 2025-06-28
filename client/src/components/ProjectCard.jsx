import React from 'react'

const ProjectCard = ({ title, desc, img, index, onClick }) => {
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
      className="glass-card rounded-xl p-4 flex flex-col h-80 transition cursor-pointer relative overflow-hidden bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/60 hover:bg-gray-800/40"
      onClick={onClick}
    >
      <div className="glass-grid-pattern opacity-10 absolute inset-0 bg-gradient-to-br from-gray-600/10 to-transparent pointer-events-none" />
      
      {/* Thumbnail Section */}
      <div className="rounded-lg overflow-hidden w-full mb-4 bg-gray-900 flex items-center justify-center relative z-10 h-40">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className='h-4'></div>
      {/* Content Section */}
      <div className="relative z-10 flex-1 flex flex-col gap-3">
        {/* Title Section */}
        <div className="mb-2 ml-4 text-center ">
          <h4 className="font-semibold text-white ">
            <div className={`inline-block px-3 py-2 rounded-lg border  ${highlightProps.backgroundColor} ${highlightProps.borderColor}`}>
              <span className={`relative z-10 text-sm font-medium  ${highlightProps.textColor}`}>{title}</span>
            </div>
          </h4>
        </div>
        
        {/* Description Section */}
        <div className="flex-1 text-center ">
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard
