# Django Job Portal API - Render Deployment Guide

## Prerequisites
- A Render account (free tier available)
- Your Django project pushed to a Git repository (GitHub, GitLab, etc.)

## Files Created for Deployment
- `requirements.txt` - Python dependencies
- `build.sh` - Build script for Render
- `render.yaml` - Render configuration
- Updated `settings.py` - Production-ready settings

## Deployment Steps

### 1. Push to Git Repository
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Deploy on Render

#### Option A: Using render.yaml (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Blueprint"
3. Connect your Git repository
4. Render will automatically detect the `render.yaml` file
5. Click "Apply" to deploy

#### Option B: Manual Setup
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your Git repository
4. Configure the service:
   - **Name**: `job-portal-api`
   - **Environment**: `Python 3`
   - **Build Command**: `./build.sh`
   - **Start Command**: `gunicorn jobportal.wsgi:application`
   - **Plan**: Free (or choose paid plan)

### 3. Environment Variables
Add these in Render dashboard under "Environment":
- `SECRET_KEY`: Generate a new secret key
- `DEBUG`: Set to `False` for production
- `RENDER_EXTERNAL_HOSTNAME`: Will be auto-set by Render

### 4. Database Setup
For production, consider using:
- **PostgreSQL**: Add a PostgreSQL service in Render
- **SQLite**: Works for small projects (not recommended for production)

## Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

## API Endpoints
- **Admin**: `/admin/`
- **Jobs List**: `/api/jobs/`
- **Job Detail**: `/api/jobs/<id>/`
- **Companies**: `/api/companies/`
- **Applicants**: `/api/applicants/`

## Troubleshooting
- Check Render logs for build errors
- Ensure all dependencies are in `requirements.txt`
- Verify static files are being collected
- Check environment variables are set correctly

## Security Notes
- Never commit `.env` files
- Use strong secret keys in production
- Enable HTTPS (automatic on Render)
- Set `DEBUG=False` in production 