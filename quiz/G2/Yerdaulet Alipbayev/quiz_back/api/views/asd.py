import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from api.serializers import ContactSerializer
from api.models import Contacts

@csrf_exempt
def contacts(request):
    if request.method == 'GET':
        contacts = Contacts.objects.all()
        serializer = ContactSerializer(contacts, many=True)
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
def contact_detail(request, pk):
    try:
        contacts = Contacts.objects.get(id=pk)
    except Contacts.DoesNotExist as e:
        return JsonResponse({'error': str(e)})

    if request.method == 'GET':
        serializer = ContactSerializer(contacts)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        body = json.loads(request.body)
        serializer = ContactSerializer(instance=contacts, data=body)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)
    elif request == 'DELETE':
        contacts.delete()
        return JsonResponse({})
    return JsonResponse({'error': 'bad request'})

def contacts_p(request, pk):
    try:
        contacts = Contacts.objects.get(id=pk)
    except Contacts.DoesNotExist as e:
        return JsonResponse({'error':str(e)})