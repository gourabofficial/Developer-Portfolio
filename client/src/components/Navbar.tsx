import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, X, Mail } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { GithubIcon, LinkedinIcon } from "@/components/Icons"
import { personal } from "@/data"

type NavItem = {
  to: string
  label: string
  end?: boolean
}

const navItems: NavItem[] = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/education", label: "Education" },
  { to: "/blog", label: "Blog" },
  { to: "/events", label: "Events" },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors duration-200 relative pb-1 ${
    isActive
      ? "text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
      : "text-muted-foreground hover:text-primary"
  }`

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 dark:bg-card/95 border-b border-border backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LEFT — Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-sm shadow-md shadow-primary/30">
            GG
          </div>
          <span className="font-bold text-foreground">
            Gourab Ganguly
          </span>
        </Link>

        {/* CENTER — Desktop nav links */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={navLinkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* RIGHT — Controls */}
        <div className="flex items-center gap-4">
          {/* Social Icons - Desktop only */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 p-1.5 rounded-lg hover:bg-accent"
            >
              <GithubIcon width={18} height={18} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 p-1.5 rounded-lg hover:bg-accent"
            >
              <LinkedinIcon width={18} height={18} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Email"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 p-1.5 rounded-lg hover:bg-accent"
            >
              <Mail size={18} />
            </a>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-6 bg-border" />

          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-foreground p-1 rounded-lg hover:bg-accent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 z-40 bg-card border-b border-border animate-slideDown px-6 py-4 flex flex-col gap-4 md:hidden shadow-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block text-base py-2 font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`
              }
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          
          {/* Social links in mobile menu */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 rounded-lg hover:bg-accent"
            >
              <GithubIcon width={20} height={20} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 rounded-lg hover:bg-accent"
            >
              <LinkedinIcon width={20} height={20} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Email"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 rounded-lg hover:bg-accent"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
