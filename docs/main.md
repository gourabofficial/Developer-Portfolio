# Portfolio Build Prompt — Gourab Ganguly
> Use this document as the complete specification for building the portfolio.
> Do not deviate from the design system, structure, or data architecture defined here.
> Do not add anything that is not specified. Do not remove anything that is specified.

---

## 0. Context

You are building a **premium, minimal, developer-focused portfolio** for **Gourab Ganguly** — a Software Developer and Freelancer from West Bengal, India.

The project is already initialized with:
- React + TypeScript + Vite (or Next.js)
- Tailwind CSS
- shadcn/ui
- Multiple UI libraries already installed

Your job is to build the **complete portfolio** from scratch on top of this initialized project.

**Identity of this portfolio:**
- Not a flashy designer portfolio.
- Not a LeetCode showcase.
- A **product engineer's portfolio** — clean, trustworthy, enterprise-grade in feel.
- Think: Vercel × Linear × Raycast, not Dribbble.

---

## 1. Absolute Rules (Non-Negotiable)

### Do NOT:
- Use exaggerated, decorative, or unnecessary icons anywhere.
- Use more than the defined color palette.
- Add animations that feel distracting, bouncy, or flashy.
- Use gradients other than the defined radial glow backgrounds.
- Use more than 2 font families.
- Add emoji, stickers, badges, or confetti effects.
- Over-engineer: no 3D, no particle systems, no canvas animations.
- Violate the centralized data architecture — all text content comes from `/src/data/`.
- Hard-code any personal information inside components.
- Use placeholder lorem ipsum text anywhere.

### Do:
- Keep every component quiet. The content speaks — not the decoration.
- Keep spacing generous and consistent.
- Use the design tokens everywhere, never raw color hex inside components.
- Keep the codebase clean, typed, and well-structured.
- Make every component fully responsive.

---

## 2. Tech Stack & Libraries

```
Framework      : React 18 + TypeScript
Styling        : Tailwind CSS v3
Component Base : shadcn/ui
Fonts          : Google Fonts — Playfair Display + Inter
Icons          : lucide-react (minimal use, only where structurally necessary)
Animation      : tailwindcss-animate (already in shadcn) + CSS transitions only
Theme          : next-themes (or a custom ThemeProvider)
Routing        : React Router v6 (or Next.js App Router if applicable)
```

Do not install any additional libraries unless strictly necessary.

---

## 3. Folder Structure

Create the following structure exactly. Do not add extra folders.

```
src/
├── app/                        # Route-level pages
│   ├── layout.tsx              # Root layout with ThemeProvider + Navbar + Footer
│   ├── page.tsx                # Home page
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── experience/page.tsx
│   ├── services/page.tsx
│   └── contact/page.tsx
│
├── components/                 # Reusable UI components
│   ├── ui/                     # shadcn/ui generated components (do not modify)
│   ├── common/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── SectionHeading.tsx
│   ├── cards/
│   │   ├── ProjectCard.tsx
│   │   ├── ServiceCard.tsx
│   │   └── SkillBadge.tsx
│   ├── sections/               # Page-specific section components
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── FeaturedProjects.tsx
│   │   │   └── CTASection.tsx
│   │   ├── about/
│   │   │   ├── TerminalBlock.tsx
│   │   │   └── PrinciplesSection.tsx
│   │   ├── experience/
│   │   │   └── ExperienceTimeline.tsx
│   │   ├── projects/
│   │   │   └── ProjectsGrid.tsx
│   │   ├── services/
│   │   │   └── ServicesGrid.tsx
│   │   └── contact/
│   │       └── ContactForm.tsx
│   └── layout/
│       └── PageWrapper.tsx
│
├── data/                       # ALL content lives here
│   ├── personal.ts
│   ├── experience.ts
│   ├── skills.ts
│   ├── projects.ts
│   ├── services.ts
│   └── social.ts
│
├── types/
│   └── index.ts                # All TypeScript interfaces
│
├── lib/
│   └── utils.ts                # shadcn utility (cn function)
│
├── hooks/
│   └── useTheme.ts
│
├── styles/
│   └── globals.css             # Tailwind base + CSS custom properties
│
└── constants/
    └── index.ts                # Route names, static labels
```

---

## 4. Design System

### 4.1 Color Tokens

Define these in `globals.css` as CSS custom properties and map them in `tailwind.config.ts`.

#### Dark Mode (`.dark`)
```css
--background: #0F172A;
--foreground: #F8FAFC;
--muted: #1E293B;
--muted-foreground: #94A3B8;
--border: #1E293B;
--accent: #3B82F6;
--accent-foreground: #EFF6FF;
--card: #111827;
--card-foreground: #E2E8F0;
--subtle: #334155;
```

#### Light Mode (`:root`)
```css
--background: #FFFFFF;
--foreground: #0F172A;
--muted: #F1F5F9;
--muted-foreground: #64748B;
--border: #E2E8F0;
--accent: #7C3AED;
--accent-foreground: #FFFFFF;
--card: #FAFAFA;
--card-foreground: #1E293B;
--subtle: #F8FAFC;
```

Map all tokens into `tailwind.config.ts` under `theme.extend.colors`:
```ts
colors: {
  background: "var(--background)",
  foreground: "var(--foreground)",
  muted: { DEFAULT: "var(--muted)", foreground: "var(--muted-foreground)" },
  border: "var(--border)",
  accent: { DEFAULT: "var(--accent)", foreground: "var(--accent-foreground)" },
  card: { DEFAULT: "var(--card)", foreground: "var(--card-foreground)" },
  subtle: "var(--subtle)",
}
```

Never use raw Tailwind color classes like `bg-blue-500` or `text-slate-300` inside components. Always use the token classes: `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, etc.

---

### 4.2 Background System

Every page uses `PageWrapper.tsx`. It renders the correct theme-aware background automatically.

```tsx
// components/layout/PageWrapper.tsx

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">

      {/* Dark mode radial glow — blue */}
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden dark:block"
        style={{
          backgroundImage: `radial-gradient(circle 700px at 50% 10%, rgba(59,130,246,0.18), transparent)`,
        }}
      />

      {/* Light mode radial glow — purple */}
      <div
        className="pointer-events-none absolute inset-0 z-0 block dark:hidden"
        style={{
          background: `radial-gradient(circle at 50% 0%, rgba(173,109,244,0.22) 0%, transparent 60%)`,
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
```

`layout.tsx` wraps every page in `<PageWrapper>`.

---

### 4.3 Typography

Install from Google Fonts in the HTML `<head>` or `globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
```

Set in `globals.css`:
```css
:root {
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
}

body {
  font-family: var(--font-body);
}
```

#### Type Scale (apply as Tailwind utility classes)

| Role               | Class                                    | Notes                         |
|--------------------|------------------------------------------|-------------------------------|
| Hero heading       | `font-heading text-5xl font-semibold`   | Playfair Display              |
| Section heading    | `font-heading text-3xl font-semibold`   | Playfair Display              |
| Sub-heading        | `font-heading text-xl font-medium`      | Playfair Display              |
| Body large         | `text-base font-body leading-relaxed`   | Inter                         |
| Body default       | `text-sm font-body leading-relaxed`     | Inter                         |
| Caption / Label    | `text-xs font-body tracking-wide`       | Inter, uppercase optional     |
| Code / Terminal    | `font-mono text-sm`                     | System mono stack             |

Add in `tailwind.config.ts`:
```ts
fontFamily: {
  heading: "var(--font-heading)",
  body: "var(--font-body)",
  mono: "ui-monospace, 'Cascadia Code', 'Fira Code', monospace",
}
```

---

### 4.4 Spacing Scale

Use Tailwind's default 4px base. Enforce these spacings for section padding:

```
Section vertical padding  : py-20 md:py-28
Section horizontal padding: px-6 md:px-12 lg:px-24
Max content width         : max-w-6xl mx-auto
Card gap                  : gap-6
Grid gap                  : gap-8
```

---

### 4.5 Borders & Radius

```css
--radius: 0.75rem;   /* 12px — default for cards */
```

- Cards: `rounded-xl border border-border`
- Buttons: `rounded-lg`
- Inputs: `rounded-lg`
- Tags/Badges: `rounded-full`

Borders are always `border-border` (from token). No `border-gray-*` ever.

---

### 4.6 Shadows

Only use these two shadows (add to tailwind.config.ts):
```ts
boxShadow: {
  card: "0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)",
  elevated: "0 4px 12px 0 rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)",
}
```

---

### 4.7 Animations

Only these — no libraries needed:

```css
/* globals.css */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.4s ease both;
}

.animate-delay-100 { animation-delay: 0.1s; }
.animate-delay-200 { animation-delay: 0.2s; }
.animate-delay-300 { animation-delay: 0.3s; }
```

Use only on:
- Hero section text (staggered delay)
- Cards entering viewport (use IntersectionObserver or basic CSS `animation-play-state`)

No hover scale transforms. No bounce. No float. Transitions only on `opacity` and `color`:
```
transition-colors duration-200
transition-opacity duration-200
```

---

## 5. Data Layer

### 5.1 types/index.ts

```ts
export interface Experience {
  id: string;
  company: string;
  role: string;
  type: "full-time" | "internship" | "freelance";
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
  category: "enterprise" | "saas" | "tool" | "open-source";
  status: "live" | "in-progress" | "archived";
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
  featured: boolean;
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
  icon: string; // lucide icon name — only: Github, Linkedin, Mail, Twitter
}

export interface Personal {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  bio: string;
  shortBio: string;
  motto: string;
  availability: "open" | "limited" | "closed";
}
```

---

### 5.2 data/personal.ts

```ts
import type { Personal } from "@/types";

export const personal: Personal = {
  name: "Gourab Ganguly",
  title: "Software Developer",
  tagline: "Building enterprise applications with .NET, React, and SQL Server.",
  location: "West Bengal, India",
  email: "your@email.com",  // replace with actual
  bio: "I'm a Software Developer passionate about building backend systems and modern web applications. Currently working with C#, ASP.NET Core, React, SQL Server, Redis, and Clean Architecture to create enterprise-grade applications. I enjoy transforming ideas into products, designing APIs, optimizing databases, and delivering software that people can depend on.",
  shortBio: "Software Developer focused on backend engineering, clean architecture, and products that scale.",
  motto: "Build software that lasts.",
  availability: "open",
};
```

---

### 5.3 data/experience.ts

```ts
import type { Experience } from "@/types";

export const experience: Experience[] = [
  {
    id: "ancile",
    company: "Ancile Services",
    role: "Software Developer (SDE-1)",
    type: "full-time",
    duration: "Feb 2026 — Present",
    location: "West Bengal, India",
    description: "Working on enterprise applications and ERP systems with a focus on performance, maintainability, and clean architecture.",
    bullets: [
      "Building and maintaining ASTEAERP — a Tea industry ERP system using ASP.NET Core and Clean Architecture.",
      "Designed and implemented server-side permission caching with Redis and IMemoryCache for role-based authorization.",
      "Architected a hybrid L1/L2/L3 caching strategy using IMemoryCache, Redis, and SQL Server.",
      "Optimized stored procedures and Dapper-based data access layers for high-volume transactional data.",
      "Resolved production-level CORS issues, module-level bugs, and DTO mapping inconsistencies.",
    ],
    stack: ["C#", "ASP.NET Core", "SQL Server", "Redis", "Dapper", "React", "Clean Architecture"],
    current: true,
  },
  {
    id: "zidio",
    company: "Zidio Development",
    role: "Full Stack Developer Intern",
    type: "internship",
    duration: "2024",
    location: "Remote",
    description: "Built full-stack applications and collaborated on product development across the MERN stack.",
    bullets: [
      "Developed full-stack features using React, Node.js, Express, and MongoDB.",
      "Collaborated on product planning, API design, and frontend delivery.",
      "Contributed to building scalable REST APIs and responsive UI components.",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "JavaScript"],
    current: false,
  },
];
```

---

### 5.4 data/skills.ts

```ts
import type { Skill } from "@/types";

export const skills: Skill[] = [
  {
    category: "Languages",
    items: ["C#", "TypeScript", "JavaScript", "SQL", "Java"],
  },
  {
    category: "Backend",
    items: ["ASP.NET Core", "Node.js", "Express.js", "REST API Design", "Redis", "Dapper", "Clean Architecture"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
  },
  {
    category: "Databases",
    items: ["SQL Server", "PostgreSQL", "MongoDB"],
  },
  {
    category: "Tools & Practices",
    items: ["Git", "GitHub", "Postman", "Visual Studio", "VS Code", "Docker (basics)", "CI/CD basics"],
  },
];
```

---

### 5.5 data/projects.ts

```ts
import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "asteaerp",
    title: "ASTEAERP",
    description: "Enterprise ERP system for the Tea industry with role-based access, inventory, and staff management.",
    longDescription: "A production ERP system built with ASP.NET Core and Clean Architecture, managing Tea estate operations including staff, inventory, and reporting. Implemented Redis-based caching, stored procedures, and secure role-based authorization.",
    stack: ["C#", "ASP.NET Core", "SQL Server", "Redis", "Dapper", "React"],
    category: "enterprise",
    status: "in-progress",
    featured: true,
    links: {},
  },
  {
    id: "employee-management",
    title: "Employee Management System",
    description: "Full-stack employee management application with Clean Architecture, REST API, and React frontend.",
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
    description: "Platform for course creation, enrollment management, and progress tracking.",
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
    description: "AI-powered mock interview tool with real-time feedback for job seekers.",
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
    description: "Travel planning web app with itinerary builder and destination discovery.",
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
```

---

### 5.6 data/services.ts

```ts
import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "backend",
    title: "Backend Development",
    description: "Design and build REST APIs, authentication systems, caching layers, and database architectures using .NET or Node.js. Focused on performance, security, and maintainability.",
    tags: ["ASP.NET Core", "Node.js", "REST API", "SQL Server", "Redis"],
  },
  {
    id: "fullstack",
    title: "Full Stack Web Apps",
    description: "End-to-end web application development from database design to React frontend. Delivered as a complete, deployable product.",
    tags: ["React", "TypeScript", "ASP.NET Core", "Tailwind CSS"],
  },
  {
    id: "erp-systems",
    title: "Enterprise & ERP Systems",
    description: "Custom enterprise software — ERP modules, management systems, and business automation tools built with clean architecture and long-term maintainability in mind.",
    tags: ["Clean Architecture", "Business Logic", ".NET", "SQL Server"],
  },
  {
    id: "api-design",
    title: "API Design & Integration",
    description: "RESTful API design, third-party API integration, and documentation. Well-structured contracts your frontend team will thank you for.",
    tags: ["REST", "API Design", "Postman", "Swagger"],
  },
];
```

---

### 5.7 data/social.ts

```ts
import type { SocialLink } from "@/types";

export const social: SocialLink[] = [
  { label: "GitHub",   url: "https://github.com/",    icon: "Github"   },
  { label: "LinkedIn", url: "https://linkedin.com/",  icon: "Linkedin" },
  { label: "Email",    url: "mailto:your@email.com",  icon: "Mail"     },
];
```

---

## 6. Component Specifications

### 6.1 Navbar

```
File: components/common/Navbar.tsx

Layout     : Horizontal. Logo left. Links right. ThemeToggle rightmost.
Position   : sticky top-0 z-50
Background : bg-background/80 backdrop-blur-md border-b border-border
Height     : h-16

Logo       : "GG" in font-heading font-semibold text-foreground
             + a single 1px vertical separator
             + title "Portfolio" in text-muted-foreground text-sm font-body

Nav links  : Home · About · Projects · Experience · Services · Contact
             text-sm font-body text-muted-foreground
             hover:text-foreground transition-colors duration-200
             Active link: text-foreground font-medium

ThemeToggle: Icon-only button (Sun / Moon from lucide-react)
             Wrapped in a ghost icon button from shadcn
             16×16px icon, no label

Mobile     : Hamburger menu (Menu icon) opening a slide-down mobile nav
             All nav links stacked vertically
             Full-width, same background as desktop navbar
```

---

### 6.2 Footer

```
File: components/common/Footer.tsx

Layout     : 3-column grid on desktop, stacked on mobile
Background : bg-muted border-t border-border
Padding    : py-12

Column 1   : Name + tagline in font-heading + "© 2025 Gourab Ganguly"
Column 2   : Quick links (same as navbar)
Column 3   : Social links (Github, LinkedIn, Email — icon + label)

Bottom bar : text-xs text-muted-foreground centered
             "Designed and built by Gourab Ganguly"
```

---

### 6.3 SectionHeading

```
File: components/common/SectionHeading.tsx

Props      : { label: string; title: string; description?: string; align?: "left" | "center" }

Label      : text-xs font-body tracking-widest uppercase text-accent
             Display above the title like an eyebrow
Title      : font-heading text-3xl font-semibold text-foreground
Description: text-base text-muted-foreground max-w-xl (if align=center: mx-auto)
Spacing    : label mb-3, title mb-4, description mb-0
```

---

### 6.4 ProjectCard

```
File: components/cards/ProjectCard.tsx

Props      : Project (from types/index.ts)

Layout     : Vertical card
             bg-card border border-border rounded-xl p-6 shadow-card
             hover:border-accent/40 transition-colors duration-200

Sections   :
  - Status badge (top-right): "Live" / "In Progress" / "Archived"
    Tiny pill: rounded-full px-2 py-0.5 text-xs font-body
    Color: live=accent, in-progress=amber-500, archived=muted-foreground
    
  - Title: font-heading text-xl font-semibold text-foreground
  
  - Description: text-sm text-muted-foreground leading-relaxed mt-2 mb-4
  
  - Stack tags: Wrap of small rounded-full badges
    bg-muted text-muted-foreground text-xs px-2.5 py-0.5
    No icons. Text only.
    
  - Links row (bottom): GitHub icon button + Live icon button
    Only show if link exists.
    text-muted-foreground hover:text-foreground
    Use ExternalLink and Github icons from lucide-react

No images on project cards.
```

---

### 6.5 ServiceCard

```
File: components/cards/ServiceCard.tsx

Props      : Service

Layout     : Horizontal card on desktop (icon-left, content-right)
             Vertical on mobile
             bg-card border border-border rounded-xl p-6

Left       : A single 24px lucide icon relevant to the service
             Color: text-accent
             Wrapped in a small muted square: bg-muted rounded-lg p-2

Right      :
  Title    : font-heading text-lg font-semibold text-foreground
  Body     : text-sm text-muted-foreground leading-relaxed
  Tags     : same badge style as ProjectCard stack tags

Services icon map (use these exactly):
  backend      → Server
  fullstack    → Layers
  erp-systems  → Building2
  api-design   → GitBranch
```

---

### 6.6 SkillBadge

```
File: components/cards/SkillBadge.tsx

Props      : { label: string }

Layout     : Inline pill
             bg-muted text-foreground text-sm px-3 py-1.5 rounded-lg
             border border-border
             font-body font-medium
             
No icons. No colored backgrounds per technology. Plain, uniform.
```

---

### 6.7 ExperienceTimeline

```
File: components/sections/experience/ExperienceTimeline.tsx

Layout     : Vertical timeline, left-aligned connector line

Each item  :
  - Left column : vertical line (1px border-l border-border)
                  + dot (8px circle, bg-accent, ring-2 ring-background)
                  + Year/duration label below dot (text-xs text-muted-foreground)
                  
  - Right column :
    Company name : font-heading text-xl font-semibold text-foreground
    Role         : text-sm text-accent font-medium
    Type badge   : small pill — "Full-time" / "Internship"
    Description  : text-sm text-muted-foreground mt-2
    Bullets      : Unordered list, dash-style, text-sm text-muted-foreground
    Stack tags   : SkillBadge components, flex-wrap, mt-4

Spacing between items: mt-12
```

---

### 6.8 TerminalBlock

```
File: components/sections/about/TerminalBlock.tsx

Purpose    : Decorative terminal window in the About page

Layout     : macOS-style terminal window
             bg-card border border-border rounded-xl overflow-hidden shadow-elevated
             
Header bar : bg-muted h-8 flex items-center px-4 gap-2
             Three dots: 8px circles in #EF4444, #F59E0B, #10B981 (these 3 colors are allowed)
             Title: text-xs text-muted-foreground font-mono "gourab@portfolio:~"
             
Content    : bg-background/50 p-6 font-mono text-sm
             Use the exact terminal content from personal.ts or define it statically:

➜  ~  whoami
Gourab Ganguly — Software Developer

➜  ~  cat about.txt
Building enterprise applications with .NET,
React and SQL Server.

Focused on backend engineering, clean architecture,
and creating products that scale.

➜  ~  pwd
/home/gourab/west-bengal/india

             Text colors:
               Prompt (➜) : text-accent
               Command     : text-foreground
               Output      : text-muted-foreground
               
Cursor     : Blinking underscore after last line
             Animate with CSS: blink animation on opacity 0/1 every 700ms
```

---

### 6.9 ContactForm

```
File: components/sections/contact/ContactForm.tsx

Fields     : Name, Email, Subject, Message
All inputs : Use shadcn/ui Input and Textarea components
Labels     : text-sm font-medium text-foreground
Placeholders: Minimal — e.g., "Your name", "your@email.com"
Button     : "Send Message" — full-width on mobile, auto on desktop
             bg-accent text-accent-foreground rounded-lg px-6 py-2.5
             hover:opacity-90 transition-opacity

Left column: Availability status + email + social links (on desktop layout)
Right column: The form

On submit  : Show a simple success state with a checkmark (CheckCircle icon)
             "Message sent. I'll get back to you shortly."
             No external service needed — just a UI state for now.
```

---

## 7. Page Specifications

### 7.1 Home Page (`/`)

Sections in order:

#### HeroSection
```
Layout     : Full viewport height (min-h-screen), flex column, centered vertically
             Content max-w-4xl mx-auto, left-aligned on desktop

Content    :
  Eyebrow  : Availability badge
             "Available for Freelance" (if availability = "open")
             Tiny pill: bg-accent/10 text-accent border border-accent/20
             text-xs font-body px-3 py-1 rounded-full
             Dot indicator: 6px circle bg-accent (pulse animation — soft, not distracting)

  Heading  : personal.name in font-heading text-5xl md:text-6xl font-semibold
             text-foreground
             
  Sub-title: personal.title — text-xl text-muted-foreground font-body mt-2
  
  Tagline  : personal.tagline — text-lg text-muted-foreground font-body mt-4 max-w-xl
  
  CTA row  : Two buttons, left-aligned, mt-8 gap-4 flex-wrap
             Primary: "View Projects" → /projects
                      bg-accent text-accent-foreground rounded-lg px-5 py-2.5
             Secondary: "Get in Touch" → /contact
                      Border variant: border border-border text-foreground
                      bg-transparent hover:bg-muted transition-colors

  Scroll indicator: Arrow down (ChevronDown from lucide) at bottom-center
             text-muted-foreground, subtle fade-in animation
```

#### SkillsSection (Home)
```
Label      : "Expertise"
Title      : "What I work with"

Layout     : For each Skill category — one row
             Category label on left (text-sm font-medium text-muted-foreground w-32)
             SkillBadge components flex-wrapped on right

No icons in this section.
```

#### FeaturedProjects
```
Show only   : projects.filter(p => p.featured)
Label       : "Work"
Title       : "Selected Projects"
Layout      : 2-column grid on desktop, 1-column on mobile
              ProjectCard for each
Footer link : "View all projects →" text-accent text-sm
```

#### CTASection
```
Layout     : Centered, py-28
Content    :
  Heading  : "Let's build something together."  (font-heading text-3xl)
  Sub      : personal.shortBio in text-muted-foreground
  Button   : "Start a conversation" → /contact
             bg-accent text-accent-foreground
```

---

### 7.2 About Page (`/about`)

Sections in order:

#### Header
```
SectionHeading: label="About", title=personal.name
Full bio paragraph: personal.bio — text-base text-muted-foreground leading-loose
```

#### TerminalBlock
```
Display the TerminalBlock component.
Place it in a max-w-2xl on the right on desktop (2-col grid: bio left, terminal right).
Stack to single column on mobile.
```

#### PrinciplesSection
```
Label      : "Philosophy"
Title      : "Engineering Principles"

Data (static, defined inline — no data file needed):
  Clean Architecture — "Code should be easy to understand, maintain, and extend."
  Product Thinking   — "Technology exists to solve problems, not showcase complexity."
  Ownership          — "Taking responsibility from design to deployment."
  Continuous Learning— "Always improving through building and experimenting."
  Reliability        — "Software should inspire confidence and trust."

Layout     : 2-column grid cards (desktop), 1-column (mobile)
Each card  : bg-card border border-border rounded-xl p-6
             Title: font-heading text-base font-semibold
             Body: text-sm text-muted-foreground

No icons on principle cards.
```

#### BeyondDevelopment (Optional)
```
Label      : "Beyond Code"
Title      : "Outside Work"
Paragraph  : "Outside of development, I spend time exploring software architecture, 
              learning about distributed systems, and building side projects.
              I'm also interested in the business side of technology — 
              how products are built, positioned, and scaled."
```

---

### 7.3 Projects Page (`/projects`)

#### Layout
```
Header     : SectionHeading label="Projects" title="Things I've Built"

Filter tabs: "All" · "Enterprise" · "SaaS" · "Tools" · "Open Source"
             Use shadcn/ui Tabs or simple button group
             bg-muted rounded-lg p-1 inline-flex gap-1
             Active tab: bg-background shadow-card text-foreground
             Inactive: text-muted-foreground hover:text-foreground

Grid       : 2-column on desktop, 1-column on mobile
             gap-6
             ProjectCard for each filtered project
```

Filter logic:
```ts
const [filter, setFilter] = useState<string>("all");
const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);
```

---

### 7.4 Experience Page (`/experience`)

```
Header     : SectionHeading label="Experience" title="Where I've Worked"

Body       : ExperienceTimeline component with all experience data

Below timeline:
  Skills section — "Complete Skill Set"
  Render all skills[] categories with SkillBadge components
  Same layout as Home SkillsSection
```

---

### 7.5 Services Page (`/services`)

```
Header     : SectionHeading label="Services" title="What I Can Build for You"
Sub        : "Available for freelance and contract work. Let's talk about your project."

Grid       : 2-column on desktop, 1-column on mobile
             ServicesCard for each service

Below grid :
  Availability block:
    bg-card border border-border rounded-xl p-8 text-center max-w-2xl mx-auto mt-16
    Availability dot + status text
    "Currently accepting new projects"
    CTA button: "Get in Touch" → /contact
```

---

### 7.6 Contact Page (`/contact`)

```
Header     : SectionHeading label="Contact" title="Let's Talk"
Sub        : "Available for freelance projects, full-time roles, and collaborations."

Layout     : 2-column on desktop (left: info, right: form)

Left column:
  Email    : text-foreground + ExternalLink icon
  Social   : Icon + label for each social link
  Availability badge (same as Hero)
  
Right column:
  ContactForm component
```

---

## 8. Theme System

### ThemeProvider

Use `next-themes` if on Next.js. Otherwise implement a minimal provider:

```tsx
// hooks/useTheme.ts
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: "dark", toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

Default theme: **dark**. The portfolio should look its best in dark mode.

---

## 9. Routing & Layout

### layout.tsx (Root)

```tsx
export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <PageWrapper>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </PageWrapper>
    </ThemeProvider>
  );
}
```

### Active Link Detection

In `Navbar.tsx`, detect the active route:
```tsx
const pathname = usePathname(); // Next.js
// or useLocation().pathname for React Router
const isActive = (path: string) => pathname === path;
```

---

## 10. globals.css Final Structure

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

@layer base {
  :root {
    --background: #FFFFFF;
    --foreground: #0F172A;
    --muted: #F1F5F9;
    --muted-foreground: #64748B;
    --border: #E2E8F0;
    --accent: #7C3AED;
    --accent-foreground: #FFFFFF;
    --card: #FAFAFA;
    --card-foreground: #1E293B;
    --subtle: #F8FAFC;
    --radius: 0.75rem;
    --font-heading: 'Playfair Display', Georgia, serif;
    --font-body: 'Inter', system-ui, sans-serif;
  }

  .dark {
    --background: #0F172A;
    --foreground: #F8FAFC;
    --muted: #1E293B;
    --muted-foreground: #94A3B8;
    --border: #1E293B;
    --accent: #3B82F6;
    --accent-foreground: #EFF6FF;
    --card: #111827;
    --card-foreground: #E2E8F0;
    --subtle: #334155;
  }

  * {
    border-color: var(--border);
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
  }
}

@layer utilities {
  .font-heading { font-family: var(--font-heading); }
  .font-body    { font-family: var(--font-body); }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.6; transform: scale(1.15); }
  }

  .animate-fade-in-up { animation: fadeInUp 0.45s ease both; }
  .animate-delay-100  { animation-delay: 0.1s; }
  .animate-delay-200  { animation-delay: 0.2s; }
  .animate-delay-300  { animation-delay: 0.3s; }
  .animate-blink      { animation: blink 700ms step-end infinite; }
  .animate-pulse-dot  { animation: pulse-dot 2s ease-in-out infinite; }
}
```

---

## 11. tailwind.config.ts Final

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background:  "var(--background)",
        foreground:  "var(--foreground)",
        muted: {
          DEFAULT:    "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        border:      "var(--border)",
        accent: {
          DEFAULT:    "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        card: {
          DEFAULT:    "var(--card)",
          foreground: "var(--card-foreground)",
        },
        subtle:      "var(--subtle)",
      },
      fontFamily: {
        heading: "var(--font-heading)",
        body:    "var(--font-body)",
        mono:    ["ui-monospace", "Cascadia Code", "Fira Code", "monospace"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        lg:      "var(--radius)",
        md:      "calc(var(--radius) - 2px)",
        sm:      "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card:     "0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)",
        elevated: "0 4px 12px 0 rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

---

## 12. Implementation Order

Build in this exact sequence. Do not skip ahead.

```
1. globals.css + tailwind.config.ts     → Design tokens in place
2. types/index.ts                        → Type contracts
3. data/ (all files)                     → Content ready
4. constants/index.ts                    → Route names
5. lib/utils.ts                          → shadcn cn utility
6. hooks/useTheme.ts + ThemeProvider     → Theme system
7. layout/PageWrapper.tsx                → Background system
8. common/Navbar.tsx                     → Navigation shell
9. common/Footer.tsx                     → Footer shell
10. common/SectionHeading.tsx            → Typography utility
11. cards/SkillBadge.tsx                 → Atomic component
12. cards/ProjectCard.tsx                → Card component
13. cards/ServiceCard.tsx                → Card component
14. sections/home/HeroSection.tsx        → Home page start
15. sections/home/SkillsSection.tsx
16. sections/home/FeaturedProjects.tsx
17. sections/home/CTASection.tsx
18. app/page.tsx (Home)                  → Assemble home
19. sections/about/TerminalBlock.tsx
20. sections/about/PrinciplesSection.tsx
21. app/about/page.tsx
22. sections/experience/ExperienceTimeline.tsx
23. app/experience/page.tsx
24. sections/projects/ProjectsGrid.tsx
25. app/projects/page.tsx
26. sections/services/ServicesGrid.tsx
27. app/services/page.tsx
28. sections/contact/ContactForm.tsx
29. app/contact/page.tsx
30. layout.tsx (Root layout — wire everything)
31. Final pass: responsiveness + dark/light toggle QA
```

---

## 13. Quality Checklist

Before considering any page complete, verify:

- [ ] All text content sourced from `data/` — nothing hard-coded in components
- [ ] No raw hex colors inside any `.tsx` file — only token class names
- [ ] Dark mode and light mode both tested and look intentional
- [ ] No layout breaks at 375px (mobile), 768px (tablet), 1280px (desktop)
- [ ] Navbar active state correct on each page
- [ ] ThemeToggle works — persists on refresh (localStorage)
- [ ] No console errors or TypeScript errors
- [ ] Font loading visible — Playfair Display rendering on headings
- [ ] TerminalBlock visible and styled correctly in About page
- [ ] ProjectCard status badge renders per project status
- [ ] Filter tabs on Projects page work correctly
- [ ] ContactForm shows success state on submit
- [ ] Footer social links are correct and open in new tab
- [ ] PageWrapper glow is visible but subtle — not distracting

---

## 14. What the Final Portfolio Must Feel Like

When you open the portfolio, it should feel like:

> A serious software engineer built this — not for attention, but because they care about craft.

Not a template. Not a LeetCode profile. Not a designer's playground.

A clean, trustworthy, enterprise-grade digital presence. Minimal. Quiet. Premium.

The kind of portfolio a recruiter opens and immediately thinks:
**"This person knows what they're doing."**

---

*End of specification.*