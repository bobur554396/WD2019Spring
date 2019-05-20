from django.urls import path
from api import views


urlpatterns = [
    path('login/', views.user_login),
    path('logout/', views.user_logout),
    path('contacts/', views.ContactList.as_view()),
    path('contacts/<int:pk>', views.Contact_detail.as_view()),
]
