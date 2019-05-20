from django.contrib.auth.models import User
from api.serializers import UserSerializer
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from api.models import Contact
from api.serializers import ContactSerializer


class Contacts(generics.ListCreateAPIView):
    serializer_class = ContactSerializer

    def get_queryset(self):
        return Contact.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


@api_view(['PUT', 'DELETE'])
def contact_update_delete(request, pk):
    try:
        contact = Contact.objects.filter(created_by=request.user).get(pk=pk)
    except Contact.DoesNotExist as e:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        contact.delete()
        serializer = ContactSerializer(contact)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = ContactSerializer(contact, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

