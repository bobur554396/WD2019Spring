from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.models import Contact
from api.serializers import ContactSerialier


class ContactList(generics.ListCreateAPIView):
    serializer_class = ContactSerialier
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Contact.objects.for_user(self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
