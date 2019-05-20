from django.contrib.auth.models import User
from django.shortcuts import render, HttpResponse, redirect

from api.serializer import UserSerializer
from rest_framework import generics
from rest_framework import status
from django.contrib.auth.forms import UserCreationForm
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer,serializers
from rest_framework.authtoken.models import Token

from rest_framework.views import APIView


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer




@api_view(['POST'])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key})


@api_view(['POST'])
def logout(request):
    request.auth.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)