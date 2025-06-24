import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

const Navbar = ({ activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'resume', label: 'Resume' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-lg shadow-2xl shadow-orange-500/20 border-b border-orange-500/20' 
        : 'bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 group">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
              <span className="tracking-wider">Port</span>
              <span className="text-white">folio</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 group ${
                    activeSection === item.id
                      ? 'text-orange-400 bg-orange-500/20 shadow-lg shadow-orange-500/25'
                      : 'text-white hover:text-orange-300 hover:bg-white/10'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10">{item.label}</span>
                  {activeSection === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-orange-400/30 rounded-full animate-pulse"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-orange-400/0 group-hover:from-orange-500/10 group-hover:to-orange-400/10 rounded-full transition-all duration-300"></div>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Button - Desktop */}
          <div className="hidden lg:block">
            <button className="group relative px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Contact Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative p-2 text-white hover:text-orange-300 focus:outline-none focus:text-orange-300 transition-all duration-300 group"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden transition-all duration-500 ease-in-out ${
        isMobileMenuOpen 
          ? 'max-h-screen opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-black/98 backdrop-blur-lg border-t border-orange-500/20">
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform ${
                  activeSection === item.id
                    ? 'text-orange-400 bg-orange-500/20 shadow-lg shadow-orange-500/25 scale-105'
                    : 'text-white hover:text-orange-300 hover:bg-white/10 hover:scale-105'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'
                }}
              >
                <span className="flex items-center justify-between">
                  {item.label}
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </span>
              </button>
            ))}
            
            {/* Mobile Contact Button */}
            <div className="pt-4 border-t border-orange-500/20 mt-4">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105">
                <span className="flex items-center justify-center gap-2">
                  Contact Me
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar