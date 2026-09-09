import { useReducedMotion } from "@/hooks/useReducedMotion"
import "./TerminalPreview.css"

type TerminalPreviewProps = {
  onClick: () => void
}

export function TerminalPreview({ onClick }: TerminalPreviewProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    // Plain div — enter animation is handled by the parent HeroSection fade.
    // Hover scale is a CSS transform, keeping it off the JS thread entirely.
    <div
      className={[
        "terminal-preview-wrapper",
        prefersReducedMotion ? "" : "terminal-preview-wrapper--interactive",
      ].join(" ")}
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
        {/* Pure CSS blink — no JS/RAF overhead */}
        <span
          className={[
            "terminal-preview-cursor",
            prefersReducedMotion ? "terminal-preview-cursor--static" : "",
          ].join(" ")}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
