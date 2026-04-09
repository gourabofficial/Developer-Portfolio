import { Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/Icons"
import { personal } from "@/data"

const GRAD_TEXT = "bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent"
const TEXT_SEC = "text-[#7c2d12] dark:text-[#fcd9a0]"
const TEXT_MUTED = "text-orange-400 dark:text-amber-700"

export const Footer = () => {
  const bioSnippet =
    personal.bio.length > 80
      ? personal.bio.slice(0, 80) + "..."
      : personal.bio

  return (
    <footer className="bg-[#fff8ed] dark:bg-[#231509] border-t border-orange-200 dark:border-[#3d2410]">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center gap-6 text-center">
        {/* Row 1 — Name & title */}
        <div>
          <h3 className={`${GRAD_TEXT} text-2xl font-bold`}>
            {personal.name}
          </h3>
          <p className={`${TEXT_SEC} text-sm mt-1`}>{personal.title}</p>
        </div>

        {/* Row 2 — Bio snippet */}
        <p className={`${TEXT_MUTED} text-sm max-w-md`}>{bioSnippet}</p>

        {/* Row 3 — Social icons */}
        <div className="flex gap-6">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={`${TEXT_MUTED} hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200`}
          >
            <GithubIcon width={20} height={20} />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`${TEXT_MUTED} hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200`}
          >
            <LinkedinIcon width={20} height={20} />
          </a>
          <a
            href={`mailto:${personal.email}`}
            aria-label="Email"
            className={`${TEXT_MUTED} hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200`}
          >
            <Mail size={20} />
          </a>
        </div>

        {/* Row 4 — Copyright */}
        <p className={`${TEXT_MUTED} text-xs`}>
          © 2026 Gourab Ganguly. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
