#!/bin/bash

# Stop MongoDB Docker container
echo "🛑 Stopping MongoDB Docker container..."

docker-compose down

echo "✅ MongoDB container stopped successfully!"
echo ""
echo "📋 Available commands:"
echo "   - Start MongoDB: ./scripts/start-mongo.sh"
echo "   - Remove all data: docker-compose down -v"
