import mongoose from 'mongoose';

// ─────────────────────────────────────────────────────────────────────────────
// Serverless-safe connection caching
//
// On Vercel (and any serverless platform), each function invocation may reuse
// a warm container or spin up a new one. Without caching, every cold start pays
// a full MongoDB connection cost (~200-500ms) and can exhaust Atlas connection
// limits under load.
//
// Pattern: store the connection promise on the module-level `cached` object.
// - Warm container  → `cached.conn` already set → return immediately (0ms)
// - Cold start      → `cached.promise` not set  → connect once, cache it
// ─────────────────────────────────────────────────────────────────────────────

let cached = { conn: null, promise: null };

export const connectDatabase = async () => {
  // Already connected — reuse existing connection
  if (cached.conn) {
    console.log('♻️  MongoDB: reusing cached connection');
    return cached.conn;
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  // Connection in progress — wait for it rather than opening a second one
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        // Prevent Mongoose from buffering commands when disconnected.
        // On serverless we want an immediate error, not a silent hang.
        bufferCommands: false,
      })
      .then(conn => {
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
        return conn;
      })
      .catch(err => {
        // Clear the cached promise so the next request retries the connection
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    throw error; // Let caller handle (server.js will process.exit in non-serverless)
  }

  // Handle connection events (register once)
  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
    // Reset cache so next request re-connects
    cached.conn = null;
    cached.promise = null;
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected — resetting connection cache');
    cached.conn = null;
    cached.promise = null;
  });

  // Graceful shutdown for long-running (non-serverless) environments
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  });

  return cached.conn;
};
