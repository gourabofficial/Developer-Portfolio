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
   responsibilities?: string[]
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
      responsibilities: [
         "Migrating a legacy ERP system to a modern ASP.NET Core Web API architecture using .NET 10, SQL Server, and React.js.",
         "Built a hybrid caching layer combining in-memory, Redis, and SQL Server to keep the system fast under concurrent load.",
         "Rewrote slow stored procedures using dynamic SQL, sargable queries, and server-side pagination to cut response times on data-heavy reports.",
         "Own backend modules end to end — payroll, staff management, and production tracking — from schema design to API delivery.",
         "Designed secure, RESTful APIs with clean service boundaries and consistent error handling patterns.",
      ],
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
         "Worked with .NET and SQL Server to build a Financial Dashboard for tracking and visualizing financial data.",
      responsibilities: [
         "Implemented backend APIs with .NET and C# to power a financial data tracking and visualization dashboard.",
         "Optimized SQL queries for reporting performance, improving data retrieval on large financial datasets.",
         "Integrated React on the frontend for real-time data visualization and interactive reporting.",
         "Collaborated with stakeholders to translate financial reporting requirements into functional dashboard features.",
      ],
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
         "Built an end-to-end e-commerce platform using the MERN stack during internship. Handled both frontend and backend.",
      responsibilities: [
         "Developed an end-to-end e-commerce platform covering product listings, cart/checkout flow, and secure user authentication.",
         "Built RESTful APIs with Node.js and Express for product management, order processing, and user sessions.",
         "Implemented JWT-based authentication and protected routes across the frontend and backend.",
         "Designed and queried MongoDB data models for users, products, and orders.",
      ],
      skills: ["React", "Node.js", "Express", "MongoDB", "MERN Stack", "JWT"],
      projects: ["E-Commerce Platform"],
   },
]
