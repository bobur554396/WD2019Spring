from django.urls import path
from api import views
urlpatterns = [
    path('contacts/', views.Contact.as_view()),
    path('contacts/<int:pk>/', views.Contact_details.as_view()),
    path('login/', views.login),
    path('logout/', views.logout)
]
