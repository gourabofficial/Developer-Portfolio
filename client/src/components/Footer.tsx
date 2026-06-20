import { ArrowUp } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/Icons"
import { personal } from "@/data"

export const Footer = () => <footer><div className="section-shell footer-inner">
  <div><a className="footer-brand" href="#home"><span>GG</span>Gourab Ganguly</a><p>Designed and Developed by Gourab Ganguly</p></div>
  <p>© 2026 All Rights Reserved.</p>
  <div className="footer-links"><a href={personal.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon width={17} height={17}/></a><a href={personal.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon width={17} height={17}/></a><a href="#home" aria-label="Back to top"><ArrowUp size={17}/></a></div>
</div></footer>
export default Footer
