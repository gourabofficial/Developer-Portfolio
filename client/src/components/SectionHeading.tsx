import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease },
}

interface SectionHeadingProps {
  eyebrow: string
  title: string
  body: string
}

export function SectionHeading({ eyebrow, title, body }: SectionHeadingProps) {
  return (
    <motion.div {...reveal} className="section-heading">
      <p className="eyebrow">
        <span />
        {eyebrow}
      </p>
      <h2>{title}</h2>
      <p>{body}</p>
    </motion.div>
  )
}
