# 🤖 AI Chatbot Integration Guide

## Overview

This portfolio now includes an AI-powered chatbot that uses Google Gemini 2.0 Flash to answer questions **strictly about Gourab Ganguly's skills, experience, and projects**. The bot will politely redirect any off-topic questions.

## ✅ Setup Complete

### Backend (Node.js + Express)
- ✅ Server configured at `http://localhost:5000`
- ✅ MongoDB connected
- ✅ Google Gemini 2.0 Flash AI integrated
- ✅ Strict system prompt (only portfolio topics)
- ✅ Rate limiting enabled (10 req/min)
- ✅ CORS configured for frontend
- ✅ Error handling with fallbacks

### Frontend (React + TypeScript)
- ✅ AIChatbot component created
- ✅ Floating chat widget with animations
- ✅ Session-based conversation history
- ✅ Quick action buttons
- ✅ Mobile responsive design
- ✅ Integrated into all pages via RootLayout

## 🚀 Quick Start

### 1. Start the Backend

```bash
cd server
npm install
npm run dev
```

Server will start on `http://localhost:5000`

### 2. Start the Frontend

```bash
cd client
npm run dev
```

Frontend will start on `http://localhost:5173`

### 3. Test the Chatbot

1. Open your browser to `http://localhost:5173`
2. Click the floating chat button (bottom-right corner)
3. Try asking:
   - "What are your main skills?"
   - "Tell me about your projects"
   - "What's your experience?"
   - "How can I contact you?"

## 📁 New Files Created

### Backend Files
```
/server
├── config/
│   ├── database.js          # MongoDB connection
│   └── systemPrompt.js      # AI personality & knowledge
├── controllers/
│   └── chatController.js    # Main chat logic
├── models/
│   └── ChatSession.js       # MongoDB schema
├── routes/
│   └── chat.js             # API endpoints
├── middleware/
│   └── rateLimiter.js      # Rate limiting
├── server.js               # Express app
├── package.json            # Dependencies
├── .env                    # Your configuration
├── .env.example           # Template
└── .gitignore             # Protects secrets
```

### Frontend Files
```
/client
├── src/
│   ├── components/
│   │   ├── AIChatbot.tsx      # Main chatbot component
│   │   └── AIChatbot.css      # Chatbot styles
│   └── layouts/
│       └── RootLayout.tsx     # Updated with chatbot
├── .env                       # API URL config
└── .env.example              # Template
```

## 🎨 Features

### Chat Window
- **Floating button** - Always accessible from any page
- **Animated transitions** - Smooth open/close effects
- **Session persistence** - Conversations saved to localStorage
- **Quick actions** - Pre-defined questions for easy start
- **Typing indicator** - Shows when AI is thinking
- **Error handling** - Graceful fallback messages

### AI Integration
- **Google Gemini 2.0 Flash** - Fast, cost-effective AI model
- **Strict boundaries** - Only answers about Gourab's portfolio
- **Context-aware** - Knows portfolio details
- **Conversational** - Natural, friendly responses
- **Rate-limited** - Prevents abuse
- **Secure** - API keys never exposed to client

### User Experience
- **Mobile responsive** - Works on all screen sizes
- **Dark mode support** - Follows system theme
- **Accessible** - Keyboard navigation friendly
- **Fast** - Optimized performance
- **Reliable** - Fallback responses if AI fails

## 🎯 API Endpoints

### POST /api/chat
Send a message and get AI response

**Request:**
```json
{
  "message": "What technologies do you work with?",
  "sessionId": "unique-session-id"
}
```

**Response:**
```json
{
  "success": true,
  "reply": "I work with React, Node.js, TypeScript...",
  "sessionId": "unique-session-id",
  "messageCount": 4
}
```

### GET /api/chat/:sessionId
Get chat history

### DELETE /api/chat/:sessionId
Clear chat session

### GET /api/health
Health check

## 🔧 Configuration

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://your-connection-string
GEMINI_API_KEY=AIzaSy...your-api-key
FRONTEND_ORIGIN=http://localhost:5173
RATE_LIMIT_MAX=10
```

**Get Gemini API Key:**
1. Visit https://aistudio.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy and paste into `.env`
5. Free tier available (no credit card needed)

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 🎨 Customization

### Update AI Personality
Edit `server/config/systemPrompt.js` to customize:
- Knowledge about your skills
- Project information
- Tone and personality
- Response style

### Modify Chat UI
Edit `client/src/components/AIChatbot.css` to change:
- Colors and gradients
- Animations
- Layout and sizing
- Mobile breakpoints

### Add Quick Actions
Edit `client/src/components/AIChatbot.tsx`:
```typescript
const quickActions = [
  "Your custom question 1",
  "Your custom question 2",
  "Your custom question 3"
];
```

## 🔒 Security

- ✅ API keys stored server-side only
- ✅ CORS protection
- ✅ Rate limiting (10 requests/minute)
- ✅ Input validation
- ✅ Message length limits (500 chars)
- ✅ Session cleanup (30 days)

## 📱 Mobile Responsive

The chatbot automatically adapts to different screen sizes:
- **Desktop:** Fixed position, bottom-right
- **Tablet:** Responsive width
- **Mobile:** Full-screen overlay

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string in `.env`
- Verify Anthropic API key is valid
- Ensure port 5000 is not in use

### Frontend can't connect
- Verify backend is running on port 5000
- Check `VITE_API_URL` in client `.env`
- Look for CORS errors in browser console

### AI not responding
- Check Anthropic API key and rate limits
- Review server logs for errors
- Verify MongoDB connection is active

### Rate limit errors
- Wait 1 minute between rapid requests
- Adjust `RATE_LIMIT_MAX` in server `.env` if needed

## 🚀 Deployment

### Backend (Railway/Render/Heroku)
1. Connect GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically

### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Set `VITE_API_URL` to your backend URL
3. Deploy automatically

### Production Environment Variables

**Backend:**
```env
MONGO_URI=mongodb+srv://production-connection
GEMINI_API_KEY=AIzaSy...production-key
FRONTEND_ORIGIN=https://gganguly.in
```

**Frontend:**
```env
VITE_API_URL=https://your-backend-url.com
```

## 📊 Monitoring

### Check Server Health
```bash
curl http://localhost:5000/api/health
```

### View Backend Logs
```bash
cd server
npm run dev
# Watch console for requests and errors
```

### Test API Directly
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","sessionId":"test-123"}'
```

## 💡 Tips

1. **Customize the system prompt** - Make it unique to your personality
2. **Add more quick actions** - Help users start conversations
3. **Monitor usage** - Keep eye on API costs
4. **Update regularly** - Keep dependencies up to date
5. **Backup conversations** - Consider exporting important chats

## 📚 Resources

- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Get Gemini API Key (FREE)](https://aistudio.google.com/app/apikey)
- [MongoDB Atlas Guide](https://www.mongodb.com/docs/atlas/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)

## 🎉 What's Next?

1. **Test thoroughly** - Try different questions
2. **Customize prompt** - Make it represent you better
3. **Share with friends** - Get feedback
4. **Monitor performance** - Check response times
5. **Deploy to production** - Make it live!

---

**Need Help?** Check the console logs or review the code comments for guidance.
