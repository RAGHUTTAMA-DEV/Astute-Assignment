from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .middleware import LoginRequiredMiddleware
from django.views.decorators.http import require_http_methods
from .models import Post, Comment, Like
from django.core.paginator import Paginator
from django.views.decorators.csrf import ensure_csrf_cookie
import json

def cors_preflight(request):
    """Handle CORS preflight requests"""
    response = JsonResponse({'status': 'ok'})
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With"
    return response

@require_http_methods(["GET"])
def test_auth(request):
    """Test endpoint to check authentication status"""
    return JsonResponse({
        'authenticated': request.user.is_authenticated,
        'user': request.user.username if request.user.is_authenticated else None,
        'session_id': request.session.session_key,
        'cookies': dict(request.COOKIES),
        'headers': dict(request.headers)
    })

@csrf_exempt
@require_http_methods(["POST"])
def register(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        if not username or not email or not password:
            return JsonResponse({'error': 'All fields are required.'}, status=400)
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists.'}, status=400)
        user = User.objects.create_user(username=username, email=email, password=password)
        return JsonResponse({'message': 'User registered successfully.'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def user_login(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return JsonResponse({'error': 'Username and password required.'}, status=400)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Set session expiry
            request.session.set_expiry(1209600)  # 2 weeks
            return JsonResponse({
                'message': 'Login successful.',
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'id': user.id
                }
            })
        else:
            return JsonResponse({'error': 'Invalid credentials.'}, status=401)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
@require_http_methods(["GET"])
@LoginRequiredMiddleware.require_login
@csrf_exempt
def user_info(request):
    return JsonResponse({
        'username': request.user.username,
        'email': request.user.email,
        'id': request.user.id
    })

@require_http_methods(["POST"])
@LoginRequiredMiddleware.require_login
@csrf_exempt
def user_logout(request):
    logout(request)
    return JsonResponse({'message': 'Logout successful.'})

@csrf_exempt
@require_http_methods(["POST"])
@LoginRequiredMiddleware.require_login
def create_post(request):
    try:
        data = json.loads(request.body)
        title = data.get('title')
        content = data.get('content')
        link = data.get('link', None)
        if not title or not content:
            return JsonResponse({'error': 'Title and content are required.'}, status=400)
        post = Post.objects.create(
            author=request.user,
            title=title,
            content=content,
            link=link
        )
        return JsonResponse({'message': 'Post created successfully.', 'post_id': post.id})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@require_http_methods(["GET"])
@csrf_exempt
def list_posts(request):
    page = int(request.GET.get('page', 1))
    size = int(request.GET.get('size', 10))
    posts = Post.objects.select_related('author').order_by('-created_at')
    paginator = Paginator(posts, size)
    page_obj = paginator.get_page(page)
    posts_list = [
        {
            'id': post.id,
            'title': post.title,
            'author': post.author.username,
            'content': post.content,
            'link': post.link,
            'created_at': post.created_at,
        }
        for post in page_obj
    ]
    return JsonResponse({
        'posts': posts_list,
        'page': page_obj.number,
        'num_pages': paginator.num_pages,
        'total_posts': paginator.count,
    })

@require_http_methods(["GET"])
@LoginRequiredMiddleware.require_login
@csrf_exempt
def post_detail(request, id):
    try:
        post = Post.objects.select_related('author').get(id=id)
        comments = Comment.objects.filter(post=post).select_related('author').order_by('created_at')
        comments_list = [
            {
                'id': comment.id,
                'author': comment.author.username,
                'content': comment.content,
                'created_at': comment.created_at,
            }
            for comment in comments
        ]
        post_data = {
            'id': post.id,
            'title': post.title,
            'author': post.author.username,
            'content': post.content,
            'link': post.link,
            'created_at': post.created_at,
            'comments': comments_list,
        }
        return JsonResponse(post_data)
    except Post.DoesNotExist:
        return JsonResponse({'error': 'Post not found.'}, status=404)

@require_http_methods(["POST"])
@LoginRequiredMiddleware.require_login
@csrf_exempt
def add_comment(request, id):
    try:
        post = Post.objects.get(id=id)
        data = json.loads(request.body)
        content = data.get('content')
        if not content:
            return JsonResponse({'error': 'Content is required.'}, status=400)
        comment = Comment.objects.create(
            post=post,
            author=request.user,
            content=content
        )
        return JsonResponse({'message': 'Comment added successfully.', 'comment_id': comment.id})
    except Post.DoesNotExist:
        return JsonResponse({'error': 'Post not found.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@require_http_methods(["POST"])
@LoginRequiredMiddleware.require_login
@csrf_exempt
def like_post(request,id):
    try:
        post=Post.objects.get(id=id)
        like=Like.objects.create(post=post,user=request.user)
        return JsonResponse({'message':'Post liked successfully.',
                             'like':{
                                'id':like.id,
                                'author':like.user.username,
                                'created_at':like.created_at,
                             }})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    

@require_http_methods(["POST"])
@LoginRequiredMiddleware.require_login
@csrf_exempt
def unlike_post(request,id):
    try:
        post=Post.objects.get(id=id)
        like=Like.objects.filter(post=post,user=request.user).first()
        if like:
            like.delete()
            return JsonResponse({'message':'Post unliked successfully.',
                                 'like':{
                                    'id':like.id,
                                    'author':like.user.username,
                                    'created_at':like.created_at,
                                 }})
        else:
            return JsonResponse({'error':'Like not found.'},status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["PUT"])
@LoginRequiredMiddleware.require_login
def edit_comment(request, id):
    try:
        comment = Comment.objects.get(id=id)
        if comment.author != request.user:
            return JsonResponse({'error': 'Permission denied.'}, status=403)
        data = json.loads(request.body)
        content = data.get('content')
        if not content:
            return JsonResponse({'error': 'Content is required.'}, status=400)
        comment.content = content
        comment.save()
        return JsonResponse({'message': 'Comment updated successfully.'})
    except Comment.DoesNotExist:
        return JsonResponse({'error': 'Comment not found.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["DELETE"])
@LoginRequiredMiddleware.require_login
def delete_comment(request, id):
    try:
        comment = Comment.objects.get(id=id)
        if comment.author != request.user:
            return JsonResponse({'error': 'Permission denied.'}, status=403)
        comment.delete()
        return JsonResponse({'message': 'Comment deleted successfully.'})
    except Comment.DoesNotExist:
        return JsonResponse({'error': 'Comment not found.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    

    