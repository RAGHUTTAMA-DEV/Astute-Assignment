from django.urls import path
from . import views

urlpatterns=[
    path('register/',views.register,name='register'),
    path('login/',views.user_login,name='login'),
    # path('logout/',views.logout,name='logout'),  # Uncomment if you implement logout
    path('create-post/',views.create_post,name='create_post'),
    path('list-posts/',views.list_posts,name='list_posts'),
    path('post/<int:id>/',views.post_detail,name='post_detail'),
    path('post/<int:id>/add-comment/',views.add_comment,name='add_comment'),
     path('post/<int:id>/like/',views.like_post,name='like_post'),  # Uncomment if you implement like_post
     path('post/<int:id>/unlike/',views.unlike_post,name='unlike_post'),  # Uncomment if you implement unlike_post
]