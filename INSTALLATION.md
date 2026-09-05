# 📦 Installation Guide

## Step-by-Step Setup

### Step 1: Get Your API Keys

#### MongoDB (FREE)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password

**Example:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio-chatbot?retryWrites=true&w=majority
```

#### Google Gemini API (FREE)
1. Go to https://aistudio.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key" or "Get API Key"
4. Copy the key (starts with `AIzaSy...`)

**No credit card required!** ✨

### Step 2: Install Dependencies

#### Backend
```bash
cd server
npm install
```

This installs:
- express (web framework)
- mongoose (MongoDB ODM)
- @google/generative-ai (Gemini SDK)
- cors (CORS middleware)
- express-rate-limit (rate limiting)
- dotenv (environment variables)

#### Frontend
```bash
cd client
npm install
```

This installs all React dependencies and dev tools.

### Step 3: Configure Environment Variables

#### Backend `.env`
Create `server/.env`:
```bash
cd server
cp .env.example .env
```

Edit with your values:
```env
PORT=5000
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/portfolio-chatbot
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
FRONTEND_ORIGIN=http://localhost:5173
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW_MS=60000
```

#### Frontend `.env`
Create `client/.env`:
```bash
cd client
cp .env.example .env
```

Content:
```env
VITE_API_URL=http://localhost:5000
```

### Step 4: Start the Servers

#### Terminal 1 - Backend
```bash
cd server
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0-xxxxx.mongodb.net
📊 Database: portfolio-chatbot
🚀 Server running on port 5000
🌍 Environment: development
🔒 CORS enabled for: http://localhost:5173
⏱️  Rate limit: 10 requests per minute
```

#### Terminal 2 - Frontend
```bash
cd client
npm run dev
```

You should see:
```
  VITE v7.3.1  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 5: Test the Setup

1. **Open browser:** http://localhost:5173
2. **Wait for page to load**
3. **Look for floating chat button** (bottom-right corner)
4. **Click the button** 💬
5. **Chat window opens** with welcome message
6. **Try asking:** "What are your main skills?"
7. **Bot responds** in 2-4 seconds!

## ✅ Verification Checklist

Run through this checklist to ensure everything works:

### Backend Health
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ",
  "environment": "development"
}
```

### Chatbot API
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","sessionId":"test-123"}'
```

Expected response:
```json
{
  "success": true,
  "reply": "Hi! I'm Gourab's AI assistant...",
  "sessionId": "test-123",
  "messageCount": 2
}
```

### Frontend Loading
- [ ] Page loads at http://localhost:5173
- [ ] No console errors
- [ ] Navbar visible
- [ ] Sections render properly
- [ ] Chat button visible

### Chat Functionality
- [ ] Click chat button → window opens
- [ ] Welcome message appears
- [ ] Quick action buttons work
- [ ] Type message → send works
- [ ] AI responds in 2-4 seconds
- [ ] Conversation history persists
- [ ] Clear button works

## 🐛 Troubleshooting

### Problem: "Cannot connect to MongoDB"

**Solution:**
1. Check MongoDB connection string in `.env`
2. Ensure your IP is whitelisted in MongoDB Atlas
3. Verify database user password is correct
4. Try pinging MongoDB:
   ```bash
   mongosh "your-connection-string"
   ```

### Problem: "Invalid API key" (Gemini)

**Solution:**
1. Verify API key in `.env` starts with `AIzaSy`
2. Check key status at https://aistudio.google.com/app/apikey
3. Ensure no extra spaces in `.env` file
4. Try creating a new API key

### Problem: "CORS error" in browser console

**Solution:**
1. Check `FRONTEND_ORIGIN` in `server/.env`
2. Should be: `http://localhost:5173` (no trailing slash)
3. Restart backend server after changing `.env`

### Problem: Backend won't start

**Solution:**
1. Check if port 5000 is already in use:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   
   # Kill process if needed
   taskkill /PID <process_id> /F
   ```
2. Or change port in `server/.env`:
   ```env
   PORT=5001
   ```
   Also update `client/.env`:
   ```env
   VITE_API_URL=http://localhost:5001
   ```

### Problem: "Rate limit exceeded"

**Solution:**
- You sent too many messages too quickly
- Wait 1 minute before trying again
- Or adjust `RATE_LIMIT_MAX` in `server/.env`:
  ```env
  RATE_LIMIT_MAX=20
  ```

### Problem: Chatbot gives empty responses

**Solution:**
1. Check server logs for errors
2. Verify Gemini API quota at https://aistudio.google.com/
3. Test API key manually:
   ```bash
   curl https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=YOUR_API_KEY \
     -H 'Content-Type: application/json' \
     -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
   ```

### Problem: Frontend build fails

**Solution:**
1. Delete `node_modules` and reinstall:
   ```bash
   cd client
   rm -rf node_modules package-lock.json
   npm install
   ```
2. Check Node.js version (should be 18+):
   ```bash
   node --version
   ```

## 🎯 Quick Commands Reference

### Start Development
```bash
# Backend (Terminal 1)
cd server && npm run dev

# Frontend (Terminal 2)
cd client && npm run dev
```

### Stop Servers
- Press `Ctrl+C` in each terminal

### Check Logs
```bash
# Backend logs (in server terminal)
# Watch for errors and API requests

# Frontend logs (in browser)
# Open DevTools → Console tab
```

### Reset Everything
```bash
# Clear chat history (in browser)
localStorage.clear()

# Restart servers
# Press Ctrl+C in both terminals
# Run npm run dev again
```

## 🔄 Update Dependencies

Run periodically to keep packages up to date:

```bash
# Backend
cd server
npm update

# Frontend
cd client
npm update
```

## 📝 Environment Variables Checklist

Make sure you have:

**server/.env**
- [x] PORT
- [x] MONGO_URI (with password filled in)
- [x] GEMINI_API_KEY (starts with AIzaSy)
- [x] FRONTEND_ORIGIN
- [x] RATE_LIMIT_MAX
- [x] RATE_LIMIT_WINDOW_MS

**client/.env**
- [x] VITE_API_URL

## 🎉 Success!

If you've completed all steps and the chatbot works, you're ready to:

1. ✅ Customize the system prompt
2. ✅ Add your real portfolio data
3. ✅ Test with various questions
4. ✅ Deploy to production

## 📞 Still Stuck?

Check the detailed guides:
- [Full Setup Guide](./CHATBOT_SETUP.md)
- [Gemini API Guide](./server/GEMINI_SETUP.md)
- [Testing Guide](./server/TEST_CHATBOT.md)

Or review server/frontend logs for specific error messages.

---

**Happy coding!** 🚀
