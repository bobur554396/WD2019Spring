from django.urls import path
from api import views


urlpatterns = [
    path('/api/contacts', views.ContactList.as_view()),
    path('/api/login/', views.login),
    path('/api/logout/', views.logout),
    path('/api/contacts/1/', views.Contact.as_view())
]

