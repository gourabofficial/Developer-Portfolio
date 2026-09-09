export type Project = {
  id: string
  title: string
  eyebrow: string
  description: string
  overview: string
  problem?: string          // Why this was built / what gap it addresses
  architecture?: string     // Key technical approach / design decision
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
    problem: "The tea industry's existing tools were fragmented — payroll, production, and inventory lived in separate systems with no shared data layer, causing reconciliation issues and manual overhead.",
    architecture: "ASP.NET Core Web API backend with a layered service architecture. Dapper handles data access against SQL Server with dynamic SQL and sargable queries for report performance. A hybrid caching strategy (in-memory + Redis) sits in front of frequently read data. React frontend consumes the API via typed fetch calls.",
    techStack: [".NET Core", "React", "SQL Server", "Dapper", "Redis"],
    features: [
      "Role-based access control",
      "Operational dashboards",
      "Payroll & attendance modules",
      "Production tracking",
      "Advanced report generation",
      "Hybrid caching layer (in-memory + Redis)",
      "Server-side pagination on data-heavy reports",
      "Inventory & stores management",
    ],
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
    problem: "Educators needed a self-hosted alternative to expensive third-party LMS tools — one that gave them direct control over content, student data, and access policies.",
    architecture: "MERN stack with JWT-based session management. Cloudinary handles media upload and streaming to avoid storing large files on the server. Progress state is persisted in MongoDB per-user per-course, enabling resumable video playback.",
    techStack: ["React Js", "Node Js", "Express Js", "MongoDB"],
    features: [
      "JWT authentication",
      "Video lecture delivery",
      "Course progress tracking",
      "Cloudinary media integration",
      "Instructor course management",
      "Student enrollment flow",
    ],
    featured: true,
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
    problem: "Planning a multi-destination trip across multiple tools (spreadsheets, maps, note apps) is friction-heavy. Travelers needed a single workspace to build, visualise, and save itineraries.",
    architecture: "React SPA consuming third-party travel and mapping APIs. Itinerary state is managed client-side with the option to persist saved trips. The UI is fully responsive-first with a mobile workflow that mirrors the desktop experience.",
    techStack: ["React js", "Third-party APIs", "Node.js"],
    features: [
      "Visual trip builder",
      "Destination search",
      "Saved itineraries",
      "Responsive mobile UI",
      "Third-party API integration",
    ],
    featured: true,
    accent: "TRIP // 03",
    category: "Full Stack",
    thumbnail: "/project-thumbnails/plan-my-trip.svg",
  },
  {
    id: "AI-Interview-Platform",
    title: "AI Interview Platform",
    eyebrow: "AI interview preparation",
    description: "An AI-powered preparation workspace delivering focused practice, guided feedback and role-specific interview support.",
    overview: "AI interview coach with role-specific prompts, practice feedback, and guidance.",
    techStack: ["React", "Node.js", "Gemini AI"],
    features: [
      "AI-generated feedback",
      "Practice interview sessions",
      "Role-based question prompts",
    ],
    accent: "AI // 04",
    category: "AI Integration",
    thumbnail: "/project-thumbnails/career-sensei.svg",
  },
  {
    id: "Task-Management",
    title: "Task Management",
    eyebrow: "Developer utility",
    description: "A management tool for developers to create, track, and organize tasks efficiently.",
    overview: "Task utility for creating, tracking, and organizing developer work.",
    techStack: [".NET Core", "SQL Server", "EF Core"],
    features: [
      "Task creation and assignment",
      "Status tracking",
      "Priority management",
      "Developer-focused workflow",
    ],
    accent: "TASK // 05",
    category: "Utility",
    thumbnail: "/project-thumbnails/task-management.svg",
  },
]
