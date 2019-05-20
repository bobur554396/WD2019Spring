from django.urls import path, re_path
from api import views

urlpatterns = [
    path('task_lists/', views.task_lists),
    path('task_lists/<int:pk>/<int:jirsg>', views.task_lists_num),
    path('task_lists/<int:pk>/tasks', views.task_lists_num_tasks),
]

