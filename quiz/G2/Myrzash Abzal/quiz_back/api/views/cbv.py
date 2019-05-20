from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models import Contact, Product
from api.serializers import ContactSerializer2


class ContactList(APIView):
    def get(self, request):
        categories = Contact.objects.all()
        serializer = ContactSerializer2(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ContactSerializer2(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ContactDetail(APIView):

    def get_object(self, pk):
        try:
            return Contact.objects.get(id=pk)
        except Contact.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        contact = self.get_object(pk)
        serializer = ContactSerializer2(contact)
        return Response(serializer.data)

    def put(self, request, pk):
        contact = self.get_object(pk)
        serializer = ContactSerializer2(instance=contact, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        contact = self.get_object(pk)
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)