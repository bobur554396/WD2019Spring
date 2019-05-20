from django.shortcuts import render
from django.http import JsonResponse
from .serializers import ContactSerializer,ListSerializer,ListSerializer2
from django.views.decorators.csrf import csrf_exempt
from .models import Contact,ContactList
import json
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
# Create your views here.


@csrf_exempt
def lists(request):
    if request.method == 'GET':
        all_lists = ContactList.objects.all()
        # json_lists=[l.to_json() for l in all_lists]
        ser=ListSerializer(all_lists,many=True)
        return JsonResponse(ser.data, safe=False,status=200)
    elif request.method == 'POST':
        data = json.loads(request.body)
        # li=TaskList()
        # li.name=data.get('name','')
        # li.save()
        ser=ListSerializer2(data=data)
        if ser.is_valid():
            ser.save()
            return JsonResponse(ser.data,status=201)
        return JsonResponse(ser.errors)

@csrf_exempt
def contact_list_detail(request,pk):
    try:
        li = ContactList.objects.get(id=pk)
    except ContactList.DoesNotExist as e:
        return JsonResponse({'error': str(e)},safe=False)
    if request.method=='GET':
        #json_li=li.to_json()
        ser=ListSerializer(li)
        return JsonResponse(ser.data,status=200)
    elif request.method=="PUT":
        data=json.loads(request.body)
        # li.name=data.get('name',li.name)
        # li.save()
        ser=ListSerializer(instance=li,data=data)
        if ser.is_valid():
            ser.save()
            return JsonResponse(ser.data,status=200)
        return JsonResponse(ser.errors)
    elif request.method=='DELETE':
        li.delete()
        return JsonResponse({},status=204)

@csrf_exempt
def list_contacts(request,pk):
    try:
        list = ContactList.objects.get(id=pk)
    except ContactList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False)
    if request.method =='GET':
        tasks = list.task_set.all()
        ser = ContactSerializer(tasks, many=True)
        return JsonResponse(ser.data, safe=False,status=200)
    elif request.method=="POST":
        data=json.loads(request.body)
        print(data)
        ContactSerializer.listik=list
        ser=ContactSerializer(data=data)
        if ser.is_valid():
            ser.save()
            return JsonResponse(ser.data,status=200)
        return JsonResponse(ser.errors)

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, )


@api_view(['POST'])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data.get('user')
    token, created = Token.objects.get_or_create(user=user)
    return JsonResponse({'token': token.key})


@api_view(['POST'])
def logout(request):
    request.auth.delete()
    return JsonResponse(status=status.HTTP_200_OK)
