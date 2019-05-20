from django.shortcuts import render
import json
from django.http import HttpResponse, JsonResponse
from api import models
from api.models import Task, TaskList
from api.serializers import TaskListSerializer, TaskSerializer
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


@csrf_exempt
def task_lists(request):
    if request.method == 'GET':
        t_lists = TaskList.objects.all()
        serializer = TaskListSerializer(t_lists, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        t_list = json.loads(request.body)
        serializer = TaskListSerializer(data=t_list)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)


@csrf_exempt
def task_list(request, pk):
    try:
        t_list = models.TaskList.objects.get(id=pk)
    except models.TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False)

    if request.method == 'GET':
        serializer = TaskListSerializer(t_list)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'PUT':
        data = json.loads(request.body)
        serializer = TaskListSerializer(instance=t_list, data=data)
        if serializer.is_valid():
            serializer.save()
        return JsonResponse(serializer.errors)
    elif request.method == 'DELETE':
        t_list.delete()
        return JsonResponse({})


@csrf_exempt
def task_lists_tasks(request, pk):
    try:
        t_list = models.TaskList.objects.get(id=pk)
    except models.TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False)

    if request.method == 'GET':
        serializer = TaskSerializer(t_list.task_set.all(), many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = json.loads(request.body)
        t_list = data.pop('task_list')
        taskList = TaskList(t_list['id'], t_list['name'])
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save(task_list=taskList)
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse(serializer.errors)



@csrf_exempt
def task_lists_task(request, pk, pk2):
    try:
        t_list = models.TaskList.objects.get(id=pk)
    except models.TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False)

    if request.method == 'GET':
        try:
            task = t_list.task_set.get(id=pk2)
        except Task.DoesNotExist as e:
            return JsonResponse({'error': str(e)})
        serializer = TaskSerializer(task)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'PUT':
        data = json.loads(request.body)
        try:
            task = t_list.task_set.get(id=pk2)
            t_list = data.pop('task_list')
            taskList = TaskList(t_list['id'], t_list['name'])
            serializer = TaskSerializer(instance=task, data=data)
            if serializer.is_valid():
                serializer.save(task_list=taskList)
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors)
        except Task.DoesNotExist as e:
            return JsonResponse({'error': str(e)})
    elif request.method == 'DELETE':
        task = t_list.task_set.get(id=pk2)
        task.delete()
        return JsonResponse({}, safe=False)