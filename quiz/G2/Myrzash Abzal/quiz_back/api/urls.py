from django.urls import path
from api import views

urlpatterns = [
    path('contacts/', views.ContactList.as_view()),
    path('contacts/<int:pk>/', views.ContactDetail.as_view()),
    path('login/', views.login),
    path('logout/', views.logout)
]
