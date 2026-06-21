import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/Icons"
import { personal } from "@/data"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const links = [
  ["About", "about"],
  ["Stack", "stack"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Principles", "principles"],
  ["Contact", "contact"],
]

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      // Detect active section
      const sections = links.map(([, id]) => id)
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`site-header ${scrolled ? "scrolled" : ""}`}
      style={{
        position: "fixed",
        zIndex: 100,
        inset: "0 0 auto",
        height: "72px",
        borderBottom: scrolled ? "1px solid rgba(105, 150, 220, 0.12)" : "1px solid transparent",
        background: scrolled ? "rgba(5, 9, 20, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <nav className="nav-shell" aria-label="Main navigation">
        {/* Brand with monospace motif */}
        <a
          className="brand"
          href="#home"
          aria-label="Gourab Ganguly home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "11px",
          }}
        >
          <span
            style={{
              width: "36px",
              height: "36px",
              border: "1px solid rgba(105, 160, 240, 0.35)",
              borderRadius: "10px",
              display: "grid",
              placeItems: "center",
              fontSize: "13px",
              fontWeight: 800,
              fontFamily: "ui-monospace, monospace",
              background: "linear-gradient(145deg, rgba(48, 105, 200, 0.3), rgba(15, 30, 55, 0.5))",
              boxShadow: "inset 0 0 18px rgba(80, 140, 255, 0.1)",
            }}
          >
            GG
          </span>
          <p style={{ fontWeight: 650, fontSize: "14px", lineHeight: 1.1, margin: 0 }}>
            Gourab Ganguly
            <small
              style={{
                display: "block",
                color: "#6f809d",
                textTransform: "uppercase",
                letterSpacing: "0.13em",
                fontSize: "8px",
                marginTop: "5px",
              }}
            >
              Software Engineer
            </small>
          </p>
        </a>

        {/* Desktop nav links */}
        <div
          className={`nav-links ${open ? "open" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            position: "relative",
          }}
        >
          {links.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              style={{
                position: "relative",
                fontSize: "13px",
                fontWeight: activeSection === id ? 600 : 400,
                color: activeSection === id ? "#fff" : "#9ba9c0",
                padding: "8px 14px",
                borderRadius: "8px",
                transition: "color 0.25s ease",
              }}
              aria-current={activeSection === id ? "page" : undefined}
            >
              {label}
              {activeSection === id && !prefersReducedMotion && (
                <motion.div
                  layoutId="activeNav"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(70, 120, 200, 0.12)",
                    border: "1px solid rgba(105, 160, 240, 0.2)",
                    borderRadius: "8px",
                    zIndex: -1,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            style={{
              width: "35px",
              height: "35px",
              display: "grid",
              placeItems: "center",
              color: "#8190a8",
              borderRadius: "9px",
              transition: "all 0.25s ease",
            }}
          >
            <GithubIcon width={17} height={17} />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            style={{
              width: "35px",
              height: "35px",
              display: "grid",
              placeItems: "center",
              color: "#8190a8",
              borderRadius: "9px",
              transition: "all 0.25s ease",
            }}
          >
            <LinkedinIcon width={17} height={17} />
          </a>
          <a
            className="nav-cta"
            href="#contact"
            style={{
              fontSize: "12px",
              fontWeight: 650,
              border: "1px solid rgba(105, 154, 229, 0.25)",
              background: "rgba(49, 98, 177, 0.13)",
              padding: "9px 13px",
              borderRadius: "9px",
              marginLeft: "5px",
              transition: "all 0.25s ease",
            }}
          >
            Let's talk <span style={{ color: "#64d9ff" }}>↗</span>
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            style={{
              display: "none",
              border: 0,
              background: "none",
              color: "#fff",
              padding: "6px",
              cursor: "pointer",
            }}
            className="mobile-menu-btn"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: "72px 0 0 0",
              background: "rgba(5, 9, 20, 0.98)",
              backdropFilter: "blur(24px)",
              padding: "32px 20px",
              zIndex: 99,
            }}
            onClick={() => setOpen(false)}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              {links.map(([label, id], index) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  style={{
                    padding: "16px 20px",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: activeSection === id ? "#fff" : "#9ba9c0",
                    background:
                      activeSection === id
                        ? "rgba(70, 120, 200, 0.15)"
                        : "rgba(15, 30, 55, 0.5)",
                    border: `1px solid ${
                      activeSection === id
                        ? "rgba(105, 160, 240, 0.3)"
                        : "rgba(105, 150, 220, 0.1)"
                    }`,
                    borderRadius: "12px",
                    transition: "all 0.2s ease",
                  }}
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
export default Navbar
