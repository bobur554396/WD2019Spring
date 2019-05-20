# from api.models import Contact
# from api.serializers import Contact
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework import status
# from django.http import Http404
# from rest_framework.decorators import permission_classes
#
#
# class TaskListsTasks(APIView):
#     def get_object(self, pk):
#         try:
#             return TaskList.objects.get(id=pk)
#         except TaskList.DoesNotExist:
#             raise Http404
#
#     @permission_classes((IsAuthenticated,))
#     def get(self, request, pk):
#         t_list = self.get_object(pk)
#         serializer = TaskSerializer(t_list.task_set.all(), many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#     @permission_classes((IsAuthenticated,))
#     def post(self, request, pk):
#         t_list = request.data.pop('task_list')
#         task_list = TaskList(t_list['id'], t_list['name'])
#         serializer = TaskSerializer(task_list=task_list, data=request.data)
#         if serializer.is_valid():
#             serializer.save(task_list=task_list)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors)
#
#
# class TaskListTask(APIView):
#
#     def get_object(self, pk):
#         try:
#             return TaskList.objects.get(id=pk)
#         except TaskList.DoesNotExist:
#             raise Http404
#
#     def get(self, request, pk, pk2):
#         t_list = self.get_object(pk)
#         try:
#             task = t_list.task_set.get(id=pk2)
#         except Task.DoesNotExist as e:
#             return Response({'error': str(e)})
#         serializer = TaskSerializer(task)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#     def put(self, request, pk, pk2):
#         t_list = self.get_object(pk)
#         data = request.data
#         try:
#             task = t_list.task_set.get(id=pk2)
#             t_list = data.pop('task_list')
#             taskList = TaskList(t_list['id'], t_list['name'])
#             serializer = TaskSerializer(instance=task, data=data)
#             if serializer.is_valid():
#                 serializer.save(task_list=taskList)
#                 return Response(serializer.data)
#             return Response(serializer.errors)
#         except Task.DoesNotExist as e:
#             return Response({'error': str(e)})
#
#     def delete(self, request, pk, pk2):
#         t_list = self.get_object(pk)
#         task = t_list.task_set.get(id=pk2)
#         task.delete()
#         return Response({}, status=status.HTTP_204_NO_CONTENT)