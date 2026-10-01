/**
 * seedProjects.js
 *
 * Standalone script — mirrors exactly what the admin panel does when you
 * "Add project" for each entry in client/src/data/projects.ts.
 *
 * Usage (from the /server directory):
 *   node scripts/seedProjects.js
 *
 * Options:
 *   --dry-run   Print what would be inserted, without touching MongoDB.
 *   --force     Overwrite (upsert) existing slugs instead of skipping them.
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import slugifyLib from 'slugify';
import { connectDatabase } from '../config/database.js';
import Project from '../models/Project.js';

// ── CLI flags ──────────────────────────────────────────────────────────────
const args      = process.argv.slice(2);
const DRY_RUN   = args.includes('--dry-run');
const FORCE     = args.includes('--force');

// ── Slug helper (same as projects.js route) ────────────────────────────────
function makeSlug(title) {
  return slugifyLib(title.trim(), { lower: true, strict: true });
}

// ── Cloudinary URL builder (mirrors client/src/lib/cloudinary.ts) ──────────
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

function projectThumbUrl(rawId) {
  if (!CLOUD_NAME) return '';
  // Same sanitisation as PUBLIC_IDS.project() in cloudinary.ts
  const safeId = rawId.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9_\-]/g, '');
  const publicId = `portfolio/projects/${safeId}`;
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_640,c_fill,ar_16:9/${publicId}`;
}

// ── Project data (transcribed from client/src/data/projects.ts) ───────────
// Each entry maps 1-to-1 to the fields the admin form collects.
const PROJECTS = [
  {
    id:           'TEA-ERP-System',
    title:        'Tea ERP System',
    eyebrow:      'Enterprise ERP application',
    description:  'A large-scale business platform unifying payroll, production, sales, stores, attendance, accounts and inventory in one secure system.',
    overview:     'Enterprise workflow platform for operations, finance, and inventory management.',
    problem:      "The tea industry's existing tools were fragmented — payroll, production, and inventory lived in separate systems with no shared data layer, causing reconciliation issues and manual overhead.",
    architecture: 'ASP.NET Core Web API backend with a layered service architecture. Dapper handles data access against SQL Server with dynamic SQL and sargable queries for report performance. A hybrid caching strategy (in-memory + Redis) sits in front of frequently read data. React frontend consumes the API via typed fetch calls.',
    techStack:    ['.NET Core', 'React', 'SQL Server', 'Dapper', 'Redis'],
    features: [
      'Role-based access control',
      'Operational dashboards',
      'Payroll & attendance modules',
      'Production tracking',
      'Advanced report generation',
      'Hybrid caching layer (in-memory + Redis)',
      'Server-side pagination on data-heavy reports',
      'Inventory & stores management',
    ],
    featured:   true,
    accent:     'ERP // 01',
    category:   'Enterprise',
    liveUrl:    'https://www.teaerp.com',
    githubUrl:  '',
    order:      1,
  },
  {
    id:           'LMS-Platfrom',
    title:        'Learning Management System',
    eyebrow:      'Learning management system',
    description:  'A full-featured course platform designed around secure learning, video delivery and measurable student progress.',
    overview:     'Course platform with secure learning journeys, video delivery, and progress tracking.',
    problem:      'Educators needed a self-hosted alternative to expensive third-party LMS tools — one that gave them direct control over content, student data, and access policies.',
    architecture: 'MERN stack with JWT-based session management. Cloudinary handles media upload and streaming to avoid storing large files on the server. Progress state is persisted in MongoDB per-user per-course, enabling resumable video playback.',
    techStack:    ['React Js', 'Node Js', 'Express Js', 'MongoDB'],
    features: [
      'JWT authentication',
      'Video lecture delivery',
      'Course progress tracking',
      'Cloudinary media integration',
      'Instructor course management',
      'Student enrollment flow',
    ],
    featured:  true,
    accent:    'LMS // 02',
    category:  'Full Stack',
    liveUrl:   'https://advanced-lms.vercel.app/',
    githubUrl: 'https://github.com/gourabofficial/LMS-Udemy-Type',
    order:     2,
  },
  {
    id:           'Plan-My-Trip',
    title:        'PlanMyTrip',
    eyebrow:      'Travel planning platform',
    description:  'A responsive travel planning experience that turns complex itineraries into a simple, visual workflow.',
    overview:     'Trip planning workspace for organizing destinations, routes, and schedules.',
    problem:      'Planning a multi-destination trip across multiple tools (spreadsheets, maps, note apps) is friction-heavy. Travelers needed a single workspace to build, visualise, and save itineraries.',
    architecture: 'React SPA consuming third-party travel and mapping APIs. Itinerary state is managed client-side with the option to persist saved trips. The UI is fully responsive-first with a mobile workflow that mirrors the desktop experience.',
    techStack:    ['React js', 'Third-party APIs', 'Node.js'],
    features: [
      'Visual trip builder',
      'Destination search',
      'Saved itineraries',
      'Responsive mobile UI',
      'Third-party API integration',
    ],
    featured:  true,
    accent:    'TRIP // 03',
    category:  'SAAS',
    liveUrl:   'https://plan-my-trip-saas-product.vercel.app/',
    githubUrl: 'https://github.com/gourabofficial/PlanMyTrip-Saas-Product',
    order:     3,
  },
  {
    id:           'AI-Interview-Platform',
    title:        'AI Interview Platform',
    eyebrow:      'AI interview preparation',
    description:  'An AI-powered preparation workspace delivering focused practice, guided feedback and role-specific interview support.',
    overview:     'AI interview coach with role-specific prompts, practice feedback, and guidance.',
    problem:      '',
    architecture: '',
    techStack:    ['React', 'Node.js', 'Gemini AI'],
    features: [
      'AI-generated feedback',
      'Practice interview sessions',
      'Role-based question prompts',
    ],
    featured:  false,
    accent:    'AI // 04',
    category:  'AI Integration',
    liveUrl:   '',
    githubUrl: '',
    order:     4,
  },
  {
    id:           'Task-Management',
    title:        'Task Management',
    eyebrow:      'Developer utility',
    description:  'A management tool for developers to create, track, and organize tasks efficiently.',
    overview:     'Task utility for creating, tracking, and organizing developer work.',
    problem:      '',
    architecture: '',
    techStack:    ['.NET Core', 'SQL Server', 'EF Core'],
    features: [
      'Task creation and assignment',
      'Status tracking',
      'Priority management',
      'Developer-focused workflow',
    ],
    featured:  false,
    accent:    'TASK // 05',
    category:  'Utility',
    liveUrl:   '',
    githubUrl: 'https://github.com/gourabofficial/TaskManagementSystem',
    order:     5,
  },
  {
    id:           'Project-Fakira',
    title:        'Project-Fakira',
    eyebrow:      'Developer utility',
    description:  "When a developer becomes a fan of Fakira's songs and falls in love with the band.",
    overview:     "A Website for Fakira's songs and band information.",
    problem:      '',
    architecture: '',
    techStack:    ['React Js', 'Node.js', 'Express Js', 'MongoDB'],
    features: [
      'Song library',
      'Band information',
      'Artist profiles',
      'Music streaming',
    ],
    featured:  false,
    accent:    'FAKIRA // 06',
    category:  'Full Stack Saas',
    liveUrl:   'https://project-fakira.vercel.app/',
    githubUrl: 'https://github.com/gourabofficial/Project_Fakira',
    order:     6,
  },
  {
    id:           'Url-Shortener',
    title:        'Url-Shortener',
    eyebrow:      'Developer utility',
    description:  'A simple and efficient URL shortening service.',
    overview:     'A web application that allows users to shorten long URLs for easier sharing and tracking.',
    problem:      '',
    architecture: '',
    techStack:    ['React Js', 'Node.js', 'Express Js', 'MongoDB'],
    features: [
      'URL shortening',
      'Link sharing',
      'Analytics and tracking',
    ],
    featured:  false,
    accent:    'URL // 07',
    category:  'Utility',
    liveUrl:   'https://url-shortener-nu-ashen.vercel.app/',
    githubUrl: 'https://github.com/gourabofficial/URL-Shortener',
    order:     7,
  },
  {
    id:           'E-Commerce-Platform-Marbel-Theme',
    title:        'E-Commerce Platform',
    eyebrow:      'Developer utility',
    description:  'An E-Commerce platform with Marble theme, where users can buy products and sellers can sell products.',
    overview:     'A web application that allows users to buy and sell products with a beautiful Marble theme.',
    problem:      '',
    architecture: '',
    techStack:    ['React Js', 'Node.js', 'Express Js', 'MongoDB'],
    features: [
      'Product listing and search',
      'Shopping cart and checkout',
      'User reviews and ratings',
    ],
    featured:  false,
    accent:    'ECOMMERCE // 08',
    category:  'Full Stack',
    liveUrl:   'https://zidio-project-ivory.vercel.app/',
    githubUrl: 'https://github.com/gourabofficial/Cosmic-Heroes---E-commerce-Platform',
    order:     8,
  },
  {
    id:           'Own-Extension',
    title:        'Own Extension',
    eyebrow:      'Developer utility',
    description:  'A Chrome extension that allows users to see the exact time and date of the current page they are visiting.',
    overview:     'A Chrome extension that displays the current time and date on the page.',
    problem:      '',
    architecture: '',
    techStack:    ['JavaScript', 'Chrome Extension API', 'HTML', 'CSS'],
    features: [
      'Current time and date display',
      'Customizable settings',
      'Lightweight and fast',
    ],
    featured:  false,
    accent:    'OWN EXTENSION // 09',
    category:  'Utility',
    liveUrl:   '',
    githubUrl: 'https://github.com/gourabofficial/Own-Extensions',
    order:     9,
  },
];

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  if (DRY_RUN) {
    console.log('🔍 DRY RUN — no data will be written.\n');
  }

  if (!DRY_RUN) {
    await connectDatabase();
  }

  let inserted = 0;
  let skipped  = 0;
  let updated  = 0;
  const errors = [];

  for (const p of PROJECTS) {
    const slug         = makeSlug(p.title);
    const thumbnailUrl = projectThumbUrl(p.id);

    const doc = {
      title:        p.title,
      slug,
      eyebrow:      p.eyebrow,
      description:  p.description,
      overview:     p.overview,
      problem:      p.problem      || '',
      architecture: p.architecture || '',
      techStack:    p.techStack,
      features:     p.features,
      liveUrl:      p.liveUrl      || '',
      githubUrl:    p.githubUrl    || '',
      thumbnailUrl,
      category:     p.category,
      featured:     p.featured,
      order:        p.order,
      accent:       p.accent,
    };

    if (DRY_RUN) {
      console.log(`  [DRY] Would upsert → slug: "${slug}", title: "${p.title}", thumb: "${thumbnailUrl}"`);
      continue;
    }

    try {
      const existing = await Project.findOne({ slug });

      if (existing && !FORCE) {
        console.log(`  ⏭️  SKIP  — "${p.title}" (slug "${slug}" already exists; use --force to overwrite)`);
        skipped++;
        continue;
      }

      if (existing && FORCE) {
        await Project.findOneAndUpdate({ slug }, { $set: doc }, { runValidators: true });
        console.log(`  ✏️  UPDATE — "${p.title}" (slug: "${slug}")`);
        updated++;
      } else {
        await Project.create(doc);
        console.log(`  ✅ INSERT — "${p.title}" (slug: "${slug}")`);
        inserted++;
      }
    } catch (err) {
      console.error(`  ❌ ERROR  — "${p.title}": ${err.message}`);
      errors.push({ title: p.title, error: err.message });
    }
  }

  console.log('\n── Summary ───────────────────────────────────────────');
  if (DRY_RUN) {
    console.log(`  Would process ${PROJECTS.length} project(s).`);
  } else {
    console.log(`  Inserted : ${inserted}`);
    console.log(`  Updated  : ${updated}`);
    console.log(`  Skipped  : ${skipped}`);
    console.log(`  Errors   : ${errors.length}`);
    if (errors.length) {
      errors.forEach(e => console.error(`    ✗ ${e.title}: ${e.error}`));
    }
  }

  if (!DRY_RUN) {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed.');
  }

  process.exit(errors.length ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
