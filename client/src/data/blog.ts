export type Blog = {
   id: string
   title: string
   excerpt: string
   date: string
   tags: string[]
   readTime: string
   url?: string
}

export const blogs: Blog[] = [
   {
      id: "blog-001",
      title: "Upgrading Legacy ERP Modules to .NET 10: Lessons from the Field",
      excerpt:
         "A practical overview of planning and executing ERP module upgrades to .NET 10 while balancing stability, performance, and release timelines.",
      date: "2026-03-18",
      tags: [".NET 10", "C#", "ERP", "Backend"],
      readTime: "7 min read",
   },
   {
      id: "blog-002",
      title: "Designing Scalable Node.js APIs for MERN Applications",
      excerpt:
         "Patterns for building maintainable Express APIs, structuring service layers, and improving API testing with Postman collections.",
      date: "2025-11-09",
      tags: ["Node.js", "Express", "MERN", "Postman"],
      readTime: "6 min read",
   },
   {
      id: "blog-003",
      title: "From UI to API: Building Better Full Stack Features with React",
      excerpt:
         "How to align React component architecture with backend contracts to ship cleaner, faster full stack features.",
      date: "2025-07-21",
      tags: ["React", "TypeScript", "Fullstack"],
      readTime: "5 min read",
   },
]
