from rest_framework import generics
from api.serializers import ContactSerializer
from api.models import Contact
from rest_framework.permissions import IsAuthenticated


class ContactsAPIView(generics.ListCreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Contact.objects.for_user(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ContactAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ContactSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Contact.objects.for_user(user=self.request.user)
