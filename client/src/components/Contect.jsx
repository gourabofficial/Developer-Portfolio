import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa'

const Contect = () => {
  const socialLinks = {
    github: 'https://github.com/gourabsr4',
    linkedin: 'https://linkedin.com/in/gourab',
    twitter: 'https://twitter.com/gourabsr4',
    website: 'https://your-website.com' // Add your website URL here
  }

  const email = 'gourabofficial702@gmail.com'
  const location = 'Durgapur, West Bengal, India'

  return (
    <section className="py-4">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Let's <span className="text-orange-400">Connect</span>
          </h2>
          <div className='h-2'></div>
        </div>

        {/* Contact Container - Glass Card Style */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl max-w-md w-full p-5 mx-auto relative min-h-[380px]">
          {/* Glass grid pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-transparent opacity-20 rounded-2xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="h-6"></div>
            
            
            {/* Social Icons */}
            <div className="flex gap-3 text-xl mb-4 justify-center">
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700/50 backdrop-blur-sm border border-gray-600/30 hover:border-orange-400/50 hover:bg-orange-400/10 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300"
                  aria-label="Github"
                >
                  <FaGithub className="text-gray-300 hover:text-white transition-colors text-lg" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700/50 backdrop-blur-sm border border-gray-600/30 hover:border-orange-400/50 hover:bg-orange-400/10 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300"
                  aria-label="Linkedin"
                >
                  <FaLinkedin className="text-blue-400 hover:text-blue-300 transition-colors text-lg" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700/50 backdrop-blur-sm border border-gray-600/30 hover:border-orange-400/50 hover:bg-orange-400/10 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-sky-400 hover:text-sky-300 transition-colors text-lg" />
                </a>
              )}
              {socialLinks.website && (
                <a
                  href={socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700/50 backdrop-blur-sm border border-gray-600/30 hover:border-orange-400/50 hover:bg-orange-400/10 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300"
                  aria-label="Website"
                >
                  <FaGlobe className="text-gray-300 hover:text-white transition-colors text-lg" />
                </a>
              )}
            </div>

            <div className='h-4'></div>
            {/* Contact Information */}
            <div className="space-y-8 mt-6 text-gray-300">
              {/* Email Card */}
              <div className=" p-3 hover:border-orange-400/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full group-hover:scale-125 transition-transform"></div>
                  <div className="flex-1">
                    <div className="text-xs text-orange-400 font-medium uppercase tracking-wider mb-1">Email</div>
                    <a 
                      href={`mailto:${email}`}
                      className="text-gray-300 hover:text-white transition-colors text-sm break-all"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className='h-2'></div>
              {/* Address Card */}
              <div className="p-3 hover:border-orange-400/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full group-hover:scale-125 transition-transform"></div>
                  <div className="flex-1">
                    <div className="text-xs text-orange-400 font-medium uppercase tracking-wider mb-1">Address</div>
                    <div className="text-gray-300 text-sm">{location}</div>
                  </div>
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