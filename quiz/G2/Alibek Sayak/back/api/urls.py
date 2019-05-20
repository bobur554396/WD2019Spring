from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('contacts/', views.ContactList.as_view()),
    path('contacts/<int:pk>/', views.ContactListDetail.as_view()),
    path('login/', views.login),
    path('logout/', views.logout),
]