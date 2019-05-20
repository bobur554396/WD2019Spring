from django.urls import path
from api.views import login,logout,ContactList,ContactUD

urlpatterns = [
    path('contacts/', ContactList.as_view()),
    path('contacts/<int:pk>/', ContactUD.as_view()),
    path('login/', login),
    path('logout/', logout)
]