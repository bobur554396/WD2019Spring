from django.contrib.auth.models import User
from django.shortcuts import render
from api.models import Contact
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from api.serializers import ContactSerializer, UserSerializer
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404



# Create your views here.


class ContView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Contact.objects.filter(created_by=self.request.user)

    def get_serializer_class(self):
        return ContactSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ContDetailView(APIView):
    def get_object(self, pk):
        try:
            return Contact.objects.get(id=pk)
        except Contact.DoesNotExist as e:
            raise Http404

    def get(self, pk):
        post = self.get_object(pk)
        serializer = ContactSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        post = self.get_object(pk)
        serializer = ContactSerializer(instance=post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        post = self.get_object(pk)
        post.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST', ])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data.get('user')
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key})


@api_view(['POST', ])
def logout(request):
    request.auth.delete()
    return Response(status=status.HTTP_200_OK)


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)


# @api_view(['GET', 'POST'])
# def Contacts(request):
#     if request.method == 'GET':
#         posts = Contact.objects.all()
#         serializer = ContactSerializer(posts, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     elif request.method == 'POST':
#         serializer = ContactSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#
#
# @api_view(['GET', 'PUT', 'DELETE'])
# def Contacts_detail(request, pk):
#     try:
#         post = Contact.objects.get(id=pk)
#     except Contact.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     if request.method == 'GET':
#         serializer = ContactSerializer(post)
#         return Response(serializer.data)
#     elif request.method == 'PUT':
#         serializer = ContactSerializer(instance=post, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors)
#     elif request.method == 'DELETE':
#         post.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
#
#
# @api_view(['POST', ])
# def login(request):
#     print(request.user)
#     serializer = AuthTokenSerializer(data=request.data)
#     serializer.is_valid(raise_exception=True)
#     user = serializer.validated_data.get('user')
#     token, created = Token.objects.get_or_create(user=user)
#     return Response({'token': token.key})
#
#
# @api_view(['POST', ])
# def logout(request):
#     request.auth.delete()
#     return Response(status=status.HTTP_200_OK)
#
#
# class UserList(generics.ListAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = (IsAuthenticated,)
