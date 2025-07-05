# Job Portal - Assignment 1

A job portal application built with Django and React.

## Features

- Company registration and job posting
- Job listing and search functionality
- Applicant management system
- User authentication

## Tech Stack

- **Backend**: Django REST API
- **Frontend**: React with Vite
- **Database**: PostgreSQL (production), SQLite (development)
- **Deployment**: Render.com (backend), Netlify (frontend)

## Live Demo

- Frontend: https://client-a1.netlify.app
- Backend: https://astute-assignment-1.onrender.com

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

- `GET /api/companies/` - List companies
- `POST /api/companies/` - Create company
- `GET /api/jobs/` - List jobs
- `POST /api/jobs/` - Create job
- `GET /api/applicants/` - List applicants

## Author

Raghuttama 