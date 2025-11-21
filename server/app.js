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
  res.send("Hello from Express server!");
});

//api endpoints
app.use("/api/auth", authRouter);
app.use("/api/cv", cvRouter);

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
