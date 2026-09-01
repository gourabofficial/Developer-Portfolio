import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"
import { GithubIcon, LinkedinIcon } from "@/components/Icons"
import { personal } from "@/data"

// const links = [
//   // { label: "About", to: "/about" },
//   // { label: "Stack", to: "/about#skills" },
//   // { label: "Experience", to: "/experience" },
//   // { label: "Projects", to: "/projects" },
//   // { label: "Services", to: "/#services" },
//   // { label: "Contact", to: "/#contact" },
// ]

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll(); window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
    <nav className="nav-shell" aria-label="Main navigation">
      <Link className="brand" to="/" aria-label="Gourab Ganguly home"><span>GG</span><p>Gourab Ganguly<small>Software developer</small></p></Link>
      {/* <div className={`nav-links ${open ? "open" : ""}`}>{links.map(({ label, to }) => <Link key={to} to={to} onClick={()=>setOpen(false)}>{label}</Link>)}</div> */}
      <div className="nav-actions"><a href={personal.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon width={17} height={17}/></a><a href={personal.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon width={17} height={17}/></a><Link className="nav-cta" to="/#contact">Let’s talk <span>↗</span></Link><button onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button></div>
    </nav>
  </header>
}
export default Navbar
