# 🏗️ System Architecture

## Complete System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER DEVICE                              │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                     Web Browser                          │  │
│  │                                                          │  │
│  │  http://localhost:5173 (Development)                    │  │
│  │  https://gganguly.in (Production)                       │  │
│  │                                                          │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │        React Frontend Application                  │ │  │
│  │  │                                                    │ │  │
│  │  │  Components:                                      │ │  │
│  │  │  • Navbar                                         │ │  │
│  │  │  • Hero Section                                   │ │  │
│  │  │  • About Section (Interactive Terminal)          │ │  │
│  │  │  • Projects Section                               │ │  │
│  │  │  • Skills Section                                 │ │  │
│  │  │  • Experience Timeline                            │ │  │
│  │  │  • Contact Section                                │ │  │
│  │  │  • Footer                                         │ │  │
│  │  │  • 🤖 AIChatbot (Floating Widget) ← NEW!        │ │  │
│  │  │                                                    │ │  │
│  │  │  State Management:                                │ │  │
│  │  │  • localStorage (chat history)                    │ │  │
│  │  │  • React hooks (UI state)                         │ │  │
│  │  │  • Session ID generation                          │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  │                          │                              │  │
│  │                          │ HTTP POST /api/chat          │  │
│  │                          │ { message, sessionId }       │  │
│  │                          ▼                              │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                             │
                             │ HTTPS Request
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BACKEND SERVER                              │
│                                                                 │
│  Node.js + Express.js                                          │
│  http://localhost:5000 (Development)                           │
│  https://your-backend.com (Production)                         │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                   Express Middleware                      │ │
│  │                                                           │ │
│  │  1. CORS Protection                                       │ │
│  │     ├─ Check origin                                       │ │
│  │     └─ Allow: http://localhost:5173 or gganguly.in      │ │
│  │                                                           │ │
│  │  2. Body Parser                                           │ │
│  │     └─ Parse JSON request body                            │ │
│  │                                                           │ │
│  │  3. Rate Limiter                                          │ │
│  │     ├─ 10 requests per minute per IP                     │ │
│  │     └─ Block if exceeded                                  │ │
│  │                                                           │ │
│  │  4. Route Handler: /api/chat                             │ │
│  │     ├─ Validate input (message, sessionId)               │ │
│  │     ├─ Sanitize (max 2000 chars)                         │ │
│  │     └─ Pass to controller                                 │ │
│  └───────────────────────────────────────────────────────────┘ │
│                          │                                      │
│                          ▼                                      │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │              Chat Controller Logic                        │ │
│  │                                                           │ │
│  │  async handleChat(req, res) {                            │ │
│  │    1. Get message & sessionId from request               │ │
│  │    2. Query MongoDB for existing session                 │ │
│  │    3. Add user message to history                        │ │
│  │    4. Build conversation history                         │ │
│  │    5. Call Gemini AI API                                 │ │
│  │    6. Get AI response                                    │ │
│  │    7. Add AI response to history                         │ │
│  │    8. Save to MongoDB                                    │ │
│  │    9. Return response to frontend                        │ │
│  │  }                                                        │ │
│  └───────────────────────────────────────────────────────────┘ │
│              │                              │                   │
│              │                              │                   │
│              ▼                              ▼                   │
│  ┌─────────────────────┐      ┌──────────────────────────────┐ │
│  │   MongoDB Atlas     │      │    Google Gemini AI API      │ │
│  │                     │      │                              │ │
│  │  Database:          │      │  Model: gemini-2.0-flash-exp│ │
│  │  portfolio-chatbot  │      │                              │ │
│  │                     │      │  System Instruction:         │ │
│  │  Collection:        │      │  SYSTEM_PROMPT from config   │ │
│  │  ChatSession        │      │                              │ │
│  │                     │      │  Generation Config:          │ │
│  │  Schema:            │      │  • maxOutputTokens: 500      │ │
│  │  {                  │      │  • temperature: 0.7          │ │
│  │   sessionId: String │      │  • topP: 0.8                 │ │
│  │   messages: [       │      │  • topK: 40                  │ │
│  │     {               │      │                              │ │
│  │      role: String   │      │  Input:                      │ │
│  │      text: String   │      │  Full conversation history   │ │
│  │      timestamp: Date│      │  + new user message          │ │
│  │     }               │      │                              │ │
│  │   ]                 │      │  Output:                     │ │
│  │   createdAt: Date   │      │  AI-generated response text  │ │
│  │  }                  │      │                              │ │
│  │                     │      │  Features:                   │ │
│  │  Operations:        │      │  • Context-aware             │ │
│  │  • findOne()        │      │  • Strict system prompt      │ │
│  │  • create()         │      │  • Fast responses (2-4s)     │ │
│  │  • push()           │      │  • Error handling            │ │
│  │  • save()           │      │  • Fallback on failure       │ │
│  │  • deleteOne()      │      └──────────────────────────────┘ │
│  │                     │                                       │
│  │  Auto-cleanup:      │                                       │
│  │  Sessions expire    │                                       │
│  │  after 30 days      │                                       │
│  └─────────────────────┘                                       │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Sequence

### 1. User Sends Message

```
User types: "What are your main skills?"
           ↓
Frontend: Generate/get sessionId from localStorage
           ↓
Frontend: POST /api/chat
          {
            message: "What are your main skills?",
            sessionId: "session-1234567890-abc123"
          }
           ↓
Server: Receive request
```

### 2. Backend Processing

```
Server: Check CORS (origin allowed?)
           ↓ YES
Server: Check Rate Limit (< 10 req/min?)
           ↓ YES
Server: Validate input (message & sessionId present?)
           ↓ YES
Server: Sanitize message (trim, max 2000 chars)
           ↓
MongoDB: findOne({ sessionId: "session-123..." })
           ↓
MongoDB: Returns session OR null (if first message)
           ↓
Controller: Add user message to session.messages[]
           ↓
Controller: Build conversation history for Gemini
           [
             { role: "user", parts: [{ text: "previous msg" }] },
             { role: "model", parts: [{ text: "AI response" }] },
             { role: "user", parts: [{ text: "What are..." }] }
           ]
```

### 3. AI Processing

```
Controller: Initialize Gemini chat with history
           ↓
Gemini API: Process conversation + system prompt
           ↓
Gemini API: Generate response (2-4 seconds)
           ↓
Gemini API: Return text response
           ↓
Controller: Validate response (not empty?)
           ↓ YES
Controller: Add AI response to session.messages[]
           ↓
MongoDB: session.save() (persist to database)
```

### 4. Response to Frontend

```
Server: Send JSON response
        {
          success: true,
          reply: "Gourab works with .NET Core and MERN stack...",
          sessionId: "session-123...",
          messageCount: 4
        }
           ↓
Frontend: Receive response
           ↓
Frontend: Display AI message in chat window
           ↓
Frontend: Save to localStorage
           ↓
User: Sees response
```

## Error Handling Flow

```
┌─ Rate Limit Exceeded (> 10 req/min) ─┐
│  Server: 429 Too Many Requests       │
│  Frontend: Show rate limit message   │
└──────────────────────────────────────┘

┌─ Invalid Input (no message) ─────────┐
│  Server: 400 Bad Request             │
│  Frontend: Show validation error     │
└──────────────────────────────────────┘

┌─ MongoDB Connection Fails ───────────┐
│  Server: Retry connection            │
│  Fallback: Return error response     │
│  Frontend: Show fallback message     │
└──────────────────────────────────────┘

┌─ Gemini API Fails ───────────────────┐
│  Controller: Catch error             │
│  Controller: Return fallback message │
│  Frontend: Display fallback to user  │
│  User: Can try again                 │
└──────────────────────────────────────┘

┌─ CORS Violation ─────────────────────┐
│  Server: 403 Forbidden               │
│  Frontend: Request blocked           │
│  Console: CORS error message         │
└──────────────────────────────────────┘
```

## Security Layers

```
┌─────────────────────────────────────────┐
│  Layer 1: CORS Protection               │
│  • Only allowed origins can connect     │
│  • Prevents unauthorized API access     │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  Layer 2: Rate Limiting                 │
│  • 10 requests per minute per IP        │
│  • Prevents abuse and spam              │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  Layer 3: Input Validation              │
│  • Check message & sessionId present    │
│  • Sanitize input (max 2000 chars)      │
│  • Prevent injection attacks            │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  Layer 4: API Key Protection            │
│  • Gemini key stored in .env            │
│  • Never exposed to frontend            │
│  • .env in .gitignore                   │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  Layer 5: System Prompt Boundaries      │
│  • Strict instructions to AI            │
│  • Only answer portfolio questions      │
│  • Redirect off-topic queries           │
└─────────────────────────────────────────┘
```

## Technology Stack Details

### Frontend
```
React 19.2.4
  ├── TypeScript
  ├── Vite 7.3.1 (build tool)
  ├── Tailwind CSS 4.2.1 (styling)
  ├── Framer Motion 12.40.0 (animations)
  ├── React Router 6.30.3 (routing)
  ├── Lucide React 1.7.0 (icons)
  └── Custom Components
       └── AIChatbot.tsx (AI chat widget)
```

### Backend
```
Node.js 18+
  └── Express 4.18.2
       ├── Mongoose 8.0.0 (MongoDB ODM)
       ├── @google/generative-ai 0.21.0 (Gemini SDK)
       ├── cors 2.8.5 (CORS middleware)
       ├── express-rate-limit 7.1.5 (rate limiting)
       ├── dotenv 16.3.1 (environment variables)
       └── Custom Middleware
            ├── rateLimiter.js
            └── CORS config
```

### Database
```
MongoDB Atlas (Cloud)
  └── Cluster: M0 (Free Tier)
       └── Database: portfolio-chatbot
            └── Collection: chatsessions
                 └── Schema: ChatSession
                      ├── sessionId: String (indexed, unique)
                      ├── messages: Array
                      │    ├── role: String (user/assistant)
                      │    ├── text: String
                      │    └── timestamp: Date
                      └── createdAt: Date (auto-expires after 30 days)
```

### AI Service
```
Google Gemini AI
  └── Model: gemini-2.0-flash-exp
       ├── Speed: 2-4 seconds response
       ├── Cost: FREE (1,500 req/day)
       ├── Context: Full conversation history
       ├── System Prompt: Strict portfolio boundaries
       └── Configuration
            ├── maxOutputTokens: 500
            ├── temperature: 0.7
            ├── topP: 0.8
            └── topK: 40
```

## Performance Metrics

### Response Times
```
User Action → Frontend Processing: < 50ms
Frontend → Backend (network): 50-200ms
Backend → MongoDB (query): 10-50ms
Backend → Gemini API (AI): 2000-4000ms
Backend → Frontend (response): 50-200ms
Frontend → Display (render): < 50ms
─────────────────────────────────────────
Total: ~2.5-4.5 seconds
```

### Resource Usage
```
Frontend Bundle Size: ~200-300 KB (gzipped)
Backend Memory: ~50-100 MB
MongoDB Storage: ~1 KB per session
API Requests: ~10-50 per active user/day
```

## Scalability Considerations

### Current Limits
```
Rate Limit: 10 req/min per IP
Gemini Free Tier: 1,500 req/day
MongoDB Free Tier: 512 MB storage
Session Cleanup: 30 days auto-delete
```

### Can Handle
```
Daily Active Users: ~100-150
Messages per Day: ~1,000-1,500
Concurrent Users: ~10-20
Storage (30 days): ~30,000 messages
```

### To Scale Up
```
Increase Rate Limit → Adjust RATE_LIMIT_MAX
More API Requests → Upgrade Gemini to paid ($0.10/1M tokens)
More Storage → Upgrade MongoDB ($9/month)
More Traffic → Deploy multiple backend instances
```

## Deployment Architecture

### Development
```
localhost:5173 (Frontend)
     ↓
localhost:5000 (Backend)
     ↓
MongoDB Atlas (Cloud)
Google Gemini (Cloud)
```

### Production
```
Vercel/Netlify (Frontend)
https://gganguly.in
     ↓
Railway/Render (Backend)
https://api.gganguly.in
     ↓
MongoDB Atlas (Cloud)
Google Gemini (Cloud)
```

## Monitoring & Logs

### Frontend
```
Browser Console:
  • Component render logs
  • Network requests
  • Error messages
  • State changes

localStorage:
  • Chat history
  • Session ID
  • User preferences
```

### Backend
```
Server Console:
  • MongoDB connection status
  • API requests (method, path, IP)
  • Gemini API calls (success/error)
  • Rate limit violations
  • Error stack traces

MongoDB Logs:
  • Query performance
  • Connection issues
  • Storage usage
```

### External Services
```
MongoDB Atlas Dashboard:
  • Database metrics
  • Storage usage
  • Query performance

Google AI Studio:
  • API usage stats
  • Token consumption
  • Error rates
  • Quota remaining
```

---

This architecture provides a robust, scalable, and secure foundation for your AI-powered portfolio chatbot! 🚀
