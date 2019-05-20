from django.contrib import admin
from django.urls import path, include
from api import views

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('contacts/', views.Contacts.as_view()),
    path('contacts/<int:pk>/', views.ContactDetailed.as_view()),
    path('login/', views.login),
    path('logout/', views.logout),
]
