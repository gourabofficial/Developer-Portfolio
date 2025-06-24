import React from 'react'

const About = () => {
  const stats = [
    { number: '3+', label: 'Years Experience' },
    { number: '50+', label: 'Projects Completed' },
    { number: '20+', label: 'Happy Clients' },
    { number: '15+', label: 'Technologies' }
  ]

  const highlights = [
    {
      icon: '🎯',
      title: 'Problem Solver',
      description: 'I love tackling complex challenges and finding elegant solutions that make a difference.'
    },
    {
      icon: '🚀',
      title: 'Innovation Driven',
      description: 'Always exploring new technologies and methodologies to stay ahead of the curve.'
    },
    {
      icon: '🤝',
      title: 'Team Player',
      description: 'Collaborative approach with excellent communication skills and leadership experience.'
    },
    {
      icon: '📈',
      title: 'Growth Mindset',
      description: 'Continuous learner committed to personal and professional development.'
    }
  ]

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About <span className="text-orange-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-300 mx-auto mb-8"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Passionate developer with a love for creating innovative solutions and beautiful user experiences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image and Stats */}
          <div className="space-y-8">
            {/* Profile Image Placeholder */}
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl flex items-center justify-center border border-orange-500/30">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">YN</span>
                  </div>
                  <p className="text-orange-300">Your Photo Here</p>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-orange-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-400/20 rounded-full blur-xl"></div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <h3 className="text-3xl font-bold text-orange-400 mb-2">{stat.number}</h3>
                  <p className="text-gray-300 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Hello! I'm a passionate Full Stack Developer with over 3 years of experience 
                  creating digital solutions that make a difference. My journey in tech started 
                  with curiosity and has evolved into a career driven by innovation and excellence.
                </p>
                <p>
                  I specialize in modern web technologies including React, Node.js, Python, and 
                  cloud platforms. I believe in writing clean, maintainable code and creating 
                  user experiences that are both beautiful and functional.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to 
                  open-source projects, or sharing knowledge with the developer community.
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">What Drives Me</h3>
              <div className="grid gap-4">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:border-orange-500/30 transition-all duration-300"
                  >
                    <div className="text-2xl">{highlight.icon}</div>
                    <div>
                      <h4 className="text-orange-300 font-semibold mb-1">{highlight.title}</h4>
                      <p className="text-gray-400 text-sm">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="pt-6">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
                Let's Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About