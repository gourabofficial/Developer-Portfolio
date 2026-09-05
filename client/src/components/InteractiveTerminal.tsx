import { useEffect, useState, useRef, useCallback } from "react"
import { useReducedMotion } from "framer-motion"
import { personal } from "@/data"
import "./InteractiveTerminal.css"

type TerminalLine = {
  type: "command" | "output" | "error" | "boot" | "boot-check" | "boot-divider" | "boot-welcome" | "boot-title" | "boot-help"
  text: string
  color?: string
}

const BOOT_SEQUENCE = [
  { text: "Initializing portfolio...", type: "boot", delay: 100 },
  { text: "✓ Loading developer profile", type: "boot-check", delay: 200 },
  { text: "✓ Connecting to projects", type: "boot-check", delay: 180 },
  { text: "✓ Retrieving experience", type: "boot-check", delay: 200 },
  { text: "✓ Preparing technical stack", type: "boot-check", delay: 180 },
  { text: "✓ System initialized successfully", type: "boot-check", delay: 250 },
  { text: "─".repeat(60), type: "boot-divider", delay: 100 },
  { text: "Welcome to Gourab's Developer Terminal.", type: "boot-title", delay: 50 },
  { text: "Explore my journey, projects, skills, and experience", type: "boot-welcome", delay: 50 },
  { text: "through an interactive command-line interface.", type: "boot-welcome", delay: 50 },
  { text: "", type: "output", delay: 100 },
  { text: 'Type "help" to view available commands.', type: "boot-help", delay: 50 },
]

const TYPE_MIN_MS = 30
const TYPE_MAX_MS = 40
const BOOT_TYPE_SPEED = 10 // Fast typing for boot checks

const COMMANDS = {
  help: {
    description: "Available commands",
    output: [
      "Available commands:",
      "  help        - Show this help message",
      "  whoami      - Display name and title",
      "  about       - Show about information",
      "  skills      - List technical skills",
      "  projects    - Show featured projects",
      "  experience  - Show work experience",
      "  contact     - Display contact information",
      "  clear       - Clear the terminal screen",
    ],
  },
  whoami: {
    description: "Display identity",
    output: [`${personal.name} — Software Developer`, "SDE-1 @ Ancile"],
  },
  about: {
    description: "About me",
    output: [
      "Curiosity, ownership, and delivery have shaped my path so far.",
      "",
      "From student projects to professional engineering work, the goal has stayed",
      "the same: build software that is dependable, useful, and clear to work on.",
    ],
  },
  skills: {
    description: "Technical skills",
    output: [
      "Backend:     .NET Core, ASP.NET Core, C#, Node.js, Express",
      "Frontend:    React.js, TypeScript, Tailwind CSS, Framer Motion",
      "Database:    SQL Server, MongoDB, Redis, Dapper, EF Core",
      "Tools:       Git, Docker, REST APIs, JWT, Cloudinary",
      "Focus:       Clean architecture, scalable systems, reliable delivery",
    ],
  },
  projects: {
    description: "Featured projects",
    output: [
      "Featured Projects:",
      "",
      "  1. Tea ERP System        - Enterprise workflow platform (.NET Core, React, SQL Server)",
      "  2. Learning Management   - Course platform with video delivery (MERN stack)",
      "  3. PlanMyTrip            - Travel planning workspace (React, Node.js)",
      "  4. AI Interview Platform - AI-powered interview prep (React, Gemini AI)",
      "",
      "→ Visit /projects for complete project details and demos",
    ],
  },
  experience: {
    description: "Work experience",
    output: [
      "Career Journey:",
      "",
      "  2022 – 2026       Student Developer",
      "                    Built foundation in problem-solving and full-stack development",
      "",
      "  2024 – 2025       Intern Developer",
      "                    Full-stack projects, E-Commerce platform (MERN)",
      "",
      "  Feb 2026 – Now    SDE-1 @ Ancile",
      "                    Enterprise software, legacy system migration to .NET Core",
      "",
      "→ Visit /experience for detailed timeline and achievements",
    ],
  },
  contact: {
    description: "Contact information",
    output: [
      "Get in touch:",
      "",
      `  Email:    ${personal.email}`,
      `  LinkedIn: ${personal.linkedin}`,
      `  GitHub:   ${personal.github}`,
      `  Location: ${personal.location}`,
      "",
      "→ Let's build something together!",
    ],
  },
  clear: {
    description: "Clear terminal",
    output: [],
    action: "clear",
  },
}

export function InteractiveTerminal() {
  const prefersReducedMotion = useReducedMotion()
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [bootSequenceIndex, setBootSequenceIndex] = useState(0)
  const [typingText, setTypingText] = useState("")
  const [charIndex, setCharIndex] = useState(0)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalBodyRef = useRef<HTMLDivElement>(null)
  const isBootSequenceComplete = bootSequenceIndex >= BOOT_SEQUENCE.length

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [lines, scrollToBottom])

  // Calculate string similarity (Levenshtein distance)
  const getLevenshteinDistance = useCallback((str1: string, str2: string): number => {
    const matrix: number[][] = []
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          )
        }
      }
    }
    
    return matrix[str2.length][str1.length]
  }, [])

  // Find similar commands
  const findSimilarCommands = useCallback((input: string): string[] => {
    const availableCommands = Object.keys(COMMANDS)
    const similarities = availableCommands.map((cmd) => ({
      cmd,
      distance: getLevenshteinDistance(input, cmd),
      startsWith: cmd.startsWith(input.slice(0, 2)),
    }))
    
    // Sort by distance and prefer commands that start with similar letters
    similarities.sort((a, b) => {
      if (a.startsWith && !b.startsWith) return -1
      if (!a.startsWith && b.startsWith) return 1
      return a.distance - b.distance
    })
    
    // Return top 3 suggestions with distance <= 3
    return similarities
      .filter((s) => s.distance <= 3)
      .slice(0, 3)
      .map((s) => s.cmd)
  }, [getLevenshteinDistance])

  // Execute command
  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    
    if (!trimmedCmd) return

    // Add command to history
    setCommandHistory((prev) => [...prev, cmd])
    setHistoryIndex(-1)

    // Add command line
    setLines((prev) => [...prev, { type: "command", text: cmd }])

    // Handle clear command
    if (trimmedCmd === "clear") {
      setTimeout(() => {
        setLines([])
      }, 100)
      return
    }

    // Execute command
    const command = COMMANDS[trimmedCmd as keyof typeof COMMANDS]
    
    if (command) {
      command.output.forEach((line) => {
        setLines((prev) => [...prev, { type: "output", text: line }])
      })
    } else {
      // Command not found - show error with suggestions
      const suggestions = findSimilarCommands(trimmedCmd)
      
      setLines((prev) => [
        ...prev,
        { type: "error", text: `command not found: ${trimmedCmd}` },
      ])
      
      if (suggestions.length > 0) {
        setLines((prev) => [
          ...prev,
          { type: "output", text: "" },
          { type: "output", text: "Did you mean:" },
        ])
        
        suggestions.forEach((suggestion) => {
          setLines((prev) => [
            ...prev,
            { type: "output", text: `  → ${suggestion}`, color: "suggestion" },
          ])
        })
        
        setLines((prev) => [
          ...prev,
          { type: "output", text: "" },
          { type: "output", text: "Type 'help' to see all available commands." },
        ])
      } else {
        setLines((prev) => [
          ...prev,
          { type: "output", text: "Type 'help' to see all available commands." },
        ])
      }
    }
  }, [findSimilarCommands])

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion: string) => {
    setCurrentInput(suggestion)
    inputRef.current?.focus()
    // Auto-submit after a short delay for better UX
    setTimeout(() => {
      executeCommand(suggestion)
      setCurrentInput("")
    }, 150)
  }, [executeCommand])

  // Type boot sequence character by character
  useEffect(() => {
    if (prefersReducedMotion || isBootSequenceComplete || !isTyping) return

    const currentSeq = BOOT_SEQUENCE[bootSequenceIndex]
    if (!currentSeq) return

    // For boot checks and dividers, show line instantly or very fast
    if (currentSeq.type === "boot-check" || currentSeq.type === "boot-divider" || currentSeq.type === "output") {
      if (charIndex === 0 && typingText === "") {
        const timer = setTimeout(() => {
          // Add complete line immediately
          setLines((prev) => [...prev, { type: currentSeq.type as TerminalLine["type"], text: currentSeq.text }])
          setBootSequenceIndex((prev) => prev + 1)
        }, currentSeq.delay)
        return () => clearTimeout(timer)
      }
      return
    }

    // Start typing current line
    if (charIndex === 0 && typingText === "") {
      const timer = setTimeout(() => {
        setTypingText(currentSeq.text[0])
        setCharIndex(1)
      }, currentSeq.delay)
      return () => clearTimeout(timer)
    }

    // Continue typing
    if (charIndex < currentSeq.text.length) {
      const typeSpeed = currentSeq.type === "boot" ? BOOT_TYPE_SPEED : (TYPE_MIN_MS + Math.random() * (TYPE_MAX_MS - TYPE_MIN_MS))
      const timer = setTimeout(() => {
        setTypingText((prev) => prev + currentSeq.text[charIndex])
        setCharIndex((prev) => prev + 1)
      }, typeSpeed)
      return () => clearTimeout(timer)
    }

    // Line fully typed, add to lines and move to next
    if (charIndex === currentSeq.text.length) {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, { type: currentSeq.type as TerminalLine["type"], text: typingText }])
        setTypingText("")
        setCharIndex(0)
        setBootSequenceIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [charIndex, bootSequenceIndex, typingText, isTyping, prefersReducedMotion, isBootSequenceComplete])

  // Check if boot sequence is complete
  useEffect(() => {
    if (isBootSequenceComplete && isTyping) {
      setIsTyping(false)
      setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true })
      }, 300)
    }
  }, [isBootSequenceComplete, isTyping])

  // Reduced motion: skip animation
  useEffect(() => {
    if (prefersReducedMotion && bootSequenceIndex === 0) {
      BOOT_SEQUENCE.forEach((seq) => {
        setLines((prev) => [...prev, { type: seq.type as TerminalLine["type"], text: seq.text }])
      })
      setBootSequenceIndex(BOOT_SEQUENCE.length)
      setIsTyping(false)
    }
  }, [prefersReducedMotion, bootSequenceIndex])

  // Handle input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentInput.trim()) return
    
    executeCommand(currentInput)
    setCurrentInput("")
  }

  // Handle keyboard navigation (arrow keys for history)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length === 0) return
      
      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(newIndex)
      setCurrentInput(commandHistory[newIndex])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex === -1) return
      
      const newIndex = historyIndex + 1
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1)
        setCurrentInput("")
      } else {
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    }
  }

  // Focus input when clicking terminal body
  const handleTerminalClick = () => {
    if (isBootSequenceComplete && !isTyping) {
      inputRef.current?.focus({ preventScroll: true })
    }
  }

  return (
    <div className={`interactive-terminal ${isTyping ? "is-typing" : ""}`}>
      <div className="interactive-terminal-bar">
        <div className="terminal-dots">
          <span className="dot-red" />
          <span className="dot-yellow" />
          <span className="dot-green" />
        </div>
        <p className="terminal-title">~/portfolio/about.sh</p>
        <span className="terminal-status">
          <span className="terminal-status-dot" />
          {isTyping ? "initializing" : "ready"}
        </span>
      </div>

      <div 
        ref={terminalBodyRef}
        className="interactive-terminal-body"
        onClick={handleTerminalClick}
      >
        {/* Rendered lines */}
        {lines.map((line, index) => (
          <div key={index} className="terminal-line">
            {line.type === "command" ? (
              <div className="terminal-command">
                <span className="prompt-symbol">$</span>
                <span className="command-text">{line.text}</span>
              </div>
            ) : line.type === "boot" ? (
              <div className="terminal-boot-init">{line.text}</div>
            ) : line.type === "boot-check" ? (
              <div className="terminal-boot-check">{line.text}</div>
            ) : line.type === "boot-divider" ? (
              <div className="terminal-boot-divider">{line.text}</div>
            ) : line.type === "boot-title" ? (
              <div className="terminal-boot-title">{line.text}</div>
            ) : line.type === "boot-welcome" ? (
              <div className="terminal-boot-welcome">{line.text}</div>
            ) : line.type === "boot-help" ? (
              <div className="terminal-boot-help">{line.text}</div>
            ) : (
              <div 
                className={`terminal-output ${line.type === "error" ? "terminal-error" : ""} ${line.color === "suggestion" ? "terminal-suggestion" : ""}`}
                onClick={line.color === "suggestion" ? () => handleSuggestionClick(line.text.trim().replace("→", "").trim()) : undefined}
                role={line.color === "suggestion" ? "button" : undefined}
                tabIndex={line.color === "suggestion" ? 0 : undefined}
                onKeyDown={line.color === "suggestion" ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleSuggestionClick(line.text.trim().replace("→", "").trim())
                  }
                } : undefined}
              >
                {line.text}
              </div>
            )}
          </div>
        ))}

        {/* Typing animation during boot sequence */}
        {isTyping && !isBootSequenceComplete && typingText && (
          <div className="terminal-line">
            {BOOT_SEQUENCE[bootSequenceIndex]?.type === "boot" ? (
              <span className="terminal-boot-init">
                {typingText}
                <span className="terminal-cursor-inline" />
              </span>
            ) : BOOT_SEQUENCE[bootSequenceIndex]?.type === "boot-title" ? (
              <span className="terminal-boot-title">
                {typingText}
                <span className="terminal-cursor-inline" />
              </span>
            ) : BOOT_SEQUENCE[bootSequenceIndex]?.type === "boot-welcome" ? (
              <span className="terminal-boot-welcome">
                {typingText}
                <span className="terminal-cursor-inline" />
              </span>
            ) : BOOT_SEQUENCE[bootSequenceIndex]?.type === "boot-help" ? (
              <span className="terminal-boot-help">
                {typingText}
                <span className="terminal-cursor-inline" />
              </span>
            ) : (
              <span>
                {typingText}
                <span className="terminal-cursor-inline" />
              </span>
            )}
          </div>
        )}

        {/* Interactive input */}
        {!isTyping && isBootSequenceComplete && (
          <form onSubmit={handleSubmit} className="terminal-input-form">
            <div className="terminal-command">
              <span className="prompt-symbol">gourab@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="terminal-input"
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal command input"
              />
              <span className="terminal-cursor" />
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
