import React, { useState } from 'react'

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend')

  const skillCategories = {
    Frontend: [
      { name: 'React.js', level: 90, icon: '⚛️' },
      { name: 'JavaScript', level: 85, icon: '🟨' },
      { name: 'TypeScript', level: 80, icon: '🔷' },
      { name: 'HTML5', level: 95, icon: '🟧' },
      { name: 'CSS3', level: 90, icon: '🎨' },
      { name: 'Tailwind CSS', level: 85, icon: '💨' },
      { name: 'Vue.js', level: 70, icon: '💚' },
      { name: 'Next.js', level: 80, icon: '▲' }
    ],
    Backend: [
      { name: 'Node.js', level: 85, icon: '🟢' },
      { name: 'Python', level: 80, icon: '🐍' },
      { name: 'Express.js', level: 85, icon: '🚂' },
      { name: 'Django', level: 75, icon: '🎸' },
      { name: 'MongoDB', level: 80, icon: '🍃' },
      { name: 'PostgreSQL', level: 75, icon: '🐘' },
      { name: 'Redis', level: 70, icon: '🔴' },
      { name: 'GraphQL', level: 65, icon: '💜' }
    ],
    Tools: [
      { name: 'Git', level: 90, icon: '📊' },
      { name: 'Docker', level: 75, icon: '🐳' },
      { name: 'AWS', level: 70, icon: '☁️' },
      { name: 'Kubernetes', level: 60, icon: '⚙️' },
      { name: 'Figma', level: 80, icon: '🎨' },
      { name: 'VS Code', level: 95, icon: '💻' },
      { name: 'Postman', level: 85, icon: '📮' },
      { name: 'Jest', level: 75, icon: '🃏' }
    ]
  }

  const categories = Object.keys(skillCategories)

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            My <span className="text-orange-400">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-300 mx-auto mb-8"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skillCategories[activeCategory].map((skill, index) => (
            <div
              key={skill.name}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Skill Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <h3 className="text-white font-semibold">{skill.name}</h3>
                </div>
                <span className="text-orange-400 font-bold text-sm">{skill.level}%</span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${skill.level}%`,
                      animation: `progressBar 2s ease-out ${index * 0.1}s forwards`
                    }}
                  ></div>
                </div>
                
                {/* Proficiency Level */}
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Proficiency</span>
                  <span className={`font-semibold ${
                    skill.level >= 80 ? 'text-green-400' :
                    skill.level >= 60 ? 'text-yellow-400' :
                    'text-orange-400'
                  }`}>
                    {skill.level >= 80 ? 'Expert' :
                     skill.level >= 60 ? 'Advanced' :
                     'Intermediate'}
                  </span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
            <h3 className="text-2xl font-bold text-white mb-4">Continuous Learning</h3>
            <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
              Technology evolves rapidly, and so do I. I'm constantly learning new frameworks, 
              tools, and best practices to stay at the forefront of modern development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Currently Learning: React Native', 'Next.js 14', 'AI/ML Integration', 'Web3 Development'].map((item, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm border border-orange-500/30"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progressBar {
          from {
            width: 0%;
          }
          to {
            width: var(--progress-width);
          }
        }
      `}</style>
    </section>
  )
}

export default Skills