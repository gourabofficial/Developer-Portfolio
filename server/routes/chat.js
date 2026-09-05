import express from 'express';
import { handleChat, getChatHistory, clearChatSession } from '../controllers/chatController.js';

const router = express.Router();

// POST /api/chat - Send message and get AI response
router.post('/', handleChat);

// GET /api/chat/:sessionId - Get chat history for a session
router.get('/:sessionId', getChatHistory);

// DELETE /api/chat/:sessionId - Clear chat session
router.delete('/:sessionId', clearChatSession);

export default router;
