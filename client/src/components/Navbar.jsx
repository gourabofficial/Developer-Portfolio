import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Home,
  User,
  Briefcase,
  FolderOpen,
  Mail,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "skills", label: "Skills", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "projects", label: "Projects", icon: FolderOpen },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      // Also handle locomotive scroll if it exists
      if (window.locomotiveScroll) {
        window.locomotiveScroll.scrollTo(0);
      }
    } else {
      // Scroll to specific section
      const element = document.getElementById(sectionId);
      if (element) {
        // Calculate offset to account for fixed navbar height
        const navbarHeight = 100; // Adjust this value based on your navbar height
        const elementPosition = element.offsetTop - navbarHeight;
        
        // Use locomotive scroll if available, otherwise fallback to regular scroll
        if (window.locomotiveScroll) {
          window.locomotiveScroll.scrollTo(element, {
            offset: -navbarHeight,
            duration: 1000,
            easing: [0.25, 0.0, 0.35, 1.0]
          });
        } else {
          window.scrollTo({ 
            top: elementPosition, 
            behavior: "smooth" 
          });
        }
      }
    }
  };

  const handleContactClick = () => {
    setIsMobileMenuOpen(false);
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      // Calculate offset to account for fixed navbar height
      const navbarHeight = 100;
      const elementPosition = contactElement.offsetTop - navbarHeight;
      
      // Use locomotive scroll if available, otherwise fallback to regular scroll
      if (window.locomotiveScroll) {
        window.locomotiveScroll.scrollTo(contactElement, {
          offset: -navbarHeight,
          duration: 1000,
          easing: [0.25, 0.0, 0.35, 1.0]
        });
      } else {
        window.scrollTo({ 
          top: elementPosition, 
          behavior: "smooth" 
        });
      }
    }
  };

  // Mobile navbar component that will be rendered as a portal
  const MobileNavbar = () => (
    <div
      id="mobile-navbar-portal"
      style={{
        position: 'fixed',
        bottom: '0px',
        left: '0px',
        right: '0px',
        width: '100vw',
        height: 'auto',
        zIndex: 2147483647, // Maximum z-index value
        backgroundColor: 'rgba(17, 24, 39, 0.98)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(55, 65, 81, 0.5)',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.2)',
        padding: '16px 24px',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        display: 'block',
        visibility: 'visible',
        opacity: '1',
        transform: 'none',
        pointerEvents: 'auto'
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-around', 
        maxWidth: '448px', 
        margin: '0 auto' 
      }}>
        {/* Navigation Buttons */}
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                borderRadius: '12px',
                transition: 'all 300ms',
                minWidth: '60px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <IconComponent 
                style={{ 
                  width: '24px', 
                  height: '24px', 
                  color: 'white',
                  marginBottom: '4px'
                }} 
              />
              <span style={{ 
                fontSize: '10px', 
                color: 'white', 
                fontWeight: '500' 
              }}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Contact Button */}
        <button
          onClick={handleContactClick}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
            borderRadius: '12px',
            minWidth: '60px',
            backgroundColor: 'transparent',
            border: '1px solid rgba(251, 146, 60, 0.2)',
            cursor: 'pointer'
          }}
        >
          <Mail style={{ 
            width: '24px', 
            height: '24px', 
            color: 'white',
            marginBottom: '4px'
          }} />
          <span style={{ 
            fontSize: '10px', 
            color: 'white', 
            fontWeight: '500' 
          }}>
            Contact
          </span>
        </button>

        {/* Admin Button */}
        <button
          onClick={() => navigate('/login')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
            borderRadius: '12px',
            minWidth: '60px',
            backgroundColor: 'rgba(31, 41, 55, 0.5)',
            border: '1px solid rgba(107, 114, 128, 0.3)',
            cursor: 'pointer'
          }}
        >
          <ShieldCheck style={{ 
            width: '24px', 
            height: '24px', 
            color: 'rgb(156, 163, 175)',
            marginBottom: '4px'
          }} />
          <span style={{ 
            fontSize: '10px', 
            color: 'rgb(156, 163, 175)', 
            fontWeight: '500' 
          }}>
            Admin
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Navigation - ALWAYS VISIBLE */}
      <motion.nav
        className={`hidden lg:block transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-lg shadow-2xl shadow-orange-500/20 border-b border-orange-500/20"
            : "bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm"
        }`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          opacity: 1,
          visibility: 'visible',
          pointerEvents: 'auto',
          transform: 'none',
          willChange: 'auto'
        }}
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20 py-2">
            {/* Logo - Left Side */}
            <motion.div
              className="flex-shrink-0 group z-10"
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

            {/* Desktop Navigation - Right Side */}
            <motion.div
              className="flex items-center gap-4"
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

              {/* Divider */}
              <div className="w-px h-8 bg-gray-700/50 mx-2"></div>

              {/* Admin Login Button */}
              <motion.div className="relative">
                <motion.button
                  onClick={() => navigate('/login')}
                  className="relative inline-flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-orange-500/60 text-gray-400 hover:text-white transition-all duration-300 group hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-orange-600/20 hover:shadow-lg hover:shadow-orange-500/20"
                  whileHover={{ 
                    scale: 1.05,
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <ShieldCheck className="w-4 h-4 lg:w-[18px] lg:h-[18px] transition-all duration-300 group-hover:scale-110" />
                  
                  {/* Tooltip */}
                  <motion.div
                    className="absolute -bottom-12 right-0 px-3 py-1.5 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium rounded-lg border border-orange-500/30 shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0, y: -5 }}
                  >
                    Admin Panel
                    <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 border-t border-l border-orange-500/30 transform rotate-45"></div>
                  </motion.div>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile navbar rendered as portal to bypass scroll containers */}
      {isMobile && typeof window !== 'undefined' && createPortal(
        <MobileNavbar />,
        document.body
      )}
    </>
  );
};

export default Navbar;
