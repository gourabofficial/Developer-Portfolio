import React from 'react'

const Experience = () => {
  const experiences = [
    {
      id: 1,
      position: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      duration: '2022 - Present',
      location: 'San Francisco, CA',
      description: 'Led the development of scalable web applications using React, Node.js, and AWS. Managed a team of 5 developers and improved application performance by 40%.',
      achievements: [
        'Architected and developed 3 major client applications',
        'Reduced server response time by 40% through optimization',
        'Mentored junior developers and conducted code reviews',
        'Implemented CI/CD pipelines reducing deployment time by 60%'
      ],
      technologies: ['React', 'Node.js', 'AWS', 'MongoDB', 'Docker'],
      current: true
    },
    {
      id: 2,
      position: 'Full Stack Developer',
      company: 'Digital Innovations Ltd.',
      duration: '2020 - 2022',
      location: 'New York, NY',
      description: 'Developed and maintained multiple web applications, collaborated with cross-functional teams, and contributed to the company\'s digital transformation initiatives.',
      achievements: [
        'Built responsive web applications serving 10k+ users',
        'Integrated third-party APIs and payment gateways',
        'Collaborated with UX/UI team to improve user experience',
        'Participated in agile development methodologies'
      ],
      technologies: ['React', 'Express.js', 'PostgreSQL', 'Redis', 'Git'],
      current: false
    },
    {
      id: 3,
      position: 'Junior Web Developer',
      company: 'StartUp Ventures',
      duration: '2019 - 2020',
      location: 'Austin, TX',
      description: 'Started my career developing frontend applications and learning backend technologies. Worked closely with senior developers to gain hands-on experience.',
      achievements: [
        'Developed responsive frontend components',
        'Learned modern development practices and tools',
        'Contributed to 5+ client projects',
        'Completed React and Node.js certifications'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
      current: false
    }
  ]

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      duration: '2015 - 2019',
      location: 'California, USA',
      achievements: [
        'Graduated Magna Cum Laude (GPA: 3.8/4.0)',
        'Dean\'s List for 6 consecutive semesters',
        'President of Computer Science Club',
        'Completed thesis on Machine Learning Applications'
      ]
    }
  ]

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            My <span className="text-orange-400">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-300 mx-auto mb-8"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A journey through my professional career and educational background
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Professional Experience</h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-orange-300"></div>

            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative mb-12 pl-20">
                {/* Timeline Dot */}
                <div className={`absolute left-6 w-4 h-4 rounded-full border-4 ${
                  exp.current 
                    ? 'bg-orange-500 border-orange-300 shadow-lg shadow-orange-500/50' 
                    : 'bg-gray-600 border-gray-400'
                }`}></div>

                {/* Experience Card */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{exp.position}</h4>
                      <p className="text-orange-400 font-semibold">{exp.company}</p>
                    </div>
                    <div className="text-right mt-2 lg:mt-0">
                      <p className="text-gray-300 font-medium">{exp.duration}</p>
                      <p className="text-gray-400 text-sm">{exp.location}</p>
                      {exp.current && (
                        <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold mt-1">
                          Current
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                  {/* Achievements */}
                  <div className="mb-4">
                    <h5 className="text-orange-300 font-semibold mb-2">Key Achievements:</h5>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-gray-300 text-sm flex items-start">
                          <span className="text-orange-400 mr-2 mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h5 className="text-orange-300 font-semibold mb-2">Technologies Used:</h5>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs border border-orange-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Education</h3>
          {education.map((edu, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">{edu.degree}</h4>
                  <p className="text-orange-400 font-semibold">{edu.institution}</p>
                </div>
                <div className="text-right mt-2 lg:mt-0">
                  <p className="text-gray-300 font-medium">{edu.duration}</p>
                  <p className="text-gray-400 text-sm">{edu.location}</p>
                </div>
              </div>

              <div>
                <h5 className="text-orange-300 font-semibold mb-2">Academic Achievements:</h5>
                <ul className="space-y-1">
                  {edu.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="text-gray-300 text-sm flex items-start">
                      <span className="text-orange-400 mr-2 mt-1">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-16 text-center">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
            <h3 className="text-2xl font-bold text-white mb-4">Career Highlights</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">5+</div>
                <p className="text-gray-300">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">50+</div>
                <p className="text-gray-300">Projects Completed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">15+</div>
                <p className="text-gray-300">Technologies Mastered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience