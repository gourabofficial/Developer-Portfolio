import React from 'react'

const Skills = () => {
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

  return (
    <section className="py-4">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            My <span className="text-orange-400">Skills</span>
          </h2>
          <div className='h-8'></div>
        </div>
        {/* Skills Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl max-w-lg w-full min-h-[450px] p-6 mx-auto">
          <div className="h-8"></div>
          {/* Skills Grid */}
          <div className="grid grid-cols-4 gap-4 justify-items-center items-start max-w-md mx-auto">
            {skills.map((skill, index) => {
              return (  
                <div
                  key={skill.name}
                  className={`
                    flex flex-col items-center justify-center gap-1 rounded-lg border
                    ${skill.color} text-gray-300
                    hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer
                    backdrop-blur-sm min-h-[70px] min-w-[70px] p-2 group 
                  `}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <img 
                    src={getIconUrl(skill.name)}
                    alt={skill.name}
                    className="w-7  h-7 group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback for icons that don't exist
                      e.target.style.display = 'none';
                    }}
                  />
                  <span className="font-medium text-[10px] text-center leading-tight text-gray-300">{skill.name}</span>
                </div>
              );
            })}
          </div>

          
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

export default Skills