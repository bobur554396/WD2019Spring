from django.contrib import admin
from django.urls import path,include
from api import views
urlpatterns = [

    path('contacts', views.ContactList.as_view()),
    path('contacts/<int:pk>/', views.ContactDetail.as_view()),
    path('login/', views.login),
    path('logout/', views.logout),
    # path('categories/<int:pk>/products/', views.category_product)
]