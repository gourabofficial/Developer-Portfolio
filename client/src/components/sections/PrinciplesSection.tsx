import { motion } from "framer-motion"
import { SectionHeading } from "@/components/SectionHeading"

const principles = [
  "Clean Code",
  "Performance First",
  "Scalable Architecture",
  "Security Focused",
  "Continuous Learning",
  "Problem Solving"
]

export function PrinciplesSection() {
  return (
    <section className="principles-section content-section">
      <div className="section-shell">
        <SectionHeading 
          eyebrow="Engineering principles" 
          title="How I think about building software." 
          body="Technology changes. The principles behind dependable products endure." 
        />
        <div className="principle-cloud">
          {principles.map((principle, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
              className={`principle pcard-${i + 1}`}
              key={principle}
            >
              <span>0{i + 1}</span>
              <b>{principle}</b>
              <i />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
