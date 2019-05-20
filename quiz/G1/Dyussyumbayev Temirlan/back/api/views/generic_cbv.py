from django.shortcuts import render
from django.http import JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from api.models import Contacts
from api.serializers import PostSerializer


# Create your views here.
class ContactList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    serializer_class = PostSerializer

    def get_queryset(self):
        return Contacts.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer

    def get_queryset(self):
        return Contacts.objects.filter(created_by=self.request.user)