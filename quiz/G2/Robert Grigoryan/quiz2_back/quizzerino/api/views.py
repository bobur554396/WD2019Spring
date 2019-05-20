import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import CreatedBy, Contact
from .serializers import CreatedBySerializer0, CreatedBySerializer1, ContactSerializer


@csrf_exempt
def contact_list(request):
    if request.method == 'GET':
        contact_lists = CreatedBy.objects.all()
        serializer = CreatedBySerializer1(contact_list, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
    elif request.method == 'POST':
        body = json.loads(request.body)
        serializer = CreatedBySerializer1(data=body)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors)
    return JsonResponse({'error': 'bad request'})



@csrf_exempt
def contact_info(request, pk):
    try:
        contact_item = CreatedBy.objects.get(id=pk)
    except CreatedBy.DoesNotExist as e:
        return JsonResponse({'error': str(e)})

    if request.method == 'GET':
        serializer = CreatedBySerializer0(contact_item)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = json.loads(request.body)
        serializer = CreatedBySerializer0(instance=contact_item, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors)
    elif request.method == "DELETE":
        contact_item.delete()
        return JsonResponse({})
    return JsonResponse({'error': 'bad request'})


def contact_task(request, pk):
    try:
        contact_item = CreatedBy.objects.get(id=pk)
    except CreatedBy.DoesNotExist as e:
        return JsonResponse({'error': str(e)})

    contact = contact_item.post_set.all()
    serializer = ContactSerializer(contact, many=True)
    return JsonResponse(serializer.data, safe=False)



