from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from api.models import Contact
from api.serializers import ContactSerializer2


class ContactList(generics.ListCreateAPIView):
    # queryset = Contact.objects.all()
    # serializer_class = ContactSerializer2
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Contact.objects.for_user(self.request.user)

    def get_serializer_class(self):
        return ContactSerializer2

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer2
