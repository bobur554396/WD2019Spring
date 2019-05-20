from django.urls import path
from . import views

# urlpatterns = [
#     path('posts/',views.PostCreateOrShow.as_view()),
#     path('posts/<int:pk>/', views.PostDetail.as_view()),
#     path('posts/<int:pk>/likes',views.like_increment),
#     path('login/',views.login),
#     path('logout/',views.logout)
# ]
urlpatterns=[
    path('contacts/',views.ContactCreateOrShow.as_view()),
    path('contacts/<int:pk>/',views.ContactDetail.as_view()),
    path('login/',views.login),
    path('logout/',views.logout)
]