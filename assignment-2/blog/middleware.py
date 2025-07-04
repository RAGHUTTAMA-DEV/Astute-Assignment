from django.http import JsonResponse

class LoginRequiredMiddleware:
    def __init__(self,get_response):
        self.get_response=get_response

    def __call__(self,request):
        if not request.user.is_authenticated:
            return JsonResponse({'error':'Login required'},status=401)
        return self.get_response(request)
    
    @staticmethod
    def require_login(view_func):
        def wrapper(request,*args,**kwargs):
            if not request.user.is_authenticated:
                return JsonResponse({'error':'Login required'},status=401)
            return view_func(request,*args,**kwargs)
        return wrapper



