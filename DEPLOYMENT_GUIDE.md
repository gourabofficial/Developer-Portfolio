# 🚀 Deployment Guide

## Production Deployment Checklist

Follow these steps to deploy your AI-powered portfolio to production.

## Prerequisites

- [ ] Backend tested locally and working
- [ ] Frontend tested locally and working
- [ ] MongoDB connection string ready
- [ ] Gemini API key ready
- [ ] Domain name (if using custom domain)
- [ ] Git repository set up

## Option 1: Vercel (Frontend) + Railway (Backend)

### Step 1: Deploy Backend to Railway

**1.1 Create Railway Account**
- Visit https://railway.app
- Sign in with GitHub

**1.2 Create New Project**
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose your repository
- Select `server` folder as root

**1.3 Configure Environment Variables**
Go to Variables tab and add:
```
MONGO_URI=mongodb+srv://your-production-connection
GEMINI_API_KEY=AIzaSy...your-key
FRONTEND_ORIGIN=https://gganguly.in
PORT=5000
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW_MS=60000
NODE_ENV=production
```

**1.4 Get Backend URL**
- Railway will provide a URL like: `https://your-app.railway.app`
- Copy this URL - you'll need it for frontend

**1.5 Verify Deployment**
```bash
curl https://your-app.railway.app/api/health
```

Should return success message.

### Step 2: Deploy Frontend to Vercel

**2.1 Create Vercel Account**
- Visit https://vercel.com
- Sign in with GitHub

**2.2 Import Project**
- Click "Add New Project"
- Import your repository
- Select `client` folder as root directory

**2.3 Configure Build Settings**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**2.4 Add Environment Variable**
Go to Settings → Environment Variables:
```
VITE_API_URL=https://your-app.railway.app
```

**2.5 Deploy**
- Click "Deploy"
- Wait for build to complete
- Vercel will provide a URL: `https://your-project.vercel.app`

**2.6 Custom Domain (Optional)**
- Go to Settings → Domains
- Add `gganguly.in`
- Follow DNS configuration instructions

### Step 3: Update CORS Settings

**3.1 Update Backend Environment**
In Railway, update `FRONTEND_ORIGIN`:
```
FRONTEND_ORIGIN=https://gganguly.in
```

Or if using Vercel URL:
```
FRONTEND_ORIGIN=https://your-project.vercel.app
```

**3.2 Redeploy Backend**
Railway will automatically redeploy with new variable.

## Option 2: Netlify (Frontend) + Render (Backend)

### Step 1: Deploy Backend to Render

**1.1 Create Render Account**
- Visit https://render.com
- Sign in with GitHub

**1.2 Create Web Service**
- Click "New +" → "Web Service"
- Connect your repository
- Select `server` folder

**1.3 Configure Service**
- Name: `portfolio-backend`
- Environment: `Node`
- Build Command: `npm install`
- Start Command: `npm start`
- Plan: Free

**1.4 Add Environment Variables**
```
MONGO_URI=mongodb+srv://your-production-connection
GEMINI_API_KEY=AIzaSy...your-key
FRONTEND_ORIGIN=https://gganguly.in
PORT=5000
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW_MS=60000
NODE_ENV=production
```

**1.5 Deploy**
Render will provide URL: `https://your-app.onrender.com`

### Step 2: Deploy Frontend to Netlify

**2.1 Create Netlify Account**
- Visit https://netlify.com
- Sign in with GitHub

**2.2 Import Project**
- Click "Add new site" → "Import existing project"
- Choose your repository
- Base directory: `client`

**2.3 Build Settings**
- Build command: `npm run build`
- Publish directory: `client/dist`

**2.4 Environment Variables**
Site settings → Environment variables:
```
VITE_API_URL=https://your-app.onrender.com
```

**2.5 Deploy**
Netlify provides URL or use custom domain.

## MongoDB Production Setup

### Secure Your Database

**1. IP Whitelist**
- MongoDB Atlas → Network Access
- Remove 0.0.0.0/0 (allow all)
- Add specific IPs:
  - Railway/Render server IPs
  - Your office/home IP for development

**2. Database User**
- Create production-specific user
- Use strong password
- Grant only necessary permissions

**3. Connection String**
```
mongodb+srv://prod-user:secure-password@cluster.mongodb.net/portfolio-chatbot?retryWrites=true&w=majority
```

## Security Checklist

### Before Going Live

- [ ] **Environment Variables**
  - All API keys in environment variables
  - No hardcoded secrets
  - .env files not committed to Git

- [ ] **CORS**
  - FRONTEND_ORIGIN set to production domain
  - No wildcard (*) origins in production

- [ ] **Rate Limiting**
  - Set to reasonable limit (10 req/min)
  - Monitor for abuse

- [ ] **API Keys**
  - Gemini API key valid and has quota
  - MongoDB connection string correct
  - No development keys in production

- [ ] **HTTPS**
  - Both frontend and backend use HTTPS
  - No mixed content warnings

- [ ] **Error Handling**
  - Fallback responses working
  - No sensitive info in error messages
  - Errors logged server-side only

## Post-Deployment Testing

### Test 1: Basic Functionality
```bash
# Health check
curl https://your-backend.com/api/health

# Expected: {"success": true, "message": "Server is running"}
```

### Test 2: Chat Endpoint
```bash
curl -X POST https://your-backend.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","sessionId":"prod-test-123"}'

# Expected: AI response
```

### Test 3: CORS
- Open frontend in browser
- Open DevTools → Network tab
- Send chat message
- Check response headers for CORS headers

### Test 4: Rate Limiting
- Send 11 requests quickly
- 11th should get 429 error

### Test 5: Mobile
- Test on real mobile device
- Check responsiveness
- Verify chat works

### Test 6: Error Handling
- Send empty message → should be blocked
- Send very long message → should be truncated
- Stop backend → frontend should show fallback

## Monitoring & Maintenance

### Check Regularly

**1. MongoDB Atlas Dashboard**
- Storage usage
- Connection count
- Query performance

**2. Google AI Studio**
- API usage (requests per day)
- Token consumption
- Quota remaining
- Error rates

**3. Railway/Render Dashboard**
- Server uptime
- Response times
- Error logs
- Resource usage

### Set Up Alerts

**MongoDB**
- Alert when storage > 80%
- Alert on connection failures

**Gemini API**
- Alert when approaching daily limit
- Alert on high error rates

**Backend**
- Alert on server downtime
- Alert on high error rates

## Performance Optimization

### Backend
```javascript
// Add caching for common questions (optional)
const cache = new Map();

// Compress responses
app.use(compression());

// Set proper headers
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
```

### Frontend
```javascript
// Lazy load chatbot component
const AIChatbot = lazy(() => import('./components/AIChatbot'));

// Optimize images
// Use WebP format
// Lazy load below fold
```

### Database
```javascript
// Add indexes for faster queries
ChatSession.index({ sessionId: 1 });
ChatSession.index({ createdAt: -1 });
```

## Backup Strategy

### MongoDB Backups

**Automatic (Atlas)**
- Atlas free tier: No automatic backups
- Upgrade to M2+ for automated backups

**Manual**
```bash
# Export data
mongodump --uri="your-connection-string"

# Schedule weekly exports
# Store in cloud storage (S3, Google Drive)
```

### Code Backups
- Git repository (GitHub/GitLab)
- Multiple branches
- Tag releases

## Rollback Plan

### If Deployment Fails

**Backend (Railway/Render)**
1. Check logs for errors
2. Verify environment variables
3. Rollback to previous deployment
4. Fix issue locally
5. Redeploy

**Frontend (Vercel/Netlify)**
1. Check build logs
2. Verify environment variables
3. Rollback to previous deployment
4. Fix issue
5. Redeploy

### Database Issues
1. Check connection string
2. Verify IP whitelist
3. Check user permissions
4. Restore from backup if needed

## Cost Optimization

### Free Tier Limits

**MongoDB Atlas (Free)**
- 512 MB storage
- ~100 concurrent connections
- No automated backups
→ Upgrade if exceeding

**Gemini API (Free)**
- 1,500 requests/day
- 32K tokens/request
→ Upgrade if exceeding

**Railway (Free)**
- $5 credit/month
- ~500 hours runtime
→ Upgrade to Pro ($5/month)

**Render (Free)**
- 750 hours/month
- Spins down after 15 min inactivity
→ Upgrade to Starter ($7/month)

**Vercel (Free)**
- 100 GB bandwidth
- Unlimited requests
→ Rarely need upgrade

## Custom Domain Setup

### Configure DNS

**For Vercel/Netlify Frontend:**
```
Type: CNAME
Name: @ or www
Value: cname.vercel-dns.com (or Netlify DNS)
```

**For Railway/Render Backend:**
```
Type: CNAME
Name: api
Value: your-app.railway.app
```

Result:
- Frontend: https://gganguly.in
- Backend: https://api.gganguly.in

### Update Environment Variables

**Backend:**
```
FRONTEND_ORIGIN=https://gganguly.in
```

**Frontend:**
```
VITE_API_URL=https://api.gganguly.in
```

## SSL Certificates

All platforms (Vercel, Netlify, Railway, Render) provide:
- ✅ Automatic SSL certificates
- ✅ HTTPS by default
- ✅ Certificate renewal
- ✅ No configuration needed

## Troubleshooting Production Issues

### "CORS error" in browser
- Check FRONTEND_ORIGIN in backend
- Verify it matches frontend URL exactly
- No trailing slash in URL
- Redeploy backend after changing

### "API not responding"
- Check backend deployment status
- Verify environment variables set
- Check backend logs for errors
- Test health endpoint directly

### "Rate limit errors"
- Normal if traffic is high
- Consider increasing RATE_LIMIT_MAX
- Or upgrade to paid tier for more resources

### "MongoDB connection failed"
- Check IP whitelist includes server IP
- Verify connection string is correct
- Check MongoDB Atlas status

### "Gemini API quota exceeded"
- Check usage in Google AI Studio
- Wait until daily reset (midnight PT)
- Or upgrade to paid tier

## Production Checklist

Before announcing your portfolio:

- [ ] Both frontend and backend deployed
- [ ] Custom domain configured (if using)
- [ ] SSL certificates working (HTTPS)
- [ ] Chat functionality tested
- [ ] Mobile responsiveness verified
- [ ] Off-topic redirects working
- [ ] Rate limiting active
- [ ] Error handling working
- [ ] No console errors
- [ ] Fast response times (< 5s)
- [ ] Analytics set up (optional)
- [ ] Monitoring alerts configured
- [ ] Backup strategy in place

## Success! 🎉

Your AI-powered portfolio is now live!

**Next Steps:**
1. Share on LinkedIn
2. Update resume with portfolio link
3. Monitor usage and feedback
4. Iterate and improve

---

**Deployed Stack:**
- Frontend: Vercel/Netlify
- Backend: Railway/Render
- Database: MongoDB Atlas
- AI: Google Gemini
- Domain: Custom domain with SSL

**Monthly Cost:** $0 - $24 (depending on tier)

**Maintenance:** ~1 hour/month (checking metrics, updating content)

---

**Need help with deployment?** Check platform-specific docs or review logs for errors.
