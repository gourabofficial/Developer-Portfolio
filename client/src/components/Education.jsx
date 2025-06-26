import React from 'react'

const Education = () => {
  const education = [
    {
      id: 1,
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Sanaka Educational Trust',
      duration: '2022 - 2026',
      location: 'Durgapur, Molandighi, West Bengal',
      description: 'Currently pursuing a comprehensive Computer Science degree with focus on software development, algorithms, and modern web technologies.',
      current: true,
      gpa: '8.5/10',
      subjects: ['Data Structures', 'Algorithms', 'Web Development', 'Database Management', 'Software Engineering']
    }
  ]

  return (
    <section className="mb-16">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            My <span className="text-orange-400">Education</span>
          </h2>
          <div className='h-4'></div>
        </div>
        
        {/* Education Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl w-full p-6 mx-auto relative min-h-[200px]">
          {/* Glass grid pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-transparent opacity-20 rounded-2xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="h-8"></div>
            
            {/* Inner Content Box with proper padding */}
            <div className="bg-gray-900/30 rounded-xl border border-gray-600/30 min-h-[200px] p-6">
              {education.map((item, index) => (
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
                        {item.degree}
                      </h4>
                      <p className="text-orange-400 text-base font-semibold mt-1">
                        {item.institution}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="text-gray-300 font-medium">{item.duration}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400">{item.location}</span>
                      {item.gpa && (
                        <>
                          <span className="text-gray-500">•</span>
                          <span className="text-green-400 font-medium">GPA: {item.gpa}</span>
                        </>
                      )}
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

                  {/* Key Subjects */}
                  {item.subjects && (
                    <div className="space-y-3">
                      <h5 className="text-orange-300 font-semibold text-sm">Key Subjects</h5>
                      <div className="flex flex-wrap gap-2">
                        {item.subjects.map((subject, subjectIndex) => (
                          <span
                            key={subjectIndex}
                            className="px-3 py-1.5 bg-orange-500/15 text-orange-300 rounded-lg text-xs font-medium border border-orange-500/20"
                          >
                            {subject}
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
      </div>
    </section>
  )
}

export default Education