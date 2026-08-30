export type Project = {
  id: string
  title: string
  eyebrow: string
  description: string
  overview: string
  techStack: string[]
  features: string[]
  repoUrl?: string
  liveUrl?: string
  featured?: boolean
  accent: string
  category: string
  thumbnail: string
}

export const projects: Project[] = [
  {
    id: "TEA-ERP-System",
    title: "Tea ERP System",
    eyebrow: "Enterprise ERP application",
    description: "A large-scale business platform unifying payroll, production, sales, stores, attendance, accounts and inventory in one secure system.",
    overview: "Enterprise workflow platform for operations, finance, and inventory management.",
    techStack: [".NET Core", "React", "SQL Server", "Dapper", "Redis"],
    features: ["Role-based access", "Operational dashboards", "Advanced reports", "Caching & optimization"],
    featured: true,
    accent: "ERP // 01",
    category: "Enterprise",
    thumbnail: "/project-thumbnails/tea-erp.svg",
  },
  {
    id: "LMS-Platfrom",
    title: "Learning Management System",
    eyebrow: "Learning management system",
    description: "A full-featured course platform designed around secure learning, video delivery and measurable student progress.",
    overview: "Course platform with secure learning journeys, video delivery, and progress tracking.",
    techStack: ["React Js", "Node Js","Express Js", "MongoDB"],
    features: ["JWT authentication", "Video lectures", "Course progress", "Cloudinary media"],
    accent: "LMS // 02",
    category: "Full Stack",
    thumbnail: "/project-thumbnails/lms.svg",
  },
  {
    id: "Plan-My-Trip",
    title: "PlanMyTrip",
    eyebrow: "Travel planning platform",
    description: "A responsive travel planning experience that turns complex itineraries into a simple, visual workflow.",
    overview: "Trip planning workspace for organizing destinations, routes, and schedules.",
    techStack: ["React js", "Third-party APIs", "Node.js"],
    features: ["Trip builder", "Responsive UI", "Saved itineraries"],
    accent: "TRIP // 03",
    category: "Full Stack",
    thumbnail: "/project-thumbnails/plan-my-trip.svg",
  },
  {
    id: "AI-Interview-Platform",
    title: "AI Interview Platform ",
    eyebrow: "AI interview preparation",
    description: "An AI-powered preparation workspace delivering focused practice, guided feedback and role-specific interview support.",
    overview: "AI interview coach with role-specific prompts, practice feedback, and guidance.",
    techStack: ["React", "Node.js", "Gemini AI"],
    features: ["AI feedback", "Practice sessions", "Role-based prompts"],
    accent: "AI // 04",
    category: "AI Integration",
    repoUrl:"https://github.com/yourusername/career-sensei",
    liveUrl:"https://career-sensei.example.com",
    thumbnail: "/project-thumbnails/career-sensei.svg",
  },
  {
    id: "Task-Management",
    title: "Task Management",
    eyebrow: "Developer utility",
    description: "A Simple Management tool for developers to create, track, and organize tasks efficiently.",
    overview: "Task utility for creating, tracking, and organizing developer work.",
    techStack: [".NET Core", "SQL Server","EF Core"],
    features: ["Short links", "Click analytics", "Fast redirects"],
    accent: "URL // 05",
    category: "Utility",
    thumbnail: "/project-thumbnails/task-management.svg",
  },
]
