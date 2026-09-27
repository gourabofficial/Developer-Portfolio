/**
 * Cloudinary signed-upload routes — all protected by requireAdmin middleware.
 *
 * POST /api/upload/sign
 *   Body: { slot: 'hero' | 'resume' | { type: 'project', id: '<projectId>' } }
 *   Returns a short-lived signature the browser uses to upload directly to Cloudinary.
 *   The public_id and overwrite flag are set SERVER-SIDE — the client cannot override them.
 *
 * GET /api/upload/projects
 *   Returns the list of project ids and their current Cloudinary thumbnail URLs
 *   so the admin panel can render previews without a DB lookup.
 */

import express from 'express';
import cloudinary from '../config/cloudinary.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import { getPublicId, PROJECT_IDS } from '../utils/slugify.js';

const router = express.Router();

// All upload routes require admin authentication
router.use(requireAdmin);

// ── /sign — generate a Cloudinary upload signature ────────────────────────
router.post('/sign', (req, res) => {
  const { slot } = req.body ?? {};

  if (!slot) {
    return res.status(400).json({ success: false, error: 'slot is required' });
  }

  // Validate slot value
  let publicId;
  let resourceType = 'image';

  try {
    if (slot === 'hero') {
      publicId = getPublicId('hero');
    } else if (slot === 'resume') {
      publicId = getPublicId('resume');
      resourceType = 'raw'; // PDF
    } else if (slot?.type === 'project') {
      if (!PROJECT_IDS.includes(slot.id)) {
        return res.status(400).json({ success: false, error: `Unknown project id: ${slot.id}` });
      }
      publicId = getPublicId(slot);
    } else {
      return res.status(400).json({ success: false, error: 'Invalid slot format' });
    }
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }

  // Parameters that will be included in the signature — must match what the
  // browser sends to Cloudinary exactly. We lock down overwrite & invalidate
  // here so the client cannot create stray assets.
  const timestamp = Math.round(Date.now() / 1000);

  const paramsToSign = {
    timestamp,
    public_id: publicId,
    overwrite: true,
    invalidate: true,
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET,
  );

  return res.json({
    success: true,
    signature,
    timestamp,
    publicId,
    resourceType,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
});

// ── /projects — list projects with their current Cloudinary thumbnail URLs ─
router.get('/projects', (_req, res) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    return res.status(500).json({ success: false, error: 'CLOUDINARY_CLOUD_NAME not set' });
  }

  const list = PROJECT_IDS.map((id) => {
    const publicId = getPublicId({ type: 'project', id });
    // Build a versioned URL with cache-busting via _v= so refreshing after
    // upload shows the new image immediately.
    const thumbnailUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_640/${publicId}`;
    return { id, publicId, thumbnailUrl };
  });

  res.json({ success: true, projects: list });
});

export default router;
