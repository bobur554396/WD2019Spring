from api.serializers import ContactSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from api.models import Contact


class Contactss(generics.ListCreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Contact.objects.for_user_order_by_name(self.request.user)

    def perform_create(self, serializer):
        return serializer.save(created_by=self.request.user)

class ContactssDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer