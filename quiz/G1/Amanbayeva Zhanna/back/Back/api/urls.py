from django.urls import path, re_path
from api import views, auth
from django.contrib import admin

urlpatterns = [
    path('api/contacts/', views.ContView.as_view()),
    path('api/contacts/<int:pk>/', views.ContDetailView.as_view()),
    path('api/login/', views.login),
    path('api/logout/', views.logout)

    # path('contacts/', views.Contacts),
    # path('contacts/<int:pk>/', views.Contacts_detail),
    # path('login/', views.login),
    # path('logout/', views.logout),

]
