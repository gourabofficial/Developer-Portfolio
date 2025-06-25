import React from 'react'

const WorkExperience = () => {
  const experiences = [
    {
      id: 1,
      position: 'Full Stack Developer',
      company: 'Zidio Development PVT LTD',
      duration: 'March 2025 - June 2025',
      location: 'Remote',
      description: 'Developed and maintained full-stack web applications using modern technologies and frameworks.',
      technologies: ['MERN Stack', 'React', 'Node.js', 'MongoDB', 'Express'],
      current: true
    }
  ]

  return (
    <section className="py-4">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Work <span className="text-orange-400">Experience</span>
          </h2>
          <div className='h-2'></div>
        </div>

        {/* Experience Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl max-w-lg w-full mx-auto">
          {/* Inner Content Box with proper padding */}
          <div className="bg-gray-900/30 rounded-xl border border-gray-600/30 min-h-[200px] p-6">
            {experiences.map((item, index) => (
              <div
                key={item.id}
                className="space-y-6"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Header */}
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xl font-bold text-white leading-tight">
                      {item.position}
                    </h4>
                    <p className="text-orange-400 text-base font-semibold mt-1">
                      {item.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="text-gray-300 font-medium">{item.duration}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">{item.location}</span>
                    {item.current && (
                      <>
                        <span className="text-gray-500">•</span>
                        <span className="inline-flex items-center px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                          Current
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-sm">
                  {item.description}
                </p>

                {/* Technologies */}
                {item.technologies && (
                  <div className="space-y-3">
                    <h5 className="text-orange-300 font-semibold text-sm">Technologies Used</h5>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1.5 bg-orange-500/15 text-orange-300 rounded-lg text-xs font-medium border border-orange-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
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

export default WorkExperience
