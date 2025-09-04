#!/bin/bash

# Start MongoDB with Docker Compose
echo "🚀 Starting MongoDB with Docker..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Start MongoDB container
docker-compose up -d mongodb

# Wait for MongoDB to be ready
echo "⏳ Waiting for MongoDB to be ready..."
sleep 10

# Check if MongoDB is running
if docker-compose ps mongodb | grep -q "Up"; then
    echo "✅ MongoDB is running successfully!"
    echo "📊 Connection details:"
    echo "   - Host: localhost"
    echo "   - Port: 27017"
    echo "   - Database: pick-story"
    echo "   - Username: pickstory_user"
    echo "   - Password: pickstory_password"
    echo ""
    echo "🔗 Connection URI: mongodb://pickstory_user:pickstory_password@localhost:27017/pick-story?authSource=pick-story"
    echo ""
    echo "📋 Available commands:"
    echo "   - Stop MongoDB: docker-compose down"
    echo "   - View logs: docker-compose logs mongodb"
    echo "   - Connect to shell: docker exec -it pick-story-mongodb mongosh pick-story -u pickstory_user -p pickstory_password"
else
    echo "❌ Failed to start MongoDB. Check Docker logs:"
    docker-compose logs mongodb
    exit 1
fi
