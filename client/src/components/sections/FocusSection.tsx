import { motion } from "framer-motion"
import { SectionHeading } from "@/components/SectionHeading"

const ease = [0.22, 1, 0.36, 1] as const

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease },
}

const focusAreas = [
  "System Design",
  "Redis",
  "Enterprise Software",
  ".NET Ecosystem",
  "Modern React",
  "AI-assisted Development"
]

export function FocusSection() {
  return (
    <section className="section-shell content-section focus-section">
      <SectionHeading 
        eyebrow="Current focus" 
        title="Exploring what comes next." 
        body="The ideas and technologies currently sharpening how I design and deliver software." 
      />
      <motion.div {...reveal} className="focus-orbit">
        <div className="focus-core">
          <span>NOW</span>
          <b>Building<br />better systems</b>
          <i />
        </div>
        {focusAreas.map((area, i) => (
          <motion.div
            animate={{ y: [0, i % 2 ? 4 : -4, 0] }}
            transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
            className={`focus-node focus-${i + 1}`}
            key={area}
          >
            <span />
            <b>{area}</b>
          </motion.div>
        ))}
        <i className="focus-ring ring-a" />
        <i className="focus-ring ring-b" />
      </motion.div>
    </section>
  )
}
