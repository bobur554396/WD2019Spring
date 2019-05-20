from django.urls import  path
from api import views

urlpatterns = [
    path('contacts/', views.contacts.as_view()),
    path('contacts/<int:pk>/', views.contact_detail.as_view()),
    path('login/', views.login),
    path('logout/', views.logout)
]