from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models import Contact
from api.serializers import ContactSerializer
from django.contrib.auth.models import User
from api.serializers import UserSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token


class ContactList(APIView):
    def get(self, request):
        contacts = Contact.objects.for_user(request.user)
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self , request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ContactUD(APIView):
    def get_contact(self,pk):
        try:
            return Contact.objects.get(id=pk)
        except Contact.DoesNotExist as e:
            return Response({'error': f'{e}'}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        contact = self.get_contact(pk)
        serializer = ContactSerializer(contact)
        return Response(serializer.data)

    def put(self, request, pk):
        contact = self.get_contact(pk)
        serializer = ContactSerializer(instance=contact, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        contact = self.get_contact(pk)
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
