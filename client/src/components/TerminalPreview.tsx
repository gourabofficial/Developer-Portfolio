import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import "./TerminalPreview.css"

type TerminalPreviewProps = {
  onClick: () => void
}

export function TerminalPreview({ onClick }: TerminalPreviewProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="terminal-preview-wrapper"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Open portfolio terminal"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick()
        }
      }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.65 }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              scale: 1.02,
              boxShadow: "0 12px 40px rgba(100, 217, 255, 0.18)",
              transition: { duration: 0.2 },
            }
      }
    >
      {/* Mac-style dots */}
      <div className="terminal-preview-header">
        <div className="terminal-preview-dots">
          <span className="dot-red" />
          <span className="dot-yellow" />
          <span className="dot-green" />
        </div>
        <span className="terminal-preview-label">Portfolio Terminal</span>
      </div>

      {/* Content */}
      <div className="terminal-preview-content">
        <span className="terminal-preview-prompt">→ ~ $</span>
        <span className="terminal-preview-text">Click to open terminal OR (Press Ctrl+`)</span>
        <motion.span
          className="terminal-preview-cursor"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  opacity: [1, 0, 1],
                }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
        />
      </div>
    </motion.div>
  )
}
