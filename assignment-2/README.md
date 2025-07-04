# Blog + Comment System API (Assignment 2)

## Setup

1. Clone the repo and navigate to `assignment-2`:
   ```sh
   cd assignment-2
   python -m venv venv
   venv\Scripts\activate  # On Windows
   pip install django
   python manage.py migrate
   python manage.py runserver
   ```

2. Access the API at `http://127.0.0.1:8000/`

## API Endpoints

- `POST /register/` — Register a user
- `POST /login/` — Login
- `POST /create-post/` — Create a post (auth required)
- `GET /list-posts/` — List posts (with pagination)
- `GET /post/<id>/` — Post detail (with comments)
- `POST /post/<id>/add-comment/` — Add comment (auth required)

## Notes
- All endpoints return JSON.
- No DRF used, only function-based views and JsonResponse.
- See code for request/response examples. 