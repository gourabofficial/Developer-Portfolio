// import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, ChevronDown, Download, Mail } from "lucide-react"
import profilePhoto from "@/assets/profil.jpg"
import { FloatingParticles } from "@/components/FloatingParticles"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import "./HeroSection.css"

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()

  // Consistent fade helpers — reduced motion drops the offset, keeps the fade.
  const fade = (delay: number, axis: "x" | "y" = "y", distance = 15) =>
    prefersReducedMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3, delay } }
      : {
          initial: { opacity: 0, [axis]: distance },
          animate: { opacity: 1, [axis]: 0 },
          transition: { duration: 0.4, delay },
        }

  // Subtle mouse-tracked tilt on the profile photo.
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 150, damping: 20 })
  const springY = useSpring(rawY, { stiffness: 150, damping: 20 })
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8])

  const handlePhotoMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handlePhotoLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <section id="home" className="clean-hero-section">
      <div className="section-shell">
        <div className="clean-hero-grid">
          {/* Left Side - Content */}
          <motion.div {...fade(0.1, "x", -30)} className="clean-hero-content">
           

            <motion.div {...fade(0.3)} className="hero-greeting">
              Hello, I'm
            </motion.div>

            <motion.h1 {...fade(0.35)} className="hero-name-clean">
              Gourab Ganguly
            </motion.h1>

            <motion.h2 {...fade(0.5)} className="hero-role-clean">
              Building enterprise <span className="hero-keyword">ERP systems</span> with{" "}
              <span className="hero-keyword dotnet">.NET</span>, SQL & React
            </motion.h2>

            <motion.p {...fade(0.6)} className="hero-bio-clean">
              Specialized in <span className="bio-highlight">.NET Core</span> and enterprise architecture.
              I engineer <span className="bio-highlight">ERP solutions</span> and scalable backend systems
              with a focus on clean code, performance optimization, and maintainable software design.
            </motion.p>

            <motion.div {...fade(0.75)} className="hero-actions-clean">
              <motion.a
                href="#projects"
                className="btn-primary"
                initial="rest"
                whileHover={prefersReducedMotion ? undefined : "hover"}
              >
                <span>View Projects</span>
                <motion.span
                  className="hero-btn-arrow"
                  variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </motion.a>

              <a href="/Gourab-Ganguly-Resume.html" download className="btn-secondary">
                <Download size={16} />
                <span>Download Resume</span>
              </a>

              <a href="/contact" className="btn-ghost">
                <Mail size={16} />
                <span>Let's Connect</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Profile Image */}
          <motion.div {...fade(0.2, "x", 30)} className="clean-hero-image">
            <div
              className="profile-wrapper"
              onMouseMove={handlePhotoMove}
              onMouseLeave={handlePhotoLeave}
              style={{ perspective: 800 }}
            >
              <div className="profile-glow-effect" />
              <motion.div
                className="profile-image-frame"
                style={
                  prefersReducedMotion
                    ? undefined
                    : { rotateX, rotateY, transformStyle: "preserve-3d" }
                }
              >
                <img src={profilePhoto} alt="Gourab Ganguly" className="profile-img" />
              </motion.div>

              
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.a
          href="#services"
          className="hero-scroll-cue"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.1 }}
          aria-label="Scroll to next section"
        >
          <span>Scroll</span>
          <motion.span
            className="hero-scroll-chevron"
            animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} />
          </motion.span>
        </motion.a>

        {/* Background Effects */}
        <div className="hero-bg-gradient" />
        <div className="hero-grid-pattern" />
        <FloatingParticles />
      </div>
    </section>
  )
}