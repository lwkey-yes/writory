# Writory Deployment Guide

## Free Deployment Setup

### 1. Database Setup (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Whitelist all IPs (0.0.0.0/0) for development

### 2. File Storage Setup (Cloudinary)
1. Go to [Cloudinary](https://cloudinary.com/)
2. Create a free account
3. Get your cloud name, API key, and API secret

### 3. Backend Deployment (Railway - Recommended)

#### Option A: Railway
1. Go to [Railway](https://railway.app/)
2. Connect your GitHub repository
3. Deploy from the root directory
4. Add environment variables:
   ```
   NODE_ENV=production
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```
5. Railway will auto-deploy on git pushes

#### Option B: Render
1. Go to [Render](https://render.com/)
2. Connect your GitHub repository
3. Create a new Web Service
4. Use these settings:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
   - Add the same environment variables as above

### 4. Frontend Deployment (Vercel - Recommended)

#### Option A: Vercel
1. Go to [Vercel](https://vercel.com/)
2. Connect your GitHub repository
3. Set build settings:
   - Framework: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```
5. Update `vercel.json` with your actual backend URL

#### Option B: Netlify
1. Go to [Netlify](https://netlify.com/)
2. Connect your GitHub repository
3. Build settings are in `netlify.toml`
4. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```
5. Update `netlify.toml` with your actual backend URL

### 5. Update Frontend API URL

After deploying your backend, update the API URL in your frontend:

```bash
# In client/.env.production
VITE_API_URL=https://your-actual-backend-url.railway.app
```

### 6. CORS Configuration

Make sure your backend allows requests from your frontend domain. Update `server/src/app.js`:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://your-frontend-domain.vercel.app'
  ],
  credentials: true
};
```

## Quick Deploy Commands

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy configuration"
   git push origin main
   ```

2. **Deploy Backend:** Connect Railway/Render to your repo
3. **Deploy Frontend:** Connect Vercel/Netlify to your repo
4. **Update API URLs:** Replace placeholder URLs with actual deployment URLs

## Free Tier Limits

- **MongoDB Atlas:** 512MB storage
- **Railway:** 500 hours/month, 1GB RAM
- **Render:** 750 hours/month
- **Vercel:** 100GB bandwidth/month
- **Netlify:** 100GB bandwidth/month
- **Cloudinary:** 25GB storage, 25GB bandwidth/month

## Troubleshooting

- **CORS errors:** Update CORS origins in backend
- **API not found:** Check API URL in frontend env variables
- **Build failures:** Ensure all dependencies are in package.json
- **Database connection:** Verify MongoDB connection string and IP whitelist