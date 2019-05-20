from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..models import Contact
from ..serializers import ContactSerializer


class ContactView(generics.ListCreateAPIView):

    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Contact.objects.for_user(self.request.user)

    def get_serializer_class(self):
        return ContactSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


# class TaskListView(generics.RetrieveUpdateDestroyAPIView):
#
#     permission_classes = (IsAuthenticated, )
#
#     def get_queryset(self):
#         return TaskList.objects.for_user(self.request.user).filter(id=self.kwargs['pk'])
#
#     def get_serializer_class(self):
#         return TaskListSerializer
#
#
# class TaskListTasksView(generics.ListCreateAPIView):
#     permission_classes = (IsAuthenticated,)
#
#     def get_queryset(self):
#         return Task.objects.filter(task_list=self.kwargs['pk'])
#
#     def get_serializer_class(self):
#         return TaskSerializer
#
#     def perform_create(self, serializer):
#         t_list = self.request.data.pop('task_list')
#         task_list = TaskList(t_list['id'], t_list['name'])
#         serializer.save(task_list=task_list)
#
#
# class TaskListTaskView(generics.RetrieveUpdateDestroyAPIView):
#
#     permission_classes = (IsAuthenticated, )
#
#     def get_queryset(self):
#         print(self.kwargs)
#         return Task.objects.all()
#
#     def get_serializer_class(self):
#         return TaskSerializer
#
#     def perform_update(self, serializer):
#         t_list = self.request.data.pop('task_list')
#         task_list = TaskList(t_list['id'], t_list['name'])
#         serializer.save(task_list=task_list)