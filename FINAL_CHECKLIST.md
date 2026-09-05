# ✅ Final Setup Checklist

## Complete this checklist to get your AI chatbot running!

### Phase 1: Get API Keys ⏱️ 5 minutes

- [ ] **MongoDB Atlas Account**
  - Go to: https://www.mongodb.com/cloud/atlas/register
  - Create free account
  - Create M0 Free cluster
  - Create database user with password
  - Whitelist IP: 0.0.0.0/0 (allow all) or your specific IP
  - Get connection string (Connect → Drivers → Copy)
  - Replace `<password>` with your database password

- [ ] **Google Gemini API Key (FREE)**
  - Go to: https://aistudio.google.com/app/apikey
  - Sign in with Google account
  - Click "Create API Key" or "Get API Key"
  - Copy API key (starts with `AIzaSy...`)
  - Keep it safe!

### Phase 2: Backend Setup ⏱️ 3 minutes

- [ ] **Navigate to server folder**
  ```bash
  cd server
  ```

- [ ] **Install dependencies**
  ```bash
  npm install
  ```
  Should install:
  - express
  - mongoose
  - @google/generative-ai
  - cors
  - express-rate-limit
  - dotenv

- [ ] **Create .env file**
  ```bash
  cp .env.example .env
  ```
  Or manually create `server/.env`

- [ ] **Fill in .env file**
  Open `server/.env` and add:
  ```env
  PORT=5000
  MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio-chatbot
  GEMINI_API_KEY=AIzaSyYourActualKeyHere
  FRONTEND_ORIGIN=http://localhost:5173
  RATE_LIMIT_MAX=10
  RATE_LIMIT_WINDOW_MS=60000
  ```

- [ ] **Verify .env is in .gitignore**
  Check that `server/.gitignore` contains `.env`

### Phase 3: Frontend Setup ⏱️ 2 minutes

- [ ] **Navigate to client folder**
  ```bash
  cd client
  ```

- [ ] **Install dependencies** (if not already done)
  ```bash
  npm install
  ```

- [ ] **Create .env file**
  ```bash
  cp .env.example .env
  ```
  Or manually create `client/.env`

- [ ] **Fill in .env file**
  Open `client/.env` and add:
  ```env
  VITE_API_URL=http://localhost:5000
  ```

- [ ] **Verify .env is in .gitignore**
  Check that `client/.gitignore` contains `.env`

### Phase 4: Start Servers ⏱️ 1 minute

- [ ] **Start Backend (Terminal 1)**
  ```bash
  cd server
  npm run dev
  ```
  
  ✅ Look for these messages:
  ```
  ✅ MongoDB Connected: cluster0-xxxxx.mongodb.net
  📊 Database: portfolio-chatbot
  🚀 Server running on port 5000
  🌍 Environment: development
  🔒 CORS enabled for: http://localhost:5173
  ⏱️  Rate limit: 10 requests per minute
  ```

- [ ] **Start Frontend (Terminal 2)**
  ```bash
  cd client
  npm run dev
  ```
  
  ✅ Look for:
  ```
  ➜  Local:   http://localhost:5173/
  ```

### Phase 5: Test Chatbot ⏱️ 2 minutes

- [ ] **Open browser**
  Navigate to: http://localhost:5173

- [ ] **Verify page loads**
  - No errors in console
  - Navbar visible
  - Content renders

- [ ] **Find chat button**
  Look for floating button in bottom-right corner
  Should have 💬 icon with sparkle badge

- [ ] **Open chat window**
  Click the button
  Window should slide up with animation

- [ ] **Check welcome message**
  Should see: "Hi! I'm Gourab's AI assistant..."

- [ ] **Test quick action**
  Click "What are your main skills?"
  Should auto-send message

- [ ] **Wait for AI response**
  - Loading indicator appears (3 dots)
  - Response appears in 2-4 seconds
  - Message about skills appears

- [ ] **Test manual message**
  Type: "Tell me about your projects"
  Press Enter or click Send
  Wait for response

- [ ] **Verify conversation history**
  - Previous messages still visible
  - New messages appear at bottom
  - Auto-scrolls to latest message

- [ ] **Test off-topic question**
  Type: "How do I learn React?"
  Should get redirect message like:
  "I'm here to help you learn about Gourab's work..."

### Phase 6: Backend API Tests ⏱️ 2 minutes

- [ ] **Test health endpoint**
  ```bash
  curl http://localhost:5000/api/health
  ```
  
  ✅ Expected:
  ```json
  {
    "success": true,
    "message": "Server is running",
    "timestamp": "...",
    "environment": "development"
  }
  ```

- [ ] **Test chat endpoint**
  ```bash
  curl -X POST http://localhost:5000/api/chat \
    -H "Content-Type: application/json" \
    -d '{"message":"Hello","sessionId":"test-123"}'
  ```
  
  ✅ Expected:
  ```json
  {
    "success": true,
    "reply": "Hi! I'm Gourab's AI assistant...",
    "sessionId": "test-123",
    "messageCount": 2
  }
  ```

### Phase 7: Mobile Testing ⏱️ 1 minute

- [ ] **Resize browser window**
  Make it narrow (< 768px)

- [ ] **Check chat button visible**
  Should still be in bottom-right

- [ ] **Open chat window**
  Should take more screen space on mobile

- [ ] **Test typing**
  Input field should be accessible

- [ ] **Close chat**
  Click X or outside to close

### Phase 8: Error Handling Tests ⏱️ 2 minutes

- [ ] **Test rate limiting**
  Send 11 messages quickly (within 1 minute)
  Should get rate limit error after 10th

- [ ] **Test empty message**
  Try sending empty message
  Send button should be disabled

- [ ] **Test very long message**
  Type 600+ characters
  Should be limited to 500 chars

- [ ] **Test API failure** (optional)
  Stop backend server
  Send message in chat
  Should show fallback message

### Phase 9: Verify Security ⏱️ 1 minute

- [ ] **Check .env not in Git**
  ```bash
  git status
  ```
  `.env` should NOT appear in untracked files

- [ ] **Check API key not exposed**
  Open browser DevTools → Network tab
  Send chat message
  Check request payload - should NOT contain API key

- [ ] **Check CORS working**
  Open console - no CORS errors

- [ ] **Check rate limiting active**
  Try sending 20 messages quickly
  Should be blocked after 10

### Phase 10: Customization ⏱️ 5 minutes

- [ ] **Update system prompt**
  Edit: `server/config/systemPrompt.js`
  - Replace placeholder email with yours
  - Update LinkedIn/GitHub links
  - Add your real projects
  - Update experience details

- [ ] **Test updated prompt**
  Restart server
  Ask chatbot about your info
  Verify it responds with your actual details

- [ ] **Customize quick actions** (optional)
  Edit: `client/src/components/AIChatbot.tsx`
  Find `quickActions` array
  Add your preferred questions

- [ ] **Customize colors** (optional)
  Edit: `client/src/components/AIChatbot.css`
  Change gradient colors
  Adjust button styles

### Phase 11: Documentation Review ⏱️ 2 minutes

- [ ] **Read QUICK_START.md**
  For 5-minute overview

- [ ] **Read GEMINI_SETUP.md**
  For Gemini API details

- [ ] **Read TEST_CHATBOT.md**
  For testing examples

- [ ] **Read CHATBOT_SETUP.md**
  For complete documentation

- [ ] **Read AI_CHATBOT_SHOWCASE.md**
  For feature overview

### Phase 12: Deploy Preparation ⏱️ 5 minutes

- [ ] **Test production build**
  ```bash
  cd client
  npm run build
  ```
  Should create `dist/` folder

- [ ] **Check for TypeScript errors**
  ```bash
  npm run typecheck
  ```
  Fix any errors

- [ ] **Check for lint errors**
  ```bash
  npm run lint
  ```
  Fix any warnings

- [ ] **Prepare for deployment**
  - Choose hosting (Vercel, Netlify, Railway, Render)
  - Plan environment variables
  - Update FRONTEND_ORIGIN in server .env

### Final Verification ✨

- [ ] **Backend running**: http://localhost:5000/api/health returns success
- [ ] **Frontend running**: http://localhost:5173 loads correctly
- [ ] **Chatbot visible**: Floating button in bottom-right
- [ ] **Chat works**: Can send messages and get AI responses
- [ ] **History persists**: Messages remain after page refresh
- [ ] **Mobile works**: Responsive on small screens
- [ ] **Rate limit works**: Blocks after 10 requests/minute
- [ ] **Off-topic redirects**: Properly redirects non-portfolio questions
- [ ] **No console errors**: Browser console is clean
- [ ] **No server errors**: Server logs are clean

## 🎉 Success Criteria

You're ready to deploy if:
1. ✅ All Phase 1-5 items complete
2. ✅ Chatbot responds correctly
3. ✅ Off-topic questions redirected
4. ✅ No errors in console/logs
5. ✅ Mobile responsive works
6. ✅ System prompt updated with your info

## 🚀 Next Steps

Once all items checked:
1. **Test thoroughly** with various questions
2. **Update system prompt** with accurate info
3. **Deploy backend** to Railway/Render/Heroku
4. **Deploy frontend** to Vercel/Netlify
5. **Update CORS** settings for production domain
6. **Monitor usage** in Google AI Studio
7. **Share with friends** for feedback

## ❌ Common Issues

### Backend won't start
- Check MongoDB connection string
- Verify Gemini API key
- Ensure port 5000 is free
- Check for typos in .env

### Chat button not visible
- Check browser console for errors
- Verify RootLayout.tsx imports AIChatbot
- Clear browser cache
- Check if element is behind other elements

### API errors
- Verify API key is correct
- Check Gemini quota at https://aistudio.google.com/
- Check MongoDB Atlas is running
- Review server logs for details

### CORS errors
- Check FRONTEND_ORIGIN in server/.env
- Must match frontend URL exactly
- No trailing slash in URL
- Restart server after changing .env

## 📊 Progress Tracker

- [ ] Phase 1: API Keys (5 min)
- [ ] Phase 2: Backend Setup (3 min)
- [ ] Phase 3: Frontend Setup (2 min)
- [ ] Phase 4: Start Servers (1 min)
- [ ] Phase 5: Test Chatbot (2 min)
- [ ] Phase 6: API Tests (2 min)
- [ ] Phase 7: Mobile Testing (1 min)
- [ ] Phase 8: Error Tests (2 min)
- [ ] Phase 9: Security Check (1 min)
- [ ] Phase 10: Customization (5 min)
- [ ] Phase 11: Docs Review (2 min)
- [ ] Phase 12: Deploy Prep (5 min)

**Total Time:** ~30 minutes

## 🎓 What You've Built

By completing this checklist, you now have:
- ✅ Production-ready AI chatbot
- ✅ Google Gemini integration
- ✅ MongoDB conversation storage
- ✅ Rate limiting protection
- ✅ Mobile responsive UI
- ✅ Error handling & fallbacks
- ✅ Security best practices
- ✅ Complete documentation

## 💡 Pro Tips

1. **Test regularly** - Try new questions daily
2. **Monitor usage** - Check Google AI Studio for stats
3. **Update prompt** - Keep info current
4. **Backup data** - Export MongoDB occasionally
5. **Get feedback** - Ask users what they think

---

**Congratulations!** 🎉 Your AI-powered portfolio is ready!

**Need help?** Review the guides or check server logs for errors.
