from api.models import Contact
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from api.serializers import ContactSerializer
from django.http import Http404

# Create your views here.


class Contacts(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = ContactSerializer

    def get_queryset(self):
        return Contact.objects.filter(created_by=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(created_by = self.request.user)


class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = ContactSerializer

    def get_queryset(self):
        return Contact.objects.filter(created_by=self.request.user.id)
