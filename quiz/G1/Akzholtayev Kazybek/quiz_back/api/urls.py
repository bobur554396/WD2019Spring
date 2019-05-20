from django.urls import path
from . import views

urlpatterns=[
    path('contact_lists/', views.lists),
    path('contact_lists/<int:pk>/', views.contact_list_detail),
    path('contact_lists/<int:pk>/contacts/', views.list_contacts),
    path('login/', views.login),
    path('logout/', views.logout),

]