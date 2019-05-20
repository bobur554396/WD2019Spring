from django.contrib import admin
from django.urls import path, include

from api import views

urlpatterns = [
    path('posts/', views.PostList.as_view()),
    path('posts/<int:pk>/', views.PostDetail.as_view()),
    path('posts/<int:pk>/like/', views.PutLike.as_view()),
    path('login/', views.login),
    path('logout/', views.logout)
]
