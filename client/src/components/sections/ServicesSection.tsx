import { motion } from "framer-motion"
import { Code2, Database, Workflow } from "lucide-react"
import { SectionHeading } from "@/components/SectionHeading"

const services = [
  { 
    icon: Workflow, 
    title: "Backend Development", 
    text: "Scalable, secure APIs with ASP.NET Core, clean boundaries and production-ready patterns." 
  },
  { 
    icon: Code2, 
    title: "Frontend Development", 
    text: "Responsive React interfaces that feel fast, focused and intuitive across every device." 
  },
  { 
    icon: Database, 
    title: "Database Design", 
    text: "Thoughtful schemas, optimized queries and reliable data access layers." 
  },
  { 
    icon: Workflow, 
    title: "System Design", 
    text: "Maintainable enterprise systems designed for performance, change and long-term ownership." 
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="section-shell content-section">
      <SectionHeading 
        eyebrow="What I do" 
        title="Engineering across the stack." 
        body="Focused capabilities for building dependable products, from architecture and data to the last interaction." 
      />
      
      <div className="services-grid">
        {services.map(({ icon: Icon, title, text }, i) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="service-card"
          >
            <span>0{i + 1}</span>
            <Icon size={22} />
            <h3>{title}</h3>
            <p>{text}</p>
            <i />
          </motion.article>
        ))}
      </div>
    </section>
  )
}
