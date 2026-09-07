import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { SiDotnet, SiReact, SiNodedotjs, SiMongodb, SiExpress } from "react-icons/si"

// Small text-badge component for logos that aren't reliably available
// as icon-library glyphs (C# and SQL Server logos aren't in Simple Icons).
function TextBadge({ text }: { text: string }) {
  return <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "-0.02em" }}>{text}</span>
}

const ROLES = [
  {
    title: ".NET Developer",
    icons: [
      { Icon: SiDotnet, label: ".NET", color: "#512BD4" },
      { Icon: () => <TextBadge text="C#" />, label: "C#", color: "#9B4F96" },
      { Icon: () => <TextBadge text="SQL" />, label: "SQL Server", color: "#CC2927" },
    ],
  },
  {
    title: "MERN Stack Developer",
    icons: [
      { Icon: SiReact, label: "React", color: "#61DAFB" },
      { Icon: SiNodedotjs, label: "Node.js", color: "#5FA04E" },
      { Icon: SiMongodb, label: "MongoDB", color: "#47A248" },
      { Icon: SiExpress, label: "Express", color: "#FFFFFF" },
    ],
  },
]

const SWITCH_INTERVAL = 3500 // Switch every 3.5 seconds

export function AnimatedRole() {
  const prefersReducedMotion = useReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ROLES.length)
    }, SWITCH_INTERVAL)

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  const currentRole = ROLES[currentIndex]

  return (
    <div className="animated-role-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="animated-role-wrapper"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="animated-role-title"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {currentRole.title}
          </motion.span>

          <motion.span
            className="animated-role-separator"
            initial={prefersReducedMotion ? {} : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            aria-hidden="true"
          >
            →
          </motion.span>

          <div className="animated-role-icons">
            {currentRole.icons.map((icon, idx) => (
              <motion.div
                key={`${currentIndex}-${idx}`}
                className="animated-role-icon"
                style={{
                  color: icon.color,
                  borderColor: `${icon.color}55`,
                }}
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.3 + idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                title={icon.label}
              >
                <icon.Icon size={18} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}