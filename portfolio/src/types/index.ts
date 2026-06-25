export type ThemeMode = "dark" | "light";

export type ProjectCategory = "enterprise" | "saas" | "tool" | "open-source";
export type ProjectStatus = "live" | "in-progress" | "archived";
export type ExperienceType = "full-time" | "internship" | "freelance";
export type Availability = "open" | "limited" | "closed";

export interface Personal {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  bio: string;
  shortBio: string;
  motto: string;
  availability: Availability;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: ExperienceType;
  duration: string;
  location: string;
  description: string;
  bullets: string[];
  stack: string[];
  current: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  stack: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface SocialLink {
  label: string;
  url: string;
  icon: "Github" | "Linkedin" | "Mail" | "Twitter";
}

export interface NavItem {
  label: string;
  path: string;
}
