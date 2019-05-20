from django.shortcuts import render

import json
from django.http import HttpResponse, JsonResponse
from api.models import Contact
from django.views.decorators.csrf import csrf_exempt
from api.serializers import ContactSerializer

from django.contrib.auth.models import User
from api.serializers import UserSerializer
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import  Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

@api_view(['POST'])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data.get('user')
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token':token.key})

@api_view(['POST'])
def logout(request):
    request.auth.delete()
    return Response(status=status.HTTP_200_OK)



# @csrf_exempt
# def show_posts(request):
#     permission_classes = (IsAuthenticated,)
#
#     if request.method == "GET":
#
#         task_list = Post.objects.filter(created_by = request.user)
#         serializer = PostSerializer(task_list, many=True)
#         return JsonResponse(serializer.data,safe=False)
#
#     elif request.method == 'POST':
#         data = json.loads(request.body)
#         serializer = PostSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save(created_by = request.user)
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors)

class show_contacts(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Contact.objects.filter(created_by = self.request.user)

    def get_serializer_class(self):
        return ContactSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class contact_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    # permission_classes = (IsAuthenticated,)
    # queryset = Contact.objects.all()
    # serializer_class = ContactSerializer
    #
    # def get_queryset(self):
    #     return Contact.objects.for_user(self.request.user)
@csrf_exempt
def show_contact_detail(request, pk):
    try:
        contacts = Contact.objects.get(id=pk)
    except Contact.DoesNotExist as e:
        return JsonResponse({'error': str(e)})


    if request.method == "GET":
        serializer = ContactSerializer(tasks)
        return JsonResponse(serializer.data)

    elif request.method == "PUT":
        data = json.loads(request.body)
        serializer = ContactSerializer(instance=tasks, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)

    elif request.method == "DELETE":
        contacts.delete()
        return JsonResponse({})


