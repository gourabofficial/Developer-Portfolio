import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, Mail } from "lucide-react"
import { SiGithub } from "react-icons/si"
import { FaLinkedin } from "react-icons/fa";
// import{  } from "lucide-react"
import profilePhoto from "@/assets/profil.jpg"
import { FloatingParticles } from "@/components/FloatingParticles"
import { TerminalPreview } from "@/components/TerminalPreview"
import { AnimatedRole } from "@/components/AnimatedRole"
import { PortfolioTerminal } from "@/components/PortfolioTerminal"
import { personal } from "@/data"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import "./HeroSection.css"

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)

  // Consistent fade helpers
  const fade = (delay: number, axis: "x" | "y" = "y", distance = 15) =>
    prefersReducedMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3, delay } }
      : {
          initial: { opacity: 0, [axis]: distance },
          animate: { opacity: 1, [axis]: 0 },
          transition: { duration: 0.4, delay },
        }

  // Global keyboard shortcut: Ctrl+` or Cmd+` to open terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault()
        setIsTerminalOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <section id="home" className="clean-hero-section">
        <div className="section-shell">
          <div className="clean-hero-grid">
            {/* Left Side - Content */}
            <motion.div {...fade(0.1, "x", -30)} className="clean-hero-content">
              <motion.div {...fade(0.2)} className="hero-name-wrapper">
                <h1 className="hero-name-large">GOURAB GANGULY</h1>
              </motion.div>

              <motion.div {...fade(0.35)} className="hero-role-animated-wrapper">
                <AnimatedRole />
              </motion.div>

              <motion.div {...fade(0.5)}>
                <TerminalPreview onClick={() => setIsTerminalOpen(true)} />
              </motion.div>

              <motion.div {...fade(0.65)} className="hero-actions-clean">
                <a
                  href={personal.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <Download size={16} />
                  <span>MY RESUME</span>
                </a>

                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon btn-icon-github"
                  aria-label="GitHub Profile"
                >
                  <SiGithub size={20} />
                </a>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon btn-icon-linkedin"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin size={20} />
                </a>

                <a
                  href={`mailto:${personal.email}`}
                  className="btn-icon btn-icon-email"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </motion.div>
            </motion.div>

            {/* Right Side - Profile Image */}
            <motion.div {...fade(0.25, "x", 30)} className="clean-hero-image">
              <div className="profile-wrapper-new">
                <div className="profile-glow-effect" />
                <motion.div
                  className="profile-image-frame-new"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <img src={profilePhoto} alt="Gourab Ganguly" className="profile-img-new" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Background Effects */}
          <div className="hero-bg-gradient" />
          <div className="hero-grid-pattern" />
          <FloatingParticles />
        </div>
      </section>

      {/* Global Portfolio Terminal Overlay */}
      <PortfolioTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </>
  )
}
