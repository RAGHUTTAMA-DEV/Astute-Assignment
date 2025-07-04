# Deployment Guide for Render

## Prerequisites
- Render account
- GitHub repository with your code

## Deployment Steps

### 1. Connect to Render
1. Go to [render.com](https://render.com)
2. Sign up/Login with your GitHub account
3. Click "New +" and select "Web Service"

### 2. Connect Repository
1. Connect your GitHub repository
2. Select the repository containing this Django project

### 3. Configure Build Settings
- **Name**: `blog-api` (or your preferred name)
- **Environment**: `Python 3`
- **Build Command**: `./build.sh`
- **Start Command**: `gunicorn blogapi.wsgi:application`

### 4. Environment Variables
Add these environment variables in Render dashboard:
- `SECRET_KEY`: Generate a new Django secret key
- `DEBUG`: Set to `False` for production
- `DATABASE_URL`: Will be automatically provided by Render

### 5. Database Setup
1. Create a new PostgreSQL database in Render
2. The `DATABASE_URL` will be automatically set
3. Your app will automatically migrate the database

### 6. Deploy
1. Click "Create Web Service"
2. Render will automatically build and deploy your app
3. Your API will be available at the provided URL

## API Endpoints
Your deployed API will have these endpoints:
- `https://your-app-name.onrender.com/` - Main API
- `https://your-app-name.onrender.com/admin/` - Django Admin
- `https://your-app-name.onrender.com/blog/` - Blog endpoints

## Important Notes
- The build script automatically runs migrations
- Static files are served via WhiteNoise
- Database is automatically configured for PostgreSQL
- CORS is enabled for frontend integration 