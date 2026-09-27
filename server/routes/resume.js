/**
 * Resume config routes.
 *
 * Public:
 *   GET  /api/resume  — returns the current resume Google Drive URL
 *
 * Admin:
 *   PUT  /api/resume  — update the resume URL (validation included)
 */
import express from 'express';
import SiteConfig from '../models/SiteConfig.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = express.Router();
const RESUME_KEY = 'resume_url';

// ── GET /api/resume ────────────────────────────────────────────────────────
router.get('/', async (_req, res) => {
  try {
    const cfg = await SiteConfig.findOne({ key: RESUME_KEY }).lean();
    res.json({ success: true, url: cfg?.value ?? '' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── PUT /api/resume (admin) ────────────────────────────────────────────────
router.put('/', requireAdmin, async (req, res) => {
  const { url } = req.body ?? {};

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ success: false, error: 'url is required' });
  }

  // Basic Google Drive URL validation
  const isDriveUrl =
    /^https:\/\/(drive|docs)\.google\.com\//i.test(url) ||
    /^https:\/\/www\.googleapis\.com\//i.test(url);

  if (!isDriveUrl) {
    return res.status(400).json({
      success: false,
      error: 'URL must be a Google Drive link (drive.google.com or docs.google.com)',
    });
  }

  try {
    const cfg = await SiteConfig.findOneAndUpdate(
      { key: RESUME_KEY },
      { key: RESUME_KEY, value: url.trim() },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    res.json({ success: true, url: cfg.value });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
