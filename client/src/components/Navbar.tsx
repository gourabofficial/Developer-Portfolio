import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/Icons"
import { personal } from "@/data"

const links = [
  ["About", "about"], ["Stack", "stack"], ["Experience", "experience"],
  ["Projects", "projects"], ["Services", "services"], ["Contact", "contact"],
]

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
      <a className="brand" href="#home" aria-label="Gourab Ganguly home"><span>GG</span><p>Gourab Ganguly<small>Software developer</small></p></a>
      <div className={`nav-links ${open ? "open" : ""}`}>{links.map(([label,id])=><a key={id} href={`#${id}`} onClick={()=>setOpen(false)}>{label}</a>)}</div>
      <div className="nav-actions"><a href={personal.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon width={17} height={17}/></a><a href={personal.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon width={17} height={17}/></a><a className="nav-cta" href="#contact">Let’s talk <span>↗</span></a><button onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button></div>
    </nav>
  </header>
}
export default Navbar
