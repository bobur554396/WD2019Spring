from django.urls import path, re_path
from . import views
urlpatterns = [
    path('contacts/', views.ContactList.as_view()),
    path('contacts/<int:pk>/', views.Contact_detail.as_view()),
    path('login/', views.login),
    path('logout/', views.logout),
    path('users/', views.UserList.as_view()),
]
