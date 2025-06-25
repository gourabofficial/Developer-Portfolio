import React from 'react'
import { 
  FaJs, 
  FaReact, 
  FaDatabase, 
  FaGitAlt,
  FaNodeJs,
  FaDocker,
  FaJava,
  FaLinux
} from 'react-icons/fa'
import { 
  SiNextdotjs,
  SiExpress,
  SiTailwindcss,
  SiTypescript,
  SiPostgresql,
  SiMysql,
  SiC
} from 'react-icons/si'


const Skills = () => {
  const skills = [
    { name: 'JavaScript', icon: FaJs, color: 'bg-yellow-600/20 border-yellow-600/30', iconColor: '#F7DF1E' },
    { name: 'React', icon: FaReact, color: 'bg-blue-600/20 border-blue-600/30', iconColor: '#61DAFB' },
    { name: 'MongoDB', icon: FaDatabase, color: 'bg-green-600/20 border-green-600/30', iconColor: '#47A248' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'bg-gray-600/20 border-gray-600/30', iconColor: '#000000' },
    { name: 'Express', icon: SiExpress, color: 'bg-gray-700/20 border-gray-700/30', iconColor: '#000000' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'bg-cyan-600/20 border-cyan-600/30', iconColor: '#06B6D4' },
    { name: 'TypeScript', icon: SiTypescript, color: 'bg-blue-700/20 border-blue-700/30', iconColor: '#3178C6' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: 'bg-blue-800/20 border-blue-800/30', iconColor: '#4169E1' },
    { name: 'MySQL', icon: SiMysql, color: 'bg-blue-600/20 border-blue-600/30', iconColor: '#4479A1' },
    { name: 'Git', icon: FaGitAlt, color: 'bg-red-600/20 border-red-600/30', iconColor: '#F05032' },
    { name: 'Node.js', icon: FaNodeJs, color: 'bg-green-700/20 border-green-700/30', iconColor: '#339933' },
    { name: 'Docker', icon: FaDocker, color: 'bg-blue-600/20 border-blue-600/30', iconColor: '#2496ED' },
    { name: 'Java', icon: FaJava, color: 'bg-orange-700/20 border-orange-700/30', iconColor: '#ED8B00' },
    { name: 'C', icon: SiC, color: 'bg-blue-700/20 border-blue-700/30', iconColor: '#A8B9CC' },
    { name: 'Linux', icon: FaLinux, color: 'bg-yellow-600/20 border-yellow-600/30', iconColor: '#FCC624' },
    { name: 'DSA', icon: FaDatabase, color: 'bg-purple-600/20 border-purple-600/30', iconColor: '#8B5CF6' }
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
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl w-[500px] min-h-[450px] p-6">
          <div className="h-8"></div>
          {/* Skills Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-8 xl:grid-cols-4 gap-6 justify-items-center items-start">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
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
                  <IconComponent 
                    size={20} 
                    style={{ color: skill.iconColor }}
                    className="group-hover:scale-110 transition-transform duration-300" 
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