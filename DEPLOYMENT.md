# Deployment Guide

This guide covers how to deploy the Pick Story application in different environments.

## GitHub Pages (Demo Deployment) 🚀

Perfect for showcasing the application with demo data.

### Quick Setup

1. **Fork or clone this repository**
2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Set Source to "GitHub Actions"
3. **Push to main branch** - deployment happens automatically!
4. **Access your demo:** `https://yourusername.github.io/demo-la/`

### How it Works

- GitHub Actions builds the Next.js app as a static export
- Demo data is included as static JSON files
- All UI functionality works, but form submissions are simulated
- Perfect for portfolio demos and proof-of-concept presentations

### Customization

To customize for your GitHub username:

1. Update the repository name or `basePath` in `.github/workflows/deploy.yml`
2. Modify demo data in the workflow's "Create static API responses" step
3. Update URLs in `README.md` and documentation

## Local Development 💻

### Prerequisites
- Docker Desktop
- Node.js 18+
- Git

### Setup
```bash
# 1. Start MongoDB
./scripts/start-mongo.sh

# 2. Start Backend
cd backend
npm install
npm run start:dev

# 3. Start Frontend  
cd frontend
npm install
npm run dev
```

Access at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- MongoDB: localhost:27017

## Production Deployment 🌐

For full functionality with real database and API.

### Option 1: Vercel + Railway

**Frontend (Vercel):**
1. Connect your GitHub repo to Vercel
2. Set environment variables:
   ```
   BACKEND_URL=https://your-backend-url.railway.app
   ```
3. Deploy automatically on git push

**Backend (Railway):**
1. Connect your GitHub repo to Railway
2. Set environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pickstory
   PORT=3001
   NODE_ENV=production
   FRONTEND_URL=https://your-app.vercel.app
   ```
3. Deploy automatically on git push

### Option 2: Netlify + Render

**Frontend (Netlify):**
1. Connect GitHub repo
2. Build settings:
   ```
   Build command: cd frontend && npm run build
   Publish directory: frontend/out
   ```
3. Environment variables:
   ```
   BACKEND_URL=https://your-backend.onrender.com
   ```

**Backend (Render):**
1. Create new Web Service from GitHub
2. Build settings:
   ```
   Build command: cd backend && npm install
   Start command: cd backend && npm run start:prod
   ```
3. Environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=production
   FRONTEND_URL=https://your-app.netlify.app
   ```

### Option 3: Docker Deployment

**Docker Compose for Production:**

```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:7.0
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: secure_password
    volumes:
      - mongodb_data:/data/db
    
  backend:
    build: ./backend
    depends_on:
      - mongodb
    environment:
      MONGODB_URI: mongodb://admin:secure_password@mongodb:27017/pickstory?authSource=admin
      NODE_ENV: production
    ports:
      - "3001:3001"
      
  frontend:
    build: ./frontend
    depends_on:
      - backend
    environment:
      BACKEND_URL: http://backend:3001
    ports:
      - "3000:3000"

volumes:
  mongodb_data:
```

### Database Options

**MongoDB Atlas (Recommended):**
- Managed MongoDB service
- Free tier available
- Global deployment
- Automatic backups

**Self-hosted MongoDB:**
- More control and customization
- Requires server management
- Good for on-premise deployments

## Environment Variables Reference

### Backend
```bash
# Database
MONGODB_URI=mongodb://user:pass@host:port/database

# Server
PORT=3001
NODE_ENV=production

# CORS
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend
```bash
# API Connection
BACKEND_URL=https://your-backend-domain.com

# Static Export (GitHub Pages only)
NEXT_PUBLIC_IS_STATIC_EXPORT=true
NEXT_PUBLIC_BASE_PATH=/demo-la
```

## Troubleshooting

### GitHub Pages Issues

**Build Fails:**
- Check GitHub Actions logs
- Ensure all dependencies are in `package.json`
- Verify Next.js configuration

**App Doesn't Load:**
- Check browser console for errors
- Verify `basePath` configuration
- Ensure static files are generated correctly

### Production Issues

**API Connection Errors:**
- Verify `BACKEND_URL` environment variable
- Check CORS configuration
- Ensure backend is accessible

**Database Connection:**
- Verify MongoDB connection string
- Check network access and authentication
- Review database user permissions

**Performance Issues:**
- Enable caching headers
- Optimize images and assets
- Use CDN for static resources

## Security Considerations

### Production Checklist
- [ ] Use strong database passwords
- [ ] Enable MongoDB authentication
- [ ] Configure proper CORS origins
- [ ] Use HTTPS for all endpoints
- [ ] Set up environment-specific secrets
- [ ] Enable rate limiting
- [ ] Regular security updates

### Environment Secrets
- Never commit `.env` files
- Use platform-specific secret management
- Rotate credentials regularly
- Monitor for security vulnerabilities

## Monitoring and Maintenance

### Recommended Tools
- **Uptime Monitoring:** UptimeRobot, Pingdom
- **Error Tracking:** Sentry, LogRocket
- **Analytics:** Google Analytics, Plausible
- **Performance:** Lighthouse, Web Vitals

### Backup Strategy
- Regular database backups
- Version control for code
- Infrastructure as Code
- Disaster recovery plan
