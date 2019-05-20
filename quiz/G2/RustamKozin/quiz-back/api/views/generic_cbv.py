from api.models import Contact
from django.contrib.auth.models import User
from api.serializers import ContactSerializer, UserSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class ContactList(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = (IsAuthenticated,)


class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
