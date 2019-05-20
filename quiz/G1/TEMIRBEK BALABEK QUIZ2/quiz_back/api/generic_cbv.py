from rest_framework import generics
from api.serializers import ContactsSerializer
from rest_framework.permissions import IsAuthenticated
from api.models import Contacts


class ShowContacts(generics.ListCreateAPIView):
    serializer_class = ContactsSerializer
    permission_classes = (IsAuthenticated, )
    def get_queryset(self):
        return Contacts.objects.for_user_order_by_name(self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ShowContactsDetail(generics.RetrieveUpdateDestroyAPIView):
    def get_queryset(self):
        return Contacts.objects.for_user_order_by_name(self.request.user)
    serializer_class = ContactsSerializer
    permission_classes = (IsAuthenticated, )
