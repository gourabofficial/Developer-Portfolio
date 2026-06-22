import { motion } from "framer-motion"
import { ArrowUpRight, Mail, MapPin } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/Icons"
import { personal } from "@/data"

const ease = [0.22, 1, 0.36, 1] as const

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease },
}

export function ContactSection() {
  const handleContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Portfolio inquiry from ${String(data.get("name"))}`)
    const body = encodeURIComponent(`${String(data.get("message"))}\n\nFrom: ${String(data.get("email"))}`)
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="section-shell content-section contact-section">
      <motion.div {...reveal} className="contact-card">
        <div className="contact-copy">
          <p className="eyebrow">
            <span /> Start a conversation
          </p>
          <h2>Let&apos;s build something great together.</h2>
          <p>
            I&apos;m always interested in thoughtful products, ambitious engineering problems and teams that care about craft. Let&apos;s talk.
          </p>
          <div className="contact-details">
            <a href={`mailto:${personal.email}`}>
              <Mail size={18} />
              <span>
                <small>Email</small>
                {personal.email}
              </span>
            </a>
            <a href={personal.github} target="_blank" rel="noreferrer">
              <GithubIcon width={18} height={18} />
              <span>
                <small>GitHub</small>
                @gourabofficial
              </span>
            </a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer">
              <LinkedinIcon width={18} height={18} />
              <span>
                <small>LinkedIn</small>
                Gourab Ganguly
              </span>
            </a>
            <p>
              <MapPin size={18} />
              <span>
                <small>Location</small>
                {personal.location}
              </span>
            </p>
          </div>
        </div>
        <form onSubmit={handleContact}>
          <label>
            Name
            <input name="name" required placeholder="Your name" />
          </label>
          <label>
            Email
            <input name="email" required type="email" placeholder="you@company.com" />
          </label>
          <label>
            Message
            <textarea 
              name="message" 
              required 
              rows={5} 
              placeholder="Tell me a little about what you're building..." 
            />
          </label>
          <button className="button primary" type="submit">
            Send Message <ArrowUpRight size={16} />
          </button>
          <small>Your mail app will open with the message ready to send.</small>
        </form>
      </motion.div>
    </section>
  )
}
