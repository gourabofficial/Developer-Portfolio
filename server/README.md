# Portfolio Chatbot Backend

Node.js + Express backend server for the portfolio chatbot with AI integration using Anthropic Claude.

## Features

- ✅ AI-powered chatbot using Google Gemini 2.0 Flash
- ✅ MongoDB for conversation persistence
- ✅ Session-based chat history
- ✅ Rate limiting (10 requests/minute per IP)
- ✅ CORS protection
- ✅ Error handling with fallback responses
- ✅ Auto-deletion of old chat sessions (30 days)
- ✅ Strict system prompt (only answers about Gourab's portfolio)

## Project Structure

```
/server
├── config/
│   ├── database.js           # MongoDB connection setup
│   └── systemPrompt.js       # AI system prompt configuration
├── controllers/
│   └── chatController.js     # Chat logic and AI integration
├── models/
│   └── ChatSession.js        # MongoDB schema for chat sessions
├── routes/
│   └── chat.js              # API route definitions
├── middleware/
│   └── rateLimiter.js       # Rate limiting middleware
├── server.js                # Main application entry point
├── .env                     # Environment variables (not in git)
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio-chatbot?retryWrites=true&w=majority
GEMINI_API_KEY=AIzaSy...your-gemini-api-key
FRONTEND_ORIGIN=https://gganguly.in
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW_MS=60000
```

### 3. Get Your API Keys

**MongoDB:**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Get connection string and replace `MONGO_URI`

**Google Gemini API:**
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the API key and replace `GEMINI_API_KEY` in `.env`
5. Free tier includes generous quota (no credit card required)

### 4. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST /api/chat
Send a message and get AI response

**Request:**
```json
{
  "message": "What technologies do you work with?",
  "sessionId": "unique-session-id-123"
}
```

**Response:**
```json
{
  "success": true,
  "reply": "I work with a variety of modern technologies including...",
  "sessionId": "unique-session-id-123",
  "messageCount": 2
}
```

### GET /api/chat/:sessionId
Get chat history for a session

**Response:**
```json
{
  "success": true,
  "messages": [
    {
      "role": "user",
      "text": "Hello",
      "timestamp": "2024-01-01T12:00:00.000Z"
    },
    {
      "role": "assistant",
      "text": "Hi! How can I help you today?",
      "timestamp": "2024-01-01T12:00:01.000Z"
    }
  ],
  "createdAt": "2024-01-01T12:00:00.000Z"
}
```

### DELETE /api/chat/:sessionId
Clear a chat session

**Response:**
```json
{
  "success": true,
  "message": "Chat session cleared successfully"
}
```

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "environment": "development"
}
```

## Rate Limiting

- **Chat endpoint:** 10 requests per minute per IP
- **General API:** 100 requests per minute per IP

When rate limit is exceeded, returns:
```json
{
  "success": false,
  "error": "Too many requests. Please slow down and try again in a minute.",
  "retryAfter": 60
}
```

## Error Handling

The server includes comprehensive error handling:

1. **AI API Failures:** Returns fallback message to user
2. **Validation Errors:** Returns 400 with helpful message
3. **Rate Limiting:** Returns 429 with retry information
4. **Server Errors:** Returns 500 with generic message (details in logs)

All errors are logged to console for debugging.

## Security Features

- ✅ API keys stored in environment variables (never exposed to client)
- ✅ CORS protection (only allowed origins can access)
- ✅ Rate limiting to prevent abuse
- ✅ Input validation and sanitization
- ✅ Message length limits (2000 characters)
- ✅ Automatic session cleanup (30 days)

## Frontend Integration

From your React frontend:

```typescript
const response = await fetch('https://your-backend-url.com/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: userMessage,
    sessionId: sessionId // Generate or retrieve from localStorage
  })
});

const data = await response.json();
console.log(data.reply); // AI response
```

## Deployment

### Deploy to Heroku

```bash
heroku create your-app-name
heroku config:set MONGO_URI="your-mongodb-uri"
heroku config:set GEMINI_API_KEY="your-gemini-key"
heroku config:set FRONTEND_ORIGIN="https://gganguly.in"
git push heroku main
```

### Deploy to Railway/Render

1. Connect your GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically on push

## Customizing the AI

Edit `config/systemPrompt.js` to customize the chatbot's personality and knowledge:

```javascript
export const SYSTEM_PROMPT = `You are an AI assistant representing Gourab Ganguly's portfolio...`;
```

Update with:
- Your specific skills and projects
- Your professional experience
- Tone and personality preferences

## Monitoring

Check server health:
```bash
curl http://localhost:5000/api/health
```

View logs in development:
```bash
npm run dev
```

## Troubleshooting

**MongoDB connection fails:**
- Check if your IP is whitelisted in MongoDB Atlas
- Verify connection string format
- Ensure database user has correct permissions

**Gemini API errors:**
- Verify API key is correct (starts with "AIzaSy")
- Check Google AI Studio for API key status
- Review rate limits (free tier is generous but has limits)
- Ensure API key has proper permissions

**CORS errors:**
- Ensure `FRONTEND_ORIGIN` matches your frontend URL exactly
- Check that frontend is using correct backend URL

## License

MIT
