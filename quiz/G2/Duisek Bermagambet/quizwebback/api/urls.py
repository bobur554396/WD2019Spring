from django.urls import path
from api import views

urlpatterns = [
    path('contacts/', views.ContactList.as_view()),
    path('contacts/<int:pk>/', views.contact_detail),

    path('users/', views.UserList.as_view()),
    path('login/', views.login),
    path('logout/', views.logout),
    # path('categories/<int:pk>/products/', views.category_product)
]