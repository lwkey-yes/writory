# Update Render Environment Variables

## 🔧 IMPORTANT: Update your Render backend

Your frontend is now live at: **https://writory-mu.vercel.app/**

You need to update your Render backend environment variables:

### Go to Render Dashboard:
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Find your `writory-i3jw` service
3. Go to "Environment" tab
4. Add/Update this variable:

```
CLIENT_URL=https://writory-mu.vercel.app
```

### Or add multiple allowed origins:
```
CLIENT_URL=https://writory-mu.vercel.app,http://localhost:5173
```

This will fix CORS errors and allow your frontend to communicate with the backend.

After updating, your backend will automatically redeploy with the new settings.