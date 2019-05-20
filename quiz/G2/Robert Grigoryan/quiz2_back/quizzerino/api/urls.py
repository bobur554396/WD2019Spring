from django.urls import path
from api import views

urlpatterns = [
    path('contact_list/', views.contact_list),
    path('contact_list/<int:pk>/', views.contact_info),
    path('contact_list/<int:pk>/contacts/', views.contact_task),
    path('users/', views.UserList.as_view()),
    path('login/', views.login),
    path('logout/', views.logout),
]
