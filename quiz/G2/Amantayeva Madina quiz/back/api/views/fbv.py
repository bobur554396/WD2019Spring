from ..models import Contacts
from ..serializers import ContactsSerializer2
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['GET', 'POST'])
def Contactss(request):
    if request.method == 'GET':
        contacts = Contacts.objects.all()
        serializer = ContactsSerializer2(contacts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = ContactsSerializer2(data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'PUT', 'DELETE'])
def ContactsDetail(request, pk):
    try:
        contact = Contacts.objects.get(id=pk)
    except Contacts.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = ContactsSerializer2(contact)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ContactsSerializer2(instance=contact, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    elif request.method == 'DELETE':
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
