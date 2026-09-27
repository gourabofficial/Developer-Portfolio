/**
 * Admin auth routes
 *
 * POST /api/admin/login  — verifies ADMIN_PASSWORD, sets HttpOnly signed JWT cookie
 * POST /api/admin/logout — clears the cookie
 * GET  /api/admin/me     — returns { ok: true } if cookie is valid (used by client to
 *                          check session on page refresh)
 */
import express from 'express';
import jwt from 'jsonwebtoken';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

const COOKIE_NAME = 'admin_token';
const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 4 * 60 * 60 * 1000, // 4 hours
};

// ── Login ──────────────────────────────────────────────────────────────────
router.post('/login', (req, res) => {
  const { password } = req.body ?? {};

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ success: false, error: 'Password required' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD env var is not set');
    return res.status(500).json({ success: false, error: 'Server misconfiguration' });
  }

  if (password !== adminPassword) {
    return res.status(401).json({ success: false, error: 'Invalid password' });
  }

  const jwtSecret = process.env.JWT_SECRET || process.env.ADMIN_PASSWORD;
  const token = jwt.sign({ role: 'admin' }, jwtSecret, { expiresIn: '4h' });

  res.cookie(COOKIE_NAME, token, COOKIE_OPTS);
  return res.json({ success: true });
});

// ── Session check ──────────────────────────────────────────────────────────
router.get('/me', requireAdmin, (_req, res) => {
  res.json({ success: true, role: 'admin' });
});

// ── Logout ─────────────────────────────────────────────────────────────────
router.post('/logout', (_req, res) => {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
  res.json({ success: true });
});

export default router;
