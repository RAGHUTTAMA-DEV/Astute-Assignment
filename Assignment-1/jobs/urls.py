from django.urls import path
from . import views

urlpatterns = [
    path('api/create-company/', views.create_company, name='create_company'),
    path('api/post-job/', views.post_job, name='post_job'),
    path('api/jobs/', views.list_jobs, name='list_jobs'),
    path('api/apply/', views.apply, name='apply'),
    path('api/applicants/<int:job_id>/', views.list_applicants, name='list_applicants'),
] 