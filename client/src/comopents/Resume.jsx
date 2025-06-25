import React, { useState } from 'react'
import { Download, Loader2, Mail, Phone, Linkedin, Calendar, MapPin } from 'lucide-react'

const Resume = () => {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false)
    }, 2000)
  }

  const resumeData = {
    personalInfo: {
      name: 'Your Name',
      title: 'Full Stack Developer',
      email: 'your.email@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/yourname',
      github: 'github.com/yourname',
      website: 'yourportfolio.com'
    },
    summary: 'Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Proficient in React, Node.js, Python, and cloud technologies. Strong problem-solving skills and a track record of delivering high-quality solutions that drive business growth.',
    
    skills: {
      technical: [
        'JavaScript/TypeScript', 'React.js', 'Node.js', 'Python', 'HTML5/CSS3',
        'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git', 'REST APIs', 'GraphQL'
      ],
      soft: [
        'Team Leadership', 'Problem Solving', 'Communication', 'Project Management',
        'Agile/Scrum', 'Code Review', 'Mentoring', 'Time Management'
      ]
    },

    experience: [
      {
        position: 'Senior Full Stack Developer',
        company: 'Tech Solutions Inc.',
        duration: '2022 - Present',
        achievements: [
          'Led development of 3 major client applications serving 50k+ users',
          'Improved application performance by 40% through code optimization',
          'Mentored team of 5 junior developers and conducted code reviews',
          'Implemented CI/CD pipelines reducing deployment time by 60%'
        ]
      },
      {
        position: 'Full Stack Developer',
        company: 'Digital Innovations Ltd.',
        duration: '2020 - 2022',
        achievements: [
          'Built responsive web applications using React and Node.js',
          'Integrated third-party APIs and payment processing systems',
          'Collaborated with UX/UI team to enhance user experience',
          'Maintained 99.9% uptime for critical business applications'
        ]
      }
    ],

    education: {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      duration: '2015 - 2019',
      gpa: '3.8/4.0',
      achievements: ['Magna Cum Laude', 'Dean\'s List (6 semesters)', 'CS Club President']
    },

    certifications: [
      'AWS Certified Solutions Architect (2023)',
      'Meta Front-End Developer Certificate (2023)',
      'Google Cloud Professional Developer (2022)',
      'MongoDB Developer Certification (2022)'
    ]
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            My <span className="text-orange-400">Resume</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-300 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
            A comprehensive overview of my professional experience, skills, and achievements
          </p>
          
          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <span className="flex items-center space-x-2">
                <Loader2 className="animate-spin h-5 w-5 text-white" />
                <span>Downloading...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </span>
            )}
          </button>
        </div>

        {/* Resume Preview */}
        <div className="bg-white text-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{resumeData.personalInfo.name}</h1>
                <p className="text-xl text-orange-300 mb-4">{resumeData.personalInfo.title}</p>
                <p className="text-gray-300 text-sm max-w-2xl">{resumeData.summary}</p>
              </div>
              <div className="mt-6 md:mt-0 md:text-right space-y-1">
                <p className="text-sm">{resumeData.personalInfo.email}</p>
                <p className="text-sm">{resumeData.personalInfo.phone}</p>
                <p className="text-sm">{resumeData.personalInfo.location}</p>
                <p className="text-sm text-orange-300">{resumeData.personalInfo.website}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Skills Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-orange-500 pb-2">
                Technical Skills
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.technical.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.soft.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-orange-500 pb-2">
                Professional Experience
              </h2>
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-orange-500 pl-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                      <span className="text-orange-600 font-medium">{exp.duration}</span>
                    </div>
                    <p className="text-gray-600 font-medium mb-3">{exp.company}</p>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-gray-700 text-sm flex items-start">
                          <span className="text-orange-500 mr-2 mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Education */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-orange-500 pb-2">
                  Education
                </h2>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800">{resumeData.education.degree}</h3>
                  <p className="text-gray-600 font-medium">{resumeData.education.institution}</p>
                  <p className="text-orange-600 text-sm mb-2">{resumeData.education.duration} | GPA: {resumeData.education.gpa}</p>
                  <ul className="space-y-1">
                    {resumeData.education.achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-700 text-sm flex items-start">
                        <span className="text-orange-500 mr-2 mt-1">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-orange-500 pb-2">
                  Certifications
                </h2>
                <ul className="space-y-2">
                  {resumeData.certifications.map((cert, index) => (
                    <li key={index} className="text-gray-700 text-sm flex items-start">
                      <span className="text-orange-500 mr-2 mt-1">•</span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="mt-12 text-center space-y-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
            <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Interested in working together? I'm always open to discussing new opportunities 
              and exciting projects. Feel free to reach out!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Send Email
              </button>
              <button className="border-2 border-orange-500 text-orange-400 px-6 py-3 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <Linkedin className="w-4 h-4" />
                View LinkedIn
              </button>
              <button className="border-2 border-gray-600 text-gray-300 px-6 py-3 rounded-full font-semibold hover:border-orange-500 hover:text-orange-400 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resume