import json
from api.models import TaskList
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from api.searilizers import ContactSerializer, ContactSerializer2
# Create your views here.

@csrf_exempt
def contact_lists(request):
	if request.method == 'GET':
		contact_lists = Contact.objects.all()
		serializer = ContactSerializer2(contact_lists, many=True)
		return JsonResponse(serializer.data, safe=False)
	
	elif request.method == 'POST':
		body = json.loads(request.body)
		contact = body.pop('task_list')
		serializer = ContactSerializer2(data = body)
		contactList = ContactList(contact['id'], contact['name'])
		if serializer.is_valid():
			serializer.save(contactList = contact)
			return JsonResponse(serializer.data, save = False)
		
		return JsonResponse(serializer.errors)

	return JsonResponse({'error': 'bad request'})


@csrf_exempt
def contact_list_detail(request, pk):
	try:
		contact = Contact.objects.get(id = pk)
	except contact.DoesNotExist as e:
		return JsonResponse({'error': str(e)})

	if request.method == 'GET':
		serializer = ContactSerializer(tasklist)
		return JsonResponse(serializer.data)

	elif request.method == 'PUT':
		body = json.loads(request.body)
		serializer = ContactSerializer(instance=contact, data=body)
		
		if serializer.is_valid():
			serializer.save()
			return JsonResponse(serializer.data)
		
		return JsonResponse(serializer.errors)
	
	elif request.method == 'DELETE':
		contact.delete()
		return JsonResponse({'delete': True})

	return JsonResponse(task_list.to_json())
