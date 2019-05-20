from api.models import Contact
from api.serializers import ContactSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import mixins
from django.contrib.auth.models import User
# from rest_framework.authtoken.models import
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend

class contacts(generics.ListCreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = (IsAuthenticated, )
    def get_queryset(self):
        return Contact.objects.filter(created_by = self.request.user)
    def perform_create(self, serializer):
        serializer.save(created_by = self.request.user)

class contacts_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
