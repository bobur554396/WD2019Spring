
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from demo.api.models import Contact
from demo.api.serializer import ContactSerializer


@api_view(['GET', 'POST'])
def contact(request):
    if request.method == 'GET':
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'PUT', 'DELETE', 'UPDATE'])
def contacts_(request, pk):
    try:
        contacts_ = Contact.objects.get(id=pk)
    except Contact.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ContactSerializer(contacts_)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ContactSerializer(instance=contacts_, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    elif request.method == 'DELETE':
        contacts_.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'UPDATE':
        serializer = ContactSerializer(contacts_)

