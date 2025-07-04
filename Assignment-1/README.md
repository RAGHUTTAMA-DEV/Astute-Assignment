# Job Portal API (Assignment 1)

## Setup

1. Clone the repo and navigate to `Assignment-1`:
   ```sh
   cd Assignment-1
   python -m venv venv
   venv\Scripts\activate  # On Windows
   pip install django
   python manage.py migrate
   python manage.py runserver
   ```

2. Access the API at `http://127.0.0.1:8000/`

## API Endpoints

- `POST /api/create-company/` — Create a company
- `POST /api/post-job/` — Post a job
- `GET /api/jobs/` — List all jobs
- `POST /api/apply/` — Apply to a job
- `GET /api/applicants/<job_id>/` — List applicants for a job

## Notes
- All endpoints return JSON.
- No DRF used, only function-based views and JsonResponse.
- See code for request/response examples. 