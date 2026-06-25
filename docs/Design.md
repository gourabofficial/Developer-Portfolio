# design.md — Portfolio Design System
> Gourab Ganguly · Portfolio Design Language
> This document is the single source of truth for every visual decision.
> No color, font, shadow, or animation should exist that isn't defined here.

---

## 1. Design Identity

```
Personality   : Quiet. Confident. Enterprise-grade.
Voice         : A senior engineer who doesn't need to shout.
References    : Vercel documentation · Linear app · Raycast website
Anti-references: Dribbble showcases · Flashy agency sites · LeetCode profiles
```

The signature of this portfolio is **restraint executed with precision**.
Space does the work. Typography carries the personality. Color is used as a signal, never decoration.

---

## 2. Background System (Primary Design Decision)

This is the most important section. The background system defines the entire visual atmosphere of the site.

### 2.1 Dark Mode Background

Exact implementation — copy verbatim:

```jsx
// Dark mode: Deep navy + centered blue radial glow
<div className="min-h-screen w-full bg-[#0f172a] relative">

  {/* Blue Radial Glow — centered, mid-depth */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)`,
    }}
  />

  {/* Your Content — always z-10 or higher */}
  <div className="relative z-10">
    {children}
  </div>
</div>
```

**Properties breakdown:**
```
Base color       : #0f172a   (Tailwind slate-900, near-black navy)
Glow shape       : circle 600px radius
Glow position    : 50% horizontal · 50% vertical (dead center)
Glow color       : rgba(59, 130, 246, 0.3)  — blue-500 at 30% opacity
Glow fade        : transparent (hard edge to none — no second stop needed)
Glow layer z     : z-0 (below all content)
Content layer z  : z-10 (above glow)
```

**What this achieves:**
A single soft blue halo sits in the center of the page. On scroll, new sections pass through this halo — content subtly brightens near center. This creates depth without movement or animation.

---

### 2.2 Light Mode Background

Exact implementation — copy verbatim:

```jsx
// Light mode: Pure white + top-left purple radial glow (blurred)
<div className="min-h-screen w-full relative bg-white">

  {/* Purple Glow — top left corner, heavily blurred */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: "#ffffff",
      backgroundImage: `
        radial-gradient(
          circle at top left,
          rgba(173, 109, 244, 0.5),
          transparent 70%
        )
      `,
      filter: "blur(80px)",
      backgroundRepeat: "no-repeat",
    }}
  />

  {/* Your Content — always z-10 or higher */}
  <div className="relative z-10">
    {children}
  </div>
</div>
```

**Properties breakdown:**
```
Base color       : #ffffff   (pure white)
Glow shape       : circle, no fixed radius — bleeds from corner
Glow position    : top left (0% 0%)
Glow color       : rgba(173, 109, 244, 0.5)  — violet-400 at 50% opacity
Glow fade        : transparent at 70% — gradual, wide spread
Blur filter      : 80px — heavy Gaussian blur, removes all hard edges
No-repeat        : prevents tile artifacts
Glow layer z     : z-0
Content layer z  : z-10
```

**What this achieves:**
A large, extremely soft purple wash bleeds from the top-left corner, fading into pure white. Creates warmth and a subtle directional light source. Pairs with the dark mode's centered glow — both feel intentional, neither feels decorative.

---

### 2.3 PageWrapper Implementation

This is the single component that encapsulates both themes. Every page uses this wrapper.

```tsx
// components/layout/PageWrapper.tsx

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <>
      {/* ─── DARK MODE ─── */}
      <div className="hidden dark:block min-h-screen w-full bg-[#0f172a] relative">
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
          style={{
            backgroundImage: `radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)`,
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>

      {/* ─── LIGHT MODE ─── */}
      <div className="block dark:hidden min-h-screen w-full relative bg-white">
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
          style={{
            background: "#ffffff",
            backgroundImage: `radial-gradient(circle at top left, rgba(173,109,244,0.5), transparent 70%)`,
            filter: "blur(80px)",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </>
  );
}
```

**Critical:** All page content must sit inside `relative z-10` — never directly inside the wrapper root. If content is placed at z-0, the glow layer renders on top and washes out the content.

---

## 3. Color System

### 3.1 Token Map

Tokens are CSS custom properties applied to `:root` (light) and `.dark` (dark). All component code uses token class names — never raw hex values.

```css
/* styles/globals.css */

:root {
  /* Backgrounds */
  --background: #ffffff;
  --card:       #fafafa;
  --muted:      #f1f5f9;
  --subtle:     #f8fafc;

  /* Text */
  --foreground:          #0f172a;
  --card-foreground:     #1e293b;
  --muted-foreground:    #64748b;

  /* Accent (violet in light mode) */
  --accent:              #7c3aed;
  --accent-foreground:   #ffffff;

  /* Structure */
  --border:              #e2e8f0;

  /* Radius */
  --radius: 0.75rem;
}

.dark {
  /* Backgrounds */
  --background: #0f172a;
  --card:       #111827;
  --muted:      #1e293b;
  --subtle:     #334155;

  /* Text */
  --foreground:          #f8fafc;
  --card-foreground:     #e2e8f0;
  --muted-foreground:    #94a3b8;

  /* Accent (blue in dark mode) */
  --accent:              #3b82f6;
  --accent-foreground:   #eff6ff;

  /* Structure */
  --border:              #1e293b;
}
```

### 3.2 Token Usage Reference

| Token                  | Tailwind Class              | Use Case                                   |
|------------------------|-----------------------------|--------------------------------------------|
| `--background`         | `bg-background`             | Page background (behind PageWrapper)       |
| `--card`               | `bg-card`                   | All card surfaces                          |
| `--muted`              | `bg-muted`                  | Hover states, code blocks, tab backgrounds |
| `--subtle`             | `bg-subtle`                 | Zebra rows, dividers, quiet regions        |
| `--foreground`         | `text-foreground`           | Primary text — headings, important labels  |
| `--card-foreground`    | `text-card-foreground`      | Text inside cards                          |
| `--muted-foreground`   | `text-muted-foreground`     | Secondary text — descriptions, captions    |
| `--accent`             | `text-accent` / `bg-accent` | Links, active states, key highlights       |
| `--accent-foreground`  | `text-accent-foreground`    | Text on accent-colored backgrounds         |
| `--border`             | `border-border`             | All borders and dividers                   |

### 3.3 The Three-Color Rule

Only these colors should appear in any component:

```
1. Foreground family  : text-foreground, text-muted-foreground, text-card-foreground
2. Surface family     : bg-background, bg-card, bg-muted, bg-subtle
3. Accent             : text-accent, bg-accent, border-accent (used sparingly)
```

The only exceptions to raw color in the entire project:

```jsx
// Terminal window traffic light dots — these 3 are allowed raw:
bg-[#ef4444]   // red    — close button
bg-[#f59e0b]   // amber  — minimize button
bg-[#10b981]   // green  — fullscreen button
```

Everything else uses tokens.

---

## 4. Typography System

### 4.1 Font Loading

```css
/* styles/globals.css — top of file */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
```

```css
:root {
  --font-heading: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-body:    'Inter', system-ui, -apple-system, sans-serif;
  --font-mono:    'Cascadia Code', 'Fira Code', 'JetBrains Mono', ui-monospace, monospace;
}
```

```ts
// tailwind.config.ts
fontFamily: {
  heading: ["var(--font-heading)"],
  body:    ["var(--font-body)"],
  mono:    ["var(--font-mono)"],
},
```

### 4.2 Type Scale

```
Role              Size          Weight    Font      Color                   Class Combination
─────────────────────────────────────────────────────────────────────────────────────────────
Hero Heading      60px / 3.75rem  600    Heading   foreground    font-heading text-6xl font-semibold
Page Heading      36px / 2.25rem  600    Heading   foreground    font-heading text-4xl font-semibold
Section Title     30px / 1.875rem 600    Heading   foreground    font-heading text-3xl font-semibold
Card Title        20px / 1.25rem  600    Heading   card-fore     font-heading text-xl font-semibold
Sub-heading       18px / 1.125rem 500    Heading   foreground    font-heading text-lg font-medium

Body Large        18px / 1.125rem 400    Body      muted-fore    font-body text-lg leading-relaxed
Body Default      16px / 1rem     400    Body      muted-fore    font-body text-base leading-relaxed
Body Small        14px / 0.875rem 400    Body      muted-fore    font-body text-sm leading-relaxed
Caption           12px / 0.75rem  400    Body      muted-fore    font-body text-xs
Label / Eyebrow   12px / 0.75rem  500    Body      accent        font-body text-xs tracking-widest uppercase

Terminal          14px / 0.875rem 400    Mono      varies        font-mono text-sm
```

### 4.3 Line Height Rules

```
Headings     : leading-tight  (1.25)
Body text    : leading-relaxed (1.625) — always
Captions     : leading-normal  (1.5)
Terminal     : leading-relaxed (1.625)
```

### 4.4 Letter Spacing Rules

```
Default text      : tracking-normal  (0em)
Eyebrow labels    : tracking-widest  (0.1em) + uppercase always
Headings          : tracking-tight   (-0.025em) — optional, adds elegance at large sizes
Mono / Terminal   : tracking-normal
```

---

## 5. Spacing System

### 5.1 Section Spacing

Every section on every page uses these exact spacings. No variation.

```
Section vertical padding   : py-20 lg:py-28
Section horizontal padding : px-6 md:px-12 lg:px-24
Content max-width          : max-w-6xl mx-auto
```

```tsx
// Correct section wrapper pattern — every section uses this
<section className="px-6 py-20 md:px-12 lg:px-24 lg:py-28">
  <div className="max-w-6xl mx-auto">
    {/* section content */}
  </div>
</section>
```

### 5.2 Internal Spacing (Within Components)

```
SectionHeading eyebrow → title gap   : mb-3 (12px)
SectionHeading title → description   : mb-4 (16px)
SectionHeading block → section body  : mb-12 (48px) or mb-16 (64px)

Card internal padding    : p-6  (24px)
Card gap in grids        : gap-6 (24px)
Section grids gap        : gap-8 (32px)

Skill badge gap          : gap-2 (8px)
Stack tags gap           : gap-2 (8px)

Timeline item gap        : mt-12 (48px) between items
Button row gap           : gap-4 (16px)
```

### 5.3 Spacing Forbidden

```
✗ Never use p-4 on section outer wrappers
✗ Never use gap-4 on section grids (too tight)
✗ Never use mb-2 between heading and description (too tight)
✗ Never use py-8 or py-10 on sections (too cramped)
✗ Never use max-w-7xl (too wide, reduces readability)
✗ Never use max-w-4xl on grid sections (too narrow for 2 columns)
```

---

## 6. Component Design Patterns

### 6.1 Card Pattern

All cards share this base. Copy this pattern exactly.

```tsx
// Base card class string — apply to every card
className="bg-card border border-border rounded-xl p-6 shadow-card
           hover:border-accent/30 transition-colors duration-200"
```

```
bg-card              : token — slate-900 dark, off-white light
border border-border : 1px solid token border
rounded-xl           : 12px corners (--radius)
p-6                  : 24px internal padding
shadow-card          : subtle elevation (defined in config)
hover:border-accent/30 : accent color at 30% on hover
transition-colors    : smooth, 200ms
duration-200         : not too slow, not instant
```

No `hover:shadow-elevated` — border color change is the hover signal. Keep it quiet.

### 6.2 Badge / Tag Pattern

```tsx
// Technology tag / stack badge
className="inline-flex items-center rounded-full bg-muted
           text-muted-foreground text-xs font-body px-2.5 py-0.5
           border border-border"
```

```
rounded-full    : pill shape always
bg-muted        : quiet surface — same in both modes
text-xs         : 12px — small and unobtrusive
border          : 1px border to separate from card surface
NO colors       : All tags are the same muted style — no per-technology colors
```

### 6.3 Button Patterns

**Primary (accent fill):**
```tsx
className="inline-flex items-center justify-center
           bg-accent text-accent-foreground
           rounded-lg px-5 py-2.5 text-sm font-body font-medium
           hover:opacity-90 transition-opacity duration-200
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
```

**Secondary (border):**
```tsx
className="inline-flex items-center justify-center
           bg-transparent text-foreground
           border border-border rounded-lg
           px-5 py-2.5 text-sm font-body font-medium
           hover:bg-muted transition-colors duration-200
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border"
```

**Ghost (icon buttons, nav links):**
```tsx
className="inline-flex items-center justify-center
           text-muted-foreground hover:text-foreground
           transition-colors duration-200
           focus-visible:outline-none"
```

### 6.4 Section Heading Pattern

```tsx
// SectionHeading component output structure

<div className={cn("mb-12", align === "center" && "text-center")}>
  {/* Eyebrow label */}
  <p className="text-xs font-body font-medium tracking-widest uppercase
                text-accent mb-3">
    {label}
  </p>

  {/* Main title */}
  <h2 className="font-heading text-3xl font-semibold text-foreground mb-4">
    {title}
  </h2>

  {/* Optional description */}
  {description && (
    <p className={cn(
      "text-base text-muted-foreground leading-relaxed",
      align === "center" && "max-w-xl mx-auto"
    )}>
      {description}
    </p>
  )}
</div>
```

### 6.5 Availability Badge Pattern

```tsx
// Hero and Services pages — availability indicator

<div className="inline-flex items-center gap-2
                bg-accent/10 border border-accent/20
                text-accent text-xs font-body
                px-3 py-1 rounded-full">

  {/* Pulsing dot */}
  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />

  {/* Label from constants */}
  <span>{AVAILABILITY_LABELS[personal.availability]}</span>
</div>
```

### 6.6 Status Badge Pattern (Project Cards)

```tsx
// Status badge — top of ProjectCard

const statusStyles = {
  "live":        "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "in-progress": "bg-amber-500/10   text-amber-500   border-amber-500/20",
  "archived":    "bg-muted          text-muted-foreground border-border",
};

<span className={cn(
  "inline-flex items-center rounded-full text-xs font-body px-2 py-0.5 border",
  statusStyles[project.status]
)}>
  {STATUS_LABELS[project.status]}
</span>
```

Note: `emerald-500` and `amber-500` are used here at 10% opacity backgrounds only. These are semantic status colors — an exception to the three-color rule.

---

## 7. Navigation Design

### 7.1 Navbar Anatomy

```
┌─────────────────────────────────────────────────────────────────┐
│  GG  │ Portfolio    ·    Home  About  Projects  Experience  ... ☀│
└─────────────────────────────────────────────────────────────────┘

Height           : h-16 (64px)
Position         : sticky top-0 z-50
Background       : bg-background/80 backdrop-blur-md
Bottom border    : border-b border-border
```

**Logo section:**
```tsx
<div className="flex items-center gap-3">
  {/* Monogram */}
  <span className="font-heading text-lg font-semibold text-foreground">GG</span>

  {/* Vertical separator */}
  <div className="h-4 w-px bg-border" />

  {/* Title */}
  <span className="text-sm font-body text-muted-foreground hidden sm:block">
    Portfolio
  </span>
</div>
```

**Nav links:**
```tsx
// Active
className="text-sm font-body font-medium text-foreground"

// Inactive
className="text-sm font-body text-muted-foreground hover:text-foreground
           transition-colors duration-200"
```

No underlines. No background pills on nav items. Active = `text-foreground`. Inactive = `text-muted-foreground`.

### 7.2 Mobile Nav

Hamburger triggers a dropdown from below the navbar:

```
Position  : absolute top-16 left-0 right-0
Background: bg-background border-b border-border
Padding   : px-6 py-4
Links     : Stacked, text-base, same active/inactive styles
Animation : max-height transition, 200ms ease — no slide transforms
```

---

## 8. Timeline Design

### 8.1 ExperienceTimeline Structure

```
┌──────────────────────────────────────────────┐
│  ●  ─────────────────────────────────────    │
│  │   Ancile Services                         │
│  │   Software Developer (SDE-1) [Full-time]  │
│  │   Feb 2026 — Present                      │
│  │                                           │
│  │   Description text here...               │
│  │                                           │
│  │   • Bullet one                           │
│  │   • Bullet two                           │
│  │                                           │
│  │   C#  ASP.NET Core  SQL Server  Redis    │
│  │                                           │
│  ●  ─────────────────────────────────────    │
│  │   Zidio Development                       │
│     ...                                      │
└──────────────────────────────────────────────┘
```

**Connector line:** `border-l-2 border-border ml-3`
**Dot:** `w-3 h-3 rounded-full bg-accent ring-2 ring-background -ml-1.5 mt-1.5`
**Current dot:** Add `animate-pulse-dot` to the dot on current=true items

---

## 9. Terminal Block Design

```
┌─────────────────────────────────────────────┐
│  ●  ●  ●   gourab@portfolio:~               │  ← header bar
├─────────────────────────────────────────────┤
│  ➜  ~  whoami                               │
│  Gourab Ganguly — Software Developer        │
│                                             │
│  ➜  ~  cat about.txt                        │
│  Building enterprise applications with      │
│  .NET, React and SQL Server.                │
│                                             │
│  ➜  ~  pwd                                  │
│  /home/gourab/west-bengal/india             │
│                                             │
│  ➜  ~  █                                    │  ← blinking cursor
└─────────────────────────────────────────────┘
```

```
Window         : bg-card border border-border rounded-xl overflow-hidden shadow-elevated
Header bar     : bg-muted h-9 flex items-center px-4 gap-2
Header title   : font-mono text-xs text-muted-foreground
Dots           : w-2.5 h-2.5 rounded-full — exact colors: #ef4444 #f59e0b #10b981
Content area   : bg-background/50 p-6 font-mono text-sm

Prompt (➜)    : text-accent
Command        : text-foreground font-mono
Output lines   : text-muted-foreground font-mono
Cursor (█)     : text-accent animate-blink
```

---

## 10. Animation System

### 10.1 Allowed Animations

```css
/* Defined in globals.css — these are the ONLY animations */

/* 1. Entry: sections and cards entering */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* 2. Terminal cursor blink */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* 3. Availability dot pulse */
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(1.2); }
}
```

### 10.2 Animation Usage Map

```
fadeInUp     → Hero section text (staggered, delays 0 / 100ms / 200ms / 300ms)
fadeInUp     → Section headings on viewport entry (optional, single 0ms)
blink        → Terminal cursor only
pulse-dot    → Availability indicator dot only
```

### 10.3 Transition Rules

```
Color changes    : transition-colors duration-200
Opacity changes  : transition-opacity duration-200
Border changes   : transition-colors duration-200
Background fill  : transition-colors duration-200

NO transform transitions (no scale, no slide on hover)
NO duration above 300ms
NO ease-bounce or elastic easings
NO delays on hover states
```

### 10.4 Forbidden Animations

```
✗ No CSS hover:scale-*
✗ No hover:translate-*
✗ No hover:-translate-y-1 (card lift on hover)
✗ No rotate animations
✗ No shimmer/skeleton loaders
✗ No page transition animations
✗ No staggered list animations on re-filter
✗ No scroll-triggered animations (keep it simple)
```

---

## 11. Shadows

Two shadows only. Defined in tailwind.config.ts.

```ts
boxShadow: {
  // Default card shadow — very subtle
  card: "0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)",

  // Elevated shadow — for terminal block, modals
  elevated: "0 4px 12px 0 rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)",
}
```

Usage:
```
Cards           → shadow-card
Terminal block  → shadow-elevated
Buttons         → no shadow
Inputs          → no shadow
Navbar          → no shadow (uses border-b instead)
```

In dark mode, shadows are barely visible (dark backgrounds). That is intentional — in dark mode, the border does the separation work.

---

## 12. Border Radius

```ts
// tailwind.config.ts
borderRadius: {
  DEFAULT: "var(--radius)",    // 0.75rem = 12px
  lg:      "var(--radius)",    // 12px
  md:      "calc(var(--radius) - 2px)",  // 10px
  sm:      "calc(var(--radius) - 4px)",  // 8px
  full:    "9999px",           // pill shapes
}
```

Usage map:
```
Cards, panels     : rounded-xl  (12px)
Buttons           : rounded-lg  (10px)
Inputs            : rounded-lg  (10px)
Tags / badges     : rounded-full (pill)
Nav active tab    : rounded-md  (8px)
Terminal dots     : rounded-full
Availability dot  : rounded-full
```

No `rounded-2xl` or `rounded-3xl` anywhere. No `rounded-none`. No mixed radius within one component.

---

## 13. Iconography Rules

Icons are structural, not decorative. They clarify function — never fill space.

**Library:** `lucide-react` only.

**Allowed icons and their uses:**

```
Sun / Moon          → ThemeToggle only
Menu / X            → Mobile navbar hamburger
Github              → Project links, Social links
ExternalLink        → Live project links, Social links (external)
Mail                → Contact / Social links
Linkedin            → Social links
Server              → Backend service card
Layers              → Full stack service card
Building2           → ERP service card
GitBranch           → API design service card
ChevronDown         → Hero scroll indicator
CheckCircle         → Contact form success state
ArrowRight          → "View all" links (text links, not standalone)
```

**Icon sizing:**
```
Nav icons (theme toggle, hamburger)  : w-4 h-4  (16px)
Card action icons (github, external) : w-4 h-4  (16px)
Service card icons                   : w-5 h-5  (20px) inside bg-muted p-2
Social link icons                    : w-4 h-4  (16px)
Scroll indicator                     : w-5 h-5  (20px)
Success checkmark                    : w-8 h-8  (32px)
```

**Forbidden icon patterns:**
```
✗ No icons next to every heading
✗ No icons in skill badges or tech tags
✗ No decorative icons in hero section
✗ No social icons in the hero
✗ No colored icon backgrounds (except service cards)
✗ No icon grids or icon-heavy layouts
```

---

## 14. Responsive Breakpoints

```
Mobile   : 0px     – 639px    (default — no prefix)
Tablet   : 640px   – 767px    (sm:)
Tablet L : 768px   – 1023px   (md:)
Desktop  : 1024px  – 1279px   (lg:)
Wide     : 1280px+            (xl:)
```

**Grid behavior:**
```
Projects grid      : grid-cols-1 md:grid-cols-2
Services grid      : grid-cols-1 md:grid-cols-2
Principles grid    : grid-cols-1 md:grid-cols-2
Skills layout      : flex-col → flex-row md:
Hero CTAs          : flex-wrap (stack naturally on small)
Contact layout     : grid-cols-1 lg:grid-cols-2 (info + form)
```

**Text scaling:**
```
Hero heading       : text-4xl md:text-5xl lg:text-6xl
Section titles     : text-2xl md:text-3xl
Card titles        : text-lg md:text-xl
```

**Padding scaling:**
```
Section horizontal : px-6 md:px-12 lg:px-24
Section vertical   : py-16 md:py-20 lg:py-28
Card padding       : p-5 md:p-6 (mostly fixed at p-6)
```

---

## 15. Accessibility

```
Focus ring       : focus-visible:ring-2 focus-visible:ring-accent
                   On all interactive elements — buttons, links, inputs
Skip nav         : Not required for a portfolio (few interactions)
Alt text         : Required if any images are ever added
Color contrast   : All text-foreground on bg-background exceeds 4.5:1
                   text-muted-foreground on bg-background exceeds 3:1
Aria hidden      : All decorative glow divs get aria-hidden="true"
                   and pointer-events-none
Reduced motion   : Wrap all animations in:
                   @media (prefers-reduced-motion: reduce) { animation: none; }
```

---

## 16. Anti-Pattern Reference

Things that will make this portfolio look generic. Never do these.

```
✗ Cards with large colored emoji or icons at the top
✗ Skill bars / progress bars for technologies
✗ Circular profile photo in a ring
✗ Colorful gradient text (text with background-clip:text)
✗ "Hire Me" button in the hero with a lightning bolt icon
✗ Animated counter numbers ("150+ projects completed")
✗ Ribbon / badge overlays on project cards
✗ Full-bleed background images on any section
✗ Box with a big quote mark graphic
✗ Testimonial carousel
✗ Floating social media bar on the side
✗ Back-to-top button
✗ Cookie consent banner
✗ Chatbot widget
✗ Mouse cursor effect
✗ Typing animation on the hero heading
```

---

## 17. Final Visual Checklist

Before calling the design complete, verify:

```
Background:
  [ ] Dark mode: #0f172a base with blue radial glow centered at 50% 50%
  [ ] Light mode: #ffffff base with purple blurred glow at top left
  [ ] Both glows are subtle — they enhance, they don't distract

Typography:
  [ ] Playfair Display visible on all headings (h1, h2, h3, card titles)
  [ ] Inter rendering on all body text, labels, and nav links
  [ ] Monospace font visible in TerminalBlock

Colors:
  [ ] Dark mode accent = blue (#3b82f6)
  [ ] Light mode accent = violet (#7c3aed)
  [ ] Switching theme changes accent color correctly
  [ ] No raw hex values in any component (except terminal dots and PageWrapper inline styles)

Components:
  [ ] Cards have hover border color change (subtle)
  [ ] Availability dot is pulsing
  [ ] Terminal cursor is blinking
  [ ] Hero text has staggered fade-in-up
  [ ] All buttons show focus ring when keyboard-navigated

Layout:
  [ ] All content sits within max-w-6xl centered container
  [ ] Section spacings are consistent across pages
  [ ] Mobile view (375px): no horizontal scroll, all grids single column
  [ ] NavBar collapses correctly on mobile
```

---

*End of design.md*