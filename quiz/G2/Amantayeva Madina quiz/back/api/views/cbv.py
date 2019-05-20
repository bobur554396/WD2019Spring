from ..models import Contacts
from ..serializers import ContactsSerializer2
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class Contacts(APIView):
    def get(self, request):
        contacts = Contacts.objects.all()
        serializer = ContactsSerializer2(contacts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ContactsSerializer2(data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ContactsDetail(APIView):
    def get_object(self, pk):
        try:
            return True, Contacts.objects.get(id=pk)
        except Contacts.DoesNotExist:
            return False, Response({'error': 'not found'}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        found, res = self.get_object(pk)
        if found:
            serializer = ContactsSerializer2(res)
            return Response(serializer.data)
        return res

    def put(self, request, pk):
        found, contacts = self.get_object(pk)
        serializer = ContactsSerializer2(instance=contacts, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk):
        found, contacts = self.get_object(pk)
        contacts.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
