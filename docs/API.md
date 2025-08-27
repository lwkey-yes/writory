# Writory API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

### Endpoints

#### POST /auth/signup
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "_id": "...",
    "email": "user@example.com",
    "name": "John Doe",
    "isEmailVerified": false,
    "createdAt": "...",
    "updatedAt": "..."
  },
  "accessToken": "...",
  "refreshToken": "..."
}
```

#### POST /auth/signin
Sign in with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Signed in successfully",
  "user": { ... },
  "accessToken": "...",
  "refreshToken": "..."
}
```

#### POST /auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "..."
}
```

#### GET /auth/me
Get current user information. Requires authentication.

#### POST /auth/signout
Sign out and revoke refresh token. Requires authentication.

**Request Body:**
```json
{
  "refreshToken": "..."
}
```

## Posts

#### GET /posts
Get all published posts with pagination and search.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Posts per page (default: 10, max: 50)
- `search` (string): Search in title, body, and tags
- `tags` (string|array): Filter by tags
- `author` (string): Filter by author ID
- `sort` (string): Sort order - 'newest', 'oldest', 'popular' (default: 'newest')

**Response:**
```json
{
  "posts": [
    {
      "_id": "...",
      "title": "Post Title",
      "slug": "post-title",
      "excerpt": "Post excerpt...",
      "tags": ["tag1", "tag2"],
      "author": {
        "_id": "...",
        "name": "Author Name",
        "avatar": "..."
      },
      "featuredImage": "...",
      "isPublished": true,
      "publishedAt": "...",
      "likesCount": 5,
      "commentsCount": 3,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

#### GET /posts/:slug
Get a single post by slug.

**Response:**
```json
{
  "_id": "...",
  "title": "Post Title",
  "slug": "post-title",
  "body": "Full post content in markdown...",
  "excerpt": "Post excerpt...",
  "tags": ["tag1", "tag2"],
  "author": {
    "_id": "...",
    "name": "Author Name",
    "avatar": "...",
    "bio": "Author bio..."
  },
  "featuredImage": "...",
  "isPublished": true,
  "publishedAt": "...",
  "likesCount": 5,
  "commentsCount": 3,
  "isLiked": false,
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### POST /posts
Create a new post. Requires authentication.

**Request Body:**
```json
{
  "title": "Post Title",
  "body": "Post content in markdown...",
  "excerpt": "Optional excerpt",
  "tags": ["tag1", "tag2"],
  "featuredImage": "http://example.com/image.jpg",
  "isPublished": true
}
```

#### PUT /posts/:id
Update a post. Requires authentication and ownership.

**Request Body:** Same as POST /posts

#### DELETE /posts/:id
Delete a post. Requires authentication and ownership.

#### GET /posts/user/me
Get current user's posts (including drafts). Requires authentication.

#### POST /posts/:id/like
Toggle like on a post. Requires authentication.

**Response:**
```json
{
  "message": "Post liked",
  "isLiked": true,
  "likesCount": 6
}
```

#### GET /posts/:id/comments
Get comments for a post.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Comments per page (default: 20, max: 50)

#### POST /posts/:id/comments
Add a comment to a post. Requires authentication.

**Request Body:**
```json
{
  "content": "Comment text..."
}
```

## File Upload

#### POST /upload/image
Upload an image file. Requires authentication.

**Request:** Multipart form data with 'image' field
- Accepted formats: JPEG, PNG, WebP
- Max size: 5MB

**Response:**
```json
{
  "message": "File uploaded successfully",
  "url": "/uploads/image-123456789.jpg",
  "filename": "image-123456789.jpg",
  "originalName": "my-image.jpg",
  "size": 1024000
}
```

## Error Responses

All endpoints may return error responses in this format:

```json
{
  "message": "Error description",
  "errors": ["Detailed error messages..."]
}
```

Common HTTP status codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

## Rate Limiting

- General endpoints: 100 requests per 15 minutes per IP
- Authentication endpoints: 5 requests per 15 minutes per IP

## Example cURL Commands

### Sign up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### Sign in
```bash
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get posts
```bash
curl http://localhost:5000/api/posts
```

### Create a post
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "title": "My First Post",
    "body": "# Hello World\n\nThis is my first post!",
    "tags": ["hello", "first-post"],
    "isPublished": true
  }'
```

### Upload an image
```bash
curl -X POST http://localhost:5000/api/upload/image \
  -H "Authorization: Bearer <access_token>" \
  -F "image=@/path/to/image.jpg"
```

### Like a post
```bash
curl -X POST http://localhost:5000/api/posts/<post_id>/like \
  -H "Authorization: Bearer <access_token>"
```

### Add a comment
```bash
curl -X POST http://localhost:5000/api/posts/<post_id>/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "content": "Great post!"
  }'
```