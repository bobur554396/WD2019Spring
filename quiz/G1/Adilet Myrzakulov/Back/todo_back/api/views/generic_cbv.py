from api.models import Contact
from rest_framework import generics
from api.serializers import ContactSerializer
from rest_framework.permissions import IsAuthenticated


class Contact(generics.ListCreateAPIView):
    def get_queryset(self):
        return Contact.objects.for_user(self.request.user)
    serializer_class = ContactSerializer
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    permission_classes = (IsAuthenticated,)


class Contact_details(generics.RetrieveUpdateDestroyAPIView):

    def get_queryset(self):
        return Contact.objects.for_user(self.request.user)
    serializer_class = ContactSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    permission_classes = (IsAuthenticated,)
