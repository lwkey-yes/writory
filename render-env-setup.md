# 🔧 Render Environment Variables Setup

## Required Environment Variables for Render

Add these in your Render dashboard → Environment tab:

### **Essential Variables:**
```
NODE_ENV=production
PORT=10000
CLIENT_URL=https://writory-mu.vercel.app
```

### **Database (Required):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/writory?retryWrites=true&w=majority
```

### **JWT Secrets (Required):**
```
JWT_ACCESS_SECRET=your-super-secret-access-key-minimum-32-characters-long
JWT_REFRESH_SECRET=your-super-secret-refresh-key-minimum-32-characters-long
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

### **File Upload (Optional - for later):**
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🚀 Quick MongoDB Atlas Setup:

1. **Go to [MongoDB Atlas](https://www.mongodb.com/atlas)**
2. **Create free account** → Create cluster
3. **Database Access** → Create user with password
4. **Network Access** → Add IP (0.0.0.0/0 for all)
5. **Connect** → Get connection string
6. **Replace** `<username>`, `<password>`, and `<dbname>` in the string

## 🔑 Generate JWT Secrets:

Run this in your terminal to generate secure secrets:
```bash
node -e "console.log('JWT_ACCESS_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('JWT_REFRESH_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
```

## ✅ After Adding Variables:
1. Save in Render dashboard
2. Wait for automatic redeploy (2-3 minutes)
3. Check logs for "MongoDB Connected" message
4. Test your app!