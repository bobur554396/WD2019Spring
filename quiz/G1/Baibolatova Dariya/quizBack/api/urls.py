from django.urls import path, re_path
from api import views

urlpatterns = [
    path('api/contacts/', views.contacts.as_view()),
    path('api/contacts/<int:pk>/', views.contacts_detail.as_view()),
    path('api/login/', views.UserLogin),
    path('api/logout/', views.UserLogout),
]

