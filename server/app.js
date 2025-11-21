import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cvRouter from "./routes/cv.route.js";
import { connectCloudinary } from "./config/cloudnary.js";

dotenv.config();
const app = express();

await connectDB();
connectCloudinary();

// cors configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://gourabganguly.vercel.app",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(null, true); // Allow all origins for now
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ 
    message: "Developer Portfolio API is running!",
    status: "success",
    endpoints: {
      auth: "/api/auth/login",
      cv: "/api/cv/active"
    }
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

//api endpoints
app.use("/api/auth", authRouter);
app.use("/api/cv", cvRouter);

// 404 handler - must be after all routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: ["/api/auth/login", "/api/cv/active", "/api/cv/all"]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
