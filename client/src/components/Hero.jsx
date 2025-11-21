import React, { useState, useEffect, useRef } from "react";
import { Download } from "lucide-react";
import { motion, useInView } from "framer-motion";
import api from "../api/config";

const Hero = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, threshold: 0.2 })
  const [cvUrl, setCvUrl] = useState("");
  const [cvLoading, setCvLoading] = useState(true);

  useEffect(() => {
    fetchActiveCV();
  }, []);

  const fetchActiveCV = async () => {
    try {
      const response = await api.get('/cv/active');
      if (response.success && response.cv) {
        setCvUrl(response.cv.fileUrl);
      }
    } catch (error) {
      console.error('Failed to fetch CV:', error);
    } finally {
      setCvLoading(false);
    }
  };
  
  const handleDownloadCV = () => {
    if (cvUrl) {
      window.open(cvUrl, '_blank');
    } else {
      alert('Resume not available at the moment. Please try again later.');
    }
  };
  
  

  
  return (
    <motion.section 
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-20 right-4 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-orange-400/10 to-orange-500/10 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
        <motion.div
          className="absolute top-1/2 right-8 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-300/15 to-orange-400/15 rounded-full blur-lg"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        ></motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side - Name and Details */}
        <motion.div 
          className="text-center lg:text-left space-y-4 sm:space-y-6 order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4"
              initial={{ scale: 0.9 }}
              animate={isInView ? { scale: 1 } : { scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
                Gourab Ganguly
              </span>
            </motion.h1>
          </motion.div>
      <div className="h-3 sm:h-5"></div>
          {/* Typing Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.h2 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-orange-300 mb-4 sm:mb-6"
              animate={{ 
                color: ["#fdba74", "#fb923c", "#f97316", "#fb923c", "#fdba74"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Full Stack Developer
            </motion.h2>
          </motion.div>
         
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
              Passionate about creating exceptional digital experiences through
              clean code, innovative design, and cutting-edge technologies.
              Specialized in building scalable web applications with modern
              frameworks.
            </p>
          </motion.div>
          <div className="h-3 sm:h-5"></div>
          {/* Download CV Button */}
          <motion.div
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.button
              onClick={handleDownloadCV}
              disabled={cvLoading || !cvUrl}
              className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 overflow-hidden text-sm sm:text-base w-full max-w-[200px] min-h-[48px] sm:min-h-[52px] disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!cvLoading && cvUrl ? { 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 20px 25px -5px rgba(251, 146, 60, 0.4)"
              } : {}}
              whileTap={!cvLoading && cvUrl ? { scale: 0.95 } : {}}
            >
              <motion.div
                whileHover={{ y: 2 }}
                transition={{ duration: 0.2 }}
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 relative" />
              </motion.div>
              <span className="relative z-10">
                {cvLoading ? 'Loading...' : cvUrl ? 'Download CV' : 'CV Unavailable'}
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.button>
          </motion.div>
        </motion.div>  

        {/* Right Side - Profile Image */}
        <motion.div 
          className="flex justify-center lg:block order-1 lg:order-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative">
            <motion.div 
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-80 bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-2xl border border-orange-500/20 overflow-hidden mx-auto lg:ml-auto"
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(251, 146, 60, 0.4)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src="/assets/IMG_20230619_115914.jpg"
                alt="Gourab Ganguly"
                className="w-full h-full object-cover object-center rounded-2xl"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
