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
      type: "Internship",
      startDate: "Feb 2026",
      endDate: "Present",
      duration: "3 mos",
      location: "Kolkata, West Bengal, India",
      locationType: "On-site",
      description:
         "Contributing to ERP modernization by upgrading legacy modules to .NET 10, improving maintainability, performance, and deployment workflows.",
      skills: ["C#", "ASP.NET", ".NET 10", "ERP Systems"],
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
         "Worked on MERN stack development, building responsive React interfaces, Node/Express APIs, and MongoDB data models while collaborating in agile sprint cycles.",
      skills: ["React", "Node.js", "Express", "MongoDB", "MERN Stack", "Postman API"],
      projects: ["Fullstack E-commerce Website"],
   },
]
