
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from api.models import Contact
from api.serializers import ContactSerializer, ContactSerializer2


@api_view(['GET', 'POST'])
def contacts(request):   # List of all contacts
    if request.method == 'GET':
        contactss = Contact.objects.all()
        serializer = ContactSerializer(contactss, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':    # Create contact
        serializer = ContactSerializer2(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT', 'DELETE'])
def contact(request, pk):  # Get TaskList
   try:
       contacti = Contact.objects.get(id=pk)
   except  Contact.DoesNotExist as e:
       return Response({'error doesn exist'}, status=status.HTTP_404_NOT_FOUND)

   if request.method == 'PUT':
       serializer = ContactSerializer(instance=contacti, data=request.data)
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_200_OK)
       return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
   elif request.method == 'DELETE':
       contacti.delete()
       return Response({}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer .validated_data.get('user')
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key})

@api_view(['POST'])
def logout(request):
    request.auth.delete()
    return Response(status=status.HTTP_200_OK)
