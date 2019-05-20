from django.urls import path
from api import views

#
# urlpatterns = [
#     path('api/posts/', views.PostListView.as_view()),
#     path('api/posts/<int:pk>/', views.PostView),
#     path('api/posts/<int:pk>/like', views.putLike),
#     path('api/login/', views.login),
#     path('api/logout/', views.logout)
# ]


urlpatterns = [
    path('api/contact/', views.ContactListView.as_view()),
    path('api/contacts<int:pk>/', views.ContactView),
    # path('api/posts/<int:pk>/like', views.putLike),
    path('api/login/', views.login),
    path('api/logout/', views.logout)
]