from django.urls import path
from main import views

urlpatterns = [
    path('hello/', views.hello),
    path('home/', views.home),
    path('about/', views.about),

    path('products/', views.products_list),
]