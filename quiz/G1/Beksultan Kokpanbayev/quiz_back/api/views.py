from api.models import Contact
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from api.serializers import ContactSerializer,UserSerializer
from django.contrib.auth.models import User
from rest_framework import authtoken
from rest_framework.permissions import IsAuthenticated


@api_view(['GET','POST'])
def contact_list(request):
    # permission_classes = (IsAuthenticated,)

    if request.method == 'GET':
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts,many=True)
        return Response(serializer.data,status= status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status = status.HTTP_201_CREATED)
        return Response(serializer.errors,status = status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET','PUT','DELETE'])
def contact_detail(request,pk):
    try:
        contacts = Contact.objects.get(id = pk)
    except Contact.DoesNotExist as e:
        return Response({'error',f'{e}'},status = status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ContactSerializer(contacts)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ContactSerializer(instance=contacts, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif request.method == 'DELETE':
        contacts.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
