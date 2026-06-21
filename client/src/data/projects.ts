export type Project = {
  id: string
  title: string
  eyebrow: string
  description: string
  techStack: string[]
  features: string[]
  repoUrl?: string
  liveUrl?: string
  featured?: boolean
  accent: string
  category: string
}

export const projects: Project[] = [
  {
    id: "advanced-lms",
    title: "Advanced LMS",
    eyebrow: "Learning management system",
    description: "A full-featured course platform designed around secure learning, video delivery and measurable student progress.",
    techStack: ["MongoDB", "Express", "React", "Node.js"],
    features: ["JWT authentication", "Video lectures", "Course progress", "Cloudinary media"],
    featured: true,
    accent: "LMS // 01",
    category: "Full Stack",
    liveUrl: "#contact",
  },
  {
    id: "plan-my-trip",
    title: "PlanMyTrip",
    eyebrow: "Travel planning platform",
    description: "A responsive travel planning experience that turns complex itineraries into a simple, visual workflow.",
    techStack: ["MongoDB", "Express", "React", "Node.js"],
    features: ["Trip builder", "Responsive UI", "Saved itineraries"],
    accent: "TRIP // 02",
    category: "Full Stack",
    liveUrl: "#contact",
  },
  {
    id: "career-sensei",
    title: "CareerSensei",
    eyebrow: "AI interview preparation",
    description: "An AI-powered preparation workspace delivering focused practice, guided feedback and role-specific interview support.",
    techStack: ["React", "Node.js", "Gemini AI"],
    features: ["AI feedback", "Practice sessions", "Role-based prompts"],
    accent: "AI // 03",
    category: "AI",
    liveUrl: "#contact",
  },
  {
    id: "url-shortener",
    title: "URL Shortener",
    eyebrow: "Developer utility",
    description: "A fast link management service with a clean interface and useful traffic analytics.",
    techStack: ["React", "Node.js"],
    features: ["Short links", "Click analytics", "Fast redirects"],
    accent: "URL // 04",
    category: "Utility",
    liveUrl: "#contact",
  },
]
