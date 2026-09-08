import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { GithubIcon, LinkedinIcon } from "@/components/Icons"
import { personal } from "@/data"

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Experience", to: "/experience" },
  { label: "My Work", to: "/projects" },
]

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/"
    return location.pathname.startsWith(path)
  }

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <nav className="nav-shell" aria-label="Main navigation">
        {/* Brand / logo */}
        <Link className="brand" to="/" aria-label="Gourab Ganguly home" onClick={() => setOpen(false)}>
          <span aria-hidden="true">GG</span>
          <p>
            Gourab Ganguly
            <small>Software developer</small>
          </p>
        </Link>

        {/* Desktop + mobile nav links */}
        <div className={`nav-links ${open ? "open" : ""}`} role="navigation">
          {links.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={isActive(to) ? "active" : ""}
            >
              {label}
            </Link>
          ))}
          {/* Social links shown inside mobile menu */}
          <div className="mobile-nav-footer">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="mobile-social-link"
            >
              <GithubIcon width={18} height={18} />
              <span>GitHub</span>
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="mobile-social-link"
            >
              <LinkedinIcon width={18} height={18} />
              <span>LinkedIn</span>
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mobile-cta-link"
            >
              Let's talk ↗
            </Link>
          </div>
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
          <Link className="nav-cta" to="/contact" onClick={() => setOpen(false)}>
            Let's talk <span>↗</span>
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-controls="mobile-nav"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
