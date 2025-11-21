import express from 'express';
import { login, verifyToken } from '../controllers/auth.controllers.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const authRouter = express.Router();

// Login route
authRouter.post('/login', login);

// Verify token route (protected)
authRouter.get('/verify', authMiddleware, verifyToken);

export default authRouter;
