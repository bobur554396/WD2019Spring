from api.models import  Contact
from django.contrib.auth.models import User
from api.serializers import  UserSerializer,ContactSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated



class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        return Contact.objects.for_user_order_by_name(self.request.user)
    serializer_class = ContactSerializer








class ContactList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Contact.objects.for_user_order_by_name(self.request.user)

    def get_serializer_class(self):
        return ContactSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)