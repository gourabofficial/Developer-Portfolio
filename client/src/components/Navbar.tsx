import { useEffect, useRef, useState, useCallback } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { GithubIcon, LinkedinIcon } from "@/components/Icons"
import { personal } from "@/data"

// ─────────────────────────────────────────────────────────────────────────────
// Nav links config
// ─────────────────────────────────────────────────────────────────────────────
const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Experience", to: "/experience" },
  { label: "My Work", to: "/projects" },
]

// ─────────────────────────────────────────────────────────────────────────────
// Animation variants
// ─────────────────────────────────────────────────────────────────────────────
const overlayVariants = {
  initial: { opacity: 0, x: "100%" },
  animate: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 320, damping: 36 },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { type: "spring" as const, stiffness: 380, damping: 40 },
  },
}

const linkContainerVariants = {
  animate: {
    transition: { staggerChildren: 0.065, delayChildren: 0.08 },
  },
}

const linkItemVariants = {
  initial: { opacity: 0, x: 28 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 380, damping: 32 },
  },
  exit: { opacity: 0, x: 16, transition: { duration: 0.12 } },
}

const footerVariants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.32, type: "spring" as const, stiffness: 300, damping: 30 },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Hamburger icon — 3 bars that morph to X
// ─────────────────────────────────────────────────────────────────────────────
const HamburgerIcon = ({ open }: { open: boolean }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    aria-hidden="true"
    style={{ display: "block" }}
  >
    {/* Top bar */}
    <motion.rect
      x="3"
      y="5"
      width="16"
      height="1.8"
      rx="0.9"
      fill="currentColor"
      animate={open ? { rotate: 45, y: 10.1, x: 3 } : { rotate: 0, y: 5, x: 3 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      style={{ originX: "11px", originY: "5.9px" }}
    />
    {/* Middle bar */}
    <motion.rect
      x="3"
      y="10.1"
      width="16"
      height="1.8"
      rx="0.9"
      fill="currentColor"
      animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.18 }}
      style={{ originX: "11px", originY: "11px" }}
    />
    {/* Bottom bar */}
    <motion.rect
      x="3"
      y="15.2"
      width="16"
      height="1.8"
      rx="0.9"
      fill="currentColor"
      animate={open ? { rotate: -45, y: 10.1, x: 3 } : { rotate: 0, y: 15.2, x: 3 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      style={{ originX: "11px", originY: "16.1px" }}
    />
  </svg>
)

// ─────────────────────────────────────────────────────────────────────────────
// Navbar component
// ─────────────────────────────────────────────────────────────────────────────
export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const overlayRef = useRef<HTMLDivElement>(null)

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    // Read initial state immediately (no paint needed).
    setScrolled(window.scrollY > 20)

    let rafId: number | null = null

    const onScroll = () => {
      // Coalesce rapid scroll events into one RAF callback.
      // This prevents setState from firing faster than the browser can paint.
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const shouldBeScrolled = window.scrollY > 20
        // Only trigger a re-render when the value actually changes.
        setScrolled((prev) => (prev === shouldBeScrolled ? prev : shouldBeScrolled))
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  // ── Close on route change ─────────────────────────────────────────────────
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // ── Body scroll lock ──────────────────────────────────────────────────────
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // ── Esc key to close ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  // ── Outside-tap on the backdrop (not the panel itself) closes menu ────────
  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // The backdrop IS the full-screen container — only close if the click
    // landed directly on it (not bubbled up from a child inside the panel)
    if (e.target === e.currentTarget) {
      setOpen(false)
    }
  }, [])

  const close = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen(prev => !prev), [])

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/"
    return location.pathname.startsWith(path)
  }

  // ────────────────────────────────────────────────────────────────────────────
  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <nav className="nav-shell" aria-label="Main navigation">
          {/* Brand / logo */}
          <Link
            className="brand"
            to="/"
            aria-label="Gourab Ganguly home"
            onClick={close}
          >
            <span aria-hidden="true">GG</span>
            <p>
              Gourab Ganguly
              <small>Software developer</small>
            </p>
          </Link>

          {/* Desktop nav links */}
          <div className="nav-links" role="navigation">
            {links.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={isActive(to) ? "active" : ""}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop right actions */}
          <div className="nav-actions">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <GithubIcon width={17} height={17} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon width={17} height={17} />
            </a>
            <Link className="nav-cta" to="/contact">
              Let's talk <span>↗</span>
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="hamburger-btn"
              onClick={toggle}
              aria-expanded={open}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-controls="mobile-nav"
            >
              <HamburgerIcon open={open} />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Full-screen mobile menu overlay ─────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="mobile-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onClick={handleBackdropClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.18 } }}
            exit={{ opacity: 0, transition: { duration: 0.22 } }}
          >
            {/* Slide-in panel */}
            <motion.div
              ref={overlayRef}
              className="mobile-panel"
              variants={overlayVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Panel header — brand + close button */}
              <div className="mobile-panel-header">
                <Link
                  className="brand"
                  to="/"
                  onClick={close}
                  aria-label="Gourab Ganguly home"
                >
                  <span aria-hidden="true">GG</span>
                  <p>
                    Gourab Ganguly
                    <small>Software developer</small>
                  </p>
                </Link>
                <button
                  className="hamburger-btn"
                  onClick={close}
                  aria-label="Close navigation"
                >
                  <HamburgerIcon open={true} />
                </button>
              </div>

              {/* Staggered nav links */}
              <motion.nav
                className="mobile-nav-links"
                variants={linkContainerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                aria-label="Mobile navigation"
              >
                {links.map(({ label, to }) => (
                  <motion.div key={to} variants={linkItemVariants}>
                    <Link
                      to={to}
                      onClick={close}
                      className={`mobile-nav-link${isActive(to) ? " active" : ""}`}
                    >
                      <span className="mobile-nav-link-text">{label}</span>
                      {isActive(to) && (
                        <span className="mobile-nav-link-dot" aria-hidden="true" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Footer — social icons + CTA */}
              <motion.div
                className="mobile-panel-footer"
                variants={footerVariants}
                initial="initial"
                animate="animate"
              >
                <div className="mobile-panel-socials">
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="mobile-panel-social-btn"
                  >
                    <GithubIcon width={18} height={18} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="mobile-panel-social-btn"
                  >
                    <LinkedinIcon width={18} height={18} />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={personal.resume}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Download resume"
                    className="mobile-panel-social-btn"
                  >
                    {/* Resume icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="12" y1="18" x2="12" y2="12" />
                      <line x1="9" y1="15" x2="15" y2="15" />
                    </svg>
                    <span>Resume</span>
                  </a>
                </div>

                <Link
                  to="/contact"
                  onClick={close}
                  className="mobile-panel-cta"
                >
                  Let's talk
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
