from api.views import ContactList,ContactDetail, logout,login
from django.urls import path

urlpatterns = [
    path('contacts/', ContactList.as_view()),
    path('contacts/<int:pk>/', ContactDetail.as_view()),
    path('login/', login),
    path('logout/', logout)
]
