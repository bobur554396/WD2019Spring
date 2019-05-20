from django.http import Http404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.models import Contact
from api.serializers import ContactSerializer


class Contacts(generics.ListCreateAPIView):
    # queryset = Contact.objects.all()
    # serializer_class =
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        queryset = Contact.objects.for_user_order_by_name(self.request.user)

        return queryset

    def get_serializer_class(self):
        return ContactSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ContactDetailed(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
