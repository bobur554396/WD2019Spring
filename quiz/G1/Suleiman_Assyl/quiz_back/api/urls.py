from django.urls import path
from api import views
urlpatterns = [
    path('contacts/', views.ContactsAPIView.as_view()),
    path('contacts/<int:pk>/', views.ContactAPIView.as_view()),
    path('login/', views.login),
    path('logout/', views.logout)
]
