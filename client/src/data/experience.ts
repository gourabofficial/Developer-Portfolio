export type Experience = {
   id: string
   role: string
   company: string
   type: string // "Internship" | "Full-time" etc.
   startDate: string
   endDate: string
   duration: string
   location: string
   locationType: string // "On-site" | "Remote"
   description: string
   skills: string[]
   projects?: string[]
   companyUrl?: string
}

export const experiences: Experience[] = [
   {
      id: "exp-001",
      role: ".NET Developer",
      company: "Ancile Services",
      type: "SDE-1",
      startDate: "Feb 2026",
      endDate: "Present",
      duration: "5 mos",
      location: "Kolkata, West Bengal, India",
      locationType: "On-site",
      description:
         "Developing enterprise ERP systems with a focus on backend architecture, secure APIs, performance optimization and clean service boundaries.",
      skills: ["C#", "ASP.NET Core", ".NET 10", "SQL Server", "Redis", "Dapper"],
      projects: ["Tea ERP System Modernization"],
      companyUrl: "https://www.ancile.in",
   },
   {
      id: "exp-002",
      role: "Full Stack Developer",
      company: "Zidio Development",
      type: "Internship",
      startDate: "Mar 2025",
      endDate: "Sep 2025",
      duration: "7 mos",
      location: "Durgapur, West Bengal, India",
      locationType: "Remote",
      description:
         "Built end-to-end web products and learned to connect responsive interfaces with secure, maintainable services.",
      skills: ["React", "Node.js", "Express", "MongoDB", "MERN Stack", "JWT"],
      projects: ["E-commerce Platform", "Learning Management System"],
   },
]
