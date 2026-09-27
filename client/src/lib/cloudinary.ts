/**
 * Cloudinary URL builder utilities.
 *
 * All asset slots use FIXED public_ids so the front-end never needs to
 * store or look up URLs — it always constructs them deterministically.
 *
 * The VITE_CLOUDINARY_CLOUD_NAME env var must be set in client/.env
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;

if (!CLOUD_NAME && import.meta.env.DEV) {
  console.warn(
    '[cloudinary] VITE_CLOUDINARY_CLOUD_NAME is not set. ' +
    'Add it to client/.env — images will not load.',
  );
}

// ── Fixed public_ids ──────────────────────────────────────────────────────

export const PUBLIC_IDS = {
  hero:   'portfolio/hero-profile',
  resume: 'portfolio/resume',
  /** Derive a safe public_id segment from a project id string */
  project: (id: string) =>
    `portfolio/projects/${id.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9_\-]/g, '')}`,
} as const;

// ── URL builders ──────────────────────────────────────────────────────────

type ImageOptions = {
  width?: number;
  height?: number;
  /** Extra transformations, e.g. 'c_fill' */
  transforms?: string;
  /** Cache-busting version string, e.g. after an upload */
  version?: string | number;
};

/**
 * Build an optimised Cloudinary image URL.
 * Always applies f_auto,q_auto. Width/height are optional.
 */
export function cloudinaryImage(publicId: string, opts: ImageOptions = {}): string {
  if (!CLOUD_NAME) return '';

  const parts: string[] = ['f_auto', 'q_auto'];
  if (opts.width)      parts.push(`w_${opts.width}`);
  if (opts.height)     parts.push(`h_${opts.height}`);
  if (opts.transforms) parts.push(opts.transforms);

  const transform = parts.join(',');
  const version   = opts.version ? `/v${opts.version}` : '';

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transform}${version}/${publicId}`;
}

/**
 * Build a Cloudinary raw file URL (used for the PDF resume).
 */
export function cloudinaryRaw(publicId: string, opts: { version?: string | number } = {}): string {
  if (!CLOUD_NAME) return '';
  const version = opts.version ? `/v${opts.version}` : '';
  return `https://res.cloudinary.com/${CLOUD_NAME}/raw/upload${version}/${publicId}`;
}

/**
 * Add a cache-busting ?_t= query param to an existing URL.
 * Used after an admin upload to force the browser to re-fetch the image.
 */
export function bustCache(url: string): string {
  return `${url}?_t=${Date.now()}`;
}
