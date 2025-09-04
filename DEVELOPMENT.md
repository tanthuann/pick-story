# Development Guide

## MongoDB with Docker Setup

This project uses MongoDB running in a Docker container for local development. This provides:
- ✅ Consistent environment across different machines
- ✅ Easy setup and teardown
- ✅ No need to install MongoDB locally
- ✅ Isolated data that won't conflict with other projects

## Prerequisites

1. **Docker Desktop** - Install from [docker.com](https://www.docker.com/products/docker-desktop/)
2. **Node.js 18+** - Install from [nodejs.org](https://nodejs.org/)
3. **Git** - Install from [git-scm.com](https://git-scm.com/)

## Setup Instructions

### 1. Start MongoDB

First, make sure Docker Desktop is running, then:

```bash
# Start MongoDB container
./scripts/start-mongo.sh
```

This will:
- Pull the MongoDB 7.0 Docker image
- Create a container named `pick-story-mongodb`
- Set up the database with proper users and indexes
- Make MongoDB available on `localhost:27017`

### 2. Start Backend API

```bash
cd backend
npm install
npm run start:dev
```

The backend will:
- Connect to the Docker MongoDB instance
- Start on `http://localhost:3001`
- Enable hot reload for development

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will:
- Start on `http://localhost:3000`
- Connect to the backend API
- Enable hot reload for development

## MongoDB Management

### Connection Details
- **Host**: localhost
- **Port**: 27017
- **Database**: pick-story
- **Username**: pickstory_user
- **Password**: pickstory_password
- **Connection URI**: `mongodb://pickstory_user:pickstory_password@localhost:27017/pick-story?authSource=pick-story`

### Useful Commands

**View container status:**
```bash
docker-compose ps
```

**View MongoDB logs:**
```bash
docker-compose logs mongodb
```

**Connect to MongoDB shell:**
```bash
docker exec -it pick-story-mongodb mongosh pick-story -u pickstory_user -p pickstory_password
```

**Stop MongoDB:**
```bash
./scripts/stop-mongo.sh
```

**Reset all data (delete everything):**
```bash
docker-compose down -v
```

### MongoDB Collections

The database includes these collections:
- `stories` - User-submitted stories
- `replies` - Replies to stories
- `userdailypicks` - Tracking daily story picks per user

## Troubleshooting

### Docker Issues

**Error: "Docker is not running"**
- Start Docker Desktop application
- Wait for it to fully start (whale icon in system tray)
- Try the command again

**Error: "Port 27017 already in use"**
- Another MongoDB instance is running
- Stop it: `brew services stop mongodb-community` (if installed via Homebrew)
- Or use a different port in `docker-compose.yml`

**Error: "Cannot connect to MongoDB"**
- Check if container is running: `docker-compose ps`
- Check logs: `docker-compose logs mongodb`
- Restart: `docker-compose restart mongodb`

### Backend Issues

**Error: "MongoServerError: Authentication failed"**
- MongoDB container might not be fully initialized
- Wait 30 seconds and try again
- Check if container is running: `docker-compose ps mongodb`

**Error: "ECONNREFUSED ::1:27017"**
- MongoDB container is not running
- Start it: `./scripts/start-mongo.sh`

### Environment Variables

Make sure you have the correct environment variables in `backend/.env`:

```bash
MONGODB_URI=mongodb://pickstory_user:pickstory_password@localhost:27017/pick-story?authSource=pick-story
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Data Persistence

- MongoDB data is stored in a Docker volume named `mongodb_data`
- Data persists between container restarts
- To completely reset data: `docker-compose down -v`

## Development Workflow

1. Start MongoDB: `./scripts/start-mongo.sh`
2. Start backend: `cd backend && npm run start:dev`
3. Start frontend: `cd frontend && npm run dev`
4. Develop and test your changes
5. When done: `./scripts/stop-mongo.sh`

## Production Notes

For production deployment, you'll want to:
- Use a managed MongoDB service (MongoDB Atlas, AWS DocumentDB, etc.)
- Update the `MONGODB_URI` environment variable
- Ensure proper security credentials
- The Docker setup is intended for local development only
