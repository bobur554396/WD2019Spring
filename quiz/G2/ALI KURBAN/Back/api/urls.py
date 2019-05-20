from django.urls import path
from api import views


urlpatterns = [
    path('api/contacts/', views.ContactListView.as_view()),
    path('api/contacts/<int:pk>/', views.ContactView),
    path('api/login/', views.login),
    path('api/logout/', views.logout)
]