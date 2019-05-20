import json
from django.http import JsonResponse
from .models import Contact
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from .serializers import ContactSerializer, UserSerializer
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from django.http import Http404


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, )


class ContactList(generics.ListCreateAPIView):
    permission_classes = (AllowAny, )

    def get_queryset(self):

        return Contact.objects.all()

    def get_serializer_class(self):
        return ContactSerializer

    def perform_create(self, serializer):
        if self.request.method == 'POST':
            self.permission_classes = (IsAuthenticated,)
            serializer.save(created_by=self.request.user)


@api_view(['POST'])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data.get('user')
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key})


@api_view(['POST'])
def logout(request):
    request.auth.delete()
    return Response(status=status.HTTP_200_OK)


class Contact_detail(APIView):
    permission_classes = (AllowAny,)

    def get_object(self, pk):
        try:
            return Contact.objects.get(id=pk)
        except Contact.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        contact = self.get_object(pk)
        serializer = ContactSerializer(contact)
        return Response(serializer.data)

    def put(self, request, pk):
        contact = self.get_object(pk)
        if self.request.user.is_authenticated and self.request.user == contact.created_by:
            serializer = ContactSerializer(instance=contact, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)

    def delete(self, request, pk):
        contact = self.get_object(pk)
        if request.user.is_authenticated and self.request.user == contact.created_by:
            contact.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

