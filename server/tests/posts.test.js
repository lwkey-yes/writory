import request from 'supertest';
import mongoose from 'mongoose';
import server from '../src/server.js';
import User from '../src/models/User.js';
import Post from '../src/models/Post.js';
import Comment from '../src/models/Comment.js';
import Like from '../src/models/Like.js';

describe('Posts Endpoints', () => {
  let accessToken;
  let user;

  beforeAll(async () => {
    // Connect to test database
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/writory-test';
    await mongoose.connect(mongoUri);
  });

  beforeEach(async () => {
    // Clean up before each test
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await Like.deleteMany({});

    // Create and sign in user
    user = new User({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    });
    await user.save();

    const response = await request(server)
      .post('/api/auth/signin')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    accessToken = response.body.accessToken;
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  describe('POST /api/posts', () => {
    it('should create a new post', async () => {
      const postData = {
        title: 'Test Post',
        body: 'This is a test post body with some **markdown**.',
        tags: ['test', 'markdown'],
        isPublished: true,
      };

      const response = await request(server)
        .post('/api/posts')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(postData)
        .expect(201);

      expect(response.body.title).toBe(postData.title);
      expect(response.body.body).toBe(postData.body);
      expect(response.body.tags).toEqual(postData.tags);
      expect(response.body.isPublished).toBe(true);
      expect(response.body.slug).toBeDefined();
      expect(response.body.author._id).toBe(user._id.toString());
    });

    it('should not create post without authentication', async () => {
      const postData = {
        title: 'Test Post',
        body: 'This is a test post body.',
      };

      const response = await request(server)
        .post('/api/posts')
        .send(postData)
        .expect(401);

      expect(response.body.message).toBe('Access token required');
    });

    it('should not create post with invalid data', async () => {
      const postData = {
        title: '', // Empty title
        body: 'This is a test post body.',
      };

      const response = await request(server)
        .post('/api/posts')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(postData)
        .expect(400);

      expect(response.body.message).toBe('Validation failed');
    });
  });

  describe('GET /api/posts', () => {
    beforeEach(async () => {
      // Create test posts
      const posts = [
        {
          title: 'Published Post 1',
          body: 'Content 1',
          author: user._id,
          isPublished: true,
          publishedAt: new Date(),
        },
        {
          title: 'Published Post 2',
          body: 'Content 2',
          author: user._id,
          isPublished: true,
          publishedAt: new Date(),
        },
        {
          title: 'Draft Post',
          body: 'Draft content',
          author: user._id,
          isPublished: false,
        },
      ];

      await Post.insertMany(posts);
    });

    it('should get published posts', async () => {
      const response = await request(server)
        .get('/api/posts')
        .expect(200);

      expect(response.body.posts).toHaveLength(2);
      expect(response.body.posts[0].isPublished).toBe(true);
      expect(response.body.posts[1].isPublished).toBe(true);
      expect(response.body.pagination).toBeDefined();
    });

    it('should support pagination', async () => {
      const response = await request(server)
        .get('/api/posts?page=1&limit=1')
        .expect(200);

      expect(response.body.posts).toHaveLength(1);
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(1);
      expect(response.body.pagination.total).toBe(2);
    });

    it('should support search', async () => {
      const response = await request(server)
        .get('/api/posts?search=Content 1')
        .expect(200);

      expect(response.body.posts).toHaveLength(1);
      expect(response.body.posts[0].title).toBe('Published Post 1');
    });
  });

  describe('GET /api/posts/:slug', () => {
    let post;

    beforeEach(async () => {
      post = new Post({
        title: 'Test Post',
        body: 'Test content',
        author: user._id,
        isPublished: true,
        publishedAt: new Date(),
      });
      await post.save();
    });

    it('should get post by slug', async () => {
      const response = await request(server)
        .get(`/api/posts/${post.slug}`)
        .expect(200);

      expect(response.body.title).toBe(post.title);
      expect(response.body.body).toBe(post.body);
      expect(response.body.author.name).toBe(user.name);
    });

    it('should return 404 for non-existent post', async () => {
      const response = await request(server)
        .get('/api/posts/non-existent-slug')
        .expect(404);

      expect(response.body.message).toBe('Post not found');
    });
  });

  describe('PUT /api/posts/:id', () => {
    let post;

    beforeEach(async () => {
      post = new Post({
        title: 'Original Title',
        body: 'Original content',
        author: user._id,
        isPublished: false,
      });
      await post.save();
    });

    it('should update own post', async () => {
      const updateData = {
        title: 'Updated Title',
        body: 'Updated content',
        isPublished: true,
      };

      const response = await request(server)
        .put(`/api/posts/${post._id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.title).toBe(updateData.title);
      expect(response.body.body).toBe(updateData.body);
      expect(response.body.isPublished).toBe(true);
    });

    it('should not update post without authentication', async () => {
      const updateData = {
        title: 'Updated Title',
        body: 'Updated content',
      };

      const response = await request(server)
        .put(`/api/posts/${post._id}`)
        .send(updateData)
        .expect(401);

      expect(response.body.message).toBe('Access token required');
    });

    it('should not update non-existent post', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const updateData = {
        title: 'Updated Title',
        body: 'Updated content',
      };

      const response = await request(server)
        .put(`/api/posts/${fakeId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updateData)
        .expect(404);

      expect(response.body.message).toBe('Post not found');
    });
  });

  describe('POST /api/posts/:id/like', () => {
    let post;

    beforeEach(async () => {
      post = new Post({
        title: 'Test Post',
        body: 'Test content',
        author: user._id,
        isPublished: true,
        publishedAt: new Date(),
      });
      await post.save();
    });

    it('should like a post', async () => {
      const response = await request(server)
        .post(`/api/posts/${post._id}/like`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body.message).toBe('Post liked');
      expect(response.body.isLiked).toBe(true);
      expect(response.body.likesCount).toBe(1);
    });

    it('should unlike a post', async () => {
      // First like the post
      await request(server)
        .post(`/api/posts/${post._id}/like`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Then unlike it
      const response = await request(server)
        .post(`/api/posts/${post._id}/like`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body.message).toBe('Post unliked');
      expect(response.body.isLiked).toBe(false);
      expect(response.body.likesCount).toBe(0);
    });

    it('should not like post without authentication', async () => {
      const response = await request(server)
        .post(`/api/posts/${post._id}/like`)
        .expect(401);

      expect(response.body.message).toBe('Access token required');
    });
  });

  describe('POST /api/posts/:id/comments', () => {
    let post;

    beforeEach(async () => {
      post = new Post({
        title: 'Test Post',
        body: 'Test content',
        author: user._id,
        isPublished: true,
        publishedAt: new Date(),
      });
      await post.save();
    });

    it('should add comment to post', async () => {
      const commentData = {
        content: 'This is a test comment',
      };

      const response = await request(server)
        .post(`/api/posts/${post._id}/comments`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(commentData)
        .expect(201);

      expect(response.body.content).toBe(commentData.content);
      expect(response.body.author.name).toBe(user.name);
      expect(response.body.post).toBe(post._id.toString());
    });

    it('should not add comment without authentication', async () => {
      const commentData = {
        content: 'This is a test comment',
      };

      const response = await request(server)
        .post(`/api/posts/${post._id}/comments`)
        .send(commentData)
        .expect(401);

      expect(response.body.message).toBe('Access token required');
    });
  });
});