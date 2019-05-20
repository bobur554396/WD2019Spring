from django.urls import path
from api import views,auth

urlpatterns = [

    path('contacts/',views.Contacts.as_view()),
    path('contacts/<int:pk>/', views.ContactDetail.as_view()),


    path('users/', auth.UserList.as_view()),
    path('login/', auth.login),
    path('logout/', auth.logout)
]