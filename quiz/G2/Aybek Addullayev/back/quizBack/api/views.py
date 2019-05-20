from django.http import HttpResponse, Http404
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.models import Contact
from api.serializers import ContactSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key})


@api_view(['POST'])
def logout(request):
    request.auth.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)



class ContactList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Contact.objects.for_user_order_by_name(self.request.user)

    def get_serializer_class(self):
        return ContactSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class ContactDetail2(APIView):
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
        serializer = ContactSerializer(instance=contact, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        contact = self.get_object(pk)
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
