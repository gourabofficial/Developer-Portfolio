# architecture.md — Portfolio System Architecture
> Gourab Ganguly · Portfolio · React + TypeScript + Tailwind CSS + shadcn/ui
> This document defines every structural decision of the codebase.
> Follow it exactly. Do not invent new folders, new layers, or new patterns.

---

## 1. Project DNA

```
Type        : Static frontend web application
Framework   : React 18 + TypeScript (Vite or Next.js App Router)
Styling     : Tailwind CSS v3 + CSS custom properties
UI Base     : shadcn/ui (component primitives only)
Data        : Centralized static data layer — no backend, no API calls
State       : Local React state + Context (Theme only)
Routing     : React Router v6  OR  Next.js file-system routing
Fonts       : Google Fonts (Playfair Display + Inter)
Icons       : lucide-react (minimal, structural use only)
```

This is a **static presentation site**. No server, no database, no auth.
Every piece of content is imported from `/src/data/`.

---

## 2. Complete Folder Structure

```
portfolio/
├── public/
│   └── favicon.ico
│
├── src/
│   │
│   ├── app/                          # Pages (route-level entry points)
│   │   ├── layout.tsx                # Root layout — ThemeProvider + Navbar + Footer
│   │   ├── page.tsx                  # Route: /          (Home)
│   │   ├── about/
│   │   │   └── page.tsx              # Route: /about
│   │   ├── projects/
│   │   │   └── page.tsx              # Route: /projects
│   │   ├── experience/
│   │   │   └── page.tsx              # Route: /experience
│   │   ├── services/
│   │   │   └── page.tsx              # Route: /services
│   │   └── contact/
│   │       └── page.tsx              # Route: /contact
│   │
│   ├── components/                   # All UI components
│   │   │
│   │   ├── ui/                       # shadcn/ui auto-generated — DO NOT EDIT
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── separator.tsx
│   │   │
│   │   ├── common/                   # Shared layout components
│   │   │   ├── Navbar.tsx            # Top navigation bar
│   │   │   ├── Footer.tsx            # Site footer
│   │   │   ├── ThemeToggle.tsx       # Sun/Moon icon button
│   │   │   └── SectionHeading.tsx    # Eyebrow + title + description block
│   │   │
│   │   ├── cards/                    # Reusable card components
│   │   │   ├── ProjectCard.tsx       # Single project display card
│   │   │   ├── ServiceCard.tsx       # Single service display card
│   │   │   └── SkillBadge.tsx        # Single technology pill/badge
│   │   │
│   │   ├── sections/                 # Page-specific section components
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── SkillsSection.tsx
│   │   │   │   ├── FeaturedProjects.tsx
│   │   │   │   └── CTASection.tsx
│   │   │   ├── about/
│   │   │   │   ├── TerminalBlock.tsx
│   │   │   │   └── PrinciplesSection.tsx
│   │   │   ├── experience/
│   │   │   │   └── ExperienceTimeline.tsx
│   │   │   ├── projects/
│   │   │   │   └── ProjectsGrid.tsx
│   │   │   ├── services/
│   │   │   │   └── ServicesGrid.tsx
│   │   │   └── contact/
│   │   │       └── ContactForm.tsx
│   │   │
│   │   └── layout/
│   │       └── PageWrapper.tsx       # Background glow system wrapper
│   │
│   ├── data/                         # SINGLE SOURCE OF TRUTH for all content
│   │   ├── personal.ts               # Name, bio, tagline, location, email
│   │   ├── experience.ts             # Work history array
│   │   ├── skills.ts                 # Skills by category array
│   │   ├── projects.ts               # Projects array
│   │   ├── services.ts               # Freelance services array
│   │   └── social.ts                 # Social links array
│   │
│   ├── types/
│   │   └── index.ts                  # ALL TypeScript interfaces and types
│   │
│   ├── hooks/
│   │   ├── useTheme.ts               # Theme context + toggle hook
│   │   └── useScrollPosition.ts      # Optional: Navbar shadow on scroll
│   │
│   ├── lib/
│   │   └── utils.ts                  # shadcn cn() utility function
│   │
│   ├── constants/
│   │   └── index.ts                  # Route paths, nav labels, static strings
│   │
│   └── styles/
│       └── globals.css               # Tailwind directives + CSS tokens + keyframes
│
├── tailwind.config.ts                # Token-mapped Tailwind config
├── tsconfig.json
├── vite.config.ts  (or next.config.ts)
└── package.json
```

---

## 3. Layer Responsibilities

Every layer has exactly one job. Never mix responsibilities.

```
┌─────────────────────────────────────────────────────┐
│                    app/ (Pages)                      │
│  Compose sections. No logic. No styling decisions.   │
│  Only: import sections, arrange order, pass no props │
└────────────────────────┬────────────────────────────┘
                         │ uses
┌────────────────────────▼────────────────────────────┐
│               sections/ (Page Sections)              │
│  One responsibility per section.                     │
│  Import from data/. Pass to cards/ and common/.      │
│  Own their layout (grid, flex, spacing).             │
└────────────────────────┬────────────────────────────┘
                         │ uses
┌────────────────────────▼────────────────────────────┐
│           cards/ + common/ (UI Components)           │
│  Pure display components.                            │
│  Receive typed props. Render nothing hardcoded.      │
│  Never import from data/ directly.                   │
└────────────────────────┬────────────────────────────┘
                         │ uses
┌────────────────────────▼────────────────────────────┐
│                  ui/ (shadcn primitives)              │
│  Auto-generated. Never modified.                     │
│  Button, Input, Card, Badge, Tabs, Separator.        │
└─────────────────────────────────────────────────────┘

                         ▲
                 All sections import from:
┌─────────────────────────────────────────────────────┐
│                   data/ (Content)                    │
│  Static typed arrays and objects.                    │
│  Only place where text content lives.               │
│  Imported directly into sections — not into pages.  │
└─────────────────────────────────────────────────────┘
```

---

## 4. Data Flow

```
data/personal.ts ──────► HeroSection.tsx
data/skills.ts   ──────► SkillsSection.tsx, ExperienceTimeline.tsx
data/projects.ts ──────► FeaturedProjects.tsx, ProjectsGrid.tsx
data/experience.ts ────► ExperienceTimeline.tsx
data/services.ts ──────► ServicesGrid.tsx
data/social.ts   ──────► Footer.tsx, ContactPage sections
```

**Rule:** Data flows in one direction — `data/` → `sections/` → `cards/`.
Cards never import from `data/`. Sections always do.

```
data/projects.ts
    │
    ▼
sections/home/FeaturedProjects.tsx
    │  imports { projects }
    │  filters: projects.filter(p => p.featured)
    │  maps → <ProjectCard project={p} />
    │
    ▼
cards/ProjectCard.tsx
    │  receives: Project
    │  renders: title, description, stack, links, status badge
    │  knows nothing about where it came from
```

---

## 5. TypeScript Interfaces

```typescript
// types/index.ts — complete

export type ThemeMode = "dark" | "light";

export type ProjectCategory = "enterprise" | "saas" | "tool" | "open-source";
export type ProjectStatus    = "live" | "in-progress" | "archived";
export type ExperienceType   = "full-time" | "internship" | "freelance";
export type Availability     = "open" | "limited" | "closed";

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
```

---

## 6. Constants

```typescript
// constants/index.ts

import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home",       path: "/" },
  { label: "About",      path: "/about" },
  { label: "Projects",   path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "Services",   path: "/services" },
  { label: "Contact",    path: "/contact" },
];

export const AVAILABILITY_LABELS: Record<string, string> = {
  open:    "Available for Freelance",
  limited: "Limited Availability",
  closed:  "Not Available",
};

export const STATUS_LABELS: Record<string, string> = {
  "live":        "Live",
  "in-progress": "In Progress",
  "archived":    "Archived",
};

export const TYPE_LABELS: Record<string, string> = {
  "full-time":  "Full-time",
  "internship": "Internship",
  "freelance":  "Freelance",
};
```

---

## 7. Component Anatomy Rules

Every component must follow this exact structure:

```tsx
// Pattern: components/cards/ProjectCard.tsx

import type { Project } from "@/types";           // 1. Type imports first
import { ExternalLink, Github } from "lucide-react"; // 2. Icon imports
import { cn } from "@/lib/utils";                 // 3. Utility imports
                                                  // 4. NO data imports in cards

interface ProjectCardProps {                       // 5. Local interface for props
  project: Project;
  className?: string;                             // 6. Always accept className
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <div className={cn("...", className)}>        {/* 7. cn() for class merging */}
      {/* render content */}
    </div>
  );
}
```

**Naming rules:**
- Components: `PascalCase.tsx`
- Hooks: `camelCase.ts` prefixed with `use`
- Data files: `camelCase.ts`
- Types: `PascalCase` interfaces, `camelCase` type aliases
- Constants: `SCREAMING_SNAKE_CASE`

---

## 8. Import Aliases

Configure `@/` to map to `src/` in `tsconfig.json` and `vite.config.ts`:

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

```ts
// vite.config.ts
import path from "path";

export default {
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
};
```

**Import order inside every file:**
```
1. React imports
2. Third-party libraries (lucide-react, etc.)
3. @/types
4. @/data (only in sections)
5. @/components (parent to child)
6. @/hooks
7. @/lib
8. @/constants
```

---

## 9. State Management

This portfolio has exactly **two** pieces of shared state:

### 9.1 Theme State

```typescript
// hooks/useTheme.ts

import { createContext, useContext, useEffect, useState } from "react";
import type { ThemeMode } from "@/types";

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("portfolio-theme") as ThemeMode | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    }
  }, []);

  // Apply class to <html> + persist
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

### 9.2 Project Filter State

Lives locally inside `ProjectsGrid.tsx` only. Not in context.

```typescript
// Inside sections/projects/ProjectsGrid.tsx

const [activeFilter, setActiveFilter] = useState<string>("all");

const filtered = activeFilter === "all"
  ? projects
  : projects.filter((p) => p.category === activeFilter);
```

**No other shared state exists.** No Zustand, no Redux, no Jotai.

---

## 10. Routing Architecture

### If React Router v6:

```tsx
// app/layout.tsx (or main.tsx)
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <PageWrapper>
          <Navbar />
          <main>
            <Routes>
              <Route path="/"           element={<HomePage />} />
              <Route path="/about"      element={<AboutPage />} />
              <Route path="/projects"   element={<ProjectsPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/services"   element={<ServicesPage />} />
              <Route path="/contact"    element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </PageWrapper>
      </ThemeProvider>
    </BrowserRouter>
  );
}
```

### If Next.js App Router:

Pages auto-route from `app/` folder structure.
`layout.tsx` wraps all pages with `ThemeProvider`, `PageWrapper`, `Navbar`, `Footer`.

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <PageWrapper>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </PageWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 11. Page Composition Pattern

Pages are thin. They only compose sections. Zero logic, zero styling decisions.

```tsx
// app/about/page.tsx — correct pattern

import { AboutHeader }        from "@/components/sections/about/AboutHeader";
import { TerminalBlock }      from "@/components/sections/about/TerminalBlock";
import { PrinciplesSection }  from "@/components/sections/about/PrinciplesSection";

export default function AboutPage() {
  return (
    <>
      <AboutHeader />
      <TerminalBlock />
      <PrinciplesSection />
    </>
  );
}
```

No props. No imports from `data/` in pages. No JSX layout code in pages.

---

## 12. Responsive Strategy

**Desktop-first.** Build at 1280px width first, then add responsive breakpoints.

```
Breakpoint strategy:
  Default (desktop) : max-w-6xl grid-cols-2 px-24 py-28
  md (768px tablet) : grid-cols-1 px-12 py-20
  sm (640px mobile) : px-6 py-16

Navbar:
  Default : Horizontal links visible
  md      : Links hidden, hamburger visible

Grid columns:
  Default         : grid-cols-2 (projects, services, principles)
  experience col  : Single column always (timeline layout)
  md and below    : All grids collapse to grid-cols-1
```

---

## 13. What Does NOT Exist in This Project

Explicitly out of scope. Do not add these:

```
✗ No Redux, Zustand, or Jotai
✗ No React Query or SWR (no async data fetching)
✗ No backend or API routes
✗ No authentication
✗ No image optimization beyond standard <img> with width/height
✗ No CMS integration
✗ No analytics (no Google Analytics, Plausible, etc.)
✗ No framer-motion (use CSS transitions and keyframes only)
✗ No react-spring
✗ No three.js or canvas
✗ No custom webpack config
✗ No testing setup (not needed for a portfolio)
✗ No Storybook
✗ No environment variables (nothing secret)
✗ No sitemap or robots.txt (optional, out of scope)
✗ No markdown parsing
✗ No MDX
```

---

## 14. File Count (Expected)

When done, the project should have approximately these files:

```
src/app/             6 pages + 1 layout       =  8 files
src/components/ui/   shadcn primitives         =  6 files
src/components/common/                         =  4 files
src/components/cards/                          =  3 files
src/components/sections/                      = 10 files (across 6 pages)
src/components/layout/                         =  1 file
src/data/                                      =  6 files
src/types/                                     =  1 file
src/hooks/                                     =  2 files
src/lib/                                       =  1 file
src/constants/                                 =  1 file
src/styles/                                    =  1 file

TOTAL                                         ≈ 44 files
```

If you find yourself creating more than ~50 files, you are over-engineering.
If you find yourself creating fewer than 35, something is missing.

---

*End of architecture.md*