import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/skills", label: "Skills" },
    { path: "/experience", label: "Experience" },
    { path: "/projects", label: "Projects" },
    { path: "/certificates", label: "Certificates" },
    { path: "/resume", label: "Resume" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-lg shadow-2xl shadow-orange-500/20 border-b border-orange-500/20"
          : "bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0 group"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <NavLink to="/" className="block">
              <motion.h1 
                className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 bg-clip-text text-transparent cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  filter: "brightness(1.2)"
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="tracking-wider">Port</span>
                <span className="text-white">folio</span>
              </motion.h1>
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 sm:gap-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `relative inline-flex items-center justify-center px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 group ${
                        isActive
                          ? "text-orange-400 bg-orange-500/20 shadow-lg shadow-orange-500/25"
                          : "text-white hover:text-orange-300 hover:bg-white/10"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="relative z-10">{item.label}</span>
                        {/* Active background pulse */}
                        {isActive && (
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-orange-400/30 rounded-full z-0"
                            animate={{ 
                              scale: [1, 1.05, 1],
                              opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        )}
                        {/* Hover background overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-orange-400/0 group-hover:from-orange-500/10 group-hover:to-orange-400/10 rounded-full transition-all duration-300 z-0" />
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Button - Desktop */}
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button 
              className="group relative px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full shadow-lg shadow-orange-500/25 overflow-hidden text-sm sm:text-base"
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
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </motion.div>
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.button>
          </motion.div>

          {/* Mobile menu button */}
          <motion.div 
            className="lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative p-2 text-white hover:text-orange-300 focus:outline-none focus:text-orange-300 transition-all duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div 
              className="bg-black/98 backdrop-blur-lg border-t border-orange-500/20"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-2 sm:space-y-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block w-full text-left px-4 sm:px-5 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 ${
                          isActive
                            ? "text-orange-400 bg-orange-500/20 shadow-lg shadow-orange-500/25"
                            : "text-white hover:text-orange-300 hover:bg-white/10"
                        }`
                      }
                    >
                      <motion.span 
                        className="flex items-center justify-between"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-50" />
                      </motion.span>
                    </NavLink>
                  </motion.div>
                ))}

                {/* Mobile Contact Button */}
                <motion.div 
                  className="pt-3 sm:pt-4 border-t border-orange-500/20 mt-3 sm:mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                >
                  <motion.button 
                    className="w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 text-sm sm:text-base"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 25px -5px rgba(251, 146, 60, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Contact Me
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
