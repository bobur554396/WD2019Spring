from django.urls import path, re_path
from main import views

urlpatterns = [
    path('', views.index),
    path('home/', views.home),
    path('about/', views.about),
    path('time/', views.current_time),
    path('products/<int:pk>/', views.show_product),
    re_path(r'products/reg/(\d{2})/', views.show_product_reg),
    path('products/', views.product_list),
    path('categories/', views.category_list)
]
