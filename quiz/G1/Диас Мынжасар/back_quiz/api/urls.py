from django.urls import path
from api import views

urlpatterns = [
    path ('contacts/', views.contacts),
    path ('contacts/<int:pk>/', views.selected_contact),
    path ('login/', views.login),
	path ('logout/', views.logout)
]