import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from api.models import Contact
from django.views.decorators.csrf import csrf_exempt
from api.serializers import ContactSerializer

@csrf_exempt
def contactlist(request):
    if request.method == 'GET':
        contactlist = Contact.objects.all()
        serializers = ContactSerializer(contactlist, many=True)
        return JsonResponse(serializers.data, safe=False)
    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = ContactSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)

@csrf_exempt
def contactdetail(request, pk):
    try:
        contactlist = Contact.objects.get(id=pk)
    except Contact.DoesNotExist as e:
        return JsonResponse({'error': str(e)})
    if request.method == 'PUT':
        data = json.loads(request.body)
        serializer = ContactSerializer(instance=contactlist, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)
    elif request.method == 'DELETE':
        contactlist.delete()
        return JsonResponse({})
    return JsonResponse({'error': 'bad request'})






