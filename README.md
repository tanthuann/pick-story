# Pick Story

A story sharing platform where users can submit stories, view stories with replies, and participate in a daily story reply system.

## Features

### Frontend (Next.js)
- **Section 1**: Story input form with save functionality
- **Section 2**: Display stories with their replies
- **Section 3**: Daily story picker (1 story per day) with reply functionality
- **Reply System**: Modal popup for replying to stories

### Backend (NestJS)
- RESTful APIs for stories and replies
- MongoDB integration with Mongoose
- Daily story picking limit enforcement
- Random story selection

### Technology Stack
- **Frontend**: Next.js 14 (App Router), Tailwind CSS 4, shadcn/ui components
- **Backend**: NestJS, MongoDB, Mongoose
- **CI/CD**: GitHub Actions, GitHub Pages deployment

## Project Structure

```
demo-la/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages and API routes
│   │   ├── components/      # React components
│   │   └── lib/             # Utility functions
│   └── next.config.ts       # Next.js configuration
├── backend/                 # NestJS backend application
│   ├── src/
│   │   ├── schemas/         # MongoDB schemas
│   │   ├── stories/         # Stories module
│   │   └── replies/         # Replies module
│   └── package.json
└── .github/workflows/       # CI/CD workflows
```

## Development

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Quick Start

1. **Start MongoDB with Docker:**
```bash
./scripts/start-mongo.sh
```

2. **Start Backend:**
```bash
cd backend
npm install
npm run start:dev
```

3. **Start Frontend:**
```bash
cd frontend
npm install
npm run dev
```

4. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### MongoDB Management

**Start MongoDB:**
```bash
./scripts/start-mongo.sh
```

**Stop MongoDB:**
```bash
./scripts/stop-mongo.sh
```

**Connect to MongoDB shell:**
```bash
docker exec -it pick-story-mongodb mongosh pick-story -u pickstory_user -p pickstory_password
```

**View MongoDB logs:**
```bash
docker-compose logs mongodb
```

**Reset all data:**
```bash
docker-compose down -v
```

## Environment Variables

### Backend (.env)
```bash
# MongoDB Configuration - Docker Local Setup
MONGODB_URI=mongodb://pickstory_user:pickstory_password@localhost:27017/pick-story?authSource=pick-story

# Application Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```bash
BACKEND_URL=http://localhost:3001
```

## API Endpoints

### Stories
- `GET /stories` - Get paginated stories
- `POST /stories` - Create a new story
- `GET /stories/random` - Get random story (daily limit)
- `GET /stories/:id/replies` - Get story with replies

### Replies
- `POST /replies` - Create a reply to a story
- `GET /replies/story/:storyId` - Get replies for a story

## Deployment

The project is configured for deployment to GitHub Pages using GitHub Actions. The workflow:

1. Builds the Next.js frontend as a static export
2. Deploys to GitHub Pages automatically on push to main branch

## Daily Limit Feature

Users can only pick one random story per day. The system tracks this using:
- User identification (IP address)
- Date-based filtering
- MongoDB unique indexes to prevent duplicate picks per day
