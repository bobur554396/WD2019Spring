from django.urls import path
from api import views
from api import auth

urlpatterns = [
    path('api/contacts/', views.contacts()),
    path('api/contacts/<int:pk>/', views.contact_detail()),
    path('api/login/', auth.login()),
    path('api/logout/', auth.logout()),
]