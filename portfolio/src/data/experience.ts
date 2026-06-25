import type { Experience } from "@/types";

export const experience: Experience[] = [
  {
    id: "ancile",
    company: "Ancile Services",
    role: "Software Developer (SDE-1)",
    type: "full-time",
    duration: "Feb 2026 — Present",
    location: "West Bengal, India",
    description:
      "Working on enterprise applications and ERP systems with a focus on performance, maintainability, and clean architecture.",
    bullets: [
      "Building and maintaining ASTEAERP — a Tea industry ERP system using ASP.NET Core and Clean Architecture.",
      "Designed and implemented server-side permission caching with Redis and IMemoryCache for role-based authorization.",
      "Architected a hybrid L1/L2/L3 caching strategy using IMemoryCache, Redis, and SQL Server.",
      "Optimized stored procedures and Dapper-based data access layers for high-volume transactional data.",
      "Resolved production-level CORS issues, module-level bugs, and DTO mapping inconsistencies.",
    ],
    stack: [
      "C#",
      "ASP.NET Core",
      "SQL Server",
      "Redis",
      "Dapper",
      "React",
      "Clean Architecture",
    ],
    current: true,
  },
  {
    id: "zidio",
    company: "Zidio Development",
    role: "Full Stack Developer Intern",
    type: "internship",
    duration: "2024",
    location: "Remote",
    description:
      "Built full-stack applications and collaborated on product development across the MERN stack.",
    bullets: [
      "Developed full-stack features using React, Node.js, Express, and MongoDB.",
      "Collaborated on product planning, API design, and frontend delivery.",
      "Contributed to building scalable REST APIs and responsive UI components.",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "JavaScript"],
    current: false,
  },
];
