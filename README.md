# Writory

A minimal Medium-style clone built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Authentication**: JWT-based auth with access/refresh tokens
- **Posts**: Create, read, update, delete posts with markdown support
- **Comments**: Simple commenting system
- **Likes**: Toggle likes on posts
- **Image Uploads**: Local file storage with S3-compatible option
- **Search**: Full-text search across posts
- **Security**: Rate limiting, input validation, CORS protection

## Quick Start

### Prerequisites

- Node.js 18+ (check `.nvmrc`)
- MongoDB (or use Docker)
- npm or yarn

### Local Development

1. **Clone and install dependencies:**
   ```bash
   git clone <repo-url>
   cd writory
   npm run install:all
   ```

2. **Set up environment:**
   ```bash
   cp .env.example server/.env
   # Edit server/.env with your configuration
   ```

3. **Start with Docker (recommended):**
   ```bash
   docker-compose up -d mongodb
   npm run dev
   ```

   Or start MongoDB manually and run:
   ```bash
   npm run dev
   ```

4. **Seed the database:**
   ```bash
   npm run seed
   ```

   This creates a test user: `seed@writory.test` / `SeedPass123!`

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Docker Development

```bash
# Start all services
docker-compose up

# Start only database
docker-compose up -d mongodb

# View logs
docker-compose logs -f server
```

## API Documentation

See [docs/API.md](docs/API.md) for detailed API documentation.

## Testing

```bash
# Run all tests
npm test

# Run linting
npm run lint

# Format code
npm run format
```

## Project Structure

```
writory/
├── client/          # React frontend
├── server/          # Express backend
├── docs/           # Documentation
├── uploads/        # File uploads (local storage)
├── docker-compose.yml
└── README.md
```

## Environment Variables

Copy `.env.example` to `server/.env` and configure:

- `MONGODB_URI`: MongoDB connection string
- `JWT_ACCESS_SECRET`: Secret for access tokens
- `JWT_REFRESH_SECRET`: Secret for refresh tokens
- `CLIENT_URL`: Frontend URL for CORS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT