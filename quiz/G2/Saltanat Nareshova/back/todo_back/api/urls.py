from django.urls import path
from api import views


urlpatterns = [
    path('contactlist/', views.contactlist),
    path('login/', views. login),
    path('logout/', views.logout),
    path('contactlist/<int:pk>/', views.contactdetail)
]