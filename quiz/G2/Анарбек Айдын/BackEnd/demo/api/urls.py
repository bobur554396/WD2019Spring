import django.urls
from api import views

urlpatterns =[
    django.urls.path('contact/', views.contacts_),
    django.urls.path('contacts/<int:pk>/', views.contact)
]