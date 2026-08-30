import { useEffect, useState } from "react"

const lines = [
  { 
    command: "whoami", 
    output: [
      { text: "Gourab Ganguly", color: "#64d9ff" },
      { text: "Software Developer", color: "#9b9bff" }
    ] 
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
      { text: "Focused on clean architecture, product thinking, and reliable delivery.", color: "#8fa3c1" }
    ] 
  },
  { 
    command: "pwd", 
    output: [
      { text: "/home/gourab/", color: "#4ba2ff" },
      { text: "West Bengal, India", color: "#70dcff" }
    ] 
  },
]

export function BioTerminal() {
  const [visible, setVisible] = useState(1)

  useEffect(() => {
    if (visible >= lines.length) return
    const timer = window.setTimeout(() => setVisible((current) => current + 1), 820)
    return () => window.clearTimeout(timer)
  }, [visible])

  return (
    <div className="bio-terminal">
      <div className="bio-terminal-bar">
        <span className="dot-red" />
        <span className="dot-yellow" />
        <span className="dot-green" />
        <p>~/about.sh</p>
      </div>
      <div className="bio-terminal-body">
        {lines.slice(0, visible).map((entry, index) => (
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
            {index === visible - 1 ? <span className="bio-terminal-cursor" aria-hidden="true" /> : null}
          </div>
        ))}
      </div>
    </div>
  )
}
