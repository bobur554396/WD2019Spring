from django.urls import path
from . import views

urlpatterns = [
    path('api/users/', views.UserList.as_view()),
    path('api/login/', views.login),
    path('api/logout/', views.logout),
    path('api/contacts/', views.ContactView.as_view())
]