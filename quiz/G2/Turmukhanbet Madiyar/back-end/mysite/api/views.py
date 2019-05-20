import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from api.models import Contact
from api.serializers import ContactSerializer, ContactSerializer2


@csrf_exempt
def contact_list(request):
    if request.method == 'GET':
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)

    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = ContactSerializer2(data=data)
        if serializer.is_valid():
            serializer.save() # create function in serializer class
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors)

@csrf_exempt
def contact_detail(request, pk):
    try:
        contact = Contact.objects.get(id=pk)
    except Contact.DoesNotExist as e:
        return JsonResponse({'error': str(e)})

    if request.method == 'GET':
        serializer = ContactSerializer(contact)
        return JsonResponse(serializer.data, status=200)
    elif request.method == 'PUT':
        data = json.loads(request.body)
        serializer = ContactSerializer(instance=contact, data=data)
        if serializer.is_valid():
            serializer.save() # update function in serializer class
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors)
    elif request.method == 'DELETE':
        contact.delete()
        return JsonResponse({}, status=204)
