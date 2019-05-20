from django.urls import path
from . import views

urlpatterns = [
    path('contacts/', views.contact),
    path('contacts/<int:pk>/', views.detail_contact),
    path('login/', views.login),
    path('logout/', views.logout),
    path('userlist/', views.UserList.as_view())
]