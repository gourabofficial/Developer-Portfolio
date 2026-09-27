/**
 * Convert a project id string into a safe Cloudinary public_id segment.
 * Strips leading/trailing whitespace, replaces spaces with hyphens,
 * and removes characters that Cloudinary doesn't allow.
 */
export function slugifyId(id) {
  return id
    .trim()
    .replace(/\s+/g, '-')       // spaces → hyphens
    .replace(/[^a-zA-Z0-9_\-]/g, ''); // remove anything else unsafe
}

/**
 * Returns the canonical Cloudinary public_id for a given asset slot.
 * slot: 'hero' | 'resume' | { type: 'project', id: string }
 */
export function getPublicId(slot) {
  if (slot === 'hero')   return 'portfolio/hero-profile';
  if (slot === 'resume') return 'portfolio/resume';
  if (slot.type === 'project') return `portfolio/projects/${slugifyId(slot.id)}`;
  throw new Error(`Unknown slot: ${JSON.stringify(slot)}`);
}

/** The allowed project ids — derived directly from the data file. */
export const PROJECT_IDS = [
  'TEA-ERP-System',
  'LMS-Platfrom',
  'Plan-My-Trip',
  'AI-Interview-Platform',
  'Task-Management',
  'Project-Fakira',
  'Url-Shortener',
  'E-Commerce-Platform Marbel Theme ',
  'Own Extension',
];
