import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "asteaerp",
    title: "ASTEAERP",
    description:
      "Enterprise ERP system for the Tea industry with role-based access, inventory, and staff management.",
    longDescription:
      "A production ERP system built with ASP.NET Core and Clean Architecture, managing Tea estate operations including staff, inventory, and reporting. Implemented Redis-based caching, stored procedures, and secure role-based authorization.",
    stack: ["C#", "ASP.NET Core", "SQL Server", "Redis", "Dapper", "React"],
    category: "enterprise",
    status: "in-progress",
    featured: true,
    links: {},
  },
  {
    id: "employee-management",
    title: "Employee Management System",
    description:
      "Full-stack employee management application with Clean Architecture, REST API, and React frontend.",
    stack: ["ASP.NET Core", "SQL Server", "Dapper", "React", "TypeScript"],
    category: "enterprise",
    status: "live",
    featured: true,
    links: {
      github: "https://github.com/",
    },
  },
  {
    id: "lms",
    title: "Learning Management System",
    description:
      "Platform for course creation, enrollment management, and progress tracking.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    category: "saas",
    status: "live",
    featured: true,
    links: {
      github: "https://github.com/",
    },
  },
  {
    id: "ai-interview",
    title: "AI Interview Platform",
    description:
      "AI-powered mock interview tool with real-time feedback for job seekers.",
    stack: ["React", "TypeScript", "Node.js", "OpenAI API"],
    category: "tool",
    status: "in-progress",
    featured: false,
    links: {
      github: "https://github.com/",
    },
  },
  {
    id: "planmytrip",
    title: "PlanMyTrip",
    description:
      "Travel planning web app with itinerary builder and destination discovery.",
    stack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    category: "saas",
    status: "live",
    featured: false,
    links: {
      github: "https://github.com/",
      live: "https://",
    },
  },
];
