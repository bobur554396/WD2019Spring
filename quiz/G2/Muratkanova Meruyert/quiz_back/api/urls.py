from django.urls import path
from api import views

urlpatterns = [
    path('post/', views.post),
    path('post/<int:pk>/', views.post_detail),
    path('users/', views.UserList.as_view()),
    path('login/', views.login),
    path('logout/', views.logout),

]
