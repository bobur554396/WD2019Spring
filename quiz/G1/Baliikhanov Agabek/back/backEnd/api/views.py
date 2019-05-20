from django.shortcuts import render
from typing import List, Any
import json
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view

from api.models import Contact
from api.serializers import ContactSerializer, ContactSerializerModel
from rest_framework.response import Response


def contacts(request):
    if request.method == 'GET':

        contacts = Contact.objects.all()

        serializer = ContactSerializer(contacts, many=True)

        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = ContactSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)


@api_view(['PUT', 'DELETE'])
def contact_detail(request, pk):
    try:
        contact = Contact.objects.get(id=pk)
    except Contact.DoesNotExist as e:
        return Response({'error': f'{e}'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ContactSerializerModel(instance=contact, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif request.method == 'DELETE':
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
