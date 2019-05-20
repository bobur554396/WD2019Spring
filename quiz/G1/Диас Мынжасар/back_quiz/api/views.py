from api.models import Contact
from api.serializers import ContactSerializer
from rest_framework.decorators import api_view
from rest_framework import authtoken
from django.contrib.auth.models import User
from api.serializers import UserSerializer
from rest_framework import status
from rest_framework import generics
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

@api_view (['GET', 'POST'])
def contacts (request) :
    if request.method == 'GET':
        contacts_list = TaskList.objects.all()
        serializer = ContactSerializer (contacts_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERRORS)
    return Response (status=status.HTTP_400_BAD_REQUEST)



@api_view (['GET', 'PUT', 'DELETE'])
def selected_contact (request, pk) :
    try :
        contact = Contact.objects.get(id=pk)
    except TaskList.DoesNotExist:
        return Response (status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET' :
        serializer = ContactSerializer (contact)
        return Response (serializer.data)

    elif request.method == 'PUT':
        serializer = ContactSerializer (instance=task_list, data=request.data)
        if serializer.is_valid() :
            serializer.save()
            return Response (serializer.data)
        return Response (serializer.errors)

    elif request.method == 'DELETE':
        contact.delete()
        return Response (status.HTTP_204_NO_CONTENT)

    return Response (status=status.HTTP_400_BAD_REQUEST)

@api_view (['POST'])
def login (request) :
	serializer = AuthTokenSerializer (data = request.data)
	serializer.is_valid (raise_exception = True)
	user = serializer.validated_data.get ('user')
	token = Token.objects.get_or_create(user = user)
	return Response ({'token' : token.key})

@api_view (['POST'])
def logout (request) :
	request.auth.delete()
	return Response (status=status.HTTP_200_OK)