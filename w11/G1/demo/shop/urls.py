from django.urls import path
from shop import views

urlpatterns = [
    path('categories/', views.category_list),
    path('categories/<int:pk>/', views.category_detail),
    path('categories/<int:pk>/products/', views.category_products)
]
