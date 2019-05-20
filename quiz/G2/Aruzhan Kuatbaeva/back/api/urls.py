from django.urls import path
from api import views
from api import auth

urlpatterns = [
    path('contacts/', views.post_list),
    path('contacts/<int:pk>/', views.post_detail),
    path('login/', auth.login),
    path('logout/', auth.logout)
]