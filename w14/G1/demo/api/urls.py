from django.urls import path
from api import views

# urlpatterns = [
#     path('categories/', views.category_list),
#     path('categories/<int:pk>/', views.category_detail),
#     # path('categories/<int:pk>/products/', views.category_product)
# ]

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('login/', views.login),
    path('logout/', views.logout),
    path('categories/', views.CategoryList.as_view()),
    path('categories/<int:pk>/', views.CategoryDetail.as_view()),
    path('categories/<int:pk>/products/', views.CategoryProductsAPIView.as_view()),
    # path('categories/products/', views.CategoryProductCreateAPIView.as_view())
]

