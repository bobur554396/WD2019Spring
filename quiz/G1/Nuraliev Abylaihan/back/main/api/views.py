from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from api.models import Contact
from api.serializer import ContactSerializer
import json


# Create your views here.


class ContactList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
