from rest_framework import generics
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from api.models import Contact
from api.serializers import ContactSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

class ContactList(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


@api_view(['GET','DELETE','PUT'])
def contact_detail(request, pk) :
     try:
         print(pk)
         res = Contact.objects.get(id=pk)
     except Contact.DoesNotExist:
         return Response('Post list not found',status=404)
     if(request.method == 'GET'):
         ser = ContactSerializer(res)
         return Response(ser.data)
     if(request.method == 'PUT'):
         ser = ContactSerializer(instance=res,data=request.data)
         if(ser.is_valid()):
             ser.save()
             return Response(ser.data,status=201)
         return Response('some error occured')
     if(request.method == 'DELETE'):
         res.delete()
         return Response('done:')