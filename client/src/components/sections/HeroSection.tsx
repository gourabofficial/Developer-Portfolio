import { motion } from "framer-motion"
import { ArrowRight, Download, Mail } from "lucide-react"
import profilePhoto from "@/assets/profil.jpg"
import { FloatingParticles } from "@/components/FloatingParticles"

export function HeroSection() {
  return (
    <section id="home" className="clean-hero-section">
      <div className="section-shell">
        <div className="clean-hero-grid">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="clean-hero-content"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="hero-greeting"
            >
              Hello, I'm
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="hero-name-clean"
            >
              Gourab Ganguly
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="hero-role-clean"
            >
              Building enterprise <span className="hero-keyword">ERP systems</span> with <span className="hero-keyword dotnet">.NET</span>, SQL & React
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="hero-bio-clean"
            >
              Specialized in <span className="bio-highlight">.NET Core</span> and enterprise architecture. I engineer <span className="bio-highlight">ERP solutions</span> and scalable backend systems with a focus on clean code, performance optimization, and maintainable software design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.75 }}
              className="hero-actions-clean"
            >
              <a 
                href="#projects" 
                className="btn-primary"
              >
                <span>View Projects</span>
                <ArrowRight size={16} />
              </a>
              <a 
                href="/Gourab-Ganguly-Resume.html" 
                download 
                className="btn-secondary"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </a>
              <a 
                href="#contact" 
                className="btn-ghost"
              >
                <Mail size={16} />
                <span>Let's Connect</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="clean-hero-image"
          >
            <div className="profile-wrapper">
              <div className="profile-glow-effect" />
              <div className="profile-image-frame">
                <img src={profilePhoto} alt="Gourab Ganguly" className="profile-img" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Background Effects */}
        <div className="hero-bg-gradient" />
        <div className="hero-grid-pattern" />
        <FloatingParticles />
      </div>
    </section>
  )
}
