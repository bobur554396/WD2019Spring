from django.urls import path
from api import views

urlpatterns = [
    path('contacts/', views.contact_list),
    path('contacts/<int:pk>/', views.contact_detail)
]