from django.urls import path
from api import views

urlpatterns = [
    path('api/contacts', views.contacts),
    path('api/contacts/1', views.contacts_detail)

]