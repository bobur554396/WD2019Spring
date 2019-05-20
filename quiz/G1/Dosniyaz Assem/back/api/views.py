from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from api.models import Contact
from api.serializers import ContactSerializer

class ContactList(generics.ListCreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        return Contact.objects.all()
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


@api_view(['GET', 'PUT', 'DELETE'])
def contact_detail(request, pk):
    try:
        taskList = Contact.objects.get(id=pk)
    except Contact.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ContactSerializer(taskList)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ContactSerializer(instance=taskList, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    elif request.method == 'DELETE':
        taskList.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

