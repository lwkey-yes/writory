# Writory Project Structure

```
writory/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions CI/CD pipeline
├── .husky/
│   └── pre-commit                 # Git pre-commit hooks
├── client/                        # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── PostCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx    # Authentication context
│   │   ├── pages/
│   │   │   ├── EditPost.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── SignIn.jsx
│   │   │   ├── SignUp.jsx
│   │   │   └── Write.jsx
│   │   ├── services/
│   │   │   └── api.js             # Axios API client
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .eslintrc.cjs
│   ├── .prettierrc
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── docs/
│   └── API.md                     # API documentation
├── server/                        # Express backend application
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js        # MongoDB connection
│   │   ├── middleware/
│   │   │   ├── auth.js            # Authentication middleware
│   │   │   ├── errorHandler.js    # Global error handler
│   │   │   └── validation.js      # Request validation
│   │   ├── models/
│   │   │   ├── Comment.js         # Comment model
│   │   │   ├── Like.js            # Like model
│   │   │   ├── Post.js            # Post model
│   │   │   ├── RefreshToken.js    # Refresh token model
│   │   │   └── User.js            # User model
│   │   ├── routes/
│   │   │   ├── auth.js            # Authentication routes
│   │   │   ├── posts.js           # Posts routes
│   │   │   └── upload.js          # File upload routes
│   │   ├── scripts/
│   │   │   └── seed.js            # Database seeding script
│   │   ├── utils/
│   │   │   ├── email.js           # Email utilities (stub)
│   │   │   ├── jwt.js             # JWT utilities
│   │   │   └── sanitize.js        # Markdown sanitization
│   │   └── server.js              # Main server file
│   ├── tests/
│   │   ├── auth.test.js           # Authentication tests
│   │   └── posts.test.js          # Posts tests
│   ├── .env.example
│   ├── .eslintrc.js
│   ├── .prettierrc
│   ├── babel.config.js
│   ├── Dockerfile
│   └── package.json
├── uploads/                       # File upload directory (created at runtime)
├── .env.example                   # Environment variables template
├── .gitignore
├── .nvmrc                         # Node.js version specification
├── docker-compose.yml             # Docker services configuration
├── package.json                   # Root package.json for scripts
├── package-lock.json
├── PROJECT_STRUCTURE.md           # This file
└── README.md                      # Main documentation
```

## Key Features by Directory

### `/client` - React Frontend
- **Vite** for fast development and building
- **Tailwind CSS** for styling with custom prose styles
- **React Router** for client-side routing
- **Axios** for API communication with interceptors
- **React Hot Toast** for notifications
- **React Markdown** for rendering markdown content
- **Lucide React** for icons
- **Context API** for state management

### `/server` - Express Backend
- **Express.js** web framework
- **MongoDB** with Mongoose ODM
- **JWT** authentication with access/refresh tokens
- **bcrypt** for password hashing
- **Helmet** for security headers
- **CORS** protection
- **Rate limiting** for API protection
- **Multer** for file uploads
- **Marked** for markdown processing
- **DOMPurify** for HTML sanitization
- **Jest & Supertest** for testing

### `/docs` - Documentation
- Comprehensive API documentation
- cURL examples for all endpoints
- Request/response schemas

### `/.github` - CI/CD
- GitHub Actions workflow
- Automated testing on multiple Node.js versions
- Security auditing
- Docker build testing

## Development Workflow

1. **Setup**: `npm run install:all`
2. **Development**: `npm run dev` (runs both client and server)
3. **Testing**: `npm test`
4. **Linting**: `npm run lint`
5. **Seeding**: `npm run seed`

## Production Deployment

1. **Docker**: `docker-compose up`
2. **Manual**: Build client, start server with production env
3. **Environment**: Copy `.env.example` to `server/.env` and configure

## Security Features

- JWT access tokens (short-lived) + refresh tokens (revocable)
- Password hashing with bcrypt (salt rounds: 12)
- Rate limiting on authentication endpoints
- CORS protection
- Input validation and sanitization
- Markdown content sanitization
- File upload restrictions (type, size)
- Helmet security headers

## Database Schema

- **Users**: Authentication, profile info
- **Posts**: Content, metadata, relationships
- **Comments**: User comments on posts
- **Likes**: User likes on posts
- **RefreshTokens**: Revocable refresh tokens

## API Endpoints

- **Auth**: `/api/auth/*` - Authentication & user management
- **Posts**: `/api/posts/*` - CRUD operations, search, pagination
- **Upload**: `/api/upload/*` - File upload handling
- **Health**: `/api/health` - Service health check