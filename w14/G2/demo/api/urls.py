from django.urls import path
from api import views

urlpatterns = [
    path('categories/', views.CategoryList.as_view()),
    path('categories/<int:pk>/', views.CategoryDetail.as_view()),

    path('users/', views.UserList.as_view()),
    path('login/', views.login),
    path('logout/', views.logout),

    path('categories/<int:pk>/products/', views.CategoryProductList.as_view())
]
