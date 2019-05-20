from django.urls import path
from api import views, auth

urlpatterns = [
    path('contacts/', views.contact_list),
    path('contacts/<int:pk>/', views.contact_list_pk),
    path('login/', auth.login),
    path('logout/', auth.logout),
]