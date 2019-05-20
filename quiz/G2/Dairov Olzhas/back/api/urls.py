from django.urls import path
from api import views, auth
urlpatterns = [
    path('api/contacts/', views.ContactsList.as_view()),
    path('api/contacts/<int:pk>/', views.ContactView.as_view()),
    path('api/login/', auth.login),
    path('api/logout/', auth.logout)
]