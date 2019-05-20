from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from api.models import Contacts
from api.serializers import ContactSerializer


class ContactList(generics.ListCreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Contacts.objects.for_user(self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ContactsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contacts.objects
    serializer_class = ContactSerializer

