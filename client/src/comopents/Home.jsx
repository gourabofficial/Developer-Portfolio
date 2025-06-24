import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Download, 
  Github, 
  Linkedin, 
  Twitter, 
  ChevronDown,
  Eye,
  Mail,
} from 'lucide-react'

const Home = () => {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const fullText = 'Full Stack Developer'

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setText(fullText.slice(0, index))
      index++
      if (index > fullText.length) {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Floating Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-orange-400/10 to-orange-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-gradient-to-r from-orange-300/15 to-orange-400/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-8">
        {/* Greeting */}
        <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
          <p className="text-orange-400 text-lg sm:text-xl font-medium mb-2">
            Hello, I'm
          </p>
        </div>

        {/* Name */}
        <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
              Gourab Ganguly
            </span>
          </h1>
        </div>

        {/* Typing Animation */}
        <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-orange-300 mb-8">
            {text}
            {isTyping && <span className="animate-pulse">|</span>}
          </h2>
        </div>

        {/* Description */}
        <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards]">
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
            Passionate about creating exceptional digital experiences through clean code, 
            innovative design, and cutting-edge technologies. Let's build something amazing together.
          </p>
        </div>
         <div className="h-5" />

        {/* CTA Buttons */}
        <div className="opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => navigate('/projects')}
              className="group relative w-full sm:w-auto min-w-[200px] px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Eye className="w-5 h-15 group-hover:scale-110 transition-transform" />
                View My Work
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button 
              onClick={() => navigate('/resume')}
              className="group w-full sm:w-auto min-w-[200px] px-10 py-5 border-2 border-orange-500 text-orange-400 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <span className="flex items-center justify-center gap-3">
                Download CV
                <Download className="w-5 h-15 group-hover:translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        {/* Gap between buttons and social icons */}
        <div className="h-10" />

        {/* Social Links */}
        <div className="opacity-0 animate-[fadeInUp_1s_ease-out_1.2s_forwards]">
          <div className="flex justify-center space-x-4">
            {[
              { 
                name: 'GitHub', 
                icon: Github, 
                href: 'https://github.com/yourusername',
                color: 'hover:text-gray-300' 
              },
              { 
                name: 'LinkedIn', 
                icon: Linkedin, 
                href: 'https://linkedin.com/in/yourusername',
                color: 'hover:text-blue-400' 
              },
              { 
                name: 'Twitter', 
                icon: Twitter, 
                href: 'https://twitter.com/yourusername',
                color: 'hover:text-sky-400' 
              },
              { 
                name: 'Email', 
                icon: Mail, 
                href: 'mailto:your.email@example.com',
                color: 'hover:text-green-400' 
              }
            ].map((social, index) => {
              const IconComponent = social.icon
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-5 w-16 h-16 flex items-center justify-center rounded-full border border-gray-600 hover:border-orange-500 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/25 ${social.color}`}
                  style={{ animationDelay: `${1.4 + index * 0.1}s` }}
                  title={`Visit my ${social.name}`}
                >
                  <IconComponent className="w-7 h-7 text-gray-400 group-hover:text-orange-400 transition-colors duration-300" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="opacity-0 animate-[fadeInUp_1s_ease-out_1.6s_forwards]">
          <div className="mt-16">
            <div className="animate-bounce">
              <ChevronDown className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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

export default Home
