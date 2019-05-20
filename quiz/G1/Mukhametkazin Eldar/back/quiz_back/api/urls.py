from django.contrib import admin
from django.urls import path
from api import views
from api import auth

urlpatterns = [
    path('contacts/', views.ContactList.as_view()),
    path('contacts/<int:pk>/', views.Contact_detail.as_view()),
    path('login/', auth.login),
    path('logout/', auth.logout)
]
