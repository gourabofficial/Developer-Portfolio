/**
 * One-time seed script — migrates the hardcoded project array into MongoDB.
 * Run once: node scripts/seedProjects.js
 * It is idempotent: projects are upserted by slug, so re-running is safe.
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import { connectDatabase } from '../config/database.js';

// ── helpers ────────────────────────────────────────────────────────────────
function slugify(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
function projectThumb(rawId) {
  const safeId = rawId.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9_\-]/g, '');
  if (!CLOUD) return '';
  return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_640,c_fill,ar_16:9/portfolio/projects/${safeId}`;
}

// ── data ────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    slug: 'tea-erp-system',
    title: 'Tea ERP System',
    eyebrow: 'Enterprise ERP application',
    description: 'A large-scale business platform unifying payroll, production, sales, stores, attendance, accounts and inventory in one secure system.',
    overview: 'Enterprise workflow platform for operations, finance, and inventory management.',
    problem: "The tea industry's existing tools were fragmented — payroll, production, and inventory lived in separate systems with no shared data layer, causing reconciliation issues and manual overhead.",
    architecture: 'ASP.NET Core Web API backend with a layered service architecture. Dapper handles data access against SQL Server with dynamic SQL and sargable queries for report performance. A hybrid caching strategy (in-memory + Redis) sits in front of frequently read data. React frontend consumes the API via typed fetch calls.',
    techStack: ['.NET Core', 'React', 'SQL Server', 'Dapper', 'Redis'],
    features: ['Role-based access control', 'Operational dashboards', 'Payroll & attendance modules', 'Production tracking', 'Advanced report generation', 'Hybrid caching layer (in-memory + Redis)', 'Server-side pagination on data-heavy reports', 'Inventory & stores management'],
    liveUrl: 'https://www.teaerp.com',
    githubUrl: '',
    thumbnailUrl: projectThumb('TEA-ERP-System'),
    category: 'Enterprise',
    featured: true,
    order: 1,
    accent: 'ERP // 01',
  },
  {
    slug: 'lms-platform',
    title: 'Learning Management System',
    eyebrow: 'Learning management system',
    description: 'A full-featured course platform designed around secure learning, video delivery and measurable student progress.',
    overview: 'Course platform with secure learning journeys, video delivery, and progress tracking.',
    problem: 'Educators needed a self-hosted alternative to expensive third-party LMS tools — one that gave them direct control over content, student data, and access policies.',
    architecture: 'MERN stack with JWT-based session management. Cloudinary handles media upload and streaming to avoid storing large files on the server. Progress state is persisted in MongoDB per-user per-course, enabling resumable video playback.',
    techStack: ['React Js', 'Node Js', 'Express Js', 'MongoDB'],
    features: ['JWT authentication', 'Video lecture delivery', 'Course progress tracking', 'Cloudinary media integration', 'Instructor course management', 'Student enrollment flow'],
    liveUrl: 'https://advanced-lms.vercel.app/',
    githubUrl: 'https://github.com/gourabofficial/LMS-Udemy-Type',
    thumbnailUrl: projectThumb('LMS-Platfrom'),
    category: 'Full Stack',
    featured: true,
    order: 2,
    accent: 'LMS // 02',
  },
  {
    slug: 'planmytrip',
    title: 'PlanMyTrip',
    eyebrow: 'Travel planning platform',
    description: 'A responsive travel planning experience that turns complex itineraries into a simple, visual workflow.',
    overview: 'Trip planning workspace for organizing destinations, routes, and schedules.',
    problem: 'Planning a multi-destination trip across multiple tools (spreadsheets, maps, note apps) is friction-heavy. Travelers needed a single workspace to build, visualise, and save itineraries.',
    architecture: 'React SPA consuming third-party travel and mapping APIs. Itinerary state is managed client-side with the option to persist saved trips. The UI is fully responsive-first with a mobile workflow that mirrors the desktop experience.',
    techStack: ['React js', 'Third-party APIs', 'Node.js'],
    features: ['Visual trip builder', 'Destination search', 'Saved itineraries', 'Responsive mobile UI', 'Third-party API integration'],
    liveUrl: 'https://plan-my-trip-saas-product.vercel.app/',
    githubUrl: 'https://github.com/gourabofficial/PlanMyTrip-Saas-Product',
    thumbnailUrl: projectThumb('Plan-My-Trip'),
    category: 'SAAS',
    featured: true,
    order: 3,
    accent: 'TRIP // 03',
  },
  {
    slug: 'ai-interview-platform',
    title: 'AI Interview Platform',
    eyebrow: 'AI interview preparation',
    description: 'An AI-powered preparation workspace delivering focused practice, guided feedback and role-specific interview support.',
    overview: 'AI interview coach with role-specific prompts, practice feedback, and guidance.',
    problem: '',
    architecture: '',
    techStack: ['React', 'Node.js', 'Gemini AI'],
    features: ['AI-generated feedback', 'Practice interview sessions', 'Role-based question prompts'],
    liveUrl: '',
    githubUrl: '',
    thumbnailUrl: projectThumb('AI-Interview-Platform'),
    category: 'AI Integration',
    featured: false,
    order: 4,
    accent: 'AI // 04',
  },
  {
    slug: 'task-management',
    title: 'Task Management',
    eyebrow: 'Developer utility',
    description: 'A management tool for developers to create, track, and organize tasks efficiently.',
    overview: 'Task utility for creating, tracking, and organizing developer work.',
    problem: '',
    architecture: '',
    techStack: ['.NET Core', 'SQL Server', 'EF Core'],
    features: ['Task creation and assignment', 'Status tracking', 'Priority management', 'Developer-focused workflow'],
    liveUrl: '',
    githubUrl: 'https://github.com/gourabofficial/TaskManagementSystem',
    thumbnailUrl: projectThumb('Task-Management'),
    category: 'Utility',
    featured: false,
    order: 5,
    accent: 'TASK // 05',
  },
  {
    slug: 'project-fakira',
    title: 'Project Fakira',
    eyebrow: 'Developer utility',
    description: "When a developer becomes a fan of Fakira's songs and falls in love with the band.",
    overview: "A Website for Fakira's songs and band information.",
    problem: '',
    architecture: '',
    techStack: ['React Js', 'Node.js', 'Express Js', 'MongoDB'],
    features: ['Song library', 'Band information', 'Artist profiles', 'Music streaming'],
    liveUrl: 'https://project-fakira.vercel.app/',
    githubUrl: 'https://github.com/gourabofficial/Project_Fakira',
    thumbnailUrl: projectThumb('Project-Fakira'),
    category: 'Full Stack Saas',
    featured: false,
    order: 6,
    accent: 'FAKIRA // 06',
  },
  {
    slug: 'url-shortener',
    title: 'URL Shortener',
    eyebrow: 'Developer utility',
    description: 'A simple and efficient URL shortening service.',
    overview: 'A web application that allows users to shorten long URLs for easier sharing and tracking.',
    problem: '',
    architecture: '',
    techStack: ['React Js', 'Node.js', 'Express Js', 'MongoDB'],
    features: ['URL shortening', 'Link sharing', 'Analytics and tracking'],
    liveUrl: 'https://url-shortener-nu-ashen.vercel.app/',
    githubUrl: 'https://github.com/gourabofficial/URL-Shortener',
    thumbnailUrl: projectThumb('Url-Shortener'),
    category: 'Utility',
    featured: false,
    order: 7,
    accent: 'URL // 07',
  },
  {
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    eyebrow: 'Developer utility',
    description: 'A E-Commerce platform with Marbel theme, where users can buy products and sellers can sell products.',
    overview: 'A web application that allows users to buy and sell products with a beautiful Marbel theme.',
    problem: '',
    architecture: '',
    techStack: ['React Js', 'Node.js', 'Express Js', 'MongoDB'],
    features: ['Product listing and search', 'Shopping cart and checkout', 'User reviews and ratings'],
    liveUrl: 'https://zidio-project-ivory.vercel.app/',
    githubUrl: 'https://github.com/gourabofficial/Cosmic-Heroes---E-commerce-Platform',
    thumbnailUrl: projectThumb('E-Commerce-Platform-Marbel-Theme'),
    category: 'Full Stack',
    featured: false,
    order: 8,
    accent: 'ECOMMERCE // 08',
  },
  {
    slug: 'own-extension',
    title: 'Own Extension',
    eyebrow: 'Developer utility',
    description: 'A Chrome extension that allows users to see the exact time and date of the current page they are visiting.',
    overview: 'A Chrome extension that displays the current time and date on the page.',
    problem: '',
    architecture: '',
    techStack: ['JavaScript', 'Chrome Extension API'],
    features: ['Current time and date display', 'Customizable settings', 'Lightweight and fast'],
    liveUrl: '',
    githubUrl: 'https://github.com/gourabofficial/Own-Extensions',
    thumbnailUrl: projectThumb('Own-Extension'),
    category: 'Utility',
    featured: false,
    order: 9,
    accent: 'EXTENSION // 09',
  },
];

// ── run ─────────────────────────────────────────────────────────────────────
async function main() {
  await connectDatabase();

  let inserted = 0;
  let updated  = 0;

  for (const data of PROJECTS) {
    const result = await Project.findOneAndUpdate(
      { slug: data.slug },
      { $set: data },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    if (result.createdAt?.getTime() === result.updatedAt?.getTime()) {
      inserted++;
    } else {
      updated++;
    }
    console.log(`  ✓ ${data.title} (${data.slug})`);
  }

  console.log(`\nDone — ${inserted} inserted, ${updated} updated.`);
  await mongoose.disconnect();
}

main().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
