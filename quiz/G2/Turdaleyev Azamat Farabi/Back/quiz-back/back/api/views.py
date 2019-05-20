from api.models import Contact
from api.serializers import ContactSerializer2,UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.http import Http404
from rest_framework.permissions import IsAuthenticated
from rest_framework import authtoken
from django.contrib.auth.models import User


class Contacts(generics.ListCreateAPIView):

    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Contact.objects.all()
        # return TaskList.objects.filter(created_at = self.request.user)
        # return TaskList.objects.for_user_order_by_name(self.request.user)

    def get_serializer_class(self):
        return ContactSerializer2

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = (IsAuthenticated)
    serializer_class = ContactSerializer2

    def get_queryset(self):
        return Contact.objects.all()
        # return TaskList.objects.for_user(self.request.user)


#
#
#
#
