import dotenv from 'dotenv';
import { connectDB, disconnectDB } from '../config/database.js';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import Like from '../models/Like.js';

dotenv.config();

const seedData = async () => {
  try {
    console.log('🌱 Starting database seed...');

    // Connect to database
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await Like.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create seed user
    const seedUser = new User({
      email: 'seed@writory.test',
      password: 'SeedPass123!',
      name: 'Seed User',
      bio: 'A test user created by the seed script',
      isEmailVerified: true,
    });

    await seedUser.save();
    console.log('👤 Created seed user: seed@writory.test / SeedPass123!');

    // Create sample posts
    const posts = [
      {
        title: 'Welcome to Writory',
        body: `# Welcome to Writory

Welcome to **Writory**, a minimal yet powerful Medium-style blogging platform built with the MERN stack!

## Features

- **Clean Writing Experience**: Focus on your content with our distraction-free editor
- **Markdown Support**: Write in markdown and see it rendered beautifully
- **Social Features**: Like and comment on posts from other writers
- **Search & Discovery**: Find posts by title, content, or tags

## Getting Started

1. **Sign up** for an account
2. **Create your first post** using our markdown editor
3. **Publish** when you're ready to share with the world
4. **Engage** with other writers through likes and comments

Happy writing! ✍️`,
        tags: ['welcome', 'getting-started', 'writory'],
        author: seedUser._id,
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        title: 'The Art of Minimalist Design',
        body: `# The Art of Minimalist Design

Minimalism in design is not about having less for the sake of less. It's about having just enough to communicate effectively.

## Core Principles

### 1. Purpose Over Decoration
Every element should serve a purpose. If it doesn't add value, remove it.

### 2. White Space is Your Friend
White space (or negative space) gives your content room to breathe and helps guide the user's attention.

### 3. Typography Matters
Choose fonts that are readable and reflect your brand's personality. Less is often more when it comes to font variety.

## Benefits of Minimalist Design

- **Improved User Experience**: Users can focus on what matters most
- **Faster Load Times**: Fewer elements mean faster websites
- **Timeless Appeal**: Minimalist designs age better than trendy ones
- **Better Mobile Experience**: Simpler designs work better on small screens

Remember: *Simplicity is the ultimate sophistication* - Leonardo da Vinci`,
        tags: ['design', 'minimalism', 'ux', 'web-design'],
        author: seedUser._id,
        isPublished: true,
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        title: 'Building Modern Web Applications',
        body: `# Building Modern Web Applications

The landscape of web development has evolved dramatically over the past decade. Here's what you need to know about building modern web applications.

## The Modern Stack

### Frontend
- **React/Vue/Angular**: Component-based architectures
- **TypeScript**: Type safety for JavaScript
- **Build Tools**: Vite, Webpack, or Parcel for bundling

### Backend
- **Node.js**: JavaScript everywhere
- **Express/Fastify**: Lightweight web frameworks
- **GraphQL/REST**: API design patterns

### Database
- **MongoDB**: Document-based NoSQL
- **PostgreSQL**: Relational database with JSON support
- **Redis**: Caching and session storage

## Best Practices

1. **Security First**: Always validate input and sanitize output
2. **Performance**: Optimize for speed and user experience
3. **Accessibility**: Make your app usable by everyone
4. **Testing**: Write tests to prevent regressions
5. **Documentation**: Document your code and APIs

## Deployment

Modern deployment is all about automation:

\`\`\`bash
# Example deployment pipeline
npm run build
npm run test
docker build -t myapp .
docker push myregistry/myapp
kubectl apply -f deployment.yaml
\`\`\`

The future of web development is exciting, with new tools and frameworks constantly emerging to make our lives easier.`,
        tags: ['web-development', 'javascript', 'react', 'nodejs', 'programming'],
        author: seedUser._id,
        isPublished: true,
        publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      },
    ];

    const createdPosts = await Post.insertMany(posts);
    console.log(`📝 Created ${createdPosts.length} sample posts`);

    // Add some likes to posts
    const likes = [
      { user: seedUser._id, post: createdPosts[0]._id },
      { user: seedUser._id, post: createdPosts[1]._id },
    ];

    await Like.insertMany(likes);

    // Update like counts
    await Post.findByIdAndUpdate(createdPosts[0]._id, { likesCount: 1 });
    await Post.findByIdAndUpdate(createdPosts[1]._id, { likesCount: 1 });

    console.log('❤️  Added sample likes');

    // Add some comments
    const comments = [
      {
        content: 'Great introduction to the platform! Looking forward to writing here.',
        author: seedUser._id,
        post: createdPosts[0]._id,
      },
      {
        content: 'I love the minimalist approach. Less really is more in design.',
        author: seedUser._id,
        post: createdPosts[1]._id,
      },
      {
        content: 'This is a comprehensive overview of modern web development. Thanks for sharing!',
        author: seedUser._id,
        post: createdPosts[2]._id,
      },
    ];

    await Comment.insertMany(comments);

    // Update comment counts
    await Post.findByIdAndUpdate(createdPosts[0]._id, { commentsCount: 1 });
    await Post.findByIdAndUpdate(createdPosts[1]._id, { commentsCount: 1 });
    await Post.findByIdAndUpdate(createdPosts[2]._id, { commentsCount: 1 });

    console.log('💬 Added sample comments');

    console.log('✅ Database seeded successfully!');
    console.log('\n📋 Seed Summary:');
    console.log('   User: seed@writory.test / SeedPass123!');
    console.log('   Posts: 3 published posts');
    console.log('   Likes: 2 likes');
    console.log('   Comments: 3 comments');
    console.log('\n🚀 You can now start the application and sign in with the seed user!');

  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
};

// Run seed if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedData();
}

export default seedData;