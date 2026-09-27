/**
 * Middleware that verifies the admin JWT cookie.
 * Attach to any route that requires admin access.
 */
import jwt from 'jsonwebtoken';

const COOKIE_NAME = 'admin_token';

export function requireAdmin(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authenticated' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || process.env.ADMIN_PASSWORD;
    const payload = jwt.verify(token, jwtSecret);
    if (payload.role !== 'admin') throw new Error('Not admin');
    req.adminPayload = payload;
    next();
  } catch {
    return res.status(401).json({ success: false, error: 'Invalid or expired session' });
  }
}
