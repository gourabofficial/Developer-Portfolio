import express from 'express';
import { uploadCV, deleteCV, getAllCVs, getActiveCV, setActiveCV } from '../controllers/cv.controllers.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { upload } from '../config/multer.js';

const cvRouter = express.Router();

// Public route
cvRouter.get('/active', getActiveCV);

// Protected routes (require authentication)
cvRouter.get('/all', authMiddleware, getAllCVs);
cvRouter.post('/upload', authMiddleware, uploadCV);
cvRouter.delete('/delete/:id', authMiddleware, deleteCV);
cvRouter.patch('/set-active/:id', authMiddleware, setActiveCV);

export default cvRouter;
