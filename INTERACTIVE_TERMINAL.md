# Interactive Terminal Component

## ✅ Implementation Complete

A realistic, fully interactive terminal component for the About section with auto-typing intro sequence and live command execution.

## Features Implemented

### Phase 1: Auto-Type Intro ✅

**On mount/scroll into view, automatically types and executes:**

```bash
$ whoami
> Gourab Ganguly — Software Developer
> SDE-1 @ Ancile

$ cat about.txt
> Curiosity, ownership, and delivery have shaped my path so far.
> [continuation...]

$ ls skillset/
> Backend:     .NET Core, ASP.NET Core, C#, Node.js, Express
> Frontend:    React.js, TypeScript, Tailwind CSS, Framer Motion
> [...]

$ echo $STATUS
> Building scalable enterprise applications 🚀
```

**Typing behavior:**
- Natural typing speed: 30-50ms per character (randomized)
- Realistic delays between commands (400-800ms)
- Character-by-character reveal with inline blinking cursor
- Command executes after typing completes
- Terminal glows subtly while typing
- No loop - stops after last command

### Phase 2: Live Interactive Input ✅

**After auto-sequence finishes, terminal becomes fully interactive:**

#### Available Commands (case-insensitive)

1. **`help`** - Lists all available commands with descriptions
   ```
   Available commands:
     help        - Show this help message
     whoami      - Display name and title
     about       - Show about information
     skills      - List technical skills
     projects    - Show featured projects
     experience  - Show work experience
     contact     - Display contact information
     clear       - Clear the terminal screen
   ```

2. **`whoami`** - Display name and title
   ```
   Gourab Ganguly — Software Developer
   SDE-1 @ Ancile
   ```

3. **`about`** - Show detailed about information
   ```
   Curiosity, ownership, and delivery have shaped my path so far.
   
   From student projects to professional engineering work, the goal has stayed
   the same: build software that is dependable, useful, and clear to work on.
   ```

4. **`skills`** - List technical stack
   ```
   Backend:     .NET Core, ASP.NET Core, C#, Node.js, Express
   Frontend:    React.js, TypeScript, Tailwind CSS, Framer Motion
   Database:    SQL Server, MongoDB, Redis, Dapper, EF Core
   Tools:       Git, Docker, REST APIs, JWT, Cloudinary
   Focus:       Clean architecture, scalable systems, reliable delivery
   ```

5. **`projects`** - Show featured projects with link to full page
   ```
   Featured Projects:
   
     1. Tea ERP System        - Enterprise workflow platform (.NET Core, React, SQL Server)
     2. Learning Management   - Course platform with video delivery (MERN stack)
     3. PlanMyTrip            - Travel planning workspace (React, Node.js)
     4. AI Interview Platform - AI-powered interview prep (React, Gemini AI)
   
   → Visit /projects for complete project details and demos
   ```

6. **`experience`** - Show work history with link to full page
   ```
   Career Journey:
   
     2022 – 2026       Student Developer
                       Built foundation in problem-solving and full-stack development
   
     2024 – 2025       Intern Developer
                       Full-stack projects, E-Commerce platform (MERN)
   
     Feb 2026 – Now    SDE-1 @ Ancile
                       Enterprise software, legacy system migration to .NET Core
   
   → Visit /experience for detailed timeline and achievements
   ```

7. **`contact`** - Display contact information
   ```
   Get in touch:
   
     Email:    gourabofficial@gmail.com
     LinkedIn: https://www.linkedin.com/in/gourab-ganguly/
     GitHub:   https://github.com/gourabofficial
     Location: West Bengal, India
   
   → Let's build something together!
   ```

8. **`clear`** - Clear terminal screen (removes all previous output)

**Unknown commands:**
```bash
$ randomcmd
command not found: randomcmd. Type 'help' for available commands.
```

#### Advanced Features

**Command History Navigation** ✅
- **Up Arrow (↑)** - Navigate to previous command
- **Down Arrow (↓)** - Navigate to next command (or back to empty input)
- Maintains full command history across session
- Works exactly like a real terminal

**Auto-scrolling** ✅
- Terminal automatically scrolls to bottom on new output
- Smooth scrolling behavior
- Custom styled scrollbar (dark theme)

**Input Management** ✅
- Live text input with proper focus management
- Enter key submits command
- Input clears after submission
- Click anywhere in terminal to focus input
- Blinking cursor indicator

**Error Handling** ✅
- Unknown commands show helpful error message
- Suggests typing `help` for available commands
- Error text shown in red/pink color

## Design & Styling

### macOS-style Terminal Window
- **Top bar** with three colored dots (red/yellow/green)
- Window title: `~/portfolio/about.sh`
- Status indicator: "initializing" → "ready" (with pulsing dot)
- Dark background with subtle gradient
- Border glow effect while typing

### Typography & Colors
- **Font**: `ui-monospace`, SF Mono, Consolas (system monospace fonts)
- **Prompt symbol**: `$` in cyan (#64d9ff)
- **Command text**: Bright white (#e8f1ff)
- **Output text**: Light blue-gray (#9fb8d9)
- **Error text**: Pink-red (#ff8a80)
- **Cursor**: Cyan blinking bar (#64d9ff)

### Animations
- Blinking cursor (0.9s interval)
- Typing animation with randomized speed
- Status dot pulsing animation
- Terminal glow while typing
- Smooth scrolling

### Responsive Design
- Desktop: Full-featured terminal (13px font)
- Mobile: Optimized layout (12px font)
- Touch-friendly input area
- Proper keyboard triggers on mobile tap

## Technical Implementation

### State Management
```typescript
- lines: TerminalLine[]          // All rendered terminal lines
- currentInput: string           // Current user input
- isTyping: boolean              // Auto-sequence active state
- commandHistory: string[]       // Command history for ↑↓ navigation
- historyIndex: number           // Current position in history
- sequenceIndex: number          // Current command in auto-sequence
- typingText: string             // Currently typing command
- charIndex: number              // Current character position
```

### Performance
- Efficient re-renders with React hooks
- Auto-cleanup of timers/intervals
- Optimized scrolling with refs
- No external dependencies beyond Framer Motion

### Accessibility
- Proper ARIA labels
- Focus management
- Keyboard navigation
- Screen reader friendly
- Respects `prefers-reduced-motion`:
  - Skips typing animation
  - Shows all content immediately
  - Disables pulsing/blinking effects

## Files Created

1. **`src/components/InteractiveTerminal.tsx`**
   - Main component with all logic
   - Command execution system
   - Input handling & history
   - Auto-typing sequence
   - ~280 lines

2. **`src/components/InteractiveTerminal.css`**
   - Complete terminal styling
   - macOS window design
   - Responsive breakpoints
   - Custom scrollbar
   - Animations & cursors

3. **`src/components/sections/AboutSection.tsx`** (updated)
   - Replaced `BioTerminal` with `InteractiveTerminal`
   - Maintains same layout and animations

## Usage

```tsx
import { InteractiveTerminal } from "@/components/InteractiveTerminal"

<InteractiveTerminal />
```

The component is fully self-contained and requires no props. All command outputs are defined internally based on data from `@/data/personal.ts`.

## Browser Support

- Modern browsers with ES6+ support
- React 19.2.4
- Framer Motion for scroll detection
- CSS Grid & Flexbox
- CSS animations

## Future Enhancements (Optional)

- [ ] Add command aliases (e.g., `ls` → `skills`, `pwd` → `contact`)
- [ ] Tab completion for commands
- [ ] Command flags (e.g., `projects --featured`)
- [ ] ASCII art banner on `help` command
- [ ] Export terminal history as .txt file
- [ ] Multi-line command support
- [ ] Pipe commands (e.g., `skills | grep React`)
- [ ] Add more Easter eggs (try `sudo`, `rm -rf`, etc.)
- [ ] Command execution with loading states
- [ ] Syntax highlighting for command names

## Testing Checklist

- [x] Auto-typing sequence executes on mount
- [x] All commands execute correctly
- [x] Command history works (↑↓ arrows)
- [x] Clear command removes all output
- [x] Unknown commands show error
- [x] Help command lists all commands
- [x] Auto-scroll to bottom works
- [x] Input focus management works
- [x] Mobile keyboard triggers on tap
- [x] Responsive design on mobile
- [x] Reduced motion preferences respected
- [x] Terminal styling matches dark theme
- [x] Cursor blinks properly
- [x] Status indicator animates

## Demo Commands to Try

```bash
$ help                    # See all commands
$ whoami                  # Who am I?
$ skills                  # My tech stack
$ projects                # View projects
$ experience              # Career journey
$ contact                 # Get in touch
$ clear                   # Clear screen
$ test                    # Try an unknown command
$ ↑                       # Navigate history
```

Enjoy exploring the terminal! 🚀
