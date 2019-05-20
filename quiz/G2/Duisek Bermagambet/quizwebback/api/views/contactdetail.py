import json

from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt

from api.models import Contact

from api.serializers import ContactSerialier


@csrf_exempt
def contact_detail(request, pk):
    try:
        contact = Contact.objects.get(id=pk)
    except Contact.DoesNotExist as e:
        return JsonResponse({'error': str(e)})
    if request.method == 'GET':
        serializer = ContactSerialier(contact)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        body = json.loads(request.body)
        serializer = ContactSerialier(instance=contact, data=body)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)
    elif request.method == 'DELETE':
        contact.delete()
        return JsonResponse({})
    return JsonResponse({'error': 'bad request'})
