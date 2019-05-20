from django.urls import path
# from api.views import show_taskLists, show_current_taskList, show_current_tasks
from api.auth import login, logout
from api.generic_cbv import ShowContacts, ShowContactsDetail
# urlpatterns = [
#     path('task_lists/', show_taskLists),
#     path('task_lists/<int:pk>/', show_current_taskList),
#     path('task_lists/<int:pk>/tasks/', show_current_tasks)
# ]
urlpatterns = [
    path('contacts/', ShowContacts.as_view()),
    path('contacts/<int:pk>/', ShowContactsDetail.as_view()),
    path('login/', login),
    path('logout/', logout),
    # path('task_lists/<int:pk>/tasks/', TaskListTasks.as_view())
]