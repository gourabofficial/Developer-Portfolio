import 'dotenv/config'; // Must be first — loads .env before any other module body executes
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database.js';
import chatRoutes from './routes/chat.js';
import { chatRateLimiter, generalRateLimiter } from './middleware/rateLimiter.js';

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'GEMINI_API_KEY', 'FRONTEND_ORIGIN'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  console.error('Please check your .env file');
  process.exit(1);
}

// Validate Gemini API key — must exist and be a non-empty string
// No prefix check: key format may vary depending on how it was generated in AI Studio
const geminiKey = process.env.GEMINI_API_KEY;
if (!geminiKey || typeof geminiKey !== 'string' || geminiKey.trim().length === 0) {
  console.error('❌ GEMINI_API_KEY is missing or empty.');
  console.error('   Get a free key at: https://aistudio.google.com/app/apikey');
  console.error('   Set it in your .env file as: GEMINI_API_KEY=your_key_here');
  process.exit(1);
}
console.log('✅ GEMINI_API_KEY loaded successfully');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDatabase();

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_ORIGIN,
      'http://localhost:5173', // Vite dev server
      'http://localhost:3000', // Alternative dev port
      'http://127.0.0.1:5173'
    ];

    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply general rate limiter to all routes
app.use(generalRateLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Chat routes with specific rate limiting
app.use('/api/chat', chatRateLimiter, chatRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', {
    message: err.message,
    stack: err.stack,
    path: req.path
  });

  // CORS error
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      error: 'CORS policy: Origin not allowed'
    });
  }

  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔒 CORS enabled for: ${process.env.FRONTEND_ORIGIN}`);
  console.log(`⏱️  Rate limit: ${process.env.RATE_LIMIT_MAX || 10} requests per minute`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});
