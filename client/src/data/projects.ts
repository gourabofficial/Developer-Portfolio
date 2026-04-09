export type Project = {
   id: string
   title: string
   description: string
   techStack: string[]
   liveUrl?: string
   repoUrl?: string
   imageUrl?: string
   featured: boolean
   category: string
}

export const projects: Project[] = [
   {
      id: "proj-001",
      title: "Fullstack E-commerce T-Shirt Website",
      description:
         "A complete e-commerce platform with product listing, cart, checkout flow, and admin panel using a MERN architecture with API testing and validation through Postman.",
      techStack: ["MongoDB", "Express", "React", "Node.js", "Postman API"],
      featured: true,
      category: "Fullstack",
   },
   {
      id: "proj-002",
      title: "ERP Inventory Migration Dashboard",
      description:
         "An internal dashboard for ERP inventory operations built during migration work, with role-based modules, reporting, and streamlined stock updates.",
      techStack: ["C#", ".NET 10", "ASP.NET", "React", "SQL Server"],
      featured: false,
      category: "Enterprise",
   },
   {
      id: "proj-003",
      title: "Recruitment Workflow Management Portal",
      description:
         "A full-stack portal for managing candidate pipelines, interview feedback, and offer tracking with clean APIs and scalable backend services.",
      techStack: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
      featured: false,
      category: "Fullstack",
   },
]
