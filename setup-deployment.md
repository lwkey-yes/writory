# Quick Deployment Setup

## 🚀 Deploy Writory in 15 minutes

### ✅ Step 1: Backend (COMPLETED)
Your backend is already deployed at: **https://writory-i3jw.onrender.com**

To test it, run: `node check-deployment.js`

### Step 2: Database (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) → Sign up
2. Create a free cluster
3. Create database user
4. Get connection string
5. Whitelist all IPs (0.0.0.0/0)
6. Update your Render environment variables with the connection string

### Step 3: File Storage (Cloudinary)
1. Go to [Cloudinary](https://cloudinary.com/) → Sign up
2. Dashboard → Copy: Cloud Name, API Key, API Secret
3. Add these to your Render environment variables

### Step 4: Frontend (Vercel - Ready to Deploy!)
1. Go to [Vercel](https://vercel.com/) → Login with GitHub
2. "New Project" → Select your repo
3. Framework: Vite
4. Root Directory: `client`
5. Add environment variable:
   ```
   VITE_API_URL=https://writory-i3jw.onrender.com
   ```
6. Deploy!

### ✅ Step 5: COMPLETED! 
1. ✅ Backend: https://writory-i3jw.onrender.com
2. ✅ Frontend: https://writory-mu.vercel.app
3. 🔧 **FINAL STEP**: Update Render's `CLIENT_URL` to `https://writory-mu.vercel.app`

## 🎉 Your app is LIVE!

### 🌐 Live URLs:
- **Frontend**: https://writory-mu.vercel.app
- **Backend**: https://writory-i3jw.onrender.com

### 🔧 Final Step:
Update Render's `CLIENT_URL` environment variable to: `https://writory-mu.vercel.app`

### Free Tier Limits:
- MongoDB Atlas: 512MB
- Render: 750 hours/month
- Vercel: Unlimited for personal projects
- Cloudinary: 25GB storage/month

### Troubleshooting:
- **CORS errors**: Check CLIENT_URL in Render matches your Vercel domain
- **API errors**: Verify VITE_API_URL in Vercel matches your Render domain
- **Database errors**: Check MongoDB connection string and IP whitelist