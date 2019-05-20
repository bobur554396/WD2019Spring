from django.shortcuts import render

# Create your views here.

from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models import Contact
from api.serializers import ContactSerializer



@api_view(['POST'])
def login(request):
    ser=AuthTokenSerializer(data=request.data)
    ser.is_valid(raise_exception=True)
    user=ser.validated_data.get('user')
    token,created=Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'username': user.username})


@api_view(['POST'])
def logout(request):
    request.auth.delete()
    return Response(status=status.HTTP_200_OK)

class AllContacts(generics.ListCreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Contact.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ContactSerializer

    def get_queryset(self):
        return Contact.objects.filter(created_by=self.request.user)


