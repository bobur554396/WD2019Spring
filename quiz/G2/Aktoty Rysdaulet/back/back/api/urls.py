from django.urls import path
from api import views

urlpatterns = [
    path('contacts/', views.Contactss.as_view()),
    path('contacts/<int:pk>', views.ContactssDetail.as_view()),

    path('login/', views.login),
    path('logout/', views.logout),
]