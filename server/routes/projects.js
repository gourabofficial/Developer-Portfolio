/**
 * Public + admin project routes.
 *
 * Public (no auth):
 *   GET  /api/projects          — list all projects (sorted by order)
 *   GET  /api/projects/:slug    — single project by slug
 *
 * Admin (requireAdmin):
 *   POST   /api/projects        — create
 *   PUT    /api/projects/:slug  — update
 *   DELETE /api/projects/:slug  — delete (also removes Cloudinary thumbnail)
 */
import express from 'express';
import slugifyLib from 'slugify';
import Project from '../models/Project.js';
import cloudinary from '../config/cloudinary.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// ── helpers ────────────────────────────────────────────────────────────────
function makeSlug(title) {
  return slugifyLib(title, { lower: true, strict: true });
}

// ── GET /api/projects ──────────────────────────────────────────────────────
router.get('/', async (_req, res) => {
  try {
    const projects = await Project.find({})
      .sort({ order: 1, createdAt: 1 })
      .lean();
    res.json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── GET /api/projects/:slug ────────────────────────────────────────────────
router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug }).lean();
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── POST /api/projects — create ────────────────────────────────────────────
router.post('/', requireAdmin, async (req, res) => {
  try {
    const {
      title, description, techStack = [], features = [],
      liveUrl, githubUrl, thumbnailUrl, category,
      featured, order, eyebrow, overview, problem,
      architecture, accent,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, error: 'title and description are required' });
    }

    const slug = makeSlug(title);

    const project = await Project.create({
      title, slug, description, techStack, features,
      liveUrl: liveUrl || '', githubUrl: githubUrl || '',
      thumbnailUrl: thumbnailUrl || '', category: category || 'Utility',
      featured: !!featured, order: order ?? 0,
      eyebrow: eyebrow || '', overview: overview || '',
      problem: problem || '', architecture: architecture || '',
      accent: accent || '',
    });

    res.status(201).json({ success: true, project });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, error: 'A project with this slug already exists. Use a different title.' });
    }
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── PUT /api/projects/:slug — update ───────────────────────────────────────
router.put('/:slug', requireAdmin, async (req, res) => {
  try {
    const {
      title, description, techStack, features,
      liveUrl, githubUrl, thumbnailUrl, category,
      featured, order, eyebrow, overview, problem,
      architecture, accent,
    } = req.body;

    const update = {};
    if (title !== undefined)        update.title        = title;
    if (description !== undefined)  update.description  = description;
    if (techStack !== undefined)    update.techStack    = techStack;
    if (features !== undefined)     update.features     = features;
    if (liveUrl !== undefined)      update.liveUrl      = liveUrl;
    if (githubUrl !== undefined)    update.githubUrl    = githubUrl;
    if (thumbnailUrl !== undefined) update.thumbnailUrl = thumbnailUrl;
    if (category !== undefined)     update.category     = category;
    if (featured !== undefined)     update.featured     = !!featured;
    if (order !== undefined)        update.order        = order;
    if (eyebrow !== undefined)      update.eyebrow      = eyebrow;
    if (overview !== undefined)     update.overview     = overview;
    if (problem !== undefined)      update.problem      = problem;
    if (architecture !== undefined) update.architecture = architecture;
    if (accent !== undefined)       update.accent       = accent;

    // If title changed, regenerate slug
    if (title) update.slug = makeSlug(title);

    const project = await Project.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: update },
      { new: true, runValidators: true },
    );

    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── DELETE /api/projects/:slug ─────────────────────────────────────────────
router.delete('/:slug', requireAdmin, async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });

    // Best-effort Cloudinary cleanup — don't fail the delete if it errors
    if (project.thumbnailUrl) {
      try {
        // Derive the public_id from the stored URL
        // URL form: .../image/upload/<transforms>/portfolio/projects/<slug>
        const match = project.thumbnailUrl.match(/\/upload\/(?:[^/]+\/)?(.+)$/);
        if (match) {
          const publicId = match[1].split('?')[0]; // strip cache-bust query
          await cloudinary.uploader.destroy(publicId, { invalidate: true });
        }
      } catch (cdnErr) {
        console.warn('Cloudinary delete warning:', cdnErr.message);
      }
    }

    await project.deleteOne();
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
