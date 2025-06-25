import React, { useState } from 'react'
import { CheckCircle, Eye, Shield } from 'lucide-react'

const Certificate = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const certificates = [
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      category: 'Cloud',
      credentialId: 'AWS-SA-123456',
      description: 'Validates expertise in designing distributed systems on AWS',
      skills: ['AWS', 'Cloud Architecture', 'EC2', 'S3', 'RDS'],
      verified: true,
      image: '☁️'
    },
    {
      id: 2,
      title: 'Meta Front-End Developer Certificate',
      issuer: 'Meta (Facebook)',
      date: '2023',
      category: 'Frontend',
      credentialId: 'META-FE-789012',
      description: 'Comprehensive front-end development program covering React, JavaScript, and UX/UI principles',
      skills: ['React', 'JavaScript', 'HTML/CSS', 'UX/UI', 'Git'],
      verified: true,
      image: '⚛️'
    },
    {
      id: 3,
      title: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2022',
      category: 'Cloud',
      credentialId: 'GCP-DEV-345678',
      description: 'Demonstrates ability to build and deploy applications on Google Cloud Platform',
      skills: ['GCP', 'Cloud Functions', 'Kubernetes', 'Docker', 'DevOps'],
      verified: true,
      image: '☁️'
    },
    {
      id: 4,
      title: 'MongoDB Developer Certification',
      issuer: 'MongoDB University',
      date: '2022',
      category: 'Database',
      credentialId: 'MONGO-DEV-901234',
      description: 'Validates skills in MongoDB database design, development, and administration',
      skills: ['MongoDB', 'NoSQL', 'Database Design', 'Aggregation', 'Indexing'],
      verified: true,
      image: '🍃'
    },
    {
      id: 5,
      title: 'Full Stack Web Development',
      issuer: 'freeCodeCamp',
      date: '2021',
      category: 'Full Stack',
      credentialId: 'FCC-FULL-567890',
      description: 'Completed 300+ hours of coursework covering full-stack web development',
      skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'React'],
      verified: true,
      image: '🌐'
    },
    {
      id: 6,
      title: 'Python for Data Science',
      issuer: 'IBM',
      date: '2021',
      category: 'Programming',
      credentialId: 'IBM-PY-234567',
      description: 'Comprehensive Python programming course focused on data science applications',
      skills: ['Python', 'Data Analysis', 'Pandas', 'NumPy', 'Matplotlib'],
      verified: true,
      image: '🐍'
    },
    {
      id: 7,
      title: 'Docker Certified Associate',
      issuer: 'Docker Inc.',
      date: '2022',
      category: 'DevOps',
      credentialId: 'DOCKER-DCA-678901',
      description: 'Validates practical Docker skills including containerization and orchestration',
      skills: ['Docker', 'Containerization', 'Docker Compose', 'Kubernetes', 'DevOps'],
      verified: true,
      image: '🐳'
    },
    {
      id: 8,
      title: 'JavaScript Algorithms and Data Structures',
      issuer: 'freeCodeCamp',
      date: '2020',
      category: 'Programming',
      credentialId: 'FCC-JS-345678',
      description: 'Completed comprehensive JavaScript programming curriculum with focus on algorithms',
      skills: ['JavaScript', 'Algorithms', 'Data Structures', 'ES6', 'Functional Programming'],
      verified: true,
      image: '🟨'
    }
  ]

  const categories = ['All', 'Cloud', 'Frontend', 'Backend', 'Full Stack', 'Database', 'Programming', 'DevOps']

  const filteredCertificates = selectedCategory === 'All' 
    ? certificates 
    : certificates.filter(cert => cert.category === selectedCategory)

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            My <span className="text-orange-400">Certificates</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-300 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Professional certifications and achievements that validate my expertise and commitment to continuous learning
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert, index) => (
            <div
              key={cert.id}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Certificate Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{cert.image}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-orange-400 font-semibold text-sm">{cert.issuer}</p>
                  </div>
                </div>
                {cert.verified && (
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center" title="Verified">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Certificate Info */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Date Issued:</span>
                  <span className="text-white font-medium">{cert.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Category:</span>
                  <span className="text-orange-300 font-medium">{cert.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Credential ID:</span>
                  <span className="text-gray-300 font-mono text-xs">{cert.credentialId}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {cert.description}
              </p>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-orange-300 font-semibold text-sm mb-2">Skills Validated:</h4>
                <div className="flex flex-wrap gap-1">
                  {cert.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs border border-orange-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-300 py-2 px-3 rounded-lg text-sm font-medium hover:from-orange-500/30 hover:to-orange-600/30 transition-all duration-300 border border-orange-500/30 flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Certificate
                </button>
                <button className="bg-gray-700/50 text-gray-300 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-600/50 transition-colors flex items-center justify-center" title="Verify Credential">
                  <Shield className="w-4 h-4" />
                </button>
              </div>

              {/* Hover Effect */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Certification Summary */}
        <div className="mt-16">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Certification Summary</h3>
            
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">{certificates.length}</div>
                <p className="text-gray-300 text-sm">Total Certificates</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">
                  {certificates.filter(c => c.verified).length}
                </div>
                <p className="text-gray-300 text-sm">Verified</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">6</div>
                <p className="text-gray-300 text-sm">Different Providers</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">2023</div>
                <p className="text-gray-300 text-sm">Latest Certification</p>
              </div>
            </div>

            {/* Commitment Statement */}
            <div className="text-center">
              <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
                I believe in continuous learning and staying updated with the latest technologies. 
                These certifications represent my commitment to professional growth and expertise validation.
              </p>
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
                View All Credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certificate