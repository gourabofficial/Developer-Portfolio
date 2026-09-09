import { useEffect, useState, useRef, useCallback } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { X } from "lucide-react"
import { personal } from "@/data"
import "./PortfolioTerminal.css"

type TerminalLine = {
  type: "command" | "output" | "error" | "welcome" | "help-header" | "section-header"
  text: string
}

const WELCOME_LINES = [
  { type: "welcome",  text: "Welcome to my portfolio! 🚀" },
  { type: "output",   text: 'Type "help" to see all available commands.' },
  { type: "output",   text: "" },
] as const

const HELP_OUTPUT = [
  { type: "help-header",    text: "📖 Available Commands:" },
  { type: "output",         text: "─────────────────────────" },
  { type: "output",         text: "" },
  { type: "section-header", text: "🧭 Navigation:" },
  { type: "output",         text: "  cd <section>     - Navigate to a section" },
  { type: "output",         text: "  ls / sections    - List all available sections" },
  { type: "output",         text: "  pwd              - Show current section" },
  { type: "output",         text: "" },
  { type: "section-header", text: "🌐 Social & Contact:" },
  { type: "output",         text: "  github           - Open GitHub profile" },
  { type: "output",         text: "  linkedin         - Open LinkedIn profile" },
  { type: "output",         text: "  email            - Send an email" },
  { type: "output",         text: "  resume           - View resume" },
  { type: "output",         text: "" },
  { type: "section-header", text: "🛠 Utilities:" },
  { type: "output",         text: "  clear            - Clear terminal" },
  { type: "output",         text: "  whoami           - About me" },
  { type: "output",         text: "  skills           - Tech stack" },
  { type: "output",         text: "  experience       - Work experience" },
  { type: "output",         text: "  projects         - View projects" },
  { type: "output",         text: "  contact          - Contact info" },
]

const SECTIONS = ["home", "about", "skills", "projects", "experience", "contact"]

type PortfolioTerminalProps = {
  isOpen: boolean
  onClose: () => void
}

export function PortfolioTerminal({ isOpen, onClose }: PortfolioTerminalProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isInitialized, setIsInitialized] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalBodyRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // ── Body scroll lock while open ─────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => { document.body.style.overflow = prev }
    }
  }, [isOpen])

  // ── Initialize on first open ────────────────────────────────────────────
  useEffect(() => {
    if (isOpen && !isInitialized) {
      setLines(WELCOME_LINES.map(l => ({ type: l.type as TerminalLine["type"], text: l.text })))
      setTimeout(() => executeCommand("help", true), 500)
      setIsInitialized(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isInitialized])

  // ── Focus input when modal opens ────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      // Slight delay on mobile so panel animation settles before keyboard opens
      const delay = window.innerWidth < 640 ? 350 : 120
      const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), delay)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  // ── Scroll to bottom ────────────────────────────────────────────────────
  const scrollToBottom = useCallback(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
  }, [])

  useEffect(() => { scrollToBottom() }, [lines, scrollToBottom])

  // ── Current section ────────────────────────────────────────────────────
  const getCurrentSection = useCallback(() => {
    const path = location.pathname.slice(1) || "home"
    return path.split("/")[0]
  }, [location.pathname])

  // ── Execute command ─────────────────────────────────────────────────────
  const executeCommand = useCallback((cmd: string, silent = false) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    if (!trimmedCmd) return

    if (!silent) {
      setCommandHistory(prev => [...prev, cmd])
      setHistoryIndex(-1)
      setLines(prev => [...prev, { type: "command", text: cmd }])
    }

    if (trimmedCmd === "clear") { setLines([]); return }

    if (trimmedCmd === "help") {
      const helpLines = HELP_OUTPUT.map(line => ({
        type: line.type as TerminalLine["type"],
        text: line.text,
      }))
      setLines(prev => [...prev, ...helpLines])
      return
    }

    if (trimmedCmd === "ls" || trimmedCmd === "sections") {
      setLines(prev => [
        ...prev,
        { type: "output", text: "Available sections:" },
        { type: "output", text: "" },
        ...SECTIONS.map(s => ({ type: "output" as const, text: `  → ${s}` })),
        { type: "output", text: "" },
        { type: "output", text: 'Type "cd <section>" to navigate' },
      ])
      return
    }

    if (trimmedCmd === "pwd") {
      setLines(prev => [...prev, { type: "output", text: `~/portfolio/${getCurrentSection()}` }])
      return
    }

    if (trimmedCmd.startsWith("cd ")) {
      const section = trimmedCmd.slice(3).trim()
      if (SECTIONS.includes(section)) {
        navigate(section === "home" ? "/" : `/${section}`)
        setLines(prev => [...prev, { type: "output", text: `Navigating to ${section}...` }])
        setTimeout(onClose, 600)
      } else {
        setLines(prev => [
          ...prev,
          { type: "error",  text: `Section not found: ${section}` },
          { type: "output", text: 'Type "ls" to see available sections' },
        ])
      }
      return
    }

    if (trimmedCmd === "github") {
      window.open(personal.github, "_blank")
      setLines(prev => [...prev, { type: "output", text: "Opening GitHub profile..." }])
      return
    }

    if (trimmedCmd === "linkedin") {
      window.open(personal.linkedin, "_blank")
      setLines(prev => [...prev, { type: "output", text: "Opening LinkedIn profile..." }])
      return
    }

    if (trimmedCmd === "email") {
      window.location.href = `mailto:${personal.email}`
      setLines(prev => [...prev, { type: "output", text: `Opening email client for ${personal.email}...` }])
      return
    }

    if (trimmedCmd === "resume") {
      window.open(personal.resume, "_blank", "noopener,noreferrer")
      setLines(prev => [...prev, { type: "output", text: "Opening resume..." }])
      return
    }

    if (trimmedCmd === "whoami") {
      setLines(prev => [
        ...prev,
        { type: "output", text: `${personal.name} — ${personal.title}` },
        { type: "output", text: "SDE-1 @ Ancile" },
        { type: "output", text: "" },
        { type: "output", text: personal.bio },
      ])
      return
    }

    if (trimmedCmd === "skills") {
      setLines(prev => [
        ...prev,
        { type: "output", text: "Technical Stack:" },
        { type: "output", text: "" },
        { type: "output", text: "  Backend:   .NET Core, ASP.NET Core, C#, Node.js, Express" },
        { type: "output", text: "  Frontend:  React.js, TypeScript, Tailwind CSS, Next.js" },
        { type: "output", text: "  Database:  SQL Server, MongoDB, Redis, Dapper, EF Core" },
        { type: "output", text: "  Tools:     Git, Docker, REST APIs, JWT, GitHub Actions" },
        { type: "output", text: "" },
        { type: "output", text: '→ Type "cd skills" to view detailed skills page' },
      ])
      return
    }

    if (trimmedCmd === "experience") {
      setLines(prev => [
        ...prev,
        { type: "output", text: "Career Journey:" },
        { type: "output", text: "" },
        { type: "output", text: "  2022 – 2026       Student Developer" },
        { type: "output", text: "  2024 – 2025       Intern Developer" },
        { type: "output", text: "  Feb 2026 – Now    SDE-1 @ Ancile" },
        { type: "output", text: "" },
        { type: "output", text: '→ Type "cd experience" for detailed timeline' },
      ])
      return
    }

    if (trimmedCmd === "projects") {
      setLines(prev => [
        ...prev,
        { type: "output", text: "Featured Projects:" },
        { type: "output", text: "" },
        { type: "output", text: "  1. Tea ERP System        - Enterprise workflow platform" },
        { type: "output", text: "  2. Learning Management   - Course platform with video delivery" },
        { type: "output", text: "  3. PlanMyTrip            - Travel planning workspace" },
        { type: "output", text: "  4. AI Interview Platform - AI-powered interview prep" },
        { type: "output", text: "" },
        { type: "output", text: '→ Type "cd projects" for complete details' },
      ])
      return
    }

    if (trimmedCmd === "contact") {
      setLines(prev => [
        ...prev,
        { type: "output", text: "Contact Information:" },
        { type: "output", text: "" },
        { type: "output", text: `  Email:    ${personal.email}` },
        { type: "output", text: `  LinkedIn: ${personal.linkedin}` },
        { type: "output", text: `  GitHub:   ${personal.github}` },
        { type: "output", text: `  Location: ${personal.location}` },
        { type: "output", text: "" },
        { type: "output", text: "→ Let's build something together!" },
      ])
      return
    }

    setLines(prev => [
      ...prev,
      { type: "error",  text: `command not found: ${trimmedCmd}` },
      { type: "output", text: 'Type "help" for available commands' },
    ])
  }, [navigate, onClose, getCurrentSection])

  // ── Form submit ─────────────────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentInput.trim()) return
    executeCommand(currentInput)
    setCurrentInput("")
  }

  // ── Keyboard navigation ─────────────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (!commandHistory.length) return
      const idx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(idx)
      setCurrentInput(commandHistory[idx])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex === -1) return
      const idx = historyIndex + 1
      if (idx >= commandHistory.length) { setHistoryIndex(-1); setCurrentInput("") }
      else { setHistoryIndex(idx); setCurrentInput(commandHistory[idx]) }
    } else if (e.key === "Escape") {
      onClose()
    }
  }

  // ── Backdrop tap to close (works on touch) ──────────────────────────────
  const handleOverlayPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only close if the tap landed directly on the backdrop (not the modal)
    if (e.target === e.currentTarget) {
      e.preventDefault()
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="portfolio-terminal-overlay"
      onPointerDown={handleOverlayPointerDown}
      /* Also handle keyboard-triggered close on the backdrop */
      onKeyDown={e => e.key === "Escape" && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio Terminal"
    >
      <div
        ref={modalRef}
        className="portfolio-terminal-modal"
        /* Stop pointer events bubbling to the backdrop */
        onPointerDown={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="portfolio-terminal-header">
          <div className="terminal-mac-dots" aria-hidden>
            <span className="dot-red" />
            <span className="dot-yellow" />
            <span className="dot-green" />
          </div>
          <p className="terminal-header-title">Portfolio Terminal</p>
          <button
            onClick={onClose}
            className="terminal-close-btn"
            aria-label="Close terminal"
            type="button"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div
          ref={terminalBodyRef}
          className="portfolio-terminal-body"
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
        >
          {lines.map((line, index) => (
            <div key={index} className="terminal-output-line">
              {line.type === "command" ? (
                <div className="terminal-command-line">
                  <span className="terminal-prompt">$</span>
                  <span className="terminal-command-text">{line.text}</span>
                </div>
              ) : line.type === "welcome" ? (
                <div className="terminal-welcome-text">{line.text}</div>
              ) : line.type === "help-header" ? (
                <div className="terminal-help-header">{line.text}</div>
              ) : line.type === "section-header" ? (
                <div className="terminal-section-header">{line.text}</div>
              ) : line.type === "error" ? (
                <div className="terminal-error-text">{line.text}</div>
              ) : (
                <div className="terminal-output-text">{line.text}</div>
              )}
            </div>
          ))}

          {/* Input line */}
          <form onSubmit={handleSubmit} className="terminal-input-wrapper">
            <div className="terminal-command-line">
              <span className="terminal-prompt">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={e => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="terminal-live-input"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal command input"
                inputMode="text"
              />
              <span className="terminal-live-cursor" aria-hidden />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
