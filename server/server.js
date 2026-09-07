import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database.js';
import chatRoutes from './routes/chat.js';
import { chatRateLimiter, generalRateLimiter } from './middleware/rateLimiter.js';

// ── Validate env vars ──────────────────────────────────────────────────────
const requiredEnvVars = ['MONGO_URI', 'GEMINI_API_KEY', 'FRONTEND_ORIGIN'];
const missingEnvVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  // Don't process.exit on serverless — let the request fail with a clear error
  // instead of crashing the entire function container prematurely.
  if (process.env.NODE_ENV !== 'production') process.exit(1);
}

const geminiKey = process.env.GEMINI_API_KEY;
if (!geminiKey || geminiKey.trim().length === 0) {
  console.error('❌ GEMINI_API_KEY is missing or empty.');
  if (process.env.NODE_ENV !== 'production') process.exit(1);
}
console.log('✅ GEMINI_API_KEY loaded successfully');

// ── Express app setup ──────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;

// CORS
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// General rate limiter
app.use(generalRateLimiter);

// ── Ensure DB is connected on every request (serverless-safe) ─────────────
// On Vercel, app.listen() never runs, so connectDatabase() is never called
// at startup. This middleware calls it on the first request (cold start) and
// no-ops on subsequent warm requests because connectDatabase() caches the
// connection internally.
app.use(async (_req, _res, next) => {
  try {
    await connectDatabase();
  } catch (err) {
    console.error('DB connection middleware error:', err.message);
    // Don't block the request — routes that need DB will handle the failure
  }
  next();
});

// ── Health check — hit this from UptimeRobot/cron-job.org every 5 min
//    to keep free-tier server warm and prevent cold-start delays.
//    Returns DB connection state so you can diagnose issues remotely.

// hello waorld route
app.get('/', (_req, res) => {
  res.status(200).json({ success: true, message: 'Hare, Krishna!' });
});

app.get('/api/health', (_req, res) => {
  const stateMap = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: stateMap[mongoose.connection.readyState] || 'unknown',
  });
});

// ── Routes ─────────────────────────────────────────────────────────────────
app.use('/api/chat', chatRateLimiter, chatRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found', path: req.originalUrl });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error('Global Error Handler:', { message: err.message, path: _req?.path });
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ success: false, error: 'CORS policy: Origin not allowed' });
  }
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// ── Start server ───────────────────────────────────────────────────────────
// On Vercel (serverless): the module is imported by the runtime; app.listen()
// is never called. The exported `app` is used directly by Vercel's handler.
//
// Locally / on a traditional server: connectDatabase() then app.listen().
// ─────────────────────────────────────────────────────────────────────────────

// Export app for Vercel serverless handler
export default app;

// Only start a persistent HTTP server when NOT running on Vercel
if (!process.env.VERCEL) {
  connectDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🔒 CORS origins: ${allowedOrigins.filter(Boolean).join(', ')}`);
        console.log(`⏱️  Rate limit: ${process.env.RATE_LIMIT_MAX || 10} req/min`);
      });
    })
    .catch(err => {
      console.error('❌ Failed to connect to database:', err.message);
      process.exit(1);
    });
}

// Unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  if (!process.env.VERCEL) process.exit(1);
});
