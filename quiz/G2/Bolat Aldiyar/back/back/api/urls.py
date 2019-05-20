from django.urls import path, re_path
from api import views

urlpatterns = [
    path('api/contacts', views.contacts),
    re_path(r'api/contacts/(\d)', views.contact),
    path('api/login/', views.login),
    path('api/logout/', views.logout),
]
