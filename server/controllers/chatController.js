import { GoogleGenAI } from '@google/genai';
import ChatSession from '../models/ChatSession.js';
import { SYSTEM_PROMPT } from '../config/systemPrompt.js';


// =====================================================
// GEMINI CONFIGURATION
// =====================================================

// IMPORTANT:
// Do not use a model name unless it is available
// for your Gemini API key and installed SDK.
//
// You can also move this into your .env file:
//
// GEMINI_MODEL=your-available-model-name
//
const GEMINI_MODEL =
  process.env.GEMINI_MODEL || 'gemini-2.5-flash';


// =====================================================
// CREATE GEMINI CLIENT
// =====================================================

const getGeminiAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  // Validate API key
  if (
    !apiKey ||
    typeof apiKey !== 'string' ||
    apiKey.trim().length === 0
  ) {
    throw new Error(
      'GEMINI_API_KEY is missing or empty'
    );
  }

  return new GoogleGenAI({
    apiKey: apiKey.trim()
  });
};


// =====================================================
// FALLBACK RESPONSE
// =====================================================

const FALLBACK_RESPONSE = {
  message:
    "Sorry, I'm having trouble responding right now. Please try again or contact Gourab directly.",
  error: true
};


// =====================================================
// POST /api/chat
// =====================================================

export const handleChat = async (req, res) => {
  try {

    const { message, sessionId } = req.body;


    // =================================================
    // VALIDATE MESSAGE
    // =================================================

    if (
      !message ||
      typeof message !== 'string' ||
      message.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        error:
          'Message is required and must be a non-empty string'
      });
    }


    // =================================================
    // VALIDATE SESSION ID
    // =================================================

    if (
      !sessionId ||
      typeof sessionId !== 'string' ||
      sessionId.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        error: 'Session ID is required'
      });
    }


    // =================================================
    // SANITIZE INPUT
    // =================================================

    const sanitizedMessage = message
      .trim()
      .slice(0, 2000);

    const sanitizedSessionId = sessionId.trim();


    // =================================================
    // FIND OR CREATE CHAT SESSION
    // =================================================

    let session = await ChatSession.findOne({
      sessionId: sanitizedSessionId
    });


    if (!session) {

      session = new ChatSession({
        sessionId: sanitizedSessionId,
        messages: []
      });

    }


    // =================================================
    // BUILD GEMINI HISTORY
    // =================================================

    // Filter invalid messages before sending history
    const history = session.messages
      .filter((msg) => {

        return (
          msg &&
          msg.text &&
          typeof msg.text === 'string' &&
          msg.text.trim().length > 0 &&
          (
            msg.role === 'user' ||
            msg.role === 'assistant'
          )
        );

      })
      .map((msg) => ({

        // Gemini uses "model", not "assistant"
        role:
          msg.role === 'assistant'
            ? 'model'
            : 'user',

        parts: [
          {
            text: msg.text.trim()
          }
        ]

      }));


    let aiResponse;
    let fallback = false;


    // =================================================
    // CALL GEMINI API
    // =================================================

    try {

      const ai = getGeminiAI();


      // Create Gemini chat
      const chat = ai.chats.create({

        model: GEMINI_MODEL,

        config: {

          systemInstruction: SYSTEM_PROMPT,

          maxOutputTokens: 500,

          temperature: 0.7,

          topP: 0.8,

          topK: 40

        },

        history

      });


      // Send current user message
      const result = await chat.sendMessage({

        message: sanitizedMessage

      });


      // Get Gemini response
      aiResponse = result?.text;


      // Validate response
      if (
        !aiResponse ||
        typeof aiResponse !== 'string' ||
        aiResponse.trim().length === 0
      ) {

        throw new Error(
          'Gemini returned an empty response'
        );

      }


      aiResponse = aiResponse.trim();


    } catch (aiError) {


      // =================================================
      // GEMINI ERROR
      // =================================================

      console.error(
        '❌ Gemini API Error:',
        {

          model: GEMINI_MODEL,

          message:
            aiError?.message ||
            'Unknown Gemini API error',

          status:
            aiError?.status ||
            'Unknown',

          code:
            aiError?.code ||
            'Unknown',

          name:
            aiError?.name ||
            'Unknown',

          sessionId: sanitizedSessionId

        }
      );


      // ISSUE FIX:
      // Do not return immediately.
      //
      // Instead, use fallback response and save
      // both the user message and fallback response.

      aiResponse = FALLBACK_RESPONSE.message;

      fallback = true;

    }


    // =================================================
    // SAVE USER MESSAGE
    // =================================================

    session.messages.push({

      role: 'user',

      text: sanitizedMessage,

      timestamp: new Date()

    });


    // =================================================
    // SAVE AI RESPONSE
    // =================================================

    session.messages.push({

      role: 'assistant',

      text: aiResponse,

      timestamp: new Date()

    });


    // =================================================
    // SAVE TO MONGODB
    // =================================================

    await session.save();


    // =================================================
    // RETURN RESPONSE
    // =================================================

    return res.status(200).json({

      success: true,

      reply: aiResponse,

      sessionId: sanitizedSessionId,

      fallback,

      messageCount: session.messages.length

    });


  } catch (error) {


    // =================================================
    // SERVER ERROR
    // =================================================

    console.error(
      '❌ Chat Controller Error:',
      {

        message:
          error?.message ||
          'Unknown error',

        stack:
          error?.stack,

        sessionId:
          req.body?.sessionId

      }
    );


    return res.status(500).json({

      success: false,

      error:
        'Internal server error',

      reply:
        FALLBACK_RESPONSE.message

    });

  }
};


// =====================================================
// GET /api/chat/:sessionId
// =====================================================

export const getChatHistory = async (req, res) => {

  try {

    const { sessionId } = req.params;


    // =================================================
    // VALIDATE SESSION ID
    // =================================================

    if (
      !sessionId ||
      typeof sessionId !== 'string' ||
      sessionId.trim().length === 0
    ) {

      return res.status(400).json({

        success: false,

        error:
          'Session ID is required'

      });

    }


    const sanitizedSessionId =
      sessionId.trim();


    // =================================================
    // FIND SESSION
    // =================================================

    const session =
      await ChatSession.findOne({

        sessionId:
          sanitizedSessionId

      });


    // =================================================
    // SESSION NOT FOUND
    // =================================================

    if (!session) {

      return res.status(404).json({

        success: false,

        error:
          'Session not found'

      });

    }


    // =================================================
    // RETURN CHAT HISTORY
    // =================================================

    return res.status(200).json({

      success: true,

      sessionId:
        sanitizedSessionId,

      messages:
        session.messages,

      createdAt:
        session.createdAt,

      updatedAt:
        session.updatedAt

    });


  } catch (error) {


    console.error(
      '❌ Get Chat History Error:',
      {

        message:
          error?.message,

        stack:
          error?.stack

      }
    );


    return res.status(500).json({

      success: false,

      error:
        'Internal server error'

    });

  }

};


// =====================================================
// DELETE /api/chat/:sessionId
// =====================================================

export const clearChatSession = async (req, res) => {

  try {

    const { sessionId } = req.params;


    // =================================================
    // VALIDATE SESSION ID
    // =================================================

    if (
      !sessionId ||
      typeof sessionId !== 'string' ||
      sessionId.trim().length === 0
    ) {

      return res.status(400).json({

        success: false,

        error:
          'Session ID is required'

      });

    }


    const sanitizedSessionId =
      sessionId.trim();


    // =================================================
    // DELETE SESSION
    // =================================================

    const result =
      await ChatSession.deleteOne({

        sessionId:
          sanitizedSessionId

      });


    // =================================================
    // RETURN RESPONSE
    // =================================================

    return res.status(200).json({

      success: true,

      message:
        'Chat session cleared successfully',

      deletedCount:
        result.deletedCount

    });


  } catch (error) {


    console.error(
      '❌ Clear Chat Session Error:',
      {

        message:
          error?.message,

        stack:
          error?.stack

      }
    );


    return res.status(500).json({

      success: false,

      error:
        'Internal server error'

    });

  }

};