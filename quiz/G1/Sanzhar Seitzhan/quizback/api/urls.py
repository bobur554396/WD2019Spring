from django.contrib import admin
from django.urls import path, include

from api.views import contact_detail,ContactList
from api.views.auth import UserList,login,logout

urlpatterns = [
    path('contacts/',ContactList.as_view()),
    path('contacts/<int:pk>/', contact_detail),
    path('user/', UserList.as_view()),
    path('login/', login),
    path('logout/',logout),
]
