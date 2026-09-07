import { GoogleGenAI } from '@google/genai';
import mongoose from 'mongoose';
import ChatSession from '../models/ChatSession.js';
import { SYSTEM_PROMPT } from '../config/systemPrompt.js';

// ─────────────────────────────────────────────────────────────────────────────
// Gemini client — initialized ONCE at module load, reused for every request.
// Never re-create this per-request; it adds ~200-400ms overhead each time.
// ─────────────────────────────────────────────────────────────────────────────
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

console.log(`🤖 Gemini client initialized — model: ${MODEL_NAME}`);

// ─────────────────────────────────────────────────────────────────────────────
// Helper: check DB is actually connected before trying to save
// ─────────────────────────────────────────────────────────────────────────────
function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/chat
// ─────────────────────────────────────────────────────────────────────────────
export const handleChat = async (req, res) => {
  const requestStart = Date.now();
  const { message, sessionId } = req.body;

  // ── Step 1: validate input ──────────────────────────────────────────────
  console.log(`\n📩 [handleChat] Request received`);
  console.log(`   sessionId : ${sessionId || '(none)'}`);
  console.log(`   message   : ${message ? message.substring(0, 80) : '(empty)'}...`);
  console.log(`   DB state  : ${mongoose.connection.readyState} (1=connected)`);

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ success: false, error: 'Message is required' });
  }

  if (!sessionId || typeof sessionId !== 'string' || !sessionId.trim()) {
    return res.status(400).json({ success: false, error: 'sessionId is required' });
  }

  const cleanMessage = message.trim().substring(0, 2000);

  try {
    // ── Step 2: load or create session from DB ────────────────────────────
    let session = null;

    if (isDbConnected()) {
      const dbStart = Date.now();
      console.log(`   [DB] Loading session...`);
      try {
        session = await ChatSession.findOne({ sessionId });
        console.log(`   [DB] Session load: ${Date.now() - dbStart}ms — ${session ? `found (${session.messages.length} msgs)` : 'not found, will create'}`);
      } catch (dbErr) {
        // Non-fatal: log and continue without history
        console.error(`   [DB] Session load FAILED:`, dbErr.message);
      }
    } else {
      console.warn(`   [DB] Skipping session load — DB not connected (state: ${mongoose.connection.readyState})`);
    }

    // ── Step 3: build conversation history for Gemini ─────────────────────
    // Gemini expects alternating user/model turns.
    // We keep the last 10 exchanges (20 messages) to stay within token limits.
    const history = [];
    if (session && session.messages.length > 0) {
      const recent = session.messages.slice(-20);
      for (const msg of recent) {
        history.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        });
      }
    }

    // ── Step 4: call Gemini ────────────────────────────────────────────────
    const geminiStart = Date.now();
    console.log(`   [Gemini] Sending request with ${history.length} history messages...`);

    const chat = genAI.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
      history,
    });

    const result = await chat.sendMessage({ message: cleanMessage });
    const reply = result.text?.trim();

    console.log(`   [Gemini] Response received: ${Date.now() - geminiStart}ms — ${reply ? reply.substring(0, 60) : '(empty)'}...`);

    if (!reply) {
      throw new Error('Gemini returned an empty response');
    }

    // ── Step 5: save to DB (fire-and-forget, non-blocking) ─────────────────
    // We respond to the client immediately after getting the AI reply.
    // DB save happens asynchronously — a failure here does NOT affect the user.
    if (isDbConnected()) {
      const dbSaveStart = Date.now();
      console.log(`   [DB] Attempting save for session: ${sessionId}`);

      ChatSession.findOneAndUpdate(
        { sessionId },
        {
          $push: {
            messages: {
              $each: [
                { role: 'user',      text: cleanMessage, timestamp: new Date() },
                { role: 'assistant', text: reply,        timestamp: new Date() },
              ],
            },
          },
          $setOnInsert: { sessionId, createdAt: new Date() },
        },
        { upsert: true, new: true }
      )
        .then(saved => {
          console.log(`   [DB] Save SUCCESS: ${Date.now() - dbSaveStart}ms — session has ${saved.messages.length} total messages`);
        })
        .catch(dbErr => {
          console.error(`   [DB] Save FAILED after ${Date.now() - dbSaveStart}ms:`);
          console.error(`        Code    : ${dbErr.code || 'N/A'}`);
          console.error(`        Message : ${dbErr.message}`);
          console.error(`        Full err:`, dbErr);
        });
    } else {
      console.warn(`   [DB] Skipping save — DB not connected (state: ${mongoose.connection.readyState})`);
    }

    // ── Step 6: respond to client ──────────────────────────────────────────
    const totalMs = Date.now() - requestStart;
    console.log(`   ✅ Total request time: ${totalMs}ms\n`);

    return res.status(200).json({
      success: true,
      reply,
      sessionId,
    });

  } catch (err) {
    const totalMs = Date.now() - requestStart;
    console.error(`   ❌ handleChat ERROR after ${totalMs}ms:`);
    console.error(`      Message: ${err.message}`);
    console.error(`      Stack:`, err.stack);

    return res.status(500).json({
      success: false,
      error: 'Failed to get AI response. Please try again.',
    });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/chat/:sessionId — retrieve history
// ─────────────────────────────────────────────────────────────────────────────
export const getChatHistory = async (req, res) => {
  const { sessionId } = req.params;

  if (!sessionId) {
    return res.status(400).json({ success: false, error: 'sessionId is required' });
  }

  if (!isDbConnected()) {
    return res.status(503).json({ success: false, error: 'Database not available' });
  }

  try {
    const session = await ChatSession.findOne({ sessionId }).lean();

    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }

    return res.status(200).json({
      success: true,
      sessionId,
      messages: session.messages,
      messageCount: session.messages.length,
    });
  } catch (err) {
    console.error('[getChatHistory] Error:', err.message);
    return res.status(500).json({ success: false, error: 'Failed to retrieve chat history' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/chat/:sessionId — clear a session
// ─────────────────────────────────────────────────────────────────────────────
export const clearChatSession = async (req, res) => {
  const { sessionId } = req.params;

  if (!sessionId) {
    return res.status(400).json({ success: false, error: 'sessionId is required' });
  }

  if (!isDbConnected()) {
    return res.status(503).json({ success: false, error: 'Database not available' });
  }

  try {
    const result = await ChatSession.deleteOne({ sessionId });

    return res.status(200).json({
      success: true,
      message: result.deletedCount > 0 ? 'Session cleared' : 'Session not found (nothing to delete)',
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error('[clearChatSession] Error:', err.message);
    return res.status(500).json({ success: false, error: 'Failed to clear session' });
  }
};
