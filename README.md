# 🚀 Gourab Ganguly - Portfolio Website

A modern, full-stack developer portfolio with an integrated AI chatbot assistant powered by Google Gemini.

## ✨ Key Features

### 🎨 Frontend
- **Modern React** with TypeScript and Vite
- **Responsive Design** with Tailwind CSS
- **Smooth Animations** using Framer Motion
- **Interactive Terminal** component for About section
- **Dark Mode Support** with theme switcher
- **Section Navigation** with smooth scrolling

### 🤖 AI Chatbot (NEW!)
- **Google Gemini 2.0 Flash** - Fast, intelligent responses
- **Strict Portfolio Focus** - Only answers about Gourab's work
- **Floating Widget** - Accessible from any page
- **Session Persistence** - Remembers conversations
- **Mobile Responsive** - Works on all devices
- **Rate Limited** - Prevents abuse (10 req/min)

### ⚙️ Backend
- **Node.js + Express** RESTful API
- **MongoDB** for conversation storage
- **CORS Protection** for security
- **Error Handling** with fallback responses
- **Rate Limiting** to prevent abuse

## 📁 Project Structure

```
portfolio/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIChatbot.tsx      # AI chatbot component
│   │   │   ├── InteractiveTerminal.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── sections/          # Page sections
│   │   ├── pages/
│   │   ├── data/                  # Portfolio content
│   │   └── layouts/
│   └── package.json
│
├── server/                    # Node.js Backend
│   ├── config/
│   │   ├── database.js            # MongoDB connection
│   │   └── systemPrompt.js        # AI personality
│   ├── controllers/
│   │   └── chatController.js      # Chat logic
│   ├── models/
│   │   └── ChatSession.js         # MongoDB schema
│   ├── routes/
│   │   └── chat.js                # API routes
│   ├── middleware/
│   │   └── rateLimiter.js         # Rate limiting
│   ├── server.js                  # Express app
│   └── package.json
│
└── docs/                      # Documentation
    ├── CHATBOT_SETUP.md           # Full setup guide
    ├── AI_CHATBOT_SHOWCASE.md     # Feature showcase
    ├── GEMINI_SETUP.md            # Gemini API guide
    └── TEST_CHATBOT.md            # Testing guide
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB account (free tier)
- Google Gemini API key (free)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_ORIGIN=http://localhost:5173
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW_MS=60000
```

**Get Gemini API Key (FREE):**
1. Visit: https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy and paste into `.env`

Start server:
```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd client
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

Start dev server:
```bash
npm run dev
```

### 4. Open Browser
Navigate to: http://localhost:5173

Click the floating chat button to test the AI assistant! 💬

## 🎯 AI Chatbot Features

### What It Can Do ✅
- Answer questions about skills and experience
- Describe projects in detail
- Provide contact information
- Explain technical expertise
- Suggest relevant portfolio sections

### What It Won't Do ❌
- Answer general programming questions
- Provide coding tutorials
- Discuss unrelated topics
- Generate code
- Make up information

**Example Conversations:**

```
User: "What are your main skills?"
Bot: "Gourab works with .NET Core, ASP.NET Core, and 
MERN stack. He's currently at Ancile working on 
enterprise software with React and C#."

User: "Tell me about the Tea ERP project"
Bot: "The Tea ERP System is an enterprise platform 
built with .NET Core, React, and SQL Server. It 
handles business operations for the tea industry..."

User: "How do I learn React?" ❌
Bot: "I'm here to help you learn about Gourab's work. 
Ask me about his React projects or skills!"
```

## 📚 Documentation

- **[Chatbot Setup Guide](./CHATBOT_SETUP.md)** - Complete setup instructions
- **[AI Chatbot Showcase](./AI_CHATBOT_SHOWCASE.md)** - Feature overview
- **[Gemini API Setup](./server/GEMINI_SETUP.md)** - API configuration
- **[Testing Guide](./server/TEST_CHATBOT.md)** - Testing instructions

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Google Gemini AI** - Chatbot intelligence
- **Express Rate Limit** - API protection

## 🎨 Key Sections

1. **Hero** - Introduction with animated terminal
2. **About** - Interactive terminal with commands
3. **Skills** - Tech stack showcase
4. **Projects** - Portfolio highlights
5. **Experience** - Work timeline
6. **Contact** - Get in touch form
7. **AI Chatbot** - Floating assistant widget

## 🔒 Security Features

- ✅ API keys stored server-side only
- ✅ CORS protection
- ✅ Rate limiting (10 req/min)
- ✅ Input validation
- ✅ Message length limits
- ✅ Session auto-cleanup

## 📱 Responsive Design

- **Desktop** - Full layout with all features
- **Tablet** - Optimized grid layouts
- **Mobile** - Touch-friendly interface
- **Chatbot** - Adapts to all screen sizes

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist/ folder
```

Set environment variable:
```
VITE_API_URL=https://your-backend-url.com
```

### Backend (Railway/Render/Heroku)
```bash
cd server
# Push to platform
```

Set environment variables:
```
MONGO_URI=your_production_mongodb
GEMINI_API_KEY=your_gemini_key
FRONTEND_ORIGIN=https://gganguly.in
```

## 💰 Cost Estimate

**Free Tier:**
- Gemini API: FREE (1,500 requests/day)
- MongoDB: FREE (512MB)
- Vercel: FREE (frontend)
- Railway: FREE tier available
- **Total: $0/month** ✨

**Paid (if needed):**
- Gemini: ~$2-5/month
- MongoDB: $9/month
- Hosting: $5-10/month
- **Total: ~$16-24/month**

## 🧪 Testing

### Test Backend
```bash
curl http://localhost:5000/api/health
```

### Test Chatbot
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What are your skills?","sessionId":"test-123"}'
```

### Run Frontend Tests
```bash
cd client
npm run lint
npm run typecheck
```

## 🎓 Learning from This Project

This portfolio demonstrates:
- Full-stack development (MERN + .NET knowledge)
- AI integration (Google Gemini API)
- Modern React patterns (hooks, context)
- TypeScript usage
- API design (RESTful)
- Database modeling (MongoDB)
- Security best practices
- Rate limiting and CORS
- Responsive design
- Animation and UX

## 📞 Contact

- **Email:** gourabganguly007@gmail.com
- **LinkedIn:** [linkedin.com/in/gourab-ganguly](https://linkedin.com/in/gourab-ganguly)
- **GitHub:** [github.com/gourabganguly007](https://github.com/gourabganguly007)
- **Website:** [gganguly.in](https://gganguly.in)

## 📝 License

MIT License - feel free to use this as a template for your own portfolio!

## 🙏 Acknowledgments

- Google Gemini for the AI API
- MongoDB Atlas for database hosting
- Vercel/Railway for deployment
- The React and Node.js communities

## 🎉 What's Next?

- [ ] Add analytics tracking
- [ ] Implement blog section
- [ ] Add more projects
- [ ] Integrate GitHub API for live stats
- [ ] Add resume download feature
- [ ] Implement contact form backend

---

**Built with ❤️ by Gourab Ganguly**

*Powered by Google Gemini 2.0 Flash, React, and Node.js*
