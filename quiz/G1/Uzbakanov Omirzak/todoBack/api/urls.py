from django.contrib import admin
from django.urls import path, include

from quiz.api import views

urlpatterns = [
    path('posts/', views.ContactsList.as_view()),
    path('posts/<int:pk>/', views.ContactDetail.as_view()),
    path('login/', views.login),
    path('logout/', views.logout)
]
