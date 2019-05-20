from django.views.decorators.csrf import csrf_exempt
from api.serializers import PostSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models import Contact

@api_view(['PUT'])

def update(request, pk):
    if request.method == 'PUT':
        try:
            list = list.objects.get(id=pk)

        except list.DoesNotExist as e:
         raise Response(status = status.HTTP_404_NOT_FOUND)

         list.save()
        return Response(status=status.HTTP_200_OK)


  @api_view(['DELETE'])
def delete(request,pk):
     if request.method == 'DELETE':
      try:
         list = list.objects.get(id=pk)
      except list.DoesNotExist as e:
        raise Response(status=status.HTTP_404_NOT_FOUND)
        list.count-=1
        list.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




@api_view(['POST'])
def cont_list_create(request):
   if  request.method == 'POST':
    try:
        list = list.objects.get()
    except list.DoesNotExist as e:
        raise Response(status=status.HTTP_404_NOT_FOUND)
    list.count += 1
    list.save()
    return Response(status=status.HTTP_200_OK)


