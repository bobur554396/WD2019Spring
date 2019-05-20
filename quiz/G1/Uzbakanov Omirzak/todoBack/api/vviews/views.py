import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from api.models import Contact, ContactList
from api.serializers import ContactListSerializer, ContactSerializer


@csrf_exempt
def ContactList(request):
    if request.method == 'GET':
        contact_list = ContactList.objects.all()
        serializer = ContactListSerializer(contact_list, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)

    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = ContactListSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors)


@csrf_exempt
def ContactDetail(self,request, pk):
    try:
       contact_list = ContactList.objects.get(id=pk)
    except ContactList.DoesNotExist as e:
        return JsonResponse({'error': str(e)})

    if request.method == 'GET':
        serializer = ContactListSerializer(contact_list)
        return JsonResponse(serializer.data, status=200)
    elif request.method == 'PUT':
        contact = self.get_object(pk)
        serializer = ContactSerializer(instance=contact, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors)
    elif request.method == 'DELETE':
        contact_list.delete()
        return JsonResponse({}, status=204)


