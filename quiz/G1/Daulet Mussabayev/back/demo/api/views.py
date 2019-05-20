from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Contact
from django.views.decorators.csrf import csrf_exempt
from .serializers import ContactSerializer
import json


@csrf_exempt
def contact_list(request):
    if request.method == 'GET':
        task_lists = Contact.objects.all()
        serializer = ContactSerializer(contact_list, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        body = json.loads(request.body)
        serializer = ContactSerializer(data=body)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)
    return JsonResponse({'error': 'bad request'})

@csrf_exempt
def contact_list_pk(request, pk):
    try:
        contact_list = Contact.objects.get(id=pk)
    except Contact.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False)
    if request.method == 'PUT':
        body = json.loads(request.body)
        serializer = ContactSerializer(instance=contact_list, data=body)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)
    elif request.method == 'DELETE':
        contact_list.delete()
        return JsonResponse({})
    return JsonResponse({'error': 'bad request'})
