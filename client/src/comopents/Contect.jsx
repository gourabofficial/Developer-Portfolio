import React from 'react'
import { Mail, MapPin } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Contect = () => {
  const contactInfo = [
    {
      icon: FaGithub,
      label: 'GitHub',
      value: 'github.com/gourabsr4',
      link: 'https://github.com/gourabsr4',
      color: 'text-gray-300 hover:text-white'
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/gourab',
      link: 'https://linkedin.com/in/gourab',
      color: 'text-blue-400 hover:text-blue-300'
    },
    {
      icon: FaTwitter,
      label: 'X (Twitter)',
      value: '@gourabsr4',
      link: 'https://twitter.com/gourabsr4',
      color: 'text-sky-400 hover:text-sky-300'
    }
  ]

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Let's <span className="text-orange-400">Connect</span>
          </h2>
         <div className='h-8'></div>
        </div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Social Links */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <span className=""></span>
              Social Media
            </h3>
            <div className='h-4'></div>
            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:border-orange-400/30 transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-400/10 transition-colors">
                      <IconComponent className={`w-6 h-6 ${item.color} transition-colors`} />
                    </div>
                    <div>
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-gray-400 text-sm">{item.value}</p>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <span className=""></span>
              Contact Information
            </h3>
            <div className='h-4'></div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Email</p>
                  <a 
                    href="mailto:gourabofficial702@gmail.com"
                    className="text-gray-300 hover:text-orange-400 transition-colors break-all"
                  >
                    gourabofficial702@gmail.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Location</p>
                  <p className="text-gray-300">
                    Birbhum, Dubrajpur<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  )
}

export default Contect