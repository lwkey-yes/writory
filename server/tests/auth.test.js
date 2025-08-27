import request from 'supertest';
import mongoose from 'mongoose';
import server from '../src/server.js';
import User from '../src/models/User.js';
import RefreshToken from '../src/models/RefreshToken.js';

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    // Connect to test database
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/writory-test';
    await mongoose.connect(mongoUri);
  });

  beforeEach(async () => {
    // Clean up before each test
    await User.deleteMany({});
    await RefreshToken.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  describe('POST /api/auth/signup', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const response = await request(server)
        .post('/api/auth/signup')
        .send(userData)
        .expect(201);

      expect(response.body.message).toBe('User created successfully');
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.name).toBe(userData.name);
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
      expect(response.body.user.password).toBeUndefined();
    });

    it('should not create user with invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123',
        name: 'Test User',
      };

      const response = await request(server)
        .post('/api/auth/signup')
        .send(userData)
        .expect(400);

      expect(response.body.message).toBe('Validation failed');
    });

    it('should not create user with short password', async () => {
      const userData = {
        email: 'test@example.com',
        password: '123',
        name: 'Test User',
      };

      const response = await request(server)
        .post('/api/auth/signup')
        .send(userData)
        .expect(400);

      expect(response.body.message).toBe('Validation failed');
    });

    it('should not create duplicate user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      // Create first user
      await request(server)
        .post('/api/auth/signup')
        .send(userData)
        .expect(201);

      // Try to create duplicate
      const response = await request(server)
        .post('/api/auth/signup')
        .send(userData)
        .expect(400);

      expect(response.body.message).toBe('User already exists');
    });
  });

  describe('POST /api/auth/signin', () => {
    beforeEach(async () => {
      // Create a test user
      const user = new User({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });
      await user.save();
    });

    it('should sign in with valid credentials', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await request(server)
        .post('/api/auth/signin')
        .send(credentials)
        .expect(200);

      expect(response.body.message).toBe('Signed in successfully');
      expect(response.body.user.email).toBe(credentials.email);
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
    });

    it('should not sign in with invalid email', async () => {
      const credentials = {
        email: 'wrong@example.com',
        password: 'password123',
      };

      const response = await request(server)
        .post('/api/auth/signin')
        .send(credentials)
        .expect(401);

      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should not sign in with invalid password', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      const response = await request(server)
        .post('/api/auth/signin')
        .send(credentials)
        .expect(401);

      expect(response.body.message).toBe('Invalid credentials');
    });
  });

  describe('GET /api/auth/me', () => {
    let accessToken;
    let user;

    beforeEach(async () => {
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

    it('should get current user with valid token', async () => {
      const response = await request(server)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body.user.email).toBe('test@example.com');
      expect(response.body.user.name).toBe('Test User');
    });

    it('should not get user without token', async () => {
      const response = await request(server)
        .get('/api/auth/me')
        .expect(401);

      expect(response.body.message).toBe('Access token required');
    });

    it('should not get user with invalid token', async () => {
      const response = await request(server)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body.message).toBe('Invalid access token');
    });
  });

  describe('POST /api/auth/refresh', () => {
    let refreshToken;
    let user;

    beforeEach(async () => {
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

      refreshToken = response.body.refreshToken;
    });

    it('should refresh tokens with valid refresh token', async () => {
      const response = await request(server)
        .post('/api/auth/refresh')
        .send({ refreshToken })
        .expect(200);

      expect(response.body.message).toBe('Tokens refreshed successfully');
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
      expect(response.body.user.email).toBe('test@example.com');
    });

    it('should not refresh with invalid token', async () => {
      const response = await request(server)
        .post('/api/auth/refresh')
        .send({ refreshToken: 'invalid-token' })
        .expect(401);

      expect(response.body.message).toBe('Invalid refresh token');
    });

    it('should not refresh without token', async () => {
      const response = await request(server)
        .post('/api/auth/refresh')
        .send({})
        .expect(401);

      expect(response.body.message).toBe('Refresh token required');
    });
  });
});