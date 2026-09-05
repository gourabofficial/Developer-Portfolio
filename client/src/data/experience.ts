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
      company: "Ancile Services Pvt. Limited",
      type: "Full-time",
      startDate: "Feb 2026",
      endDate: "Present",
      duration: "Present",
      location: "Kolkata, West Bengal, India",
      locationType: "On-site",
      description:
         "Developing enterprise ERP systems with a focus on backend architecture, secure APIs, performance optimization, and clean service boundaries.",
      skills: ["C#", "ASP.NET Core", ".NET 10", "SQL Server", "Redis", "Dapper", "React.js"],
      projects: ["Tea ERP System Modernization"],
      companyUrl: "https://www.ancile.in",
   },
   {
      id: "exp-002",
      role: ".NET Developer",
      company: "Infotech Solution",
      type: "Internship",
      startDate: "Sept 2025",
      endDate: "Jan 2026",
      duration: "5 mos",
      location: "India",
      locationType: "Remote",
      description:
         "Worked with .NET and SQL Server to build a Financial Dashboard for tracking and visualizing financial data. Implemented backend APIs, optimized SQL queries for reporting performance, and integrated React on the frontend for real-time data visualization. Collaborated closely with stakeholders to translate financial reporting requirements into functional dashboard features.",
      skills: [".NET", "C#", "SQL Server", "React.js", "REST APIs"],
      projects: ["Financial Dashboard"],
   },
   {
      id: "exp-003",
      role: "Full Stack Developer",
      company: "Internship",
      type: "Internship",
      startDate: "Mar 2025",
      endDate: "Sept 2025",
      duration: "7 mos",
      location: "Remote",
      locationType: "Remote",
      description:
         "Built an end-to-end e-commerce platform using the MERN stack during internship. Handled both frontend and backend — product listings, cart/checkout flow, and secure user authentication.",
      skills: ["React", "Node.js", "Express", "MongoDB", "MERN Stack", "JWT"],
      projects: ["E-Commerce Platform"],
   },
]
