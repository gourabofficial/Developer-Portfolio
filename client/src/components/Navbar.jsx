import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Home,
  User,
  Briefcase,
  FolderOpen,
  Mail,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "skills", label: "Skills", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
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
      if (isMobileMenuOpen && !event.target.closest("nav")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleNavClick = (sectionId) => {
    // Close mobile menu
    setIsMobileMenuOpen(false);

    if (sectionId === "home") {
      // Scroll to top for home
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Scroll to specific section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleContactClick = () => {
    setIsMobileMenuOpen(false);
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20 py-2">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0 group z-10 ml-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button onClick={() => handleNavClick("home")} className="block">
                <motion.div
                  className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-400/10 backdrop-blur-sm border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 8px 25px -8px rgba(251, 146, 60, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="relative flex items-center justify-center"
                    whileHover={{
                      rotate: [0, -5, 5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 p-1.5 shadow-lg shadow-orange-500/20">
                      <Home className="w-full h-full text-white" />
                    </div>
                  </motion.div>
                </motion.div>
              </button>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              className="flex"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 xl:gap-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    <motion.button
                      onClick={() => handleNavClick(item.id)}
                      className="relative inline-flex items-center justify-center px-4 xl:px-5 py-2.5 xl:py-3 rounded-full text-sm xl:text-base font-medium transition-all duration-300 group text-white hover:text-orange-300 hover:bg-white/10"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">{item.label}</span>
                      {/* Hover background overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-orange-400/0 rounded-full z-0"
                        whileHover={{
                          background:
                            "linear-gradient(to right, rgba(251, 146, 60, 0.1), rgba(251, 146, 60, 0.1))",
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
                className="group relative px-6 xl:px-8 py-3 xl:py-4 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/30 overflow-hidden text-sm xl:text-base border border-orange-400/20"
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 25px 50px -12px rgba(251, 146, 60, 0.6)",
                  borderColor: "rgba(251, 146, 60, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <Mail className="w-4 h-4 xl:w-5 xl:h-5 pointer-events-none transform translate-x-3 " />
                   Contact Me
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-none"
                  >
                    <ArrowRight className="w-4 h-4 xl:w-5 xl:h-5 pointer-events-none" />
                  </motion.div>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
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
        <div className="bg-gray-900/98 backdrop-blur-xl border-t border-gray-700/50 shadow-2xl shadow-black/20 px-6 py-4 pb-safe">
          <div className="flex items-center justify-around max-w-md mx-auto">
            {/* Navigation Buttons */}
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="group relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 min-w-[60px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-xl opacity-0 group-active:opacity-100 transition-opacity duration-200"
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
              className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white p-3 rounded-xl shadow-lg shadow-orange-500/20 group min-w-[60px] border border-orange-400/20"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px -12px rgba(251, 146, 60, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 rounded-xl opacity-0 group-active:opacity-100 transition-opacity duration-200"
                whileTap={{ scale: 0.95 }}
              />
              <div className="flex flex-col items-center relative z-10">
                <Mail className="w-6 h-6 pointer-events-none" />
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
