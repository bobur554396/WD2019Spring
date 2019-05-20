from django.conf import settings
from django.urls import path
from . import views


#urlpatterns = [
#    path('task_lists/', views.task_lists),
#    path('task_lists/<int:pk>/', views.task_detail),
#    #path('task_lists/<int:pk>/tasks/', views.tasks),
#]
urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('login/', views.login),
    path('logout/', views.logout),
    path('contacts/', views.Contactss),
    path('contacts/<int:pk>/', views.ContactsDetail),

    #path('task_lists/<int:pk>/tasks/', views.tasks),
]