import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Home, User, Briefcase, FolderOpen, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "skills", label: "Skills", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderOpen },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleNavClick = (sectionId) => {
    // Close mobile menu
    setIsMobileMenuOpen(false);
    
    if (sectionId === "home") {
      // Scroll to top for home
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll to specific section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleContactClick = () => {
    setIsMobileMenuOpen(false);
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation - Only show on desktop */}
      <motion.nav
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-lg shadow-2xl shadow-orange-500/20 border-b border-orange-500/20"
            : "bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0 group z-10"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button 
                onClick={() => handleNavClick('home')}
                className="block"
              >
                <motion.h1 
                  className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 bg-clip-text text-transparent cursor-pointer"
                  whileHover={{ 
                    scale: 1.05,
                    filter: "brightness(1.2)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="tracking-wider">Port</span>
                  <span className="text-white">folio</span>
                </motion.h1>
              </button>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              className="flex"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-1 xl:gap-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    <motion.button
                      onClick={() => handleNavClick(item.id)}
                      className="relative inline-flex items-center justify-center px-3 xl:px-4 py-2 rounded-full text-sm xl:text-base font-medium transition-all duration-300 group text-white hover:text-orange-300 hover:bg-white/10"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">{item.label}</span>
                      {/* Hover background overlay */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-orange-400/0 rounded-full z-0"
                        whileHover={{ 
                          background: "linear-gradient(to right, rgba(251, 146, 60, 0.1), rgba(251, 146, 60, 0.1))"
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Button - Desktop */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.button 
                onClick={handleContactClick}
                className="group relative px-4 xl:px-6 py-2 xl:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full shadow-lg shadow-orange-500/25 overflow-hidden text-sm xl:text-base"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(251, 146, 60, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Contact Me
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-3 h-3 xl:w-4 xl:h-4" />
                  </motion.div>
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation - ONLY navigation for mobile */}
      <motion.div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="bg-gray-900/98 backdrop-blur-xl border-t border-gray-700/50 shadow-2xl shadow-black/20 px-4 py-3 pb-safe">
          <div className="flex items-center justify-around max-w-md mx-auto">
            {/* Navigation Buttons */}
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="group relative flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 min-w-[50px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-orange-500/15 rounded-lg opacity-0 group-active:opacity-100 transition-opacity duration-200"
                    whileTap={{ scale: 0.95 }}
                  />
                  <IconComponent className="w-6 h-6 text-gray-400 group-hover:text-orange-400 group-active:text-orange-500 transition-colors duration-200 relative z-10" />
                  <span className="text-[10px] text-gray-500 group-hover:text-orange-400 group-active:text-orange-500 transition-colors duration-200 mt-1 relative z-10 font-medium">
                    {item.label}
                  </span>
                </motion.button>
              );
            })}

            {/* Contact Button */}
            <motion.button
              onClick={handleContactClick}
              className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white p-2 rounded-lg shadow-lg shadow-orange-500/20 group min-w-[50px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg opacity-0 group-active:opacity-100 transition-opacity duration-200"
                whileTap={{ scale: 0.95 }}
              />
              <div className="flex flex-col items-center relative z-10">
                <Mail className="w-6 h-6" />
                <span className="text-[10px] mt-1 font-medium">Contact</span>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;