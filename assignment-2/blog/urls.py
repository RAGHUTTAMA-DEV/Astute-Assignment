from django.urls import path
from . import views

urlpatterns=[
    path('register/',views.register,name='register'),
    path('login/',views.user_login,name='login'),
     path('logout/',views.user_logout,name='logout'),  
    path('create-post/',views.create_post,name='create_post'),
    path('list-posts/',views.list_posts,name='list_posts'),
    path('post/<int:id>/',views.post_detail,name='post_detail'),
    path('post/<int:id>/add-comment/',views.add_comment,name='add_comment'),
    path('comment/<int:id>/edit/',views.edit_comment,name='edit_comment'),
    path('comment/<int:id>/delete/',views.delete_comment,name='delete_comment'),
     path('post/<int:id>/like/',views.like_post,name='like_post'),  
     path('post/<int:id>/unlike/',views.unlike_post,name='unlike_post'),  
]