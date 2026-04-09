import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { personal } from "@/data"

const BTN_FILL = "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full px-6 py-2.5 font-semibold transition-all duration-200 shadow-lg shadow-orange-500/20"

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
  { to: "/blog", label: "Blog" },
  { to: "/education", label: "Education" },
  { to: "/events", label: "Events" },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors duration-200 relative pb-1 ${
    isActive
      ? "text-orange-600 dark:text-orange-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-500 after:rounded-full"
      : "text-[#7c2d12] dark:text-[#fcd9a0] hover:text-orange-600 dark:hover:text-orange-400"
  }`

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fefaf4]/90 dark:bg-[#1a1008]/90 border-b border-orange-200 dark:border-[#3d2410] backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LEFT — Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-orange-500/30">
            GG
          </div>
          <span className="font-bold text-[#1c0a00] dark:text-[#fef3e2]">
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
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${BTN_FILL} text-sm px-4 py-2 hidden sm:inline-flex`}
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-[#1c0a00] dark:text-[#fef3e2] p-1 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 z-40 bg-[#fff8ed] dark:bg-[#231509] border-b border-orange-200 dark:border-[#3d2410] animate-slideDown px-6 py-4 flex flex-col gap-4 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block text-base py-2 font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-orange-600 dark:text-orange-400"
                    : "text-[#7c2d12] dark:text-[#fcd9a0] hover:text-orange-600 dark:hover:text-orange-400"
                }`
              }
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${BTN_FILL} text-sm px-4 py-2 text-center sm:hidden`}
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
