from django.shortcuts import render
from rest_framework.views import APIView
from api.models import Contact
from api.serializers import ContactSerializer
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from rest_framework import generics

from rest_framework.permissions import IsAuthenticated


class ContactList(generics.ListCreateAPIView):
    def get_queryset(self):
        return Contact.objects.filter(created_by=self.request.user).order_by('name')

    serializer_class = ContactSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class Contact_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

# class ContactList(APIView):
#     def get(self, request):
#         contacts = Contact.objects.all()
#         serializer = ContactSerializer(contacts, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     def post(self, request):
#         serializer = ContactSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#
# class Contact_detail(APIView):
#     def get_object(self, num):
#         try:
#             return Contact.objects.get(id=num)
#         except Contact.DoesNotExist:
#             raise Http404
#
#     def get(self, request, num):
#         contact = self.get_object(num)
#         serializer = ContactSerializer(contact)
#         return Response(serializer.data)
#     def put(self,request,num):
#         contact = self.get_object(num)
#         serializer = ContactSerializer(instance=contact, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors)
#     def delete(self, request, num):
#         contact = self.get_object(num)
#         contact.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

