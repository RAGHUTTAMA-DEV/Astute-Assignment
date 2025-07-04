from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from .models import Company, JobPost, Applicant

@csrf_exempt
@require_http_methods(["POST"])
def create_company(request):
    try:
        data = json.loads(request.body)
        name = data.get('name')
        location = data.get('location')
        description = data.get('description')
        if not (name and location and description):
            return JsonResponse({'error': 'Missing fields'}, status=400)
        company = Company.objects.create(name=name, location=location, description=description)
        return JsonResponse({'id': company.id, 'name': company.name, 'location': company.location, 'description': company.description, 'created_at': company.created_at}, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def post_job(request):
    try:
        data = json.loads(request.body)
        company_id = data.get('company_id')
        title = data.get('title')
        description = data.get('description')
        salary = data.get('salary')
        location = data.get('location')
        if not (company_id and title and description and salary and location):
            return JsonResponse({'error': 'Missing fields'}, status=400)
        try:
            company = Company.objects.get(id=company_id)
        except Company.DoesNotExist:
            return JsonResponse({'error': 'Company not found'}, status=404)
        job = JobPost.objects.create(company=company, title=title, description=description, salary=salary, location=location)
        return JsonResponse({'id': job.id, 'company': company.name, 'title': job.title, 'description': job.description, 'salary': job.salary, 'location': job.location, 'created_at': job.created_at}, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@require_http_methods(["GET"])
def list_jobs(request):
    jobs = JobPost.objects.select_related('company').all()
    jobs_list = [
        {
            'id': job.id,
            'company': job.company.name,
            'title': job.title,
            'description': job.description,
            'salary': job.salary,
            'location': job.location,
            'created_at': job.created_at
        } for job in jobs
    ]
    return JsonResponse({'jobs': jobs_list}, safe=False)

@csrf_exempt
@require_http_methods(["POST"])
def apply(request):
    try:
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        resume_link = data.get('resume_link')
        job_id = data.get('job_id')
        if not (name and email and resume_link and job_id):
            return JsonResponse({'error': 'Missing fields'}, status=400)
        try:
            job = JobPost.objects.get(id=job_id)
        except JobPost.DoesNotExist:
            return JsonResponse({'error': 'Job not found'}, status=404)
        applicant = Applicant.objects.create(name=name, email=email, resume_link=resume_link, job=job)
        return JsonResponse({'id': applicant.id, 'name': applicant.name, 'email': applicant.email, 'resume_link': applicant.resume_link, 'job': job.title, 'applied_at': applicant.applied_at}, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@require_http_methods(["GET"])
def list_applicants(request, job_id):
    try:
        job = JobPost.objects.get(id=job_id)
    except JobPost.DoesNotExist:
        return JsonResponse({'error': 'Job not found'}, status=404)
    applicants = Applicant.objects.filter(job=job)
    applicants_list = [
        {
            'id': applicant.id,
            'name': applicant.name,
            'email': applicant.email,
            'resume_link': applicant.resume_link,
            'applied_at': applicant.applied_at
        } for applicant in applicants
    ]
    return JsonResponse({'applicants': applicants_list}, safe=False)


def list_companies(request):
    try:
        companies = Company.objects.all()
        companies_list = [
            {
                'id': company.id,
                'name': company.name,
                'location': company.location,
                'description': company.description,
                'created_at': company.created_at
            } for company in companies  ]
        return JsonResponse({'companies': companies_list}, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)