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
      className="glass-card rounded-xl p-3 flex flex-col h-64 transition cursor-pointer relative overflow-hidden bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/60 hover:bg-gray-800/40"
      onClick={onClick}
    >
      <div className="glass-grid-pattern opacity-10 absolute inset-0 bg-gradient-to-br from-gray-600/10 to-transparent pointer-events-none" />
      <div className="rounded-lg overflow-hidden w-full mb-3 bg-gray-900 flex items-center justify-center relative z-10 h-32">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="relative z-10 flex-1">
        <h4 className="font-semibold mb-2 text-white">
          <div className={`inline-block p-2 rounded border ${highlightProps.backgroundColor} ${highlightProps.borderColor}`}>
            <span className={`relative z-10 ${highlightProps.textColor}`}>{title}</span>
          </div>
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">{desc}...</p>
      </div>
    </div>
  );
};

export default ProjectCard
