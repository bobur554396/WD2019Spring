from django.urls import path
from api import views

urlpatterns = [
    path('contacts/', views.ContactsView.as_view()),
    path('contacts/<int:pk>/', views.ContactView.as_view()),
    path('login/', views.Login.as_view()),
    path('logout/', views.Logout.as_view())
]
