from django.urls import path
from . import views


urlpatterns=[
    path('login/',views.login),
    path('logout/',views.logout),
    path('contacts/',views.AllContacts.as_view()),
    path('contacts/<int:pk>/',views.ContactDetail.as_view()),
]