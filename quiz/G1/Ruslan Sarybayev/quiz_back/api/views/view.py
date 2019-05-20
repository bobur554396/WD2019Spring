from django.shortcuts import render
import json
from django.http import JsonResponse, HttpResponse
from api.models import Contact
from api.serializers import ContactSerializer, UserSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
# Create your views here.



class Contacts(generics.ListCreateAPIView):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()
    permission_classes = (IsAuthenticated, )
    # http_method_names = ['GET']

class Contacts_detail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()
    permission_classes = (IsAuthenticated,)

