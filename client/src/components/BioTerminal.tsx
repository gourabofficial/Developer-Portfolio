import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"
import "./BioTerminal.css"
const lines = [
  {
    command: "whoami",
    output: [
      { text: "Gourab Ganguly", color: "#64d9ff" },
      { text: "Software Developer", color: "#9b9bff" },
    ],
  },
  {
    command: "cat about.txt",
    output: [
      { text: "Building enterprise software with ", color: "#b8cce8" },
      { text: ".NET", color: "#a897ff" },
      { text: ", ", color: "#b8cce8" },
      { text: "React", color: "#61dafb" },
      { text: " and ", color: "#b8cce8" },
      { text: "SQL", color: "#ffa657" },
      { text: ".", color: "#b8cce8" },
      { text: "Focused on clean architecture, product thinking, and reliable delivery.", color: "#8fa3c1" },
    ],
  },
  {
    command: "pwd",
    output: [
      { text: "/home/gourab/", color: "#4ba2ff" },
      { text: "West Bengal, India", color: "#70dcff" },
    ],
  },
]

// Typing speed jitter — a real person doesn't type at a constant rate.
const TYPE_MIN_MS = 28
const TYPE_MAX_MS = 55
const PAUSE_AFTER_TYPE_MS = 280 // small "processing" beat before output prints
const PAUSE_BEFORE_NEXT_MS = 950 // hold on finished output before the next command starts

export function BioTerminal() {
  const prefersReducedMotion = useReducedMotion()
  const [blockIndex, setBlockIndex] = useState(0)
  const [typed, setTyped] = useState(0)
  const [showOutput, setShowOutput] = useState(false)

  const finished = blockIndex >= lines.length

  useEffect(() => {
    if (prefersReducedMotion || finished) return

    const current = lines[blockIndex].command

    if (!showOutput) {
      if (typed < current.length) {
        const delay = TYPE_MIN_MS + Math.random() * (TYPE_MAX_MS - TYPE_MIN_MS)
        const t = window.setTimeout(() => setTyped((c) => c + 1), delay)
        return () => window.clearTimeout(t)
      }
      const t = window.setTimeout(() => setShowOutput(true), PAUSE_AFTER_TYPE_MS)
      return () => window.clearTimeout(t)
    }

    const t = window.setTimeout(() => {
      setBlockIndex((b) => b + 1)
      setTyped(0)
      setShowOutput(false)
    }, PAUSE_BEFORE_NEXT_MS)
    return () => window.clearTimeout(t)
  }, [blockIndex, typed, showOutput, finished, prefersReducedMotion])

  // Reduced motion: skip the timed reveal entirely, render everything instantly.
  const completedBlocks = prefersReducedMotion ? lines : lines.slice(0, blockIndex)
  const activeBlock = !prefersReducedMotion && !finished ? lines[blockIndex] : null

  return (
    <div className={`bio-terminal ${activeBlock && !showOutput ? "is-typing" : ""}`}>
      <div className="bio-terminal-bar">
        <span className="dot-red" />
        <span className="dot-yellow" />
        <span className="dot-green" />
        <p>~/about.sh</p>
        <span className="bio-terminal-status">
          <span className="bio-terminal-status-dot" />
          connected
        </span>
      </div>

      <div className="bio-terminal-body">
        {completedBlocks.map((entry) => (
          <div key={entry.command} className="bio-terminal-block">
            <div className="bio-terminal-command">
              <span className="prompt-symbol">➜</span>
              <span className="prompt-dir">~</span>
              <code className="command-text">{entry.command}</code>
            </div>
            <div className="bio-terminal-output">
              {entry.output.map((line, i) => (
                <p key={i} style={{ color: line.color }}>
                  {line.text}
                </p>
              ))}
            </div>
          </div>
        ))}

        {activeBlock && (
          <div className="bio-terminal-block">
            <div className="bio-terminal-command">
              <span className="prompt-symbol">➜</span>
              <span className="prompt-dir">~</span>
              <code className="command-text">
                {activeBlock.command.slice(0, typed)}
                {!showOutput && <span className="bio-terminal-cursor bio-terminal-cursor--inline" aria-hidden="true" />}
              </code>
            </div>

            {showOutput && (
              <div className="bio-terminal-output">
                {activeBlock.output.map((line, i) => (
                  <p
                    key={i}
                    className="bio-terminal-output-line"
                    style={{ color: line.color, animationDelay: `${i * 70}ms` }}
                  >
                    {line.text}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {(finished || prefersReducedMotion) && (
          <span className="bio-terminal-cursor" aria-hidden="true" />
        )}
      </div>
    </div>
  )
}