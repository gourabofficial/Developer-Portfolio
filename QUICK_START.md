# ⚡ Quick Start - 5 Minutes Setup

Get your AI-powered portfolio chatbot running in 5 minutes!

## 1️⃣ Get API Keys (2 minutes)

### MongoDB (FREE)
Visit: https://www.mongodb.com/cloud/atlas/register
- Create account → New cluster → Get connection string

### Google Gemini (FREE)
Visit: https://aistudio.google.com/app/apikey
- Sign in → Create API Key → Copy key

## 2️⃣ Install & Configure (1 minute)

```bash
# Backend
cd server
npm install
cp .env.example .env
# Edit .env with your keys
```

**server/.env:**
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/
GEMINI_API_KEY=AIzaSy...your-key
FRONTEND_ORIGIN=http://localhost:5173
```

```bash
# Frontend
cd client
npm install
```

**client/.env:**
```env
VITE_API_URL=http://localhost:5000
```

## 3️⃣ Start Servers (1 minute)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

## 4️⃣ Test (1 minute)

1. Open: http://localhost:5173
2. Click chat button (bottom-right) 💬
3. Ask: "What are your main skills?"
4. Bot responds! 🎉

## ✅ Done!

Your AI chatbot is live! Now customize it:

1. **Update system prompt:** `server/config/systemPrompt.js`
2. **Add your info:** Replace placeholder data with your actual skills/projects
3. **Test thoroughly:** Try various questions
4. **Deploy:** Push to production when ready

## 📚 Need More Help?

- [Installation Guide](./INSTALLATION.md) - Detailed setup
- [Gemini Setup](./server/GEMINI_SETUP.md) - API configuration
- [Testing Guide](./server/TEST_CHATBOT.md) - Test cases
- [Full Documentation](./CHATBOT_SETUP.md) - Complete guide

## 🎯 What's Working?

- ✅ Google Gemini 2.0 Flash AI
- ✅ Conversation history (MongoDB)
- ✅ Floating chat widget
- ✅ Mobile responsive
- ✅ Rate limiting (10 req/min)
- ✅ Strict portfolio focus
- ✅ Error handling

## 💡 Pro Tips

- **Free tier limits:** 1,500 Gemini requests/day (plenty!)
- **Test questions:** See `TEST_CHATBOT.md` for examples
- **Customize:** Edit system prompt to match your portfolio
- **Monitor:** Check Google AI Studio for usage stats

---

**That's it!** 🚀 You now have an AI-powered portfolio chatbot.
