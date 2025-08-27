#!/bin/bash

echo "🚀 Deploying Writory to production..."

# Check if git repo is clean
if [[ -n $(git status --porcelain) ]]; then
  echo "❌ Git working directory is not clean. Please commit your changes first."
  exit 1
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

echo "✅ Code pushed to GitHub!"
echo ""
echo "🔧 Next steps:"
echo "1. Set up MongoDB Atlas database"
echo "2. Set up Cloudinary account for file uploads"
echo "3. Deploy backend to Railway/Render"
echo "4. Deploy frontend to Vercel/Netlify"
echo "5. Update API URLs in production environment files"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"