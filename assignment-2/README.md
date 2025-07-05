# Blog Platform - Assignment 2

A blog platform with user authentication, post creation, comments, and likes.

## Features

- User registration and authentication
- Create, read, update posts
- Add comments to posts
- Like/unlike posts
- User profiles

## Tech Stack

- **Backend**: Django REST API
- **Frontend**: React with Vite
- **Database**:SQLite (development)
- **Deployment**: Render.com (backend), Netlify (frontend)

## Live Demo

- Frontend: https://client-a2.netlify.app
- Backend: https://astute-assignment-2.onrender.com

## Setup

### Backend
1. Create virtual environment: `python -m venv venv`
2. Activate: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)
3. Install dependencies: `pip install -r requirements.txt`
4. Run migrations: `python manage.py migrate`
5. Start server: `python manage.py runserver`

### Frontend
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`

## API Endpoints

- `POST /api/register/` - User registration
- `POST /api/login/` - User login
- `GET /api/list-posts/` - List posts
- `POST /api/create-post/` - Create post
- `POST /api/post/{id}/add-comment/` - Add comment
- `POST /api/post/{id}/like/` - Like post
- `POST /api/post/{id}/unlike/` - Unlike post

## Author

Raghuttama Dev 