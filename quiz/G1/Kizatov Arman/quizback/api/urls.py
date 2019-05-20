from django.urls import path
from api import views

urlpatterns = [
    path('contacts/', views.ContactListView.as_view()),
    path('contacts/<int:pk>/', views.ContactsView.as_view()),
    path('login/', views.login),
    path('logout/', views.logout),
]
